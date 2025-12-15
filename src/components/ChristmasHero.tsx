import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { getCurrentPromotionalStage, isHighDiscountPeriod, getECIComparisonMessage } from "@/lib/promotions";
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
  const eciMessage = getECIComparisonMessage();
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
          <div className="space-y-4 md:space-y-5 text-left max-w-[280px] md:max-w-md lg:max-w-xl">
            {/* Badge */}
            <Badge className="bg-gray-900/10 text-gray-900 border-gray-900/20 hover:bg-gray-900/20 px-4 py-2 text-sm">
              <Gift className="w-4 h-4 mr-2" />
              {currentStage?.badge || "NAVIDAD 2024"}
            </Badge>

            {/* Main heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
              Regala{" "}
              <span className="text-amber-600">belleza</span>
              <br />
              esta Navidad
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-lg text-gray-800 max-w-md font-light">
              Rutinas completas de spa en casa. 
              <span className="text-amber-700 font-semibold"> Hasta {currentStage ? `-${currentStage.baseDiscount + (currentStage.bundleExtraDiscount || 0)}%` : "-35%"} en packs</span>
            </p>

            {/* ECI comparison badge */}
            {eciMessage}

            {/* Countdown */}
            {isHighDiscount && <div className="flex gap-3 md:gap-4">
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
                    <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[50px] md:min-w-[60px]">
                      <span className="text-xl md:text-2xl font-bold text-gray-900">
                        {item.value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-700 mt-1 block">{item.label}</span>
                  </div>)}
              </div>}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button asChild size="default" className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg h-10 px-4 text-sm">
                <a href="#christmas-bundles">
                  <Gift className="w-4 h-4 mr-2" />
                  Ver Packs de Navidad
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="border-gray-900/30 bg-white/50 text-gray-900 hover:bg-white/70 h-10 px-4 text-sm">
                <Link to="/productos">
                  Ver productos
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 pt-2 text-gray-800 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                Envío gratis 24-48h
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                Garantía 2 años
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
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