import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — Concept → Sustainable Service",
  description: "RACN from concept to WAN — each validation stage maps to a research publication. Hybrid P2P: prompt → coordinator picks best GPU → peer generate().",
  alternates: { canonical: "https://metademic.org/roadmap" },
};

const phases = [
  {
    year: "2022",
    label: "FOUNDATION",
    status: "Completed" as const,
    milestone: "Milestone: concept scientifically defensible + simulator specification",
    items: ["Concept + prior-art validation", "Research gap + reference architecture", "RACN-Sim design begins"],
    papers: [
      {
        id: "01",
        k: "PAPER 1 — Architecture & Prior Art",
        desc: "Maps existing systems and defines RACN's research gap, reference architecture, feasibility boundaries, and core validation questions.",
      },
    ],
  },
  {
    year: "2025",
    label: "BUILD & VALIDATE",
    status: "Completed" as const,
    milestone: "Milestone: real jobs shared across heterogeneous lab computers",
    items: ["Complete RACN-Sim", "Python RACN Alpha", "LAN hardware sharing", "Distributed LLM development"],
    papers: [
      { id: "02", k: "PAPER 2 — RACN-Sim", desc: "Introduces a reproducible simulator and compares scheduling policies under heterogeneous compute, latency, churn, reliability, and demand." },
      { id: "03", k: "PAPER 3 — RACN Alpha", desc: "Presents the Python peer/coordinator framework and evaluates deployment reproducibility, hardware-backend compatibility, job dispatch, and system overhead." },
      { id: "04", k: "PAPER 4 — LAN Agent Scheduling", desc: "Evaluates capability-aware agent-task distribution across real lab computers, measuring speedup, utilization, queueing delay, reliability, and energy." },
    ],
  },
  {
    year: "2026",
    label: "BUILD & VALIDATE",
    status: "In progress" as const,
    milestone: "Milestone: trusted multi-location RACN survives faults and WAN conditions",
    items: ["Distributed LLM validation", "Security + failover + credits", "Trusted WAN deployment", "Large-scale test environment"],
    papers: [
      { id: "05", k: "PAPER 5 — Distributed LLM Inference", desc: "Tests topology-aware model partitioning across heterogeneous LAN devices and identifies when distributed inference outperforms single-node baselines." },
      { id: "06", k: "PAPER 6 — Trust, Recovery & Credits", desc: "Evaluates checkpointing, failover, sandboxing, adaptive verification, and reciprocal credits under node failures and malicious behavior." },
      { id: "07", k: "PAPER 7 — RACN-WAN", desc: "Studies real Internet deployment across locations and ISPs, quantifying latency, NAT, packet loss, churn, relay overhead, and regional scheduling effects." },
    ],
  },
];

const flow = ["Concept", "Simulation", "Prototype", "LAN", "Distributed AI", "Security", "WAN", "Scale", "Public Preview", "Global Hybrid", "Sustainable Service"];

function StatusDot({ status }: { status: (typeof phases)[number]["status"] }) {
  const map = {
    Completed: "bg-emerald-500 ring-emerald-200",
    "In progress": "bg-amber-500 ring-amber-200",
    Next: "bg-zinc-400 ring-zinc-200",
  } as const;
  return <span className={`h-2.5 w-2.5 rounded-full ring-4 ${map[status]}`} />;
}

