import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download RACN Node — Run AI on your machine, use it everywhere on the web",
  description:
    "Download the RACN User Package. Install once, contribute compute, earn credits, and use RACN everywhere on the web — no port forwarding required.",
};

const DOWNLOAD_URL =
  "https://pskhrwhaojvprozpcgff.supabase.co/storage/v1/object/public/racn/RACN-User-Package.zip";

export default function DownloadPage() {
  return (
    <div className="bg-white">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium tracking-wide text-white">
            Hybrid · P2P · Install once, use everywhere
          </div>
          <h1 className="display mt-4 max-w-[18ch] text-[30px] text-zinc-900 md:text-[44px]">
            Download RACN Node.
            <span className="block text-zinc-500">Use it everywhere on the web.</span>
          </h1>
          <p className="mt-4 max-w-[66ch] text-[15px] leading-6 text-zinc-600 md:text-base">
            RACN is a <strong className="font-semibold text-zinc-900">Reciprocal Agentic Compute Network</strong> — a
            hybrid P2P mesh. Chat stays on the web at{" "}
            <Link href="/chat" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">
              metademic.org/chat
            </Link>{" "}
            — compute is routed <span className="font-mono text-xs">prompt → coordinator picks best GPU → peer generate()</span>.
            Install the node once to contribute your hardware, earn credits, and run private tasks locally.
          </p>

          <div className="mt-7 rounded-[22px] border border-zinc-200 bg-zinc-50 p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">RACN User Package</div>
                <div className="mt-1 text-[18px] font-semibold tracking-tight text-zinc-900">RACN-User-Package.zip</div>
                <div className="mt-1 text-sm leading-5 text-zinc-600">
                  Windows, macOS & Linux — includes peer node, one-click launcher, and setup scripts. No Docker or admin required.
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 font-medium">v1.1</span>
                  <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1">Outbound WSS only · NAT-friendly</span>
                  <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1">Auto-reconnect · Sandboxed</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <path d="M8 3.5V11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 13.5H13.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Download package
                </a>
                <span className="text-center text-xs text-zinc-500">Direct download · Supabase Storage</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/chat" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">
              Open web chat — no install
            </Link>
            <Link href="/products/racn" className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50">
              How RACN works
            </Link>
          </div>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[22px] border border-zinc-200 p-6">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <path d="M8 3.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-zinc-900">1 · Download</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Click Download above to get the zip. Keep it — updates are delivered in-app.</p>
          </div>
          <div className="rounded-[22px] border border-zinc-200 p-6">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 6.5H11M5 9H11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-zinc-900">2 · Extract</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Unzip anywhere. You&apos;ll see <span className="font-mono text-xs">RACN-Start.bat</span> (Windows) and{" "}
              <span className="font-mono text-xs">install.sh</span> (macOS/Linux).
            </p>
          </div>
          <div className="rounded-[22px] border border-zinc-200 p-6">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <path d="M5 8H11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M8 5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-zinc-900">3 · Run</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Double-click <span className="font-mono text-xs">RACN-Start.bat</span> or run{" "}
              <span className="font-mono text-xs">bash install.sh</span>. The launcher opens the local UI and fetches the model once (~2.3 GB).
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs leading-5 text-zinc-600 md:px-5">
          First run downloads the model to your device and stays cached. No port forwarding — the peer keeps a single outbound connection.
        </div>
      </div>

      <div className="oai-container pt-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] bg-zinc-900 p-6 text-white md:p-7">
            <h3 className="text-[15px] font-semibold tracking-tight">How hybrid works — two audiences</h3>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-zinc-900">1</span>
                <span>
                  <span className="font-medium text-white">Web-only (consume) — no install:</span> anyone → metademic.org/chat → sign in (500
                  credits on signup) → prompt → coordinator scores peers → best GPU runs{" "}
                  <span className="font-mono text-xs">generate()</span> → answer streams back.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-zinc-900">2</span>
                <span>
                  <span className="font-medium text-white">Peer (provide) — share hardware:</span> your device keeps one outbound connection →
                  receives encrypted jobs → runs model locally → returns result → earns{" "}
                  <span className="font-mono text-xs">10×(1+0.1·trust)</span> credits.
                </span>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/chat" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-100">
                Try web chat
              </Link>
              <a
                href={DOWNLOAD_URL}
                download
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
              >
                Download again
              </a>
            </div>
          </div>

          <div className="rounded-[22px] border border-zinc-200 p-6 md:p-7">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900">What you need</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-600">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                <span>Any modern PC — 16 GB GPU is great, CPU-only works too. Apple Silicon, NVIDIA, or CPU tiers all supported.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                <span>Python 3.12+ recommended for native peer features. The one-click launcher handles it for you.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                <span>No inbound ports — NAT-friendly outbound connection only. Works behind home Wi-Fi.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                <span>Web chat works instantly in the browser — install only if you want to contribute compute.</span>
              </li>
            </ul>
            <Link href="/roadmap" className="mt-5 inline-flex text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">
              View roadmap & research →
            </Link>
          </div>
        </div>
      </div>

      <div className="oai-container py-10">
        <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900">Privacy tiers — you choose per prompt</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              ["Public", "Any node, fastest."],
              ["Protected", "Trust ≥0.7 nodes only."],
              ["Confidential", "Trust ≥0.9 + sealed encryption."],
              ["Local-only", "Never leaves your machine."],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase">{k}</div>
                <div className="mt-1 text-sm leading-5 text-zinc-600">{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            Questions? Start at <Link href="/chat" className="font-medium text-zinc-700 underline">metademic.org/chat</Link> — no install needed to chat.
          </p>
        </div>
      </div>
    </div>
  );
}
