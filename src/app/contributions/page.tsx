"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Job = { id: string; prompt: string; status: string; created_at: string; completed_at: string | null; answered_by_node_id?: string | null; answered_by_gpu_tier?: string | null; answered_by_gpu_name?: string | null; backend?: string | null; coordinator_job_id?: string | null };

export default function ContributionsPage() {
  const supabase = createClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [answered, setAnswered] = useState<Job[]>([]);
  const [myNodeIds, setMyNodeIds] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/racn/contributions?mine=1", { cache: "no-store" }).then((r) => r.json()).then((j) => {
      setMyJobs(j.myJobs || []);
      setAnswered(j.answeredJobs || []);
      setMyNodeIds(j.myNodeIds || []);
    }).catch(() => {});
  }, [authed]);

  if (authed === null) return <div className="oai-container py-10 text-sm text-zinc-500">Loading…</div>;
  if (!authed) return (
    <div className="oai-container py-12">
      <div className="mx-auto max-w-md rounded-2xl border p-6"><h1 className="text-lg font-semibold">Contributions — sign in</h1><Link href="/auth" className="mt-4 inline-flex rounded-full bg-black px-5 py-2.5 text-sm text-white">Sign in</Link></div>
    </div>
  );

  return (
    <div className="oai-container py-8">
      <h1 className="text-xl font-semibold tracking-tight">Contributions</h1>
      <p className="mt-1 text-sm text-zinc-600">Where your answers went — and who answered yours. Your peer node{(myNodeIds.length === 1 ? "" : "s")}: <span className="font-mono text-xs">{myNodeIds.join(", ") || "none linked yet (install a node)"}</span>.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-semibold">Your prompts → where they were answered</h2>
          <p className="mt-1 text-xs text-zinc-500">Each of your prompts shows which peer’s GPU ran it (provenance).</p>
          <div className="mt-4 grid gap-2">
            {myJobs.length === 0 ? <div className="rounded-xl border border-dashed p-4 text-sm text-zinc-500">No prompts yet — <Link href="/chat" className="underline">ask one in Chat</Link>.</div> : myJobs.map((j) => (
              <div key={j.id} className="rounded-xl border border-zinc-200 p-3">
                <div className="truncate text-sm font-medium">{j.prompt.slice(0, 80)}</div>
                <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5">{j.status}</span>
                  {j.answered_by_node_id ? <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-white">answered by {j.answered_by_gpu_name || j.answered_by_node_id}</span> : <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-600">{j.coordinator_job_id ? "routing…" : "queued"}</span>}
                  {j.answered_by_gpu_tier ? <span className="rounded-full bg-zinc-100 px-2 py-0.5">{j.answered_by_gpu_tier}</span> : null}
                  {j.backend ? <span className="rounded-full bg-zinc-100 px-2 py-0.5">{j.backend}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-semibold">Your GPU’s contributions → whose questions it answered</h2>
          <p className="mt-1 text-xs text-zinc-500">Prompts other users sent that your GPU completed (you earned credits).</p>
          <div className="mt-4 grid gap-2">
            {answered.length === 0 ? <div className="rounded-xl border border-dashed p-4 text-sm text-zinc-500">No contributions yet. Keep your node running — when the coordinator picks your GPU, it appears here.</div> : answered.map((j) => (
              <div key={j.id} className="rounded-xl border border-zinc-200 p-3">
                <div className="truncate text-sm">{j.prompt.slice(0, 90)}</div>
                <div className="mt-1 text-xs text-zinc-500">{j.answered_by_gpu_tier ? `${j.answered_by_gpu_tier} · ` : ""}{j.status} · {j.completed_at ? new Date(j.completed_at).toLocaleString() : j.created_at ? new Date(j.created_at).toLocaleString() : ""}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 text-sm">
        <Link href="/task-manager" className="rounded-full border border-zinc-200 px-4 py-2 font-medium hover:bg-zinc-50">Task Manager</Link>
        <Link href="/chat" className="rounded-full bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800">Chat</Link>
      </div>
    </div>
  );
}
