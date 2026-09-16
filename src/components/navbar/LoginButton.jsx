"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="group relative inline-flex h-9 min-w-[30px] items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#69789b] to-[#514d6c] px-6 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(60,58,90,0.25)] active:scale-[0.98] "
    >
      {/* نور ظریف روی دکمه */}
      <span
        className=" absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none
        "
      />

      {/* نقطه */}
      <span
        className="relative h-[11px] w-[11px] rounded-full bg-[#d9e8ff] shadow-[0_0_10px_rgba(217,232,255,0.35)] "
      />

      {/* متن */}
      <span className="relative text-[18px] font-semibold tracking-tight">
        Log in
      </span>

      {/* آیکن */}
      <LogIn
        size={27}
        strokeWidth={2.2}
        className=" relative text-[#bcd8ff] transition-transform duration-300 group-hover:translate-x-1 "
      />
    </Link>
  );
}