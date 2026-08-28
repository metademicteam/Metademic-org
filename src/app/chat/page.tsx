"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Msg = { id?: string; role: "user" | "assistant"; content: string };
type Conv = { id: string; title: string; created_at: string };

const TIERS = ["public", "protected", "confidential"] as const;

export default function ChatPage() {
  const supabase = createClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [convs, setConvs] = useState<Conv[]>([]);
  const [convId, setConvId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [prompt, setPrompt] = useState("");
  const [tier, setTier] = useState<(typeof TIERS)[number]>("public");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      setAuthed(!!u);
      if (!u) return;
      const { data: c } = await supabase.from("credits").select("balance").eq("user_id", u.id).single();
      setCredits(c?.balance ?? 0);
      const { data: cs } = await supabase.from("conversations").select("id,title,created_at").eq("user_id", u.id).order("updated_at", { ascending: false }).limit(30);
      if (cs) setConvs(cs as Conv[]);
    });
  }, []);

  async function loadConv(id: string) {
    setConvId(id);
    const { data } = await supabase.from("messages").select("id,role,content").eq("conversation_id", id).order("created_at", { ascending: true });
    setMsgs((data as Msg[]) || []);
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, phase]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;
    const q = prompt.trim();
    setPrompt("");
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    setPhase("Routing to best GPU peer…");

    try {
      const r = await fetch("/api/racn/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: q, privacy_tier: tier, conversation_id: convId }),
      });
      const j = await r.json().catch(() => ({ error: `HTTP ${r.status}`, detail: r.statusText }));
      if (!r.ok) {
        const detail = j.detail ? ` — ${String(j.detail).slice(0, 600)}` : j.hint ? ` — ${j.hint}` : "";
        setMsgs((m) => [...m, { role: "assistant", content: `⚠️ ${j.error || `HTTP ${r.status}`}${detail}` }]);
        setLoading(false); setPhase(""); return;
      }
      if (j.conversation_id && j.conversation_id !== convId) {
        setConvId(j.conversation_id);
        setConvs((prev) => [{ id: j.conversation_id, title: q.slice(0, 48), created_at: new Date().toISOString() }, ...prev.filter((c) => c.id !== j.conversation_id)]);
      }
      let tries = 0;
      const poll = async () => {
        tries++;
        if (tries === 2) setPhase("Best GPU selected → running generate()…");
        if (tries === 6) setPhase("Still generating on peer (lease 18s, auto-requeue on drop)…");
        const rr = await fetch(`/api/racn/job?id=${j.job_id}`);
        const jj = await rr.json();
        if (jj.status === "completed" && jj.output) {
          setMsgs((m) => [...m, { role: "assistant", content: jj.output }]);
          setCredits((c) => (c !== null ? c - 10 : c));
          setLoading(false); setPhase("");
        } else if (jj.status === "failed") {
          setMsgs((m) => [...m, { role: "assistant", content: `⚠️ Failed: ${jj.output || "coordinator/peer error"} — check docker logs -f racn-coordinator + tailscale funnel 8443` }]);
          setLoading(false); setPhase("");
        } else if (tries > 32) {
          const state = jj.status || "queued";
          if (state === "assigned" || state === "running") {
            setMsgs((m) => [...m, { role: "assistant", content: `(Still ${state} on peer — model may be loading/downloading (~2.3GB first time) or slow CPU. Check ${jj.coordinator_job_id || jj.id || ""} in coordinator logs.)` }]);
          } else {
            setMsgs((m) => [...m, { role: "assistant", content: `(Queued — no GPU peer dispatched. Your screenshot shows native peers online, but coordinator may have no *registered* WSS worker. Check: curl https://desktop-b7l73cl.tail6cb521.ts.net:8443/nodes and docker logs -f racn-coordinator)` }]);
          }
          setLoading(false); setPhase("");
        } else setTimeout(poll, 1500);
      };
      setTimeout(poll, 900);
    } catch (err: unknown) {
      setMsgs((m) => [...m, { role: "assistant", content: String((err as Error)?.message || err) }]);
      setLoading(false); setPhase("");
    }
  }

  if (authed === null) return <div className="oai-container py-10 text-sm text-zinc-500">Loading…</div>;
  if (!authed) return (
    <div className="oai-container py-12">
      <div className="mx-auto max-w-lg rounded-[22px] border border-zinc-200 p-6">
        <h1 className="text-lg font-semibold">Sign in to chat with RACN</h1>
        <p className="mt-1 text-sm leading-6 text-zinc-600">P2P: prompt → coordinator scores peers (gpu+mem+bw−lat−queue+shard+trust) → fastest GPU runs <span className="font-mono text-xs">generate()</span>. 10 credits/prompt. Install a node to earn.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/auth" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Sign in</Link>
          <Link href="/download" className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium hover:bg-zinc-50">Download node</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-56px)] bg-white">
      <aside className="hidden w-[260px] shrink-0 flex-col border-r border-zinc-200 bg-zinc-50/60 md:flex">
        <div className="flex items-center justify-between p-3">
          <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">History</span>
          <button onClick={() => { setConvId(null); setMsgs([]); }} className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800">New chat</button>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2">
          {convs.length === 0 && <div className="px-3 py-6 text-xs leading-5 text-zinc-500">No chats yet — your first prompt creates a conversation.</div>}
          {convs.map((c) => (
            <button key={c.id} onClick={() => loadConv(c.id)} className={`w-full truncate rounded-xl px-3 py-2.5 text-left text-sm hover:bg-white ${convId === c.id ? "bg-white ring-1 ring-zinc-200" : ""}`}>
              <div className="truncate font-medium text-zinc-900">{c.title}</div>
              <div className="font-mono text-xs text-zinc-500">{c.id.slice(0, 8)}</div>
            </button>
          ))}
        </div>
        <div className="border-t border-zinc-200 p-3 text-xs leading-5 text-zinc-600">
          <div className="rounded-xl bg-white p-3 ring-1 ring-zinc-200">
            <div className="font-medium text-zinc-900">P2P fast path</div>
            <div className="mt-1">No RAG — coordinator picks best GPU, peer runs <span className="font-mono">generate()</span>.</div>
            <Link href="/download" className="mt-2 inline-flex text-xs font-medium underline">Install node →</Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">RACN Chat</div>
            {convId && <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600">{convId.slice(0, 8)}</span>}
            <span className="hidden text-xs text-zinc-500 md:inline">· prompt → best GPU → generate()</span>
          </div>
          <div className="flex items-center gap-2">
            <select value={tier} onChange={(e) => setTier(e.target.value as typeof tier)} className="h-8 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium">
              {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white">{credits ?? "—"} credits</span>
            <Link href="/download" className="hidden rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 md:inline-flex">Install node</Link>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-6">
          {msgs.length === 0 && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm leading-6 text-zinc-600">
              Pure P2P mode: your prompt is scored across live peers (H1 16GB GPU → H6 CPU). Best score wins, gets a WSS <span className="font-mono text-xs">job</span> frame, runs <span className="font-mono text-xs">generate(prompt)</span>, returns signed output. Lease 18s, monitor 5s — if peer drops, coordinator requeues to next-best GPU. No vector DB, no retrieval — fastest answer.
            </div>
          )}
          <div className="mx-auto grid max-w-2xl gap-4 px-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%] rounded-2xl bg-black px-4 py-3 text-sm leading-6 text-white" : "max-w-[85%] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-800"}>
                {m.content}
              </div>
            ))}
            {loading && <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">{phase || "Routing…"}</div>}
            <div ref={bottomRef} />
          </div>
        </div>

        <form onSubmit={send} className="mx-auto flex w-full max-w-2xl gap-2 border-t border-zinc-200 p-4">
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask RACN — best GPU will answer…" className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100" />
          <button disabled={loading} className="h-11 rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50">Send</button>
        </form>
      </div>
    </div>
  );
}
