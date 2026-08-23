"use client";

import { motion } from "framer-motion";
import useScrollBar from "../../hook/useScrollBar";
import Logo from "./Logo";
import NavLinks from "./navLink";
import MobileMenu from "./MobileNav";
import SearchBar from "@/components/ui/search/SearchBar";

export default function Navbar() {
  const isScrolled = useScrollBar(20);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(255, 255, 255, 1)",
        boxShadow: isScrolled
          ? "0 4px 24px rgba(0, 0, 0, 0.06)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-[backdrop-filter] duration-300 ${
        isScrolled
          ? "backdrop-blur-xl border-b border-white/40"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Logo />
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <SearchBar className="hidden lg:flex w-64 xl:w-80" />
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
