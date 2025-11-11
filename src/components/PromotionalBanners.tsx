import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AeroGlowBanner } from "@/components/banners/AeroGlowBanner";
import { GWPBanner } from "@/components/banners/GWPBanner";
import { WhiteWeekBanner } from "@/components/banners/WhiteWeekBanner";
import { BlackFridayBanner } from "@/components/banners/BlackFridayBanner";
import { CyberMondayBanner } from "@/components/banners/CyberMondayBanner";
import { getActiveBanners } from "@/lib/bannerConfig";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const bannerComponents = {
  aeroglow: AeroGlowBanner,
  gwp: GWPBanner,
  whiteWeek: WhiteWeekBanner,
  blackFriday: BlackFridayBanner,
  cyberMonday: CyberMondayBanner,
};

export const PromotionalBanners = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const activeBanners = getActiveBanners(true);

  const autoplayPlugin = Autoplay({
    delay: 8000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (activeBanners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-background group">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {activeBanners.map((bannerKey, index) => {
            const BannerComponent = bannerComponents[bannerKey as keyof typeof bannerComponents];
            return (
              <CarouselItem key={index} className="pl-0">
                <BannerComponent />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Arrows - Visible on mobile, enhanced on hover desktop */}
        {activeBanners.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 rounded-full opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-xl backdrop-blur-md z-20 hover:scale-110 h-8 w-8 md:h-12 md:w-12 border border-white/20"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 rounded-full opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-xl backdrop-blur-md z-20 hover:scale-110 h-8 w-8 md:h-12 md:w-12 border border-white/20"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
            </Button>

            {/* Dots Navigation - Improved mobile visibility */}
            <div className="absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20 bg-background/70 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 md:w-8 bg-primary"
                      : "w-1.5 md:w-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>

            {/* Banner Counter - Smaller on mobile, hidden on very small screens */}
            <div className="absolute top-2 right-2 md:top-6 md:right-6 bg-background/60 backdrop-blur-sm px-2 py-1 md:px-3 md:py-2 rounded-full text-[10px] md:text-sm font-medium z-20 hidden xs:block">
              {current + 1} / {activeBanners.length}
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
};
