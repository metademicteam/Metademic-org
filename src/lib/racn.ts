export const RACN_HTTP = process.env.RACN_HTTP_URL || process.env.NEXT_PUBLIC_RACN_HTTP_URL || "";
export const RACN_WS = process.env.RACN_COORDINATOR_URL || "";

export async function submitToCoordinator(prompt: string, privacy_tier = "public", node_id?: string) {
  if (!RACN_HTTP) return null;
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (process.env.RACN_SERVICE_TOKEN) headers["authorization"] = `Bearer ${process.env.RACN_SERVICE_TOKEN}`;
  const res = await fetch(`${RACN_HTTP.replace(/\/$/, "")}/prompt`, {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt, privacy_tier, node_id }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ job_id: string }>;
}

export async function fetchJobStatus(jobId: string) {
  if (!RACN_HTTP) return null;
  const res = await fetch(`${RACN_HTTP.replace(/\/$/, "")}/job/${jobId}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
