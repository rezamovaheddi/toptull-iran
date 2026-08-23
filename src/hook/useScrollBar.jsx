"use client";
import { useEffect, useState } from "react";

/**
 *
 * @param {number} thereshold
 * @returns {boolean} isScrolled
 */

export default function useScrollBar(thereshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > thereshold);
    };
    checkScroll();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > thereshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [thereshold]);
  return isScrolled;
}
