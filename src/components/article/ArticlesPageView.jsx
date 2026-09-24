"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NewsletterCard from "@/components/newsletterForm/NewsletterCard";
import ArticleCard from "./ArticleCard";
import { formatPersianDate } from "@/lib/articles";

export default function ArticlesPageView({ articles = [] }) {
  return (
    <section dir="rtl" className="bg-[#F7FAF8] py-14 md:py-20">
      <div className="max-w-7xl mx-auto rounded-y-2 px-4 md:px-6">
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
            alt="ابزارآلات تاپ‌تول"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* گرادیان تیره برای خوانایی */}
          <div
            aria-hidden="true"
            className="absolute rounded-2xl bg-white/10 backdrop-blur-md border border-gray-600 md:px-12 text-center shadow-lg inset-0 bg-gradient-to-l from-black/85 via-black/30 to-transparent"
          />

          {/* دکمه‌ی بازگشت — سمت راست */}
          <Link
            href="/"
            aria-label="بازگشت به صفحه اصلی"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2 md:px-6 md:py-3 text-sm font-semibold text-white transition shadow-md"
          >
            <ArrowIcon />
          </Link>

          {/* پنل شیشه‌ای — متن وسط */}
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold font-Vazir text-white">
                مقالات تخصصی
              </h1>
              <p className="mt-2 text-white/80 text-sm sm:text-base">
                راهنمای خرید، بررسی تخصصی و آموزش استفاده از ابزارآلات صنعتی و حرفه‌ای
              </p>
            </div>
          </div>
        </motion.div>

        {/* لیست مقالات (SSG) */}
        {articles.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            مقاله‌ای برای نمایش پیدا نشد.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article._id || article.slug || index}
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

            <div className="col-span-full mt-10 flex items-center justify-center md:mt-12 md:mb-0">
              <NewsletterCard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M14 6 8 12l6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
