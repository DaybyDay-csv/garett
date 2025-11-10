import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AeroGlowBanner } from "@/components/banners/AeroGlowBanner";
import { GWPBanner } from "@/components/banners/GWPBanner";
import { WhiteWeekBanner } from "@/components/banners/WhiteWeekBanner";
import { BlackFridayBanner } from "@/components/banners/BlackFridayBanner";
import { CyberMondayBanner } from "@/components/banners/CyberMondayBanner";
import { getActiveBanners } from "@/lib/bannerConfig";

const bannerComponents = {
  aeroglow: AeroGlowBanner,
  gwp: GWPBanner,
  whiteWeek: WhiteWeekBanner,
  blackFriday: BlackFridayBanner,
  cyberMonday: CyberMondayBanner,
};

export const PromotionalBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeBanners = getActiveBanners(true);

  // Auto-rotate banners
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
        setIsTransitioning(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeBanners.length, isPaused]);

  if (activeBanners.length === 0) {
    return null;
  }

  const CurrentBanner = bannerComponents[activeBanners[currentIndex] as keyof typeof bannerComponents];

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-background group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner with fade transition */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <CurrentBanner />
      </div>

      {/* Navigation Arrows - Visible on mobile, enhanced on hover desktop */}
      {activeBanners.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full opacity-70 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-lg z-10 hover:scale-110"
            onClick={goToPrevious}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full opacity-70 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-lg z-10 hover:scale-110"
            onClick={goToNext}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          {/* Dots Navigation - Improved mobile visibility */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10 bg-background/50 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                disabled={isTransitioning}
                className={`h-1.5 md:h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-6 md:w-8 bg-primary" 
                    : "w-1.5 md:w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>

          {/* Banner Counter - Smaller on mobile */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-background/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium z-10">
            {currentIndex + 1} / {activeBanners.length}
          </div>
        </>
      )}
    </div>
  );
};
