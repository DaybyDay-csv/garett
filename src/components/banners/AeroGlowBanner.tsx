import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import patternImage from "@/assets/garett-pattern-1.png";

export const AeroGlowBanner = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-promo-aeroglow via-background to-promo-aeroglow overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-6 py-12">
          <Badge className="bg-primary text-primary-foreground animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            EXCLUSIVO LANZAMIENTO
          </Badge>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Presentamos<br />
              <span className="text-primary">AeroGlow</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Nueva generación de limpieza facial profesional con tecnología avanzada
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Tecnología IPL Avanzada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Resultados Profesionales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Stock Limitado</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="group">
              <Link to="/productos">
                Descubre AeroGlow
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/productos">
                Ver toda la colección
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Image Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-light to-promo-aeroglow-dark flex items-center justify-center shadow-2xl">
            <Sparkles className="w-24 h-24 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
