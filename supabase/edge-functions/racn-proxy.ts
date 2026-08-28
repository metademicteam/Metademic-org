// Supabase Edge Function: racn-proxy
// Deploy: supabase functions deploy racn-proxy
// Forwards authenticated chat jobs to RACN coordinator with credit check.
// Env: RACN_HTTP_URL, RACN_SERVICE_TOKEN (optional), SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors() });
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return json({ error: "Unauthorized" }, 401);
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = auth.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return json({ error: "Invalid token" }, 401);

    const { prompt, privacy_tier = "public", conversation_id } = await req.json();
    if (!prompt || typeof prompt !== "string") return json({ error: "prompt required" }, 400);

    const { data: credit } = await supabase.from("credits").select("balance").eq("user_id", user.id).single();
    if (!credit || credit.balance < 10) return json({ error: "Insufficient credits" }, 402);

    const cost = 10;
    await supabase.from("credits").update({ balance: credit.balance - cost }).eq("user_id", user.id);
    const jobRes = await supabase.from("racn_jobs").insert({ user_id: user.id, conversation_id: conversation_id || null, prompt, privacy_tier, status: "queued", credits_spent: cost }).select("id").single();

    const coordUrl = Deno.env.get("RACN_HTTP_URL");
    let coordinator_job_id: string | null = null;
    if (coordUrl) {
      try {
        const r = await fetch(`${coordUrl}/prompt`, {
          method: "POST",
          headers: { "content-type": "application/json", ...(Deno.env.get("RACN_SERVICE_TOKEN") ? { "authorization": `Bearer ${Deno.env.get("RACN_SERVICE_TOKEN")}` } : {}) },
          body: JSON.stringify({ prompt, privacy_tier, node_id: user.id }),
        });
        const j = await r.json();
        coordinator_job_id = j.job_id || j.id || null;
        if (coordinator_job_id && jobRes.data) await supabase.from("racn_jobs").update({ coordinator_job_id, status: "running" }).eq("id", jobRes.data.id);
      } catch {}
    }
    await supabase.from("credit_ledger").insert({ user_id: user.id, delta: -cost, reason: "job", job_id: jobRes.data?.id });

    return json({ job_id: jobRes.data?.id, coordinator_job_id, status: "queued" });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function cors() { return { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization, content-type", "access-control-allow-methods": "POST, OPTIONS" }; }
function json(b: unknown, s = 200) { return new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", ...cors() } }); }
