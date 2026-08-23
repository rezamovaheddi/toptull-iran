"use client";

export default function HeroWatermark() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      <span className="text-[20vw] sm:text-[16vw] lg:text-[13vw] font-black tracking-tight text-emerald-900/[0.03] whitespace-nowrap leading-none">
        TOPTUL
      </span>
    </div>
  );
}