export default function RoadmapPage() {
  return (
    <div className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="kicker">Roadmap</div>
              <h1 className="display mt-3 text-[30px] tracking-tight text-zinc-900 md:text-[42px]">Concept → Sustainable Service</h1>
              <p className="mt-3 max-w-[70ch] text-sm leading-6 text-zinc-600 md:text-[15px]">
                RACN from concept to WAN — each validation stage maps to a research publication. Hybrid P2P: prompt → coordinator picks best GPU → peer <span className="font-mono text-xs">generate()</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/products/racn" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">How RACN works →</Link>
              <Link href="/research" className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50">Research index</Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {flow.map((s, i) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide ${i <= 3 ? "border-zinc-900 bg-zinc-900 text-white" : i <= 6 ? "border-amber-200 bg-amber-50 text-zinc-800" : "border-zinc-200 bg-zinc-50 text-zinc-600"}`}>{s}</span>
                {i < flow.length - 1 && <span className="text-zinc-300">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 md:max-w-[620px]">
            {[
              { v: "3", l: "Phases", sub: "2022 — 2026" },
              { v: "7", l: "Publications", sub: "Papers 1–7" },
              { v: "P2P", l: "Hybrid mesh", sub: "coordinator + peers" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                <div className="text-lg font-semibold tracking-tight text-zinc-900">{s.v}</div>
                <div className="text-xs font-medium tracking-wide text-zinc-600">{s.l}</div>
                <div className="text-xs text-zinc-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="oai-container py-8 md:py-10">
        <div className="relative">
          <div className="absolute left-[22px] top-2 hidden h-[calc(100%-16px)] w-px bg-gradient-to-b from-zinc-900 via-zinc-300 to-zinc-200 md:block" />

          <div className="grid gap-8 md:gap-10">
            {phases.map((phase) => (
              <div key={phase.year} className="relative grid gap-4 md:grid-cols-[56px_1fr]">
                <div className="hidden md:block">
                  <div className="sticky top-[88px]">
                    <div className="relative grid place-items-center">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-zinc-900 text-[13px] font-bold tracking-wide text-white shadow-sm ring-4 ring-white">{phase.year}</div>
                      <div className="absolute -bottom-1 grid h-5 w-5 place-items-center rounded-full border border-zinc-200 bg-white shadow-sm">
                        <StatusDot status={phase.status} />
                      </div>
                    </div>
                    <div className="mt-3 text-center text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">{phase.status}</div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-zinc-200 bg-white card-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-50/70 px-5 py-3 md:px-6">
                    <div className="flex items-center gap-3">
                      <span className="md:hidden grid h-8 w-8 place-items-center rounded-lg bg-zinc-900 text-xs font-bold text-white">{phase.year}</span>
                      <span className="text-xs font-bold tracking-[0.14em] text-zinc-900 uppercase">{phase.label}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${phase.status === "Completed" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : phase.status === "In progress" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-zinc-200 bg-white text-zinc-600"}`}>
                        <StatusDot status={phase.status} /> {phase.status}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">{phase.papers.length} {phase.papers.length === 1 ? "publication" : "publications"}</span>
                  </div>

                  <div className="grid gap-4 p-4 md:grid-cols-[320px_1fr] md:p-5">
                    <div className="rounded-2xl border border-zinc-200 bg-[#F8FAFC] p-4 md:p-5">
                      <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Development / Validation</div>
                      <ul className="mt-3 grid gap-2">
                        {phase.items.map((it) => (
                          <li key={it} className="flex gap-2.5 text-sm leading-6 text-zinc-800">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" /> {it}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-xs leading-5 text-zinc-600">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-zinc-900 text-white">
                          <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6L5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span>{phase.milestone}</span>
                      </div>
                    </div>

                    <div className={`grid gap-3 content-start ${phase.papers.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
                      {phase.papers.map((p) => (
                        <div key={p.k} className="group relative overflow-hidden rounded-2xl border border-[#DDE8DD] bg-[#F0F6EF] p-4 transition hover:border-[#C5DCC4] hover:bg-[#EAF2E9] md:p-5">
                          <div className="absolute right-3 top-3 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wide text-zinc-500 ring-1 ring-zinc-200">#{p.id}</div>
                          <div className="pr-8 text-xs font-bold leading-4 tracking-wide text-zinc-900">{p.k}</div>
                          <div className="mt-3 text-sm leading-6 text-zinc-700">{p.desc}</div>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-500 group-hover:text-zinc-700">
                            Forthcoming preprint <span aria-hidden>↗</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 md:px-6">
          <p className="text-sm leading-6 text-zinc-600">Papers 1–7 map directly to the validation stages above. See <Link href="/research" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">Research index</Link> for forthcoming preprints.</p>
          <div className="flex gap-2">
            <Link href="/products/racn" className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-zinc-200 hover:bg-zinc-50">How RACN works</Link>
            <Link href="/open-research" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Open Research</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
