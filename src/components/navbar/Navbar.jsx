"use client";

import { motion } from "framer-motion";
import useScrollBar from "../../hook/useScrollBar";
import Logo from "./Logo";
import NavLinks from "./navLink";
import SearchBar from "@/components/ui/search/SearchBar";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const isScrolled = useScrollBar(20);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300 ${
        isScrolled
          ? "pt-2 md:pt-3 px-3 md:px-6 lg:px-8"
          : "pt-0 px-0"
      }`}
    >
      <motion.header
        initial={false}
        animate={{
          maxWidth: isScrolled ? "1240px" : "100%",
          borderRadius: isScrolled ? "1.25rem" : "0rem",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 1)",
          boxShadow: isScrolled
            ? "0 10px 35px -5px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)"
            : "0 0 0 0 rgba(0, 0, 0, 0)",
          borderColor: isScrolled
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(243, 244, 246, 0.8)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`pointer-events-auto mx-auto w-full transition-[backdrop-filter] duration-300 border ${
          isScrolled
            ? "backdrop-blur-xl border-white/60 shadow-lg"
            : "border-b border-gray-100 border-x-0 border-t-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
            }`}
          >
            {/* لوگو و ناوبری اصلی دسکتاپ */}
            <div className="flex items-center gap-6 lg:gap-8 shrink-0">
              <Logo />
              <NavLinks />
            </div>

            {/* بخش سمت چپ: جستجو و دکمه ورود/پروفایل */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <SearchBar className="hidden xl:flex w-56 xl:w-72" />
              <div className="shrink-0">
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
