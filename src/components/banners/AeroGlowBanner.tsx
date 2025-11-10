import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import patternImage from "@/assets/garett-pattern-1.png";

export const AeroGlowBanner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-promo-aeroglow via-background to-promo-aeroglow overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="container mx-auto px-6 md:px-8 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 py-12 md:py-16 max-w-2xl">
          <Badge className="bg-primary text-primary-foreground animate-pulse text-xs md:text-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            EXCLUSIVO LANZAMIENTO
          </Badge>
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Presentamos<br />
              <span className="text-primary">AeroGlow</span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Nueva generación de limpieza facial profesional con tecnología avanzada
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span>IPL Avanzada</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span>Profesionales</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span>Stock Limitado</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button asChild size="lg" className="group text-sm md:text-base h-12 px-8 w-full sm:w-auto">
              <Link to="/productos">
                Descubre AeroGlow
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm md:text-base h-12 px-8 w-full sm:w-auto">
              <Link to="/productos">
                Ver colección
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Image Placeholder */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary-light to-promo-aeroglow-dark flex items-center justify-center shadow-2xl">
            <Sparkles className="w-20 h-20 lg:w-24 lg:h-24 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
