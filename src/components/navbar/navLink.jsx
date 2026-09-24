"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVITEMs } from "../../constant/Navigation";
import NavIndicator from "./NavIndicator";

/**
 * @param {Object} props
 * @param {string} [props.className]
 */

export default function NavLinks({ className = "" }) {
  const pathname = usePathname();

  return (
    <ul
      className={`hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 shrink-0 whitespace-nowrap ${className}`}
    >
      {NAVITEMs.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : item.href.startsWith("/#")
            ? false
            : pathname.startsWith(item.href);

        return (
          <li key={item.id} className="relative shrink-0">
            <Link
              href={item.href}
              className={`inline-block whitespace-nowrap text-sm font-medium transition-colors duration-200 pb-2 ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              {item.label}
            </Link>

            {isActive && <NavIndicator />}
          </li>
        );
      })}
    </ul>
  );
}
