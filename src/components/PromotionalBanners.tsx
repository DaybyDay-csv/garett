import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AeroGlowBanner } from "@/components/banners/AeroGlowBanner";
import { GWPBanner } from "@/components/banners/GWPBanner";
import { WhiteWeekBanner } from "@/components/banners/WhiteWeekBanner";
import { BlackFridayBanner } from "@/components/banners/BlackFridayBanner";
import { CyberMondayBanner } from "@/components/banners/CyberMondayBanner";
import { getActiveBanners } from "@/lib/bannerConfig";
import { useEffect } from "react";

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
        className="w-full"
        opts={{
          loop: true,
          duration: 30,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="items-stretch">
          {activeBanners.map((bannerId) => {
            const BannerComponent = bannerComponents[bannerId as keyof typeof bannerComponents];
            return (
              <CarouselItem key={bannerId} className="flex">
                <div className="w-full">
                  <BannerComponent />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Arrows - Visible on mobile, enhanced on hover desktop */}
        {activeBanners.length > 1 && (
          <>
            <CarouselPrevious className="left-2 md:left-8 opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-xl backdrop-blur-md hover:scale-110 h-8 w-8 md:h-12 md:w-12 border border-white/20" />
            <CarouselNext className="right-2 md:right-8 opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity shadow-xl backdrop-blur-md hover:scale-110 h-8 w-8 md:h-12 md:w-12 border border-white/20" />

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
