"use client";
import { motion } from "framer-motion";

export default function NavIndicator() {
  return (
    <motion.div
      layoutId="nav-active-indicator"
      className="absolute -bottom-1 inset-x-0 h-[2px] rounded-full bg-emerald-500"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}
