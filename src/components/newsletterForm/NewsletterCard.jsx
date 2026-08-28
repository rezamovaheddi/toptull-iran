"use client";

import React, { useCallback } from "react";
import CountUp from "react-countup";
import { AlertCircle, Check } from "lucide-react";
import {
  useNewsletterStore,
  validateEmail,
} from "../../store/useNewsletterStore";

const toPersianDigits = (value) => {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
};

const NewsletterStats = React.memo(function NewsletterStats({
  articlesCount,
  subscribersCount,
  persianDigits,
  counterDuration,
}) {
  const formatArticles = useCallback(
    (val) => `+${persianDigits ? toPersianDigits(val) : val}`,
    [persianDigits],
  );

  const formatSubscribers = useCallback(
    (val) => `${persianDigits ? toPersianDigits(val) : val}K`,
    [persianDigits],
  );

  return (
    <div className="grid grid-cols-2 gap-4 text-right">
      <div className="space-y-0.5">
        <div className="text-xl sm:text-2xl font-black text-[#22c55e]">
          <CountUp
            start={0}
            end={articlesCount}
            duration={counterDuration}
            useEasing={true}
            formattingFn={formatArticles}
          />
        </div>
        <div className="text-xs sm:text-sm text-emerald-200/60 font-medium">
          مقاله تخصصی
        </div>
      </div>

      <div className="space-y-0.5">
        <div className="text-xl sm:text-2xl font-black text-[#22c55e]">
          <CountUp
            start={0}
            end={subscribersCount}
            duration={counterDuration}
            useEasing={true}
            formattingFn={formatSubscribers}
          />
        </div>
        <div className="text-xs sm:text-sm text-emerald-200/60 font-medium">
          مشترک
        </div>
      </div>
    </div>
  );
});

export default function NewsletterCard({
  badgeText = "خبرنامه تخصصی",
  title = "دریافت آخرین آموزش‌های صنعتی",
  description = "هر هفته جدیدترین مقالات فنی و راهنماهای تخصصی ابزار را در ایمیل خود دریافت کنید.",
  placeholder = "آدرس ایمیل شما",
  buttonText = "عضویت در خبرنامه",
  persianDigits = true,
  counterDuration = 2.5,
}) {
  const email = useNewsletterStore((state) => state.email);
  const status = useNewsletterStore((state) => state.status);
  const errorMessage = useNewsletterStore((state) => state.errorMessage);
  const articlesCount = useNewsletterStore((state) => state.articlesCount);
  const subscribersCount = useNewsletterStore(
    (state) => state.subscribersCount,
  );

  const setEmail = useNewsletterStore((state) => state.setEmail);
  const subscribe = useNewsletterStore((state) => state.subscribe);
  const resetForm = useNewsletterStore((state) => state.resetForm);

  const isEmailValid = email.trim().length > 0 && validateEmail(email).isValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribe();
  };

  return (
    <div
      dir="rtl"
      className="relative overflow-hidden rounded-[28px] bg-[#0a3522] p-7 sm:p-9 text-right text-white shadow-2xl shadow-emerald-950/60 border border-emerald-700/20 max-w-[420px] w-full"
    >
      <div
        className="pointer-events-none absolute -top-14 -left-14 h-52 w-52 rounded-full bg-[#052115]/90"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#052115]/85"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex justify-start">
          <span className="inline-flex items-center rounded-full border border-emerald-600/40 bg-[#083a24]/90 px-3.5 py-1 text-xs sm:text-[13px] font-medium text-emerald-400">
            {badgeText}
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <h2 className="text-2xl sm:text-[26px] font-extrabold leading-snug tracking-tight text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-emerald-100/75 font-normal">
            {description}
          </p>
        </div>

        <div className="mt-6">
          {status === "success" ? (
            <div className="rounded-2xl border border-emerald-600/40 bg-[#0d422b]/80 p-5 text-center">
              <div className="text-emerald-400 font-bold text-sm">
                عضویت با موفقیت انجام شد!
              </div>
              <p className="mt-1 text-xs text-emerald-200/80">
                ایمیل خوش‌آمدگویی برای شما ارسال شد.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 text-xs text-emerald-400 underline cursor-pointer"
              >
                ثبت ایمیل جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    dir="rtl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    aria-invalid={status === "error"}
                    disabled={status === "loading"}
                    className={`w-full rounded-xl bg-[#0c3e28]/90 border border-[#1b5e3b] px-4 py-3.5 text-right text-sm text-white placeholder-emerald-300/40 outline-none transition-all focus:border-emerald-400 focus:bg-[#0e472e] focus:ring-2 focus:ring-emerald-500/30 ${
                      status === "error"
                        ? "border-rose-500 bg-[#160b0d] pl-10 focus:border-rose-400 focus:ring-rose-500/40"
                        : ""
                    } ${isEmailValid && status !== "error" ? "pl-10" : ""}`}
                  />
                  {/* آیکون هشدار یا تایید */}
                  <div className="absolute left-3.5 flex items-center pointer-events-none">
                    {status === "error" && (
                      <AlertCircle className="h-4 w-4 text-rose-400 animate-pulse" />
                    )}
                    {isEmailValid && status !== "error" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>

                {/* پیام خطای اعتبارسنجی */}
                {status === "error" && errorMessage && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 px-3 py-2 text-xs text-rose-300">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.99] px-4 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-60"
              >
                {status === "loading" ? "در حال بررسی و ارسال..." : buttonText}
              </button>
            </form>
          )}
        </div>
        <div className="my-6 h-px w-full bg-emerald-800/40" />

        <NewsletterStats
          articlesCount={articlesCount}
          subscribersCount={subscribersCount}
          persianDigits={persianDigits}
          counterDuration={counterDuration}
        />
      </div>
    </div>
  );
}
