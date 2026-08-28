import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function pickProvenance(j: Record<string, unknown> | null): Record<string, unknown> {
  if (!j) return {};
  const out: Record<string, unknown> = {};
  for (const k of ["answered_by", "answered_by_gpu_tier", "answered_by_gpu_name", "backend", "tokens_per_sec", "assigned_workers", "completed_at"]) {
    if (j[k] !== undefined && j[k] !== null && j[k] !== "") out[k] = j[k];
  }
  // Some coordinator builds nest worker info inside outputs
  if (!out["answered_by"]) {
    const outputs = j["outputs"] as Record<string, Record<string, unknown>> | undefined;
    if (outputs) {
      for (const v of Object.values(outputs)) {
        if (v?.["worker"]) { out["answered_by"] = v["worker"]; if (v["backend"]) out["backend"] = v["backend"]; break; }
      }
    }
  }
  return out;
}

function pickOutput(j: Record<string, unknown> | null): string | null {
  if (!j) return null;
  if (typeof j["output"] === "string" && j["output"]) return j["output"] as string;
  if (typeof j["result"] === "string" && j["result"]) return j["result"] as string;
  if (typeof j["error"] === "string" && j["error"]) return null;
  const outputs = j["outputs"] as Record<string, { output?: string }> | undefined;
  if (outputs) {
    for (const v of Object.values(outputs)) if (v?.output) return v.output;
  }
  if (Array.isArray((j as Record<string, unknown>)["outputs"])) {
    for (const v of (j["outputs"] as Array<Record<string, unknown>>)) if (typeof v["output"] === "string" && v["output"]) return v["output"] as string;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data: job } = await supabase.from("racn_jobs").select("*").eq("id", id).eq("user_id", user.id).single();
  if (!job) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (job.status === "failed") return NextResponse.json(job);

  if (job.coordinator_job_id && job.status !== "completed" && job.status !== "failed") {
    const httpUrl = (process.env.RACN_HTTP_URL || process.env.NEXT_PUBLIC_RACN_HTTP_URL || "").replace(/\/$/, "");
    const serviceToken = (process.env.RACN_SERVICE_TOKEN || process.env.WEB_API_TOKEN || "").trim();
    if (httpUrl) {
      try {
        const r = await fetch(`${httpUrl}/job/${encodeURIComponent(job.coordinator_job_id)}`, {
          headers: serviceToken ? { authorization: `Bearer ${serviceToken}` } : {},
          cache: "no-store",
        });
        if (r.ok) {
          const j = (await r.json().catch(() => null)) as Record<string, unknown> | null;
          const rawStatus = String(j?.["status"] || j?.["state"] || "");
          const status = rawStatus.toLowerCase();
          const output = pickOutput(j);
          const errStr = typeof j?.["error"] === "string" ? (j["error"] as string) : "";
          if (status === "failed" || errStr) {
            const msg = errStr || `coordinator marked failed (${status})`;
            await supabase.from("racn_jobs").update({ status: "failed", output: msg }).eq("id", id);
            job.status = "failed";
            job.output = msg;
          } else if (status === "completed" || output) {
            const out = String(output || "");
            const prov = pickProvenance(j);
            if (out) {
              await supabase.from("racn_jobs").update({
                status: "completed", output: out, completed_at: new Date().toISOString(),
                answered_by_node_id: (prov["answered_by"] as string) || null,
                answered_by_gpu_tier: (prov["answered_by_gpu_tier"] as string) || null,
                answered_by_gpu_name: (prov["answered_by_gpu_name"] as string) || null,
                backend: (prov["backend"] as string) || null,
                tokens_per_sec: typeof prov["tokens_per_sec"] === "number" ? prov["tokens_per_sec"] as number : null,
                assigned_workers: prov["assigned_workers"] ? JSON.stringify(prov["assigned_workers"]) : null,
              }).eq("id", id);
              if (job.conversation_id) {
                const { data: existing } = await supabase.from("messages").select("id").eq("conversation_id", job.conversation_id).eq("role", "assistant").eq("content", out).limit(1);
                if (!existing || existing.length === 0) {
                  await supabase.from("messages").insert({ conversation_id: job.conversation_id, user_id: user.id, role: "assistant", content: out });
                }
              }
              job.status = "completed";
              job.output = out;
              (job as Record<string, unknown>).answered_by_node_id = prov["answered_by"] || null;
              (job as Record<string, unknown>).answered_by_gpu_name = prov["answered_by_gpu_name"] || prov["answered_by"] || null;
              (job as Record<string, unknown>).answered_by_gpu_tier = prov["answered_by_gpu_tier"] || null;
              (job as Record<string, unknown>).backend = prov["backend"] || null;
              (job as Record<string, unknown>).tokens_per_sec = prov["tokens_per_sec"] || null;
            } else if (status === "completed") {
              await supabase.from("racn_jobs").update({
                status: "completed", completed_at: new Date().toISOString(),
                answered_by_node_id: (prov["answered_by"] as string) || null,
                answered_by_gpu_name: (prov["answered_by_gpu_name"] as string) || null,
              }).eq("id", id);
              job.status = "completed";
              (job as Record<string, unknown>).answered_by_node_id = prov["answered_by"] || null;
            }
          } else if (status === "assigned" || status === "running") {
            if (job.status !== "running") await supabase.from("racn_jobs").update({ status: "running" }).eq("id", id);
            job.status = "running";
          }
        } else {
          const text = await r.text().catch(() => "");
          console.warn("[api/racn/job] coordinator job fetch", r.status, text.slice(0, 300));
        }
      } catch (e) {
        console.warn("[api/racn/job] coordinator unreachable", String(e).slice(0, 200));
      }
    }
  }

  return NextResponse.json(job);
}
