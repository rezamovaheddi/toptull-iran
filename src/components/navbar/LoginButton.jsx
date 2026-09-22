"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  User,
  LogOut,
  ChevronDown,
  Package,
  Settings,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginButton({ isMobile = false }) {
  const { data: session, status } = useSession();
  const {
    user: storeUser,
    isAuthenticated: storeAuth,
    initFromStorage,
    clearAuth,
  } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize store from localStorage on mount
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Determine active user data from NextAuth session or Zustand store
  const currentUser = session?.user || storeUser;
  const isUserAuthenticated =
    status === "authenticated" || Boolean(storeAuth && currentUser);

  const handleSignOut = async () => {
    clearAuth();
    setIsOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  // Get user display name and initials
  const displayName =
    currentUser?.name ||
    currentUser?.fullName ||
    currentUser?.username ||
    "کاربر تاپ‌تول";

  const username = currentUser?.username || "";
  const email = currentUser?.email || "";

  const initialLetter = (displayName || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  // If user is NOT logged in: Show the sleek login button
  if (!isUserAuthenticated) {
    return (
      <Link
        href="/login"
        className={`group relative inline-flex h-10 md:h-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 text-emerald-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(16,185,129,0.1)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/45 hover:bg-emerald-500/20 hover:text-emerald-900 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_20px_rgba(16,185,129,0.2)] active:scale-[0.98] ${
          isMobile ? "w-full" : ""
        }`}
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
          ورود / ثبت‌نام
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

  // If user IS logged in: Render the Profile Avatar & Dropdown Menu
  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      {/* Avatar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex h-10 md:h-11 items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-white/80 p-1.5 pl-3.5 shadow-[0_2px_12px_rgba(16,185,129,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-50/50 hover:shadow-[0_4px_16px_rgba(16,185,129,0.15)] focus:outline-none ${
          isMobile ? "w-full justify-between" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar Circle */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white font-bold text-sm shadow-[0_2px_8px_rgba(16,185,129,0.35)] transition-transform duration-300 group-hover:scale-105">
          <span>{initialLetter}</span>

          {/* Active Status Ring */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full border border-white bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
          </span>
        </div>

        {/* User Name & Chevron */}
        <div className="flex items-center gap-1.5 text-right">
          <span className="max-w-28 md:max-w-32 truncate text-xs md:text-sm font-semibold text-gray-800 transition-colors group-hover:text-emerald-800">
            {displayName}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 group-hover:text-emerald-600 ${
              isOpen ? "rotate-180 text-emerald-600" : ""
            }`}
          />
        </div>
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-50 mt-2 w-72 rounded-2xl border border-gray-100/80 bg-white/95 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-2xl ${
              isMobile ? "left-0 right-0 w-full" : "left-0"
            }`}
            dir="rtl"
          >
            {/* Header: User Profile Card */}
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-linear-to-tr from-emerald-500/10 via-emerald-500/5 to-teal-500/5 p-3 border border-emerald-500/15">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white font-bold text-base shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
                {initialLetter}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-sm">
                  <ShieldCheck size={12} className="text-emerald-600" />
                </span>
              </div>
              <div className="min-w-0 flex-1 text-right">
                <p className="truncate text-sm font-bold text-gray-900">
                  {displayName}
                </p>
                {username && (
                  <p className="truncate text-xs font-medium text-emerald-700 dir-ltr text-right">
                    @{username}
                  </p>
                )}
                {email && (
                  <p className="truncate text-[11px] text-gray-400 mt-0.5 dir-ltr text-right">
                    {email}
                  </p>
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs md:text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-500/10 hover:text-emerald-700"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-700">
                  <User size={15} />
                </div>
                <span>حساب کاربری و مشخصات</span>
              </Link>

              <Link
                href="/profile#orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs md:text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-500/10 hover:text-emerald-700"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                  <Package size={15} />
                </div>
                <span>سفارش‌ها و پیگیری خرید</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="my-2 border-t border-gray-100" />

            {/* Sign Out Action */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs md:text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-100/60 text-red-500">
                <LogOut size={15} />
              </div>
              <span>خروج از حساب کاربری</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
