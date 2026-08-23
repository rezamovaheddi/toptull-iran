"use client";

import { motion } from "framer-motion";
import { FaYoutube, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const socials = [
  { icon: FaYoutube, label: "یوتیوب", href: "#" },
  { icon: FaTelegramPlane, label: "تلگرام", href: "#" },
  { icon: FaInstagram, label: "اینستاگرام", href: "#" },
];

export default function HeroIllustration() {
  return (
    <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
      {/* تصویر — موبایل: بالا / دسکتاپ: کنار سوشال */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="order-1 flex w-full max-w-[280px] justify-center sm:max-w-[340px] lg:order-2 lg:max-w-[420px]"
      >
        <Image
          src="/w3.png"
          alt="TopTool Wrench"
          width={420}
          height={620}
          priority
          className="h-auto w-full object-contain"
        />
      </motion.div>

      {/* سوشال — موبایل: زیر تصویر / دسکتاپ: کنار تصویر */}
      <div className="order-2 flex items-center justify-center gap-6 sm:gap-8 lg:order-1 lg:flex-col lg:gap-10">
        {socials.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.8 + i * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-white/70 text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
            >
              <Icon size={18} />
            </motion.a>
          );
        })}

        <motion.div
          initial={{ height: 0, width: 0 }}
          animate={{ height: 40, width: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="hidden w-px bg-gradient-to-b from-emerald-500/20 to-emerald-400/60 lg:block"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
