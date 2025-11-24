import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[800px] md:min-h-[700px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      <div className="container relative py-12 md:py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-6 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              TU SPA DE LUJO EN CASA
            </h1>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base group bg-white text-primary hover:bg-white/90">
                <Link to="/novedades">
                  Ver Novedades
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-base border-white text-white hover:bg-white/10">
                <Link to="/superventas">
                  Ver Superventas
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col gap-3 text-sm text-white pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Garantía 2 años</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Envío gratis desde 150€</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
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