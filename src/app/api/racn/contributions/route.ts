import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const nodeId = req.nextUrl.searchParams.get("node_id") || "";
  const mine = req.nextUrl.searchParams.get("mine") === "1";

  // 1) jobs where *this user's* contributions answered someone else's prompt
  //    (coordinator marks answered_by_node_id; filter where answered_by matches one of the user's peer ids)
  const { data: myNodes } = await supabase.from("racn_nodes").select("node_id").eq("user_id", user.id);
  const myNodeIds: string[] = (myNodes || []).map((r: { node_id: string }) => r.node_id);
  // also include coordinator's racn_registry ids that the user owns implicitly (node_id prefix peer-* matching)
  // fall back to filtering by answered_by prefix when no explicit racn_nodes
  const targetNodeIds = nodeId ? [nodeId] : myNodeIds;

  let answered: unknown[] = [];
  if (targetNodeIds.length > 0) {
    const { data } = await supabase.from("racn_jobs")
      .select("id, prompt, privacy_tier, status, created_at, completed_at, answered_by_node_id, answered_by_gpu_tier, backend, user_id")
      .in("answered_by_node_id", targetNodeIds)
      .order("completed_at", { ascending: false }).limit(50);
    answered = data || [];
  }

  // 2) user's own jobs (where their answer came from)
  const { data: myJobs } = await supabase.from("racn_jobs")
    .select("id, prompt, status, created_at, completed_at, coordinator_job_id, answered_by_node_id, answered_by_gpu_tier, answered_by_gpu_name, backend, tokens_per_sec")
    .eq("user_id", user.id).order("created_at", { ascending: false }).limit(30);

  // 3) ledger earnings (contributor credits)
  const { data: earnings } = await supabase.from("racn_ledger_entries").select("*").order("ts", { ascending: false }).limit(50);

  return NextResponse.json({ myNodeIds, answeredJobs: answered, myJobs: myJobs || [], earnings: earnings || [] });
}
