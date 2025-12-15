import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Snowflake, Sparkles, Timer, ChevronRight } from "lucide-react";
import { getCurrentPromotionalStage, isHighDiscountPeriod, getECIComparisonMessage } from "@/lib/promotions";
import { useEffect, useState } from "react";

export const ChristmasHero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const currentStage = getCurrentPromotionalStage();
  const isHighDiscount = isHighDiscountPeriod();
  const eciMessage = getECIComparisonMessage();

  useEffect(() => {
    const targetDate = currentStage?.endDate || new Date('2025-12-25T00:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [currentStage]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#8b1538] min-h-[500px] md:min-h-[600px]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Snowflakes pattern */}
        <div className="absolute top-10 left-10 text-white/10 text-6xl animate-pulse">❄</div>
        <div className="absolute top-32 right-20 text-white/10 text-4xl animate-pulse delay-300">❄</div>
        <div className="absolute bottom-20 left-1/4 text-white/10 text-5xl animate-pulse delay-500">❄</div>
        <div className="absolute top-1/2 right-10 text-white/10 text-3xl animate-pulse delay-700">✨</div>
        <div className="absolute bottom-32 right-1/3 text-white/10 text-4xl animate-pulse delay-100">❄</div>
        
        {/* Gold accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>

      <div className="container relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-amber-500/20 text-amber-200 border-amber-400/30 hover:bg-amber-500/30 px-4 py-2 text-sm">
            <Gift className="w-4 h-4 mr-2" />
            {currentStage?.badge || "NAVIDAD 2024"}
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight">
            Regala{" "}
            <span className="font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              belleza
            </span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">esta Navidad</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto font-light">
            Rutinas completas de spa en casa. 
            <span className="text-amber-300 font-medium"> Hasta {currentStage ? `-${currentStage.baseDiscount + (currentStage.bundleExtraDiscount || 0)}%` : "-35%"} en packs</span>
          </p>

          {/* ECI comparison badge */}
          {eciMessage && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm">{eciMessage}</span>
            </div>
          )}

          {/* Countdown */}
          {isHighDiscount && (
            <div className="flex justify-center gap-3 md:gap-4 mb-8">
              {[
                { value: timeLeft.days, label: "Días" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Seg" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[50px] md:min-w-[60px]">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs text-white/60 mt-1 block">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 h-12 px-8 text-base"
            >
              <a href="#christmas-bundles">
                <Gift className="w-5 h-5 mr-2" />
                Ver Packs de Navidad
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base"
            >
              <Link to="/productos">
                Ver todos los productos
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Envío gratis 24-48h
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Garantía 2 años
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              En El Corte Inglés
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
