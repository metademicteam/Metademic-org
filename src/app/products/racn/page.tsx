import Link from "next/link";
import type { Metadata } from "next";
import { ArtCard } from "@/components/ArtCard";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "RACN — Reciprocal Agentic Compute Network | Metademic",
  description:
    "RACN turns idle GPUs into shared supercompute. Hybrid: install the peer node once, chat anywhere on the web. Pipeline + mesh, SealedBox privacy, torch-fast shards, lease-based self-healing. Credits: 500 bootstrap, earn per verified task.",
  openGraph: {
    title: "RACN — Reciprocal Agentic Compute Network",
    description: "Hybrid P2P inference: download once, use everywhere on the web. Credits, privacy tiers, pipeline & mesh.",
  },
  alternates: { canonical: "https://metademic.org/products/racn" },
};

export default function RacnPage() {
  return (
    <div className="bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "RACN — Reciprocal Agentic Compute Network",
          applicationCategory: "Science",
          operatingSystem: "Windows, macOS, Linux, Docker",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Hybrid P2P LLM network: install the peer node once, chat anywhere on metademic.org. Pipeline + mesh DAG, capability-aware scheduling, 18s lease, NaCl SealedBox for confidential.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Do I need to keep the app installed?", acceptedAnswer: { "@type": "Answer", text: "Install the lightweight racn-node peer once. After that, chat at metademic.org/chat from any browser — jobs route to the P2P mesh (yours or others). No need to keep a window open." } },
            { "@type": "Question", name: "How do credits work?", acceptedAnswer: { "@type": "Answer", text: "500 credits on signup. Each prompt spends ~10 credits. Contribute GPU work and earn earn = 10 × (1 + 0.1·trust) on verification. Confidential tasks use trust ≥0.9 and NaCl SealedBox." } },
            { "@type": "Question", name: "Is my data private?", acceptedAnswer: { "@type": "Answer", text: "Choose per prompt: Public / Protected (trust≥0.7) / Confidential (trust≥0.9 + sealed) / Local-only (never leaves your machine). Coordinator never sees plaintext of confidential jobs." } },
          ],
        }}
      />

      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium tracking-wide text-white">RACN · Reciprocal Agentic Compute Network</div>
          <h1 className="display mt-4 max-w-[18ch] text-[30px] text-zinc-900 md:text-[44px]">
            Turn idle GPUs
            <span className="block text-zinc-500">into shared supercompute.</span>
          </h1>
          <p className="mt-4 max-w-[64ch] text-[15px] leading-6 text-zinc-600 md:text-base">
            RACN is <strong className="font-semibold text-zinc-900">hybrid</strong>: install the <Link href="/download" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">peer node</Link> once on your machine — then do everything from the web. Chat at{" "}
            <Link href="/chat" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">/chat</Link>, history + credits in Supabase, compute on the P2P mesh: pipeline (sequential) or mesh (DAG: retrieval/code/doc → verification → synthesis), capability-aware scoring, 18 s lease + 5 s monitor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/download" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">Download node</Link>
            <Link href="/chat" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">Open web chat</Link>
            <a href="#how-it-works" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">How it works</a>
          </div>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[22px] border border-zinc-200">
            <ArtCard variant={6} ratio="wide" shimmer />
            <div className="p-6">
              <div className="kicker">Real system — not a mock</div>
              <h2 className="mt-2 text-[18px] font-semibold tracking-tight text-zinc-900">From your Python prototype to the web</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Control-plane (FastAPI :8443) + coordinator + Redis queue/lease/inflight + MinIO shards. Workers register → heartbeat 15 s → <span className="font-mono text-xs">POST /prompt</span> → planner → scheduler → WSS job frame → worker decrypts →{" "}
                <span className="font-mono text-xs">generate(prompt, max_tokens)</span> → signed complete → ledger earn.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-6">
              <div className="text-sm font-semibold tracking-tight text-zinc-900">Why hybrid?</div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-600">
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Web = identity, chat history, credits, billing (Supabase Auth + RLS).</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Peer = your GPUs, your data, local-only option never leaves.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> Install once → use from any browser, any machine.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/download" className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white">Download</Link>
                <Link href="/chat" className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium">Try chat</Link>
              </div>
            </div>
            <div id="credits" className="scroll-mt-20 rounded-[22px] border border-zinc-200 p-6">
              <div className="text-sm font-semibold tracking-tight text-zinc-900">Credits</div>
              <p className="mt-2 font-mono text-xs leading-6 text-zinc-600">
                Bootstrap 500 on signup. Cost ~10 per prompt. Earn <span className="font-semibold">10 × (1 + 0.1·trust)</span> on verification (2-of-3 sampling for high value). 402 if insufficient. Tables: <span className="font-mono">credits</span>, <span className="font-mono">credit_ledger</span> (RLS per user).
              </p>
            </div>
          </div>
        </div>

        <div id="how-it-works" className="mt-10 scroll-mt-20">
          <div className="kicker">How it works</div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-zinc-900 md:text-[26px]">Planner · Scheduler · Lease</h2>
          <p className="mt-3 max-w-[65ch] text-sm leading-6 text-zinc-600 md:text-[15px]">
            Prompt → <em>pipeline</em> (≤20 words: model_forward → 2-stage high→medium) or <em>mesh</em> (document-analysis / code / retrieval → verification → synthesis). Scheduler scores{" "}
            <span className="font-mono text-xs">w_g·gpu + w_m·mem + w_b·bw − w_l·lat − w_q·queue + w_shard·locality + w_trust·trust</span>, privacy gates (confidential ≥0.9, protected &gt;0.7). Lease 18 s, monitor 5 s, requeue on miss.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 p-5">
              <div className="h-1 w-8 rounded-full bg-zinc-900" />
              <div className="mt-3 text-sm font-semibold text-zinc-900">Torrent shards</div>
              <div className="mt-1 text-sm leading-6 text-zinc-600">cfg → grant → data → finish. Adaptive engine: vLLM / llama.cpp / MLX.</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-5">
              <div className="h-1 w-8 rounded-full bg-zinc-900" />
              <div className="mt-3 text-sm font-semibold text-zinc-900">Confidential</div>
              <div className="mt-1 text-sm leading-6 text-zinc-600">Ed25519 + X25519, NaCl SealedBox to worker box_pubkey, signed POST /worker/complete.</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-5">
              <div className="h-1 w-8 rounded-full bg-zinc-900" />
              <div className="mt-3 text-sm font-semibold text-zinc-900">Self-healing</div>
              <div className="mt-1 text-sm leading-6 text-zinc-600">Heartbeat extends lease; monitor requeues if worker !active and now − assigned_at &gt; lease. MAX_ATTEMPTS 3.</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link href="/research/field-notes-distributed-inference" className="inline-flex items-center gap-1 font-medium text-zinc-900">Field notes: distributed inference →</Link>
            <span className="text-zinc-300">·</span>
            <Link href="/download" className="font-medium text-zinc-900">Install guide →</Link>
          </div>
        </div>

        <div className="mt-10 rounded-[24px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="kicker">Quick start</div>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-zinc-900">Copy, run, chat</h3>
              <pre className="mt-4 overflow-auto rounded-xl bg-zinc-900 p-4 font-mono text-xs leading-6 text-zinc-100">pip install racn-node{"\n"}racn-node init --coordinator-url wss://coordinator.metademic.org/ws{"\n"}racn-node start{"\n"}# then open https://metademic.org/chat</pre>
              <p className="mt-3 text-xs leading-5 text-zinc-500">Outbound WSS only — NAT-friendly, TURN relay via ws_client.py. H1 (16GB GPU) → H6 (CPU/Apple Silicon).</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold tracking-tight text-zinc-900">APIs the site uses</div>
              <ul className="mt-3 grid gap-2 font-mono text-xs leading-6 text-zinc-600">
                <li><span className="font-medium text-zinc-900">POST /prompt</span> → job_id · privacy_tier · node_id</li>
                <li><span className="font-medium text-zinc-900">GET /job/:id</span> → status/output · polled from /api/racn/job</li>
                <li><span className="font-medium text-zinc-900">WSS /ws</span> · auth→hello(JWT)· register · heartbeat · job · complete · relay</li>
                <li>Supabase: <span className="font-mono">profiles, credits, racn_nodes, conversations, messages, racn_jobs</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="oai-container py-10">
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/chat" className="rounded-full bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800">Start chatting</Link>
          <Link href="/download" className="rounded-full border border-zinc-200 px-4 py-2 font-medium hover:bg-zinc-50">Download node</Link>
          <Link href="/open-research" className="rounded-full border border-zinc-200 px-4 py-2 font-medium hover:bg-zinc-50">Open Research →</Link>
        </div>
      </div>
    </div>
  );
}
