"use client";

import HeroIllustration from "./HeroIllustration";
import HeroContent from "./HeroContent";
import SearchBar from "./SearchBar";
import Features from "./Features";
import HeroWatermark from "./HeroWatermark";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <HeroWatermark />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-8 xl:gap-14 items-center">
          <div className="order-2 lg:order-none w-full">
            <HeroContent>
              <SearchBar startDelay={1.0} />
              <Features />
            </HeroContent>
          </div>

          <div className="order-1 lg:order-none w-full mb-10 lg:mb-0">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
