import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-white">
      <div className="oai-container py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-[11px] font-semibold tracking-widest text-white">M</span>
              <span className="text-sm font-semibold tracking-tight">Metademic</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">
              An academic AI lab and scholarly platform. We publish open research and are building RACN, a distributed LLM system for science.
            </p>
            <p className="mt-3 text-xs leading-5 text-zinc-500">
              Site is the organization homepage at <span className="font-medium text-zinc-700">metademic.org</span>. The scholarly information system lives at{" "}
              <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
                www.metademic.com
              </a>
              .
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Open Research</div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
              <li><Link href="/open-research" className="hover:text-zinc-900">Overview</Link></li>
              <li><a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900">www.metademic.com</a></li>
              <li><Link href="/research" className="hover:text-zinc-900">Research index</Link></li>
              <li><Link href="/news" className="hover:text-zinc-900">News</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Products</div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
              <li><Link href="/products/racn" className="hover:text-zinc-900">RACN — Distributed LLM</Link></li>
              <li><Link href="/chat" className="hover:text-zinc-900">Chat</Link></li>
              <li><Link href="/download" className="hover:text-zinc-900">Download node</Link></li>
              <li><a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900">Scholarly platform</a></li>
            </ul>
            <div className="mt-6 text-xs font-semibold tracking-widest text-zinc-500 uppercase">Company</div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
              <li><Link href="/about" className="hover:text-zinc-900">About</Link></li>
            </ul>
          </div>

          <div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
              <li>© {new Date().getFullYear()} Metademic</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline)] pt-6 text-xs text-zinc-500">
          <span>Built for the scholarly record.</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            metademic.com is live
          </span>
        </div>
      </div>
    </footer>
  );
}
