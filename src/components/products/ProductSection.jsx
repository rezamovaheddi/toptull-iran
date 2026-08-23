"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "../../data/product";
import SectionHeader from "./SectionHeader";
import ProductCarousel from "./ProductCarousel";

export default function ProductSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader title="نمایی از محصولات" href="/products" linkLabel="همه محصولات" />
        <ProductCarousel products={PRODUCTS} />
      </div>
    </motion.section>
  );
}