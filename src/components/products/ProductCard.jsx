'use client'

import Image from "next/image";
import { motion } from "framer-motion";


export default function ProductCard({ product }) {

    const { title, image, badge } = product;
    
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col shrink-0 overflow-hidden
                 w-[150px] sm:w-[165px] lg:w-[175px] h-[280px]
                 rounded-2xl border border-[#DCE8DF] bg-white
                 shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                 transition-shadow duration-300
                 hover:shadow-[0_14px_34px_rgba(0,0,0,0.14)]"
    >
      {badge && (
        <span
          className="absolute top-2.5 left-2.5 z-10 rounded-lg
                     bg-[rgba(170,160,120,0.9)] px-2.5 py-1.5
                     text-[12px] leading-none text-white"
        >
          {badge}
        </span>
      )}

      <div className="relative h-[190px] w-full overflow-hidden bg-white p-4">
        <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 165px, 175px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex h-[80px] w-full items-center justify-center rounded-b-2xl bg-[#18B85A] px-3">
        <h3 className="text-center text-sm font-semibold leading-snug text-white line-clamp-3">
          {title}
        </h3>
      </div>
    </motion.article>
  );
}