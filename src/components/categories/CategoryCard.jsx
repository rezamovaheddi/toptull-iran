"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryCard({ title, image }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col items-center justify-between h-full w-full rounded-[22px] sm:rounded-[24px] bg-white/85 backdrop-blur-[28px] border border-white/35 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:bg-white/95 hover:shadow-[0_20px_45px_rgba(22,163,74,0.22)]"
    >
      <div className="relative w-full aspect-square flex items-center justify-center p-3">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 300px"
          className="object-contain"
        />
      </div>

      <h3 className="mt-3 text-center text-sm sm:text-base font-bold text-gray-800">
        {title}
      </h3>
    </motion.div>
  );
}
