"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className={["transition-transform duration-200", open ? "rotate-180" : "rotate-0"].join(" ")}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span className={["absolute left-0 h-[1.5px] w-5 bg-black transition-all", open ? "top-[7px] rotate-45" : "top-0"].join(" ")} />
      <span className={["absolute left-0 top-[7px] h-[1.5px] w-5 bg-black transition-opacity", open ? "opacity-0" : "opacity-100"].join(" ")} />
      <span className={["absolute left-0 h-[1.5px] w-5 bg-black transition-all", open ? "top-[7px] -rotate-45" : "top-[14px]"].join(" ")} />
    </span>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<null | "research" | "products">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header ref={navRef} className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="oai-container flex h-[52px] items-center justify-between gap-6 md:h-[56px]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-[11px] font-semibold tracking-widest text-white">M</span>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-zinc-900">Metademic</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <div className="relative">
            <button
              onClick={() => setOpenMenu((v) => (v === "research" ? null : "research"))}
              aria-expanded={openMenu === "research"}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Open Research <Chevron open={openMenu === "research"} />
            </button>
            {openMenu === "research" && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-[560px] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
                  <div className="grid grid-cols-[1.15fr_0.85fr] gap-2">
                    <div className="rounded-xl bg-zinc-50 p-4">
                      <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Scholarly platform</div>
                      <Link
                        href="https://www.metademic.com"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-zinc-200 hover:ring-zinc-300"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div>
                          <div className="text-sm font-semibold tracking-tight text-zinc-900">www.metademic.com</div>
                          <div className="mt-1 text-sm leading-5 text-zinc-600">Journals, publications, researcher profiles — the live scholarly information system.</div>
                          <div className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-zinc-900">
                            Visit metademic.com
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M5 3.5 9 7l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                        <span className="mt-1 shrink-0 rounded-full bg-black px-2.5 py-1 text-xs font-medium text-white">Live</span>
                      </Link>
                      <div className="mt-3 grid gap-1 text-sm">
                        <a href="https://www.metademic.com" target="_blank" rel="noreferrer" onClick={() => setOpenMenu(null)} className="rounded-lg px-2 py-2 hover:bg-white block">
                          <div className="font-medium text-zinc-900">Open Research overview</div>
                          <div className="text-zinc-600">Principles, journals, and what “open” means here.</div>
                        </a>
                        <a href="https://www.metademic.com" target="_blank" rel="noreferrer" onClick={() => setOpenMenu(null)} className="rounded-lg px-2 py-2 hover:bg-white block">
                          <div className="font-medium text-zinc-900">Research index</div>
                          <div className="text-zinc-600">Papers, notes, and benchmarks from the lab.</div>
                        </a>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Highlights</div>
                      <div className="mt-3 grid gap-2 text-sm">
                        <a href="https://www.metademic.com" target="_blank" rel="noreferrer" onClick={() => setOpenMenu(null)} className="rounded-xl border border-zinc-200 p-3 hover:bg-zinc-50 block">
                          <div className="font-medium text-zinc-900">Open Research report 2026</div>
                          <div className="mt-1 text-zinc-600">What we published and opened this year.</div>
                        </a>
                        <a href="https://www.metademic.com" target="_blank" rel="noreferrer" onClick={() => setOpenMenu(null)} className="rounded-xl border border-zinc-200 p-3 hover:bg-zinc-50 block">
                          <div className="font-medium text-zinc-900">Journals on metademic.com</div>
                          <div className="mt-1 text-zinc-600">Browse titles and editorial scope.</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setOpenMenu((v) => (v === "products" ? null : "products"))}
              aria-expanded={openMenu === "products"}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Products <Chevron open={openMenu === "products"} />
            </button>
            {openMenu === "products" && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-[520px] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
                  <Link href="/products/racn" onClick={() => setOpenMenu(null)} className="flex gap-4 rounded-xl p-3 hover:bg-zinc-50">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white text-sm font-semibold">R</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight text-zinc-900">RACN</span>
                        <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white">Preview</span>
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-zinc-600">Distributed LLM system for scientific work. Long context, verifiable, built for the scholarly record.</span>
                    </span>
                  </Link>
                  <div className="mt-1 grid grid-cols-2 gap-2 px-1 pb-1">
                    <Link href="/products/racn#how-it-works" onClick={() => setOpenMenu(null)} className="rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50">
                      <div className="font-medium text-zinc-900">How it works</div>
                      <div className="mt-1 text-zinc-600">Architecture teaser — no benchmarks invented.</div>
                    </Link>
                    <Link href="/products/racn#access" onClick={() => setOpenMenu(null)} className="rounded-xl border border-zinc-200 p-3 text-sm hover:bg-zinc-50">
                      <div className="font-medium text-zinc-900">Request access</div>
                      <div className="mt-1 text-zinc-600">Limited preview for research partners.</div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/chat" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">Chat</Link>
          <Link href="/task-manager" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">Task Manager</Link>
          <Link href="/contributions" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">Contributions</Link>
          <Link href="/news" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">News</Link>
          <Link href="/roadmap" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">Roadmap</Link>
          <Link href="/about" className="rounded-full px-3 py-1.5 text-[13.5px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">About</Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/chat" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Chat</Link>
          <Link href="/download" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">Download</Link>
        </div>

        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 md:hidden"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <div className="oai-container py-4">
            <div className="grid gap-6">
              <div>
                <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Open Research</div>
                <div className="mt-3 grid gap-2">
                  <a href="https://www.metademic.com" target="_blank" rel="noreferrer" className="rounded-2xl border border-zinc-200 p-4">
                    <div className="text-sm font-semibold text-zinc-900">www.metademic.com — Live scholarly platform</div>
                    <div className="mt-1 text-sm text-zinc-600">Journals, publications, researcher profiles.</div>
                  </a>
                  <Link href="/open-research" onClick={() => setMobileOpen(false)} className="rounded-xl bg-zinc-50 px-3 py-3 text-sm font-medium text-zinc-900">Open Research overview</Link>
                  <Link href="/research" onClick={() => setMobileOpen(false)} className="rounded-xl bg-zinc-50 px-3 py-3 text-sm font-medium text-zinc-900">Research index</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Products</div>
                <Link href="/products/racn" onClick={() => setMobileOpen(false)} className="mt-3 flex gap-3 rounded-2xl border border-zinc-200 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-sm font-semibold text-white">R</span>
                  <span>
                    <span className="text-sm font-semibold text-zinc-900">RACN — Distributed LLM for science</span>
                    <span className="mt-1 block text-sm text-zinc-600">Preview. Request access for research partners.</span>
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/chat" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">Chat</Link>
                <Link href="/task-manager" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">Task Manager</Link>
                <Link href="/contributions" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">Contributions</Link>
                <Link href="/news" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">News</Link>
                <Link href="/roadmap" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">Roadmap</Link>
                <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium">About</Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/products/racn" onClick={() => setMobileOpen(false)} className="rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white">Chat</Link>
                <Link href="/download" onClick={() => setMobileOpen(false)} className="rounded-full border border-zinc-200 px-4 py-3 text-center text-sm font-medium">Download</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
