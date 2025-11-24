import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden h-screen max-h-[900px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      <div className="container relative py-8 md:py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-3 md:space-y-6 text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              TU SPA DE LUJO EN CASA
            </h1>
            
            {/* CTAs */}
            <div className="flex flex-col gap-2 md:gap-4">
              <Button asChild size="default" className="text-sm md:text-base group bg-white text-primary hover:bg-white/90 h-10 md:h-11">
                <Link to="/novedades">
                  Ver Novedades
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="default" className="text-sm md:text-base border-white text-white hover:bg-white/10 h-10 md:h-11">
                <Link to="/superventas">
                  Ver Superventas
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col gap-2 text-xs md:text-sm text-white pt-2 md:pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                <span>Garantía 2 años</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                <span>Envío gratis desde 150€</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                <span>En El Corte Inglés</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Free space for model */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};