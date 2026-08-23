"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: "rtl", align: "start", dragFree: false, containScroll: "trimSnaps" },
    [WheelGesturesPlugin()]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-5 md:gap-6" role="list" aria-label="لیست محصولات">
          {products.map((product) => (
            <div key={product.id} role="listitem" className="shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="-"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-[#DCE8DF] shadow-md text-[#17B45B] transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none hover:bg-[#17B45B] hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="+"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-[#DCE8DF] shadow-md text-[#17B45B] transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none hover:bg-[#17B45B] hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}