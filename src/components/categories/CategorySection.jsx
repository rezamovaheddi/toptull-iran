"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "../../constant/categories";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  return (
    <section className="px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-14 bg-gradient-to-br from-[#0E8F4F] to-[#16A34A] border border-white/20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12"
        >
          دسته‌بندی محصولات
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 auto-rows-fr">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: "easeOut",
              }}
            >
              <CategoryCard title={category.title} image={category.image} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
