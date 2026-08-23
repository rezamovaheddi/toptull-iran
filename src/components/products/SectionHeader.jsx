"use client";

import Link from "next/link";

export default function SectionHeader({
  title,
  href = "/products",
  linkLabel = "همه محصولات",
}) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#17B45B] leading-tight">
        {title}
      </h2>

      <Link
        href={href}
        className="group flex items-center gap-1.5 shrink-0 text-sm sm:text-base font-mediumtext-[#17B45B] transition-colors duration-200 hover:text-[#15964B]"
      >
        <span>{linkLabel}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
        >
          <path
            d="M14 6 8 12l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
