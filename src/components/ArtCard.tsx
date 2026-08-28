const artClass: Record<number, string> = {
  1: "art-gradient-1",
  2: "art-gradient-2",
  3: "art-gradient-3",
  4: "art-gradient-4",
  5: "art-gradient-5",
  6: "art-gradient-6",
};

function Ornament({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[38%] h-[42%] w-[58%] -translate-x-1/2 rounded-full border border-white/20 blur-[0.5px]" />
        <div className="absolute left-1/2 top-[42%] h-[30%] w-[42%] -translate-x-1/2 rounded-full border border-white/15" />
        <div className="absolute left-1/2 top-[46%] h-[2px] w-[72%] -translate-x-1/2 bg-white/70" />
        <div className="absolute left-1/2 top-[52%] h-[2px] w-[54%] -translate-x-1/2 bg-white/40" />
      </div>
    );
  }
  if (variant === 2) {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-[18%] top-[18%] h-[28%] w-[28%] rounded-full bg-white/90 mix-blend-screen blur-[0.3px]" />
        <div className="absolute right-[14%] bottom-[18%] h-[42%] w-[42%] rounded-full border border-white/25" />
        <div className="absolute left-[36%] top-[36%] h-[34%] w-[34%] rounded-full border border-white/20" />
      </div>
    );
  }
  if (variant === 3) {
    return (
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[55%] w-[1px] -translate-x-1/2 bg-white/40" />
        <div className="absolute bottom-[18%] left-1/2 h-[22%] w-[38%] -translate-x-1/2 rounded-[999px] border border-white/30" />
        <div className="absolute left-[28%] top-[22%] h-[18%] w-[18%] rotate-45 border border-white/20" />
        <div className="absolute right-[22%] top-[30%] h-[10%] w-[10%] rounded-full bg-white/80" />
      </div>
    );
  }
  if (variant === 4) {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[34%] h-[40%] w-[40%] -translate-x-1/2 rounded-[22px] border border-white/25 bg-white/5 backdrop-blur-[1px]" />
        <div className="absolute left-1/2 top-[42%] h-[2px] w-[28%] -translate-x-1/2 bg-white/60" />
        <div className="absolute left-1/2 top-[48%] h-[2px] w-[22%] -translate-x-1/2 bg-white/35" />
      </div>
    );
  }
  if (variant === 5) {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-[20%] top-[30%] h-[42%] w-[60%] rounded-full border border-black/10 bg-white/70 blur-[0.2px]" />
        <div className="absolute left-1/2 top-[40%] h-[2px] w-[40%] -translate-x-1/2 bg-black/50" />
        <div className="absolute left-1/2 top-[46%] h-[2px] w-[32%] -translate-x-1/2 bg-black/30" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-[30%] h-[36%] w-[36%] -translate-x-1/2 rounded-full border border-white/20" />
      <div className="absolute left-1/2 top-[30%] h-[36%] w-[36%] -translate-x-1/2 rounded-full border border-white/10 rotate-45" />
      <div className="absolute left-1/2 top-[46%] h-[1px] w-[62%] -translate-x-1/2 bg-white/50" />
      <div className="absolute left-1/2 top-[50%] h-[1px] w-[48%] -translate-x-1/2 bg-white/25" />
    </div>
  );
}

export function ArtCard({
  variant,
  ratio = "square",
  shimmer = false,
}: {
  variant: number;
  ratio?: "square" | "wide";
  shimmer?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[18px] md:rounded-[22px]",
        artClass[variant] ?? "art-gradient-6",
        ratio === "wide" ? "aspect-[16/9]" : "aspect-square",
        shimmer ? "shimmer" : "",
      ].join(" ")}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
      <div className="absolute inset-0 opacity-60 mix-blend-overlay" style={{ background: "radial-gradient(60% 60% at 50% 15%, rgba(255,255,255,0.35), transparent 60%)" }} />
      <Ornament variant={variant} />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/5" />
    </div>
  );
}

export function InlineArt({ variant }: { variant: number }) {
  return (
    <div className={["relative overflow-hidden rounded-xl", artClass[variant] ?? "art-gradient-6", "aspect-[16/10]"].join(" ")}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
      <Ornament variant={variant} />
    </div>
  );
}
