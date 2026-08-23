"use client";

import Image from "next/image";
import { motion } from "framer-motion";
/**
 *
 * @param {Object} props
 */

export default function ArticleCard({ article }) {
  const { title, description, image, category, date, readingTime } = article;
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-emerald-500/25 min-h-[380px] sm:min-h-[400px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* گرادیان تیره‌ی سبز از پایین */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0E8F4F] via-[#052e1c]/70 to-transparent"
      />

      {/* بج دسته‌بندی — بالای کارت */}
      <span className="absolute top-4  right-4 z-10 rounded-fullbg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
        {category}
      </span>

      {/* محتوای پایین کارت */}
      <div className="relative z-10 flex flex-col gap-3 p-5">
        <h3 className="text-lg font-bold leading-snug text-white line-clamp-2">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-white/80 line-clamp-2">
          {description}
        </p>

        {/* متادیتا: تاریخ + زمان مطالعه */}
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="flex items-center gap-1">
            <CalendarIcon />
            {date}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1">
            <ClockIcon />
            {readingTime} دقیقه مطالعه
          </span>
        </div>

        {/* دکمه — فعلاً غیرفعال/بدون ناوبری */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-1 text-white hover:transion inline-flex w-fit items-center gap-1.5 rounded-fullbg-emerald-500/90 px-4 py-2 text-sm font-semibold text-whitetransition-colors duration-300group-hover:bg-emerald-500 cursor-default"
        >
          مشاهده مقاله
          <ArrowIcon />
        </button>
      </div>
    </motion.article>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <rect
        x="3"
        y="4.5"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 9.5h18M8 3v3M16 3v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <path
        d="M14 6 8 12l6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
