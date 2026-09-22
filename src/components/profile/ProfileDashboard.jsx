"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Wallet,
  Gem,
  Package,
  Users,
  Receipt,
  Ticket,
  LogOut,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";

export default function ProfileDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("orders"); // default to purchase history
  const [orderFilter, setOrderFilter] = useState("all");
  const [copied, setCopied] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const displayName =
    user?.name || user?.fullName || user?.username || "کاربر تاپ‌تول";
  const username = user?.username || "09304064124";
  const email = user?.email || "";

  const handleSignOut = async () => {
    clearAuth();
    await signOut({ callbackUrl: "/" });
  };

  const copyReferralCode = () => {
    navigator.clipboard?.writeText("TOPTUL-VIP");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50/70 py-8 px-4 md:px-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowRight size={18} />
            <span>بازگشت به فروشگاه</span>
          </Link>

          <span className="text-xs text-emerald-800  px-3 py-1 rounded-lg font-medium  ">
            پنل کاربری تاپ‌تول
          </span>
        </div>

        {/* 2-Column Layout: Aside Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============================================================ */}
          {/* ASIDE SIDEBAR                                                */}
          {/* ============================================================ */}
          <aside className="lg:col-span-4 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 space-y-5">
            {/* Header: User Avatar & Name & Points */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              {/* Left Badge: Diamond points */}
              <button
                type="button"
                onClick={() => setActiveTab("club")}
                className="flex items-center gap-1.5 text-xs text-pink-600 bg-pink-50/70 hover:bg-pink-100/70 px-2.5 py-1 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>دریافت ۵۰۰ امتیاز</span>
                <Gem size={14} className="text-pink-500 fill-pink-500" />
              </button>

              {/* Right: Avatar + User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {displayName}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5 dir-ltr text-right">
                    {username}
                  </p>
                </div>

                {/* Avatar Icon */}
                <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-b from-gray-100 to-gray-200 border-2 border-emerald-100 shadow-inner text-gray-600">
                  <User size={26} className="text-gray-500" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
              </div>
            </div>

            {/* Quick Financial Rows */}
            <div className="space-y-2 pt-1">
              {/* اقساط و اعتبار */}
              <button
                type="button"
                onClick={() => setActiveTab("credit")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "credit"
                  ? "bg-emerald-50/80 text-emerald-800 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <span className="text-xs text-gray-400 font-mono">۰ تومان</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">اقساط و اعتبار</span>
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                </div>
              </button>

              {/* کیف پول */}
              <button
                type="button"
                onClick={() => setActiveTab("wallet")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "wallet"
                  ? "bg-emerald-50/80 text-emerald-800 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <span className="text-xs text-gray-400 font-mono">۰ تومان</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">کیف پول</span>
                  <div className="h-7 w-7 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                    <Wallet size={16} />
                  </div>
                </div>
              </button>

              {/* تاپ‌تول کلاب (باشگاه مشتریان) */}
              <button
                type="button"
                onClick={() => setActiveTab("club")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "club"
                  ? "bg-emerald-50/80 text-emerald-800 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <span className="text-xs text-gray-400 font-mono">۱۰۰ امتیاز</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">تاپ‌تول کلاب</span>
                  <div className="h-7 w-7 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
                    <Gem size={16} className="fill-pink-500" />
                  </div>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* Main Navigation Items */}
            <nav className="space-y-1">
              {/* سوابق خرید و سفارش‌ها */}
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "orders"
                  ? "bg-emerald-500/10 text-emerald-700 font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">سوابق خرید و سفارش‌ها</span>
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center ${activeTab === "orders"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-600"
                      }`}
                  >
                    <Package size={16} />
                  </div>
                </div>
              </button>

              {/* مشخصات حساب کاربری */}
              <button
                type="button"
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "account"
                  ? "bg-emerald-500/10 text-emerald-700 font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">مشخصات حساب کاربری</span>
                  <div className="h-7 w-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <User size={16} />
                  </div>
                </div>
              </button>

              {/* دعوت از دوستان */}
              <button
                type="button"
                onClick={() => setActiveTab("invite")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "invite"
                  ? "bg-emerald-500/10 text-emerald-700 font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">دعوت از دوستان</span>
                  <div className="h-7 w-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                </div>
              </button>

              {/* تاریخچه تراکنش‌ها */}
              <button
                type="button"
                onClick={() => setActiveTab("transactions")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "transactions"
                  ? "bg-emerald-500/10 text-emerald-700 font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">تاریخچه تراکنش‌ها</span>
                  <div className="h-7 w-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Receipt size={16} />
                  </div>
                </div>
              </button>

              {/* تخفیف‌ها */}
              <button
                type="button"
                onClick={() => setActiveTab("discounts")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === "discounts"
                  ? "bg-emerald-500/10 text-emerald-700 font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">کدهای تخفیف</span>
                  <div className="h-7 w-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Ticket size={16} />
                  </div>
                </div>
              </button>
            </nav>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* خروج از حساب کاربری */}
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-red-600 hover:bg-red-50/80 transition-all cursor-pointer group"
            >
              <span className="text-xs text-gray-400 group-hover:text-red-400">خروج امن</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">خروج از حساب کاربری</span>
                <div className="h-7 w-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <LogOut size={16} />
                </div>
              </div>
            </button>
          </aside>

          {/* ============================================================ */}
          {/* MAIN CONTENT AREA                                            */}
          {/* ============================================================ */}
          <main className="lg:col-span-8 space-y-6">
            {/* TAB: سوابق خرید و سفارش‌ها */}
            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                {/* Header of Orders */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Package size={18} />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-bold text-gray-900">
                        سوابق خرید و فعالیت‌ها
                      </h2>
                      <p className="text-xs text-gray-400">
                        پیگیری، مشاهده وضعیت و فاکتور سفارش‌های ابزارآلات شما
                      </p>
                    </div>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100 text-xs">
                    {[
                      { id: "all", label: "همه" },
                      { id: "processing", label: "جاری" },
                      { id: "delivered", label: "تحویل شده" },
                      { id: "cancelled", label: "لغو شده" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setOrderFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all ${orderFilter === tab.id
                          ? "bg-white text-emerald-700 shadow-xs"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders Content / Empty State */}
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                    <Package size={28} />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h3 className="text-base font-bold text-gray-800">
                      هنوز سفارشی ثبت نشده است
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      پس از خرید ابزارآلات و قطعات صنعتی، وضعیت و فاکتورها اینجا نمایش داده خواهد شد.
                    </p>
                  </div>
                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-102"
                  >
                    <span>مشاهده محصولات تاپ‌تول</span>
                    <ChevronLeft size={16} />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* TAB: مشخصات حساب کاربری */}
            {activeTab === "account" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">
                      مشخصات و اطلاعات حساب
                    </h2>
                    <p className="text-xs text-gray-400">
                      اطلاعات هویتی و ارتباطی ثبت‌شده در تاپ‌تول
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 space-y-1">
                    <span className="text-xs text-gray-400">نام و نام خانوادگی</span>
                    <p className="font-semibold text-gray-800">{displayName}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 space-y-1">
                    <span className="text-xs text-gray-400">نام کاربری / شماره تماس</span>
                    <p className="font-semibold text-gray-800 font-mono dir-ltr text-right">
                      {username}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 space-y-1">
                    <span className="text-xs text-gray-400">آدرس ایمیل</span>
                    <p className="font-semibold text-gray-800 font-mono dir-ltr text-right">
                      {email || "ثبت نشده"}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 space-y-1">
                    <span className="text-xs text-gray-400">وضعیت احراز هویت</span>
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs mt-1">
                      <ShieldCheck size={16} />
                      <span>تأیید شده و فعال</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: کیف پول */}
            {activeTab === "wallet" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Wallet size={18} />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-bold text-gray-900">کیف پول تاپ‌تول</h2>
                      <p className="text-xs text-gray-400">مدیریت موجودی نقدی و شارژ حساب</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-gray-400">موجودی فعلی:</span>
                    <p className="text-lg md:text-xl font-extrabold text-emerald-600">۰ تومان</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-right">
                    <h4 className="text-sm font-bold text-gray-900">افزایش موجودی کیف پول</h4>
                    <p className="text-xs text-gray-500">برای خریدهای سریع‌تر و پرداخت آنی ابزارآلات</p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    شارژ آنلاین کیف پول
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: اقساط و اعتبار */}
            {activeTab === "credit" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">خرید اقساطی و اعتبار</h2>
                    <p className="text-xs text-gray-400">خرید ابزارآلات کارگاهی و صنعتی با بازپرداخت اقساطی</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 text-center space-y-3">
                  <CreditCard size={28} className="mx-auto text-blue-600" />
                  <h4 className="text-sm font-bold text-gray-900">اعتبار سنجی اولیه</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    امکان خرید قسطی ابزار تا سقف ۵۰ میلیون تومان با همکاری سامانه‌های اعتباری معتبر به زودی فعال می‌گردد.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB: تاپ‌تول کلاب */}
            {activeTab === "club" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                      <Gem size={18} className="fill-pink-600" />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-bold text-gray-900">باشگاه تاپ‌تول کلاب</h2>
                      <p className="text-xs text-gray-400">امتیازها و جوایز خریداران وفادار تاپ‌تول</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-gray-400">امتیاز شما:</span>
                    <p className="text-lg md:text-xl font-extrabold text-pink-600">۱۰۰ امتیاز</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-pink-50/50 border border-pink-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-pink-800">
                    با تکمیل پروفایل خود، ۵۰۰ امتیاز هدیه دریافت کنید!
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("account")}
                    className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold"
                  >
                    تکمیل اطلاعات
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: کدهای تخفیف */}
            {activeTab === "discounts" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Ticket size={18} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">کدهای تخفیف فعال</h2>
                    <p className="text-xs text-gray-400">کدهای تخفیف و پیشنهادهای ویژه شما</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/30 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-800">تخفیف اولین خرید ابزار تاپ‌تول</span>
                    <p className="text-[11px] text-gray-500">۱۰٪ تخفیف تا سقف ۲۰۰,۰۰۰ تومان</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-white px-3 py-1 rounded-lg border border-emerald-200 text-emerald-700">
                      TOPTUL10
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: دعوت از دوستان */}
            {activeTab === "invite" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">دعوت از دوستان و همکاران</h2>
                    <p className="text-xs text-gray-400">کد معرف خود را برای دوستان ارسال کنید و هدیه بگیرید</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 text-center space-y-3">
                  <p className="text-xs text-gray-600">کد دعوت اختصاصی شما:</p>
                  <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs">
                    <span className="font-mono font-bold text-base text-emerald-700">TOPTUL-VIP</span>
                    <button
                      type="button"
                      onClick={copyReferralCode}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copied ? "کپی شد" : "کپی"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: تاریخچه تراکنش‌ها */}
            {activeTab === "transactions" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Receipt size={18} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">تاریخچه تراکنش‌های مالی</h2>
                    <p className="text-xs text-gray-400">فهرست واریزها، پرداخت‌ها و فاکتورهای مالی</p>
                  </div>
                </div>

                <div className="py-8 text-center text-gray-400 text-xs">
                  تراکنش مالی فعالی یافت نشد.
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
