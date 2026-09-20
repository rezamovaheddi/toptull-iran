"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="group relative inline-flex h-10 md:h-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 text-emerald-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(16,185,129,0.1)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/45 hover:bg-emerald-500/20 hover:text-emerald-900 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_20px_rgba(16,185,129,0.2)] active:scale-[0.98]"
    >
      {/* انعکاس نور شیشه‌ای در لبه بالایی */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/35 via-white/5 to-transparent" />

      {/* انیمیشن درخشش و عبور نور هنگام هاور */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* نقطه وضعیت سبز نئونی/شیشه‌ای */}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
      </span>

      {/* متن دکمه */}
      <span className="relative text-sm md:text-[15px] font-semibold tracking-normal">
        ورود
      </span>

      {/* آیکن ورود */}
      <LogIn
        size={19}
        strokeWidth={2.2}
        className="relative text-emerald-600 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-emerald-700"
      />
    </Link>
  );
}
