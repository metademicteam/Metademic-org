import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: regs } = await supabase.from("racn_registry").select("*").order("last_heartbeat", { ascending: false }).limit(100);
  const { data: tels } = await supabase.from("racn_telemetry").select("*").limit(100);
  const byId = new Map((tels || []).map((t: Record<string, unknown>) => [String(t["node_id"]), t]));
  const merged = (regs || []).map((r: Record<string, unknown>) => {
    const t = byId.get(String(r["node_id"])) as Record<string, unknown> | undefined;
    const last = r["last_heartbeat"] ? new Date(String(r["last_heartbeat"])).getTime() : 0;
    const online = !!r["active"] && Date.now() - last < 45_000;
    return {
      node_id: r["node_id"], gpu_tier: r["gpu_tier"], gpu_vendor: r["gpu_vendor"], gpu_name: r["gpu_name"],
      vram_gb: r["vram_gb"], memory_gb: r["memory_gb"], trust_score: r["trust_score"],
      role: r["role"], active: !!r["active"], online, last_heartbeat: r["last_heartbeat"],
      cpu_percent: t?.["cpu_percent"] ?? null, ram_percent: t?.["ram_percent"] ?? null,
      ram_used_gb: t?.["ram_used_gb"] ?? null, ram_total_gb: t?.["ram_total_gb"] ?? null,
      gpu_percent: t?.["gpu_percent"] ?? null, gpu_temp_c: t?.["gpu_temp_c"] ?? null,
      vram_used_gb: t?.["vram_used_gb"] ?? null, vram_total_gb: t?.["vram_total_gb"] ?? r["vram_gb"],
      backend: t?.["backend"] ?? null, model_id: t?.["model_id"] ?? null, active_jobs: t?.["active_jobs"] ?? 0,
      telemetry_updated_at: t?.["updated_at"] ?? null,
    };
  });
  return NextResponse.json({ nodes: merged });
}
