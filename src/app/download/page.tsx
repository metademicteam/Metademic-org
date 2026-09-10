import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download RACoN Node — Run AI on your machine, use it everywhere on the web",
  description:
    "Download the RACoN User Package. Install once, contribute compute, earn credits, and use RACoN everywhere on the web — no port forwarding required.",
};

const DOWNLOAD_URL =
  "https://pskhrwhaojvprozpcgff.supabase.co/storage/v1/object/public/racn/RACoN-User-Package.zip";

export default function DownloadPage() {
  return (
    <div className="bg-[#FFFDEC]">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">Hybrid · P2P · Install once, use everywhere</div>
          <h1 className="display mt-4 max-w-[18ch] text-[30px] text-[var(--foreground)] md:text-[44px]">
            Download RACoN Node.
            <span className="block text-[var(--muted)]">Use it everywhere on the web.</span>
          </h1>
          <p className="mt-4 max-w-[66ch] text-[15px] leading-6 text-[var(--muted)] md:text-base">
            RACoN is a <strong className="font-semibold text-[var(--foreground)]">Reciprocal Agentic Compute Network</strong> — a
            hybrid P2P mesh. Chat stays on the web at{" "}
            <Link href="/chat" className="font-semibold text-[var(--foreground)] underline decoration-[var(--hairline)] underline-offset-4 hover:decoration-[var(--accent)]">
              metademic.org/chat
            </Link>{" "}
            — compute is routed <span className="font-mono text-xs">prompt → coordinator picks best GPU → peer generate()</span>.
            Install the node once to contribute your hardware, earn credits, and run private tasks locally.
          </p>

          <div className="mt-7 rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="text-xs font-bold tracking-widest text-[var(--muted)] uppercase">RACoN User Package</div>
                <div className="mt-1 text-[18px] font-bold tracking-[-0.025em] text-[var(--foreground)]">RACoN-User-Package.zip</div>
                <div className="mt-1 text-sm leading-5 text-[var(--muted)]">
                  Windows, macOS & Linux — includes peer node, one-click launcher, and setup scripts. No Docker or admin required.
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="border border-[var(--hairline)] bg-[var(--panel)] px-2.5 py-1 font-semibold">v1.1</span>
                  <span className="border border-[var(--hairline)] bg-[var(--panel)] px-2.5 py-1">Outbound WSS only · NAT-friendly</span>
                  <span className="border border-[var(--hairline)] bg-[var(--panel)] px-2.5 py-1">Auto-reconnect · Sandboxed</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-7 py-3.5 text-sm font-bold text-[#FFFDEC] shadow-sm hover:bg-[var(--accent-2)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <path d="M8 3.5V11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 13.5H13.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Download package
                </a>
                <span className="text-center text-xs text-[var(--muted)]">Direct download · Supabase Storage</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/chat" className="border border-[var(--hairline)] bg-[var(--panel)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)]">
              Open web chat — no install
            </Link>
            <Link href="/products/racn" className="border border-[var(--hairline)] bg-[var(--panel)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)]">
              How RACoN works
            </Link>
          </div>
        </div>
      </div>

      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-md border border-[var(--hairline)] p-6">
            <div className="grid h-9 w-9 place-items-center bg-[var(--accent)] text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <path d="M8 3.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-[var(--foreground)]">1 · Download</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Click Download above to get the zip. Keep it — updates are delivered in-app.</p>
          </div>
          <div className="rounded-md border border-[var(--hairline)] p-6">
            <div className="grid h-9 w-9 place-items-center bg-[var(--accent)] text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 6.5H11M5 9H11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-[var(--foreground)]">2 · Extract</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Unzip anywhere. You&apos;ll see <span className="font-mono text-xs">RACoN-Start.bat</span> (Windows) and{" "}
              <span className="font-mono text-xs">install.sh</span> (macOS/Linux).
            </p>
          </div>
          <div className="rounded-md border border-[var(--hairline)] p-6">
            <div className="grid h-9 w-9 place-items-center bg-[var(--accent)] text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
                <path d="M5 8H11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M8 5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold tracking-tight text-[var(--foreground)]">3 · Run</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Double-click <span className="font-mono text-xs">RACoN-Start.bat</span> or run{" "}
              <span className="font-mono text-xs">bash install.sh</span>. The launcher opens the local UI and fetches the model once (~2.3 GB).
            </p>
          </div>
        </div>

        <div className="mt-6 border border-[var(--hairline)] bg-[var(--panel-2)] px-4 py-3 text-xs leading-5 text-[var(--muted)] md:px-5">
          First run downloads the model to your device and stays cached. No port forwarding — the peer keeps a single outbound connection.
        </div>
      </div>

      <div className="oai-container pt-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-md bg-[#10201D] p-6 text-white md:p-7">
            <h3 className="text-[15px] font-semibold tracking-tight">How hybrid works — two audiences</h3>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-[#DCE8E4]">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center bg-white text-xs font-bold text-[#10201D]">1</span>
                <span>
                  <span className="font-semibold text-white">Web-only (consume) — no install:</span> anyone → metademic.org/chat → sign in (500
                  credits on signup) → prompt → coordinator scores peers → best GPU runs{" "}
                  <span className="font-mono text-xs">generate()</span> → answer streams back.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center bg-white text-xs font-bold text-[#10201D]">2</span>
                <span>
                  <span className="font-semibold text-white">Peer (provide) — share hardware:</span> your device keeps one outbound connection →
                  receives encrypted jobs → runs model locally → returns result → earns{" "}
                  <span className="font-mono text-xs">10×(1+0.1·trust)</span> credits.
                </span>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/chat" className="bg-white px-4 py-2 text-xs font-semibold text-[#10201D] hover:bg-[#F7F3DD]">
                Try web chat
              </Link>
              <a
                href={DOWNLOAD_URL}
                download
                className="border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                Download again
              </a>
            </div>
          </div>

          <div className="rounded-md border border-[var(--hairline)] p-6 md:p-7">
            <h3 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">What you need</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>Any modern PC — 16 GB GPU is great, CPU-only works too. Apple Silicon, NVIDIA, or CPU tiers all supported.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>Python 3.12+ recommended for native peer features. The one-click launcher handles it for you.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>No inbound ports — NAT-friendly outbound connection only. Works behind home Wi-Fi.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>Web chat works instantly in the browser — install only if you want to contribute compute.</span>
              </li>
            </ul>
            <Link href="/roadmap" className="mt-5 inline-flex text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--hairline)] underline-offset-4 hover:decoration-[var(--accent)]">
              View roadmap & research →
            </Link>
          </div>
        </div>
      </div>

      <div className="oai-container py-10">
        <div className="rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] p-6 md:p-8">
          <h3 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">Privacy tiers — you choose per prompt</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              ["Public", "Any node, fastest."],
              ["Protected", "Trust ≥0.7 nodes only."],
              ["Confidential", "Trust ≥0.9 + sealed encryption."],
              ["Local-only", "Never leaves your machine."],
            ].map(([k, v]) => (
              <div key={k} className="border border-[var(--hairline)] bg-[var(--panel)] p-4">
                <div className="font-mono text-xs font-bold tracking-widest text-[var(--muted)] uppercase">{k}</div>
                <div className="mt-1 text-sm leading-5 text-[var(--muted)]">{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
            Questions? Start at <Link href="/chat" className="font-semibold text-[var(--foreground)] underline">metademic.org/chat</Link> — no install needed to chat.
          </p>
        </div>
      </div>
    </div>
  );
}
