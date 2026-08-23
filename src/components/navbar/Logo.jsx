"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../../public/lofo.webp";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="relative h-6 w-[130px] md:h-7 md:w-[155px] select-none"
      >
        <Image
          src={logo}
          alt="لوگوی تاپ‌تول"
          fill
          priority
          sizes="(max-width: 768px) 130px, 155px"
          className="object-contain object-right"
        />
      </motion.div>
    </Link>
  );
}
