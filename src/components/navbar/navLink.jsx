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
    <ul className={`hidden md:flex items-center gap-8 ${className}`}>
      {NAVITEMs.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.id} className="relative">
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 pb-2 ${
                isActive
                  ? "text-emerald-600"
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
