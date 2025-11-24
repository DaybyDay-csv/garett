import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";
import heroMobile from "@/assets/hero-mobile.png";
export const HeroSection = () => {
  return <section className="relative overflow-hidden min-h-[550px] md:min-h-[700px]">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{
      backgroundImage: `url(${heroMobile})`
    }} />
      
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 bg-cover bg-right bg-no-repeat hidden md:block" style={{
      backgroundImage: `url(${heroBackground})`
    }} />
      
      <div className="container relative py-6 md:py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-3 md:space-y-6 text-left max-w-[280px] md:max-w-xl relative">
            {/* Soft gradient behind text for readability */}
            <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-gradient-to-r from-background/60 to-transparent rounded-lg blur-md -z-10" />
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold animate-fade-in">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight text-header animate-fade-in [animation-delay:100ms]">
              TU SPA DE  
LUJO EN CASA
            </h1>
            
            {/* CTAs */}
            <div className="flex flex-col gap-2.5 md:gap-4 w-64 md:max-w-none animate-fade-in [animation-delay:200ms]">
              <Button asChild size="lg" className="text-sm md:text-base group bg-header hover:bg-header/90 text-header-foreground h-10 md:h-11 px-3 max-w-[180px] md:max-w-none">
                <Link to="/novedades">
                  Ver Novedades
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-sm md:text-base border-header text-header hover:bg-header/5 h-10 md:h-11 px-3 max-w-[180px] md:max-w-none">
                <Link to="/superventas">
                  Ver Superventas
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col gap-1.5 md:gap-3 text-xs md:text-sm text-header pt-1 md:pt-4 animate-fade-in [animation-delay:300ms]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="font-medium">Garantía 2 años</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="font-medium">Envío gratis desde 150€</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="font-medium">En El Corte Inglés</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Free space for model */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>;
};