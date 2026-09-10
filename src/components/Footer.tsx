"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/chat")) return null;

  return (
    <footer className="mt-10 border-t border-[var(--hairline-soft)] bg-[#FFFDEC]">
      <div className="oai-container py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center border border-[var(--accent)] text-[13px] font-bold tracking-widest text-[var(--accent)]" style={{boxShadow: 'inset 0 0 16px var(--accent-soft)'}}>M∴</span>
              <div>
                <span className="text-sm font-extrabold tracking-[0.08em] text-[var(--foreground)]">METADEMIC</span>
                <small className="block text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">RESEARCH LAB</small>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
              An academic AI lab and scholarly platform. We publish open research and are building prototypes like RACoN.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold tracking-[0.16em] text-[var(--muted)] uppercase">Open Research</div>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
              <li><Link href="/open-research" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">Overview</Link></li>
              <li><a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">www.metademic.com</a></li>
              <li><Link href="/research" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">Research index</Link></li>
              <li><Link href="/news" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">News</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold tracking-[0.16em] text-[var(--muted)] uppercase">Products</div>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
              <li><Link href="/products/racn" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">RACoN — Distributed LLM</Link></li>
              <li><a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">Scholarly platform</a></li>
            </ul>
            <div className="mt-6 text-xs font-bold tracking-[0.16em] text-[var(--muted)] uppercase">Company</div>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
              <li><Link href="/members" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">Members</Link></li>
              <li><Link href="/about" className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">About</Link></li>
            </ul>
          </div>

          <div>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
              <li>© {new Date().getFullYear()} Metademic Lab</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline-soft)] pt-6 text-xs font-bold text-[var(--muted)]">
          <span>Independent research lab · MVP prototype</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            metademic.com is live
          </span>
        </div>
      </div>
    </footer>
  );
}
