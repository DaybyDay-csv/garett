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
  const activeBanners = getActiveBanners(true);

  // Auto-rotate banners
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeBanners.length, isPaused]);

  if (activeBanners.length === 0) {
    return null;
  }

  const CurrentBanner = bannerComponents[activeBanners[currentIndex] as keyof typeof bannerComponents];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner */}
      <div className="transition-all duration-500 ease-in-out">
        <CurrentBanner />
      </div>

      {/* Navigation Arrows - Only show if multiple banners */}
      {activeBanners.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 hover:opacity-100 transition-opacity shadow-lg"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 hover:opacity-100 transition-opacity shadow-lg"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
