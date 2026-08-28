"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import React, { useCallback } from "react";
// import CountUp from "react-countup";
// import { AlertCircle, Check } from "lucide-react";
// import {
//   useNewsletterStore,
//   validateEmail,
// } from "../../store/useNewsletterStore";
import NewsletterCard from "../../components/newsletterForm/NewsletterCard";

export default function ArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | success
  function formatPersianDate(isoDate) {
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(isoDate));
    } catch {
      return "";
    }
  }
  useEffect(() => {
    let isMounted = true;

    async function fetchArticles() {
      try {
        const res = await fetch("/api/v1/article");
        const json = await res.json();

        if (!isMounted) return;

        if (!json.success) throw new Error(json.message);
        const Data = json.data;
        setArticles(Data);

        setStatus("success");
      } catch (error) {
        console.error("خطا در دریافت مقاله‌ها:", error);
        if (isMounted) setStatus("error");
      }
    }

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section dir="rtl" className="bg-[#F7FAF8] py-14 md:py-20">
      <div className="max-w-7xl mx-auto rounded-y-2  px-4 md:px-6">
        {/* هدر سکشن — بنر شیشه‌ای */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl h-48 md:h-64 mb-10 md:mb-12"
        >
          {/* عکس پس‌زمینه */}
          <Image
            src="/wrench.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* گرادیان تیره برای خوانایی */}
          <div
            aria-hidden="true"
            className="absolute rounded-2xl bg-white/10 backdrop-blur-md border border-gray-600  md:px-12 text-center shadow-lg inset-0 bg-gradient-to-l from-black/85 via-black/30 to-transparent"
          />

          {/* دکمه‌ی بازگشت — سمت راست */}
          <Link
            href="/"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2 md:px-6 md:py-3 text-sm font-semibold text-white transition"
          >
            <ArrowIcon />
          </Link>

          {/* پنل شیشه‌ای — متن وسط */}
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold font-Vazir text-white">
                مقالات
              </h2>
              <p className="mt-2 text-white/80 text-sm sm:text-base">
                راهنمای خرید، بررسی تخصصی و آموزش استفاده از ابزارآلات صنعتی و
                حرفه‌ای
              </p>
            </div>
          </div>
        </motion.div>

        {/* حالت لودینگ */}
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[380px] sm:min-h-[400px] rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* حالت خطا */}
        {status === "error" && (
          <p className="text-center text-gray-400 py-10">
            مقاله‌ای برای نمایش پیدا نشد. کمی بعد دوباره تلاش کن.
          </p>
        )}

        {/* حالت موفق */}
        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article._id || article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <ArticleCard
                  article={{
                    ...article,
                    date: formatPersianDate(article.createdAt),
                  }}
                />
              </motion.div>
            ))}
            <div className="col-span-full mt-10 autofill:*: hover:cursor-pointers flex items-center justify-center md:mt-12 md:mb-0">
              <NewsletterCard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 *
 * @param {Object} props
 */

function ArticleCard({ article }) {
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
export function NewsLetterCardSection() {
  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto rounded-y-2  px-4 md:px-6 w-full h-full justify-center items-center">
          <div>
            <NewsletterCard />
          </div>
        </div>
      </div>
    </>
  );
}
