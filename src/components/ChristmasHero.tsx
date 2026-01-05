import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { getCurrentPromotionalStage, isHighDiscountPeriod } from "@/lib/promotions";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroChristmas from "@/assets/hero-christmas.png";
import heroChristmasMobile from "@/assets/hero-christmas-mobile.png";
export const ChristmasHero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const currentStage = getCurrentPromotionalStage();
  const isHighDiscount = isHighDiscountPeriod();
  
  useEffect(() => {
    const targetDate = currentStage?.endDate || new Date('2025-12-25T00:00:00');
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1000 / 60 % 60),
          seconds: Math.floor(difference / 1000 % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [currentStage]);
  return <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 md:hidden">
        <OptimizedImage src={heroChristmasMobile} alt="Garett Beauty - Tecnología estética profesional" className="w-full h-full object-cover object-bottom" priority blurPlaceholder />
      </div>
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <OptimizedImage src={heroChristmas} alt="Garett Beauty - Tecnología estética profesional" className="w-full h-full object-cover object-right" priority blurPlaceholder />
      </div>

      <div className="container relative z-10 px-6 py-12 md:py-20 lg:py-28 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-3 md:space-y-5 text-left max-w-[240px] md:max-w-md lg:max-w-xl">
            {/* Badge */}
            <Badge className="bg-gray-900/10 text-gray-900 border-gray-900/20 hover:bg-gray-900/20 px-3 py-1.5 text-[10px] md:text-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
              Tecnología Eslava
            </Badge>

            {/* Main heading */}
            <h1 className="md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight text-4xl">
              Regala{" "}
              <span className="text-white">belleza</span>
              <br />
              esta Navidad
            </h1>

            {/* Subtitle */}
            <p className="md:text-base text-gray-800 max-w-[220px] md:max-w-md font-light text-sm pb-[10px]">
              Rutinas completas de spa en casa. 
              <span className="text-amber-700 font-semibold"> Hasta {currentStage ? `-${currentStage.baseDiscount + (currentStage.bundleExtraDiscount || 0)}%` : "-35%"} en packs</span>
            </p>


            {/* Countdown */}
            {isHighDiscount && <div className="flex gap-2 md:gap-3">
                {[{
              value: timeLeft.days,
              label: "Días"
            }, {
              value: timeLeft.hours,
              label: "Horas"
            }, {
              value: timeLeft.minutes,
              label: "Min"
            }, {
              value: timeLeft.seconds,
              label: "Seg"
            }].map((item, index) => <div key={index} className="text-center">
                    <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2 min-w-[40px] md:min-w-[50px]">
                      <span className="text-base md:text-xl font-bold text-gray-900">
                        {item.value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-700 mt-0.5 block">{item.label}</span>
                  </div>)}
              </div>}

            {/* CTAs */}
            <div className="flex flex-col gap-2 w-full max-w-[200px] md:max-w-[280px]">
              <Button asChild size="default" className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg h-9 md:h-10 px-4 text-xs md:text-sm w-full">
                <a href="#christmas-bundles" className="flex items-center justify-center gap-2">
                  <Gift className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Ver Packs de Navidad
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="border-gray-900/30 bg-white/50 text-gray-900 hover:bg-white/70 h-9 md:h-10 px-4 text-xs md:text-sm w-full">
                <Link to="/productos" className="flex items-center justify-center gap-2">
                  Ver productos
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-3 pt-1 text-gray-800 text-[10px] md:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-600"></span>
                Envío gratis 24-48h
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-600"></span>
                Garantía 2 años
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-600"></span>
                En El Corte Inglés
              </div>
            </div>
          </div>

          {/* Right Side - Empty for model in background */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>;
};