import Link from "next/link";
import { ArtCard } from "@/components/ArtCard";

export const metadata = { title: "Members" };

export default function MembersPage() {
  return (
    <div className="bg-[#FFFDEC]">
      <div className="oai-container pt-6 md:pt-8">
        <div className="border-y border-[var(--hairline)] py-8 md:py-10">
          <div className="kicker">People</div>
          <h1 className="display mt-3 max-w-[14ch] text-[30px] text-[var(--foreground)] md:text-[42px]">Members</h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] md:text-[15px]">
            A lab directory designed around role, affiliation, research identity, and direct contact. Our team bridges the gap between complex technical implementation and executive-level business objectives.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div className="oai-container pt-8 md:pt-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Shariful Haque */}
          <div className="overflow-hidden border border-[var(--hairline)] bg-[var(--panel)]">
            <div className="aspect-[1.45/1] bg-[linear-gradient(135deg,rgba(15,118,110,0.10),transparent_60%),repeating-linear-gradient(90deg,#E9E4CB_0_1px,transparent_1px_28px),repeating-linear-gradient(#E9E4CB_0_1px,transparent_1px_28px),#F8F5E3] grid place-items-center text-[#617A73]">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="h-20 w-20 opacity-75">
                <circle cx="50" cy="34" r="18" />
                <path d="M17 88c4-23 18-35 33-35s29 12 33 35" />
              </svg>
            </div>
            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Founder & CEO</div>
              <h3 className="mt-2 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Shariful Haque</h3>
              <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Affiliation: Metademic Lab<br />
                Focus: AI, Data Analytics, Strategic Business Operations, Ethical AI Governance
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://www.sharifulhaque.org/" target="_blank" rel="noreferrer" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">WEBSITE</a>
                <a href="mailto:contact@sharifulhaque.org" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">EMAIL</a>
              </div>
            </div>
          </div>

          {/* Md. Mahafuj Anam Murad */}
          <div className="overflow-hidden border border-[var(--hairline)] bg-[var(--panel)]">
            <div className="aspect-[1.45/1] bg-[linear-gradient(135deg,rgba(15,118,110,0.10),transparent_60%),repeating-linear-gradient(90deg,#E9E4CB_0_1px,transparent_1px_28px),repeating-linear-gradient(#E9E4CB_0_1px,transparent_1px_28px),#F8F5E3] grid place-items-center text-[#617A73]">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="h-20 w-20 opacity-75">
                <circle cx="50" cy="34" r="18" />
                <path d="M17 88c4-23 18-35 33-35s29 12 33 35" />
              </svg>
            </div>
            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Research Member</div>
              <h3 className="mt-2 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Md. Mahafuj Anam Murad</h3>
              <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Affiliation: Metademic Lab<br />
                Focus: Supply Chain Management, MCDM, Industrial Engineering, Ergonomics
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://www.researchgate.net/profile/Md-Mahafuj-Murad-2" target="_blank" rel="noreferrer" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">RESEARCHGATE</a>
              </div>
            </div>
          </div>

          {/* Md. Toriqul Haque */}
          <div className="overflow-hidden border border-[var(--hairline)] bg-[var(--panel)]">
            <div className="aspect-[1.45/1] bg-[linear-gradient(135deg,rgba(15,118,110,0.10),transparent_60%),repeating-linear-gradient(90deg,#E9E4CB_0_1px,transparent_1px_28px),repeating-linear-gradient(#E9E4CB_0_1px,transparent_1px_28px),#F8F5E3] grid place-items-center text-[#617A73]">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="h-20 w-20 opacity-75">
                <circle cx="50" cy="34" r="18" />
                <path d="M17 88c4-23 18-35 33-35s29 12 33 35" />
              </svg>
            </div>
            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Research Member</div>
              <h3 className="mt-2 text-lg font-bold tracking-[-0.025em] text-[var(--foreground)]">Md. Toriqul Haque</h3>
              <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Affiliation: Metademic Lab<br />
                Focus: Full Stack Development, Web Technologies, AI Applications
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="https://github.com/GodfatherTHR" target="_blank" rel="noreferrer" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">GITHUB</a>
                <a href="https://www.linkedin.com/in/md-toriqul-haque-931b39245/" target="_blank" rel="noreferrer" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">LINKEDIN</a>
                <a href="https://huggingface.co/toriqulhaque" target="_blank" rel="noreferrer" className="border border-[var(--hairline)] px-2 py-1 text-[10px] font-bold text-[#4F605A]">HUGGINGFACE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join band */}
      <div className="oai-container py-10 md:py-12">
        <div className="border border-[var(--accent)] bg-[linear-gradient(90deg,var(--accent-soft),transparent)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="kicker">Open collaboration</div>
              <h3 className="mt-2 text-[20px] font-bold tracking-[-0.025em] text-[var(--foreground)] md:text-[24px]">Join Metademic as a volunteer contributor.</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">Engineering • research • benchmarking • documentation • design • open-source maintenance</p>
            </div>
            <button className="inline-flex h-[46px] items-center gap-2 bg-[var(--accent)] px-5 text-xs font-bold tracking-wide text-[#FFFDEC] hover:bg-[var(--accent-2)]">
              JOIN AS VOLUNTEER →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
