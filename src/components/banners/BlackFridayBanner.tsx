import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Gift, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import patternImage from "@/assets/garett-pattern-1.png";
import { getCurrentPromotionalStage } from "@/lib/promotions";
import { NewsletterCTA } from "@/components/NewsletterCTA";
export const BlackFridayBanner = () => {
  const currentStage = getCurrentPromotionalStage();
  const isActive = currentStage?.name === "Black Friday";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    // Black Friday 2025 - November 28th
    const targetDate = new Date("2025-11-28T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const tiers = [
    {
      name: "SUPER EARLY",
      discount: "50%",
      uses: 10,
      icon: Flame,
      color: "from-promo-bf-start to-promo-bf-mid",
    },
    {
      name: "EARLY BIRD",
      discount: "35%",
      uses: 25,
      icon: Zap,
      color: "from-promo-bf-mid to-promo-bf-start",
    },
    {
      name: "BLACK FRIDAY",
      discount: "25%",
      uses: "∞",
      icon: Gift,
      color: "from-promo-bf-start to-promo-bf-end",
    },
  ];
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[500px] bg-gradient-to-br from-promo-bf-start via-promo-bf-mid to-promo-bf-end overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
          filter: "brightness(0) invert(1)",
        }}
      />

      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-promo-bf-mid/30 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-promo-bf-start/30 blur-3xl animate-pulse"
        style={{
          animationDelay: "1s",
        }}
      />

      <div className="container mx-auto px-6 md:px-8 min-h-full flex flex-col items-center justify-center text-center relative z-10 space-y-3 md:space-y-8 py-16 md:py-20 pb-20 md:pb-20">
        {/* Live Badge */}
        {isActive && (
          <Badge className="bg-white text-promo-bf-start animate-pulse text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-promo-bf-start opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-promo-bf-start"></span>
            </span>
            EN VIVO AHORA
          </Badge>
        )}

        {/* Date Badge */}
        <Badge variant="outline" className="border-white text-white text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2">
          28 - 30 NOVIEMBRE
        </Badge>

        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
            Black Friday 2025
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
            Hasta <span className="text-3xl md:text-4xl lg:text-5xl">50%</span> OFF
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed">+ Regalo gratis desde €70</p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 max-w-2xl w-full">
          <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            Comienza en
          </p>
          <div className="flex gap-2 md:gap-3 justify-center">
            {[
              {
                label: "Días",
                value: timeLeft.days,
              },
              {
                label: "Horas",
                value: timeLeft.hours,
              },
              {
                label: "Min",
                value: timeLeft.minutes,
              },
              {
                label: "Seg",
                value: timeLeft.seconds,
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="bg-white text-promo-bf-start text-lg md:text-3xl font-bold rounded px-2 py-2 md:px-3 md:py-3 min-w-[45px] md:min-w-[65px]">
                  {String(item.value).padStart(2, "0")}
                </div>
                <p className="text-white/70 text-[10px] md:text-xs mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tiered Offers - Enhanced Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl px-4">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={index}
                className="relative bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl p-3 md:p-5 text-white space-y-1 md:space-y-2 hover:bg-white/25 hover:border-white/50 transition-all hover:scale-105 hover:shadow-2xl overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon with glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-5 h-5 md:w-8 md:h-8 mx-auto relative z-10 drop-shadow-lg" />
                </div>
                
                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white text-[9px] md:text-[10px] px-2 py-0.5 mb-1 md:mb-2">
                    {tier.name}
                  </Badge>
                  <p className="text-2xl md:text-4xl font-black my-1 drop-shadow-lg">-{tier.discount}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    <p className="text-[10px] md:text-xs text-white/90 font-medium">
                      {typeof tier.uses === "number" ? `${tier.uses} usos` : "Ilimitado"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="space-y-2 md:space-y-3 pt-2">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto max-w-xs"
          >
            <Link to="/black-friday">Ver ofertas</Link>
          </Button>

          <NewsletterCTA
            variant="inline"
            text="Recibe alertas de cada etapa"
            className="text-white/70 hover:text-white text-xs md:text-sm block"
          />

          {isActive && <p className="text-xs md:text-sm text-white/80"></p>}
        </div>
      </div>
    </div>
  );
};
