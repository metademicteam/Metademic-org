"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type NodeRow = {
  node_id: string; gpu_tier: string; gpu_vendor: string; gpu_name: string;
  vram_gb: number; memory_gb: number; trust_score: number; role: string;
  online: boolean; last_heartbeat: string;
  cpu_percent: number | null; ram_percent: number | null; ram_used_gb: number | null; ram_total_gb: number | null;
  gpu_percent: number | null; gpu_temp_c: number | null; vram_used_gb: number | null; vram_total_gb: number | null;
  backend: string | null; model_id: string | null; active_jobs: number;
};

function Bar({ value, max = 100, label }: { value: number | null; max?: number; label: string }) {
  const v = value === null || value === undefined ? null : Math.max(0, Math.min(max, value));
  const pct = v === null ? 0 : (v / max) * 100;
  return (
    <div className="grid gap-1">
      <div className="flex justify-between text-xs"><span className="text-zinc-500">{label}</span><span className="font-mono font-medium">{v === null ? "—" : `${v}${label.includes("%") ? "%" : " GB"}${max !== 100 && v !== null ? ` / ${max}` : ""}`}</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-200"><div className="h-full bg-zinc-900 transition-all" style={{ width: `${pct}%`, opacity: v === null ? 0.15 : 1 }} /></div>
    </div>
  );
}

export default function TaskManagerPage() {
  const supabase = createClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [nodes, setNodes] = useState<NodeRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAuthed(!!data.user);
      if (!data.user) setLoading(false);
    });
  }, []);

  async function load() {
    try {
      const r = await fetch("/api/racn/telemetry", { cache: "no-store" });
      const j = await r.json();
      if (Array.isArray(j.nodes)) setNodes(j.nodes);
    } catch {}
    setLoading(false);
  }
  useEffect(() => { if (authed) { load(); const t = setInterval(load, 4000); return () => clearInterval(t); } }, [authed]);

  if (authed === null) return <div className="oai-container py-10 text-sm text-zinc-500">Loading…</div>;
  if (!authed) return (
    <div className="oai-container py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 p-6">
        <h1 className="text-lg font-semibold">Task Manager — sign in</h1>
        <p className="mt-1 text-sm text-zinc-600">Live CPU / RAM / GPU usage per peer (from heartbeat telemetry).</p>
        <Link href="/auth" className="mt-4 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">Sign in</Link>
      </div>
    </div>
  );

  return (
    <div className="oai-container py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Task Manager</h1>
          <p className="mt-1 text-sm text-zinc-600">Live usage per peer — CPU, RAM, GPU (VRAM). Updates every ~4s from heartbeats. “{nodes.filter((n) => n.online).length} online”.</p>
        </div>
        <Link href="/chat" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Open chat</Link>
      </div>
      {loading ? <div className="mt-6 text-sm text-zinc-500">Loading fleet…</div> : nodes.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed p-6 text-sm text-zinc-500">No peers registered yet. Install a node (<Link href="/download" className="underline">Download</Link>) and it appears here on heartbeat.</div> : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nodes.map((n) => (
            <div key={n.node_id} className={`rounded-2xl border p-4 ${n.online ? "border-zinc-200 bg-white" : "border-zinc-200 bg-zinc-50 opacity-80"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${n.online ? "bg-emerald-500" : "bg-zinc-300"}`} />
                    <span className="truncate font-mono text-sm font-medium">{n.node_id}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${n.gpu_tier === "high" ? "bg-emerald-100 text-emerald-800" : n.gpu_tier === "medium" ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-600"}`}>{n.gpu_tier}{n.vram_gb ? ` · ${n.vram_gb}GB` : ""}</span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">{n.role}</span>
                    {n.backend ? <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">{n.backend}</span> : null}
                  </div>
                  <div className="mt-1 truncate text-xs text-zinc-500">{n.gpu_name || n.gpu_vendor} {n.model_id ? `· ${n.model_id.split("/").pop()}` : ""}</div>
                </div>
                <span className="shrink-0 text-xs text-zinc-500">{n.active_jobs} job(s)</span>
              </div>
              <div className="mt-4 grid gap-3">
                <Bar value={n.cpu_percent} label="CPU %" />
                <Bar value={n.ram_percent} label="RAM %" />
                {n.ram_used_gb !== null && n.ram_total_gb ? <Bar value={n.ram_used_gb} max={n.ram_total_gb} label="RAM GB" /> : null}
                <Bar value={n.gpu_percent} label="GPU %" />
                {n.vram_used_gb !== null || n.vram_gb ? <Bar value={n.vram_used_gb} max={n.vram_total_gb || n.vram_gb || 8} label="VRAM GB" /> : null}
                {n.gpu_temp_c !== null && n.gpu_temp_c !== undefined ? <div className="text-xs text-zinc-500">GPU temp: <span className="font-mono font-medium text-zinc-900">{n.gpu_temp_c}°C</span></div> : null}
              </div>
              <div className="mt-3 text-xs text-zinc-400">heartbeat {n.last_heartbeat ? new Date(n.last_heartbeat).toLocaleTimeString() : "—"} {n.online ? "" : "· offline"}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
        <span className="font-medium text-zinc-900">Where your answer came from</span> — each chat reply shows <span className="font-mono text-xs">answered by &lt;node_id&gt;</span> with that peer’s GPU tier. See <Link href="/chat" className="underline">Chat</Link> provenance badges. Contributor view: <Link href="/contributions" className="underline">Contributions</Link>.
      </div>
    </div>
  );
}
