"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAVITEMs } from "../../constant/Navigation";
import SearchBar from "@/components/ui/search/SearchBar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const panelVariants = {
    hidden: { opacity: 0, y: -16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 26,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 12 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "-" : "+"}
        aria-expanded={isOpen}
        className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-50"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-6 h-[2px] bg-gray-800 rounded-full"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="w-6 h-[2px] bg-gray-800 rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-6 h-[2px] bg-gray-800 rounded-full"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />

            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 inset-x-0 z-40 pt-20 pb-8 px-6
                         bg-white/50 backdrop-blur-2xl
                         border-b border-white/60
                         shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                         rounded-b-[2rem] overflow-hidden"
            >
              <motion.div
                aria-hidden
                animate={{
                  x: ["-10%", "10%", "-10%"],
                  y: ["-5%", "5%", "-5%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full
                           bg-gradient-to-br from-emerald-200/40 via-white/10 to-transparent blur-3xl"
              />

              <div className="relative flex flex-col gap-1">
                {NAVITEMs.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "text-gray-800 hover:bg-white/60"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div variants={itemVariants} className="mt-4">
                  <SearchBar className="w-full" />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
