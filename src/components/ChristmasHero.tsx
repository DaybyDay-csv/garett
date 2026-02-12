import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { getCurrentPromotionalStage, isHighDiscountPeriod } from "@/lib/promotions";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroNew from "@/assets/hero-new.jpg";
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage src={heroNew} alt="Garett Beauty - Tecnología estética profesional" className="w-full h-full object-cover object-center" priority blurPlaceholder />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="container relative z-10 px-6 py-12 md:py-20 lg:py-28 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-3 md:space-y-5 text-left max-w-[240px] md:max-w-md lg:max-w-xl">
            {/* Badge */}
            <Badge className="bg-white/15 text-white border-white/25 hover:bg-white/25 px-3 py-1.5 text-[10px] md:text-sm backdrop-blur-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
              Tecnología Eslava
            </Badge>

            {/* Main heading */}
            <h1 className="md:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight text-4xl">
              Tu spa en casa,{" "}
              <span className="text-white/80">resultados</span>
              <br />
              profesionales
            </h1>

            {/* Subtitle */}
            <p className="md:text-base text-white/85 max-w-[220px] md:max-w-md font-light text-sm pb-[10px]">
              Dispositivos de estética avanzada con tecnología eslava. 
              <span className="text-amber-300 font-semibold"> Hasta -30% en packs</span>
            </p>

            {/* Key differentiators */}
            <div className="flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                </span>
                Tecnología LED, EMS y Radiofrecuencia
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <Gift className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                </span>
                Con la confianza de El Corte Inglés
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 w-full max-w-[200px] md:max-w-[280px]">
              <Button asChild size="default" className="bg-white hover:bg-white/90 text-gray-900 shadow-lg h-9 md:h-10 px-4 text-xs md:text-sm w-full font-semibold">
                <a href="#christmas-bundles" className="flex items-center justify-center gap-2">
                  <Gift className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Ver Packs Exclusivos
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="border-white/40 bg-white/10 text-white hover:bg-white/20 h-9 md:h-10 px-4 text-xs md:text-sm w-full backdrop-blur-sm">
                <Link to="/productos" className="flex items-center justify-center gap-2">
                  Ver productos
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-3 pt-1 text-white/80 text-[10px] md:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400"></span>
                Envío gratis 24-48h
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400"></span>
                Garantía 2 años
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400"></span>
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