import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroChristmas from "@/assets/hero-christmas.png";

export const HeroSection = () => {
  return <section className="relative overflow-hidden min-h-[600px] md:min-h-[850px] lg:min-h-[900px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage src={heroChristmas} alt="Garett Beauty - Tecnología estética profesional" className="w-full h-full object-cover object-right" priority blurPlaceholder />
      </div>
      
      <div className="container relative py-8 md:py-24 lg:py-32 h-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-4 md:space-y-8 lg:space-y-10 text-left max-w-[280px] md:max-w-xl lg:max-w-2xl lg:ml-12 relative">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-medium animate-fade-in bg-gray-900/10 text-gray-900 border border-gray-900/20">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-semibold leading-tight tracking-tight animate-fade-in [animation-delay:100ms] text-gray-900">
              Tecnología estética profesional con resultados en semanas.
              <br />
              
            </h1>
            
            <p className="text-xs md:text-base lg:text-lg leading-relaxed animate-fade-in [animation-delay:150ms] text-gray-800">
              Sin agujas, sin dolor.<br />
              Con la confianza de El Corte Inglés.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col gap-2 md:gap-4 w-full max-w-[200px] md:max-w-[280px] animate-fade-in [animation-delay:200ms]">
              <Button asChild size="default" className="text-xs md:text-base group h-9 md:h-12 lg:h-14 px-4 md:px-6 w-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                <Link to="/productos" className="flex items-center justify-center gap-2">
                  Ver Productos
                  <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="default" className="text-xs md:text-base h-9 md:h-12 lg:h-14 px-4 md:px-6 w-full border-gray-900/30 bg-white/50 text-gray-900 hover:bg-white/70 hover:border-gray-900/50">
                <Link to="/superventas">
                  Superventas 
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col gap-1 md:gap-2 text-[10px] md:text-sm lg:text-base pt-1 md:pt-2 animate-fade-in [animation-delay:300ms] text-gray-900">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-600"></div>
                <span className="font-medium">Firmeza visible en 4 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-600"></div>
                <span className="font-medium">90% menos vello en 8 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-600"></div>
                <span className="font-medium">Ahorra 3.000€/año vs clínicas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-600"></div>
                <span className="font-medium">Garantía extendida + El Corte Inglés</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Free space for model */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>;
};