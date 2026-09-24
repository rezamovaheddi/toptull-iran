"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Package, LayoutGrid, BookOpen, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isAuthenticated: storeAuth, user: storeUser } = useAuthStore();

  const isUserAuthenticated =
    status === "authenticated" || Boolean(storeAuth && storeUser);

  const navItems = [
    {
      id: "home",
      label: "خانه",
      href: "/",
      icon: Home,
    },
    {
      id: "products",
      label: "محصولات",
      href: "/products",
      icon: Package,
    },
    {
      id: "categories",
      label: "دسته‌بندی",
      href: "/#categories",
      icon: LayoutGrid,
    },
    {
      id: "articles",
      label: "مقالات",
      href: "/articles",
      icon: BookOpen,
    },
    {
      id: "profile",
      label: isUserAuthenticated ? "پروفایل" : "ورود",
      href: isUserAuthenticated ? "/profile" : "/login",
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-4 inset-x-3 max-w-md mx-auto z-50 md:hidden"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-around px-2 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("/#")
              ? false
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-colors duration-200 select-none ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? "scale-110 stroke-[2.25]" : "stroke-[1.75]"
                  }`}
                />
                <span className="text-[11px] leading-tight tracking-tight">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
