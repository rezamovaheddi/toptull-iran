"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

/**
 * فرمت تاریخ میلادی (createdAt از دیتابیس) به شمسی خوانا
 * مثال خروجی: «۱۵ مرداد ۱۴۰۴»
 */
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

export default function ArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | success

  useEffect(() => {
    let isMounted = true;

    async function fetchArticles() {
      try {
        const res = await fetch("/api/v1/article");
        const json = await res.json();

        if (!isMounted) return;

        if (!json.success) throw new Error(json.message);
        const Data = json.data;
        const Sliced = Data.slice(0, 3);
        setArticles(Sliced);

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
      <div className="max-w-7xl mx-auto  px-4 md:px-6">
        {/* هدر سکشن */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center md:text-right mb-10 md:mb-12"
        >
          <div className="flex items-center justify-between w-auto py-10">
            {/* سمت راست — عنوان */}
            <h1 className="text-emerald-600 text-xl font-bold">مقالات</h1>

            {/* خط وسط */}
            <div className="flex-1 mx-8 h-px bg-gray-300" />

            {/* سمت چپ — لینک بازگشت */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link
                href="/articles"
                className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium"
              >
                <span className="font-bold">همه مقالات</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            </motion.section>
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
          </div>
        )}
      </div>
    </section>
  );
}
