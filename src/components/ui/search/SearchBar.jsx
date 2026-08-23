"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

/**
 * کامپوننت جستجوی Reusable
 * مستقل از Navbar — قابل استفاده در هر بخش دیگه پروژه (مثلاً صفحه محصولات)
 *
 * @param {Object} props
 * @param {string} [props.placeholder] - متن راهنمای اینپوت
 * @param {(value: string) => void} [props.onSearch] - کال‌بک هنگام ارسال جستجو
 * @param {string} [props.className] - کلاس‌های اضافی برای کنترل عرض/فاصله از بیرون
 */
export default function SearchBar({
  placeholder = "جستجوی محصول...",
  onSearch,
  className = "",
}) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={false}
      animate={{
        boxShadow: isFocused
          ? "0 4px 20px rgba(0, 0, 0, 0.12)"
          : "0 1px 4px rgba(0, 0, 0, 0.06)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-center rounded-full bg-gray-50 border border-gray-200 overflow-hidden ${className}`}
    >
      <span className="ps-4 text-gray-400 flex items-center">
        <SearchIcon fontSize="small" />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 min-w-0"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 h-full rounded-full transition-colors duration-200"
      >
        جستجو
      </motion.button>
    </motion.form>
  );
}
