import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const COST = 10;
const VALID_TIERS = new Set(["public", "protected", "confidential", "local_only"]);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Server misconfigured: missing SUPABASE env", detail: "Set NEXT_PUBLIC_SUPABASE_URL and ANON_KEY in .env.local" }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr) return NextResponse.json({ error: "Auth error", detail: authErr.message }, { status: 500 });
    if (!user) return NextResponse.json({ error: "Unauthorized — sign in at /auth" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const privacy_tier = typeof body?.privacy_tier === "string" && VALID_TIERS.has(body.privacy_tier) ? body.privacy_tier : "public";
    const conversation_id = typeof body?.conversation_id === "string" && body.conversation_id.length > 10 ? body.conversation_id : null;

    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });
    if (prompt.length > 8000) return NextResponse.json({ error: "prompt too long (max 8000 chars)" }, { status: 400 });
    if (privacy_tier === "local_only") return NextResponse.json({ error: "local_only runs on your peer — not via coordinator" }, { status: 400 });

    const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (!profile) {
      const { error: pErr } = await supabase.from("profiles").insert({ id: user.id, email: user.email || null, display_name: (user.user_metadata as Record<string, string>)?.display_name || user.email?.split("@")[0] || "user" });
      if (pErr) return NextResponse.json({ error: "profile bootstrap failed", detail: pErr.message }, { status: 500 });
    }

    let balance = 0;
    const { data: creditRow, error: cErr } = await supabase.from("credits").select("balance").eq("user_id", user.id).maybeSingle();
    if (cErr) return NextResponse.json({ error: "credit read failed", detail: cErr.message }, { status: 500 });
    if (!creditRow) {
      const { error: insErr } = await supabase.from("credits").insert({ user_id: user.id, balance: 500 });
      if (insErr) return NextResponse.json({ error: "credit bootstrap failed", detail: insErr.message, hint: "Did you run supabase/schema.sql in Supabase SQL Editor?" }, { status: 500 });
      await supabase.from("credit_ledger").insert({ user_id: user.id, delta: 500, reason: "bootstrap" });
      balance = 500;
    } else {
      balance = creditRow.balance ?? 0;
    }

    if (balance < COST) return NextResponse.json({ error: "Insufficient credits", balance }, { status: 402 });

    const { error: rpcErr } = await supabase.rpc("spend_credits", { p_user_id: user.id, p_amount: COST, p_reason: "job" }).then(
      (r) => r as { error: { message: string } | null; data: unknown },
      (e: unknown) => ({ error: { message: String(e) }, data: null }),
    );

    if (rpcErr) {
      const needFallback = /spend_credits|does not exist|PGRST202|42883/i.test(rpcErr.message);
      if (!needFallback) return NextResponse.json({ error: "credit check failed", detail: rpcErr.message }, { status: 500 });
      const { error: uErr } = await supabase.from("credits").update({ balance: balance - COST }).eq("user_id", user.id);
      if (uErr) return NextResponse.json({ error: "credit update failed", detail: uErr.message }, { status: 500 });
      await supabase.from("credit_ledger").insert({ user_id: user.id, delta: -COST, reason: "job" });
    }

    let convId: string | null = conversation_id;
    if (!convId) {
      const { data: conv, error: convErr } = await supabase.from("conversations").insert({ user_id: user.id, title: prompt.slice(0, 60) }).select("id").single();
      if (convErr || !conv) {
        try { await supabase.from("credits").update({ balance: balance }).eq("user_id", user.id); await supabase.from("credit_ledger").insert({ user_id: user.id, delta: COST, reason: "refund:conv_failed" }); } catch {}
        return NextResponse.json({ error: "could not create conversation", detail: convErr?.message }, { status: 500 });
      }
      convId = conv.id;
    }

    const { error: msgErr } = await supabase.from("messages").insert({ conversation_id: convId, user_id: user.id, role: "user", content: prompt });
    if (msgErr) return NextResponse.json({ error: "could not save message", detail: msgErr.message }, { status: 500 });

    const { data: job, error: jobErr } = await supabase.from("racn_jobs").insert({ user_id: user.id, conversation_id: convId, prompt, privacy_tier, status: "queued", credits_spent: COST }).select("id").single();
    if (jobErr || !job) return NextResponse.json({ error: "could not create job", detail: jobErr?.message }, { status: 500 });

    const httpUrl = (process.env.RACN_HTTP_URL || process.env.NEXT_PUBLIC_RACN_HTTP_URL || "").replace(/\/$/, "");
    const serviceToken = (process.env.RACN_SERVICE_TOKEN || process.env.WEB_API_TOKEN || "").trim();
    if (!httpUrl) {
      await supabase.from("racn_jobs").update({ status: "failed", output: "Coordinator not configured (RACN_HTTP_URL missing)" }).eq("id", job.id);
      return NextResponse.json({ job_id: job.id, conversation_id: convId, warning: "Coordinator not configured" }, { status: 502 });
    }

    let coordinator_job_id: string | null = null;
    let coordinatorError: string | null = null;
    try {
      const r = await fetch(`${httpUrl}/prompt`, {
        method: "POST",
        headers: { "content-type": "application/json", ...(serviceToken ? { authorization: `Bearer ${serviceToken}` } : {}) },
        body: JSON.stringify({ prompt, privacy_tier, node_id: user.id }),
        cache: "no-store",
      });
      const text = await r.text();
      let j: Record<string, unknown> | null = null;
      try { j = text ? JSON.parse(text) : null; } catch { j = { raw: text } as Record<string, unknown>; }
      if (!r.ok) {
        coordinatorError = `Coordinator ${r.status}: ${text.slice(0, 500)}`;
        await supabase.from("racn_jobs").update({ status: "failed", output: coordinatorError }).eq("id", job.id);
        console.error("[api/racn/chat] coordinator rejected", r.status, text);
        return NextResponse.json({ error: "Coordinator rejected job", detail: text.slice(0, 800), coordinator_status: r.status, job_id: job.id, conversation_id: convId }, { status: 502 });
      }
      coordinator_job_id = (j?.["job_id"] || j?.["id"] || j?.["coordinator_job_id"]) as string | null;
      if (coordinator_job_id) {
        await supabase.from("racn_jobs").update({ coordinator_job_id: String(coordinator_job_id), status: "running" }).eq("id", job.id);
      } else {
        coordinatorError = `Coordinator returned no job_id: ${text.slice(0, 500)}`;
        await supabase.from("racn_jobs").update({ status: "failed", output: coordinatorError }).eq("id", job.id);
        return NextResponse.json({ error: "Coordinator gave no job_id", detail: text.slice(0, 800), job_id: job.id, conversation_id: convId }, { status: 502 });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      coordinatorError = `Coordinator unreachable (${httpUrl}): ${msg}`;
      await supabase.from("racn_jobs").update({ status: "failed", output: coordinatorError }).eq("id", job.id);
      console.error("[api/racn/chat] coordinator unreachable", httpUrl, msg);
      return NextResponse.json({ error: "Coordinator unreachable", detail: msg, hint: "Is docker compose -p racn-coordinator up? Is tailscale funnel 8443 running? Check https://desktop-b7l73cl.tail6cb521.ts.net:8443/health", httpUrl, job_id: job.id, conversation_id: convId }, { status: 502 });
    }

    return NextResponse.json({ job_id: job.id, conversation_id: convId, coordinator_job_id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    console.error("[api/racn/chat] fatal", msg, stack);
    return NextResponse.json({ error: "Internal error", detail: msg }, { status: 500 });
  }
}
