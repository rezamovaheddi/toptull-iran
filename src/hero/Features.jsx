"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Package,
    label: "1500+ Products",
    labelFa: "بیش از ۱۵۰۰ محصول",
  },
  {
    icon: ShieldCheck,
    label: "Premium Quality",
    labelFa: "کیفیت تضمینی",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    labelFa: "پشتیبانی ۲۴ ساعته",
  },
];

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
      className="mt-8 w-full max-w-xl mx-auto lg:mx-0"
    >
      <div className="flex items-center justify-center lg:justify-start gap-0">
        {features.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {i > 0 && <div className="w-px h-6 bg-gray-200 mx-4 sm:mx-5" />}

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 1.5 + i * 0.12,
                ease: "easeOut",
              }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50">
                <item.icon size={14} className="text-emerald-500" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">
                {item.labelFa}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
