"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar({ startDelay = 0.9, onSearch }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <motion.form
      role="search"
      aria-label="جستجوی محصولات فروشگاه"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: startDelay, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 w-full max-w-xl mx-auto lg:mx-0"
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 12px 40px -8px rgba(34,197,94,0.2), 0 0 0 3px rgba(34,197,94,0.08)"
            : "0 8px 28px -6px rgba(0,0,0,0.06)",
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center rounded-full bg-white border border-gray-100/80 overflow-hidden"
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 bg-gradient-to-l from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-full m-1.5 shadow-sm shadow-emerald-500/20 transition-all duration-200 whitespace-nowrap"
        >
          <Search size={18} />
          <span className="hidden sm:inline">جستجو</span>
        </motion.button>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="به دنبال چه ابزاری میگردید؟"
          aria-label="به دنبال چه ابزاری میگردید؟"
          className="flex-1 bg-transparent outline-none px-4 py-3.5 text-sm sm:text-base text-gray-700 placeholder:text-gray-400 min-w-0"
        />
      </motion.div>
    </motion.form>
  );
}
