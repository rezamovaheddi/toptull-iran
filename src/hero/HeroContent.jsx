"use client";

import { motion } from "framer-motion";

export default function HeroContent({ children }) {
  return (
    <div className="text-center lg:text-right">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2"
      >
        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold leading-[1.2] tracking-tight text-gray-900">
          <span className="block">با کیفیت ترین ابزارآلات</span>
          <span className="block">ایران در</span>
        </h1>

        <div className="mt-3">
          <span className="inline-block text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-l from-[#22C55E] via-[#16A34A] to-[#15803D] bg-clip-text text-transparent">
            تاب تول ایران – TopTul Iran
          </span>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[#6B7280] max-w-lg mx-auto lg:mx-0 leading-relaxed">
          فروشگاه تخصصی ابزارآلات صنعتی و حرفه‌ای با بهترین برندها، گارانتی اصالت و ضمانت بازگشت کالا
        </p>
      </motion.div>

      {children}
    </div>
  );
}
