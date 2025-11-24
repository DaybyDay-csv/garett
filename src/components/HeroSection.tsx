import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import aeroglowHero from "@/assets/aeroglow-hero.png";
export const HeroSection = () => {
  return <section className="relative bg-gradient-to-br from-background via-secondary/5 to-primary/5 overflow-hidden">
      <div className="container py-12 md:py-20">
        <div className="flex flex-col items-center justify-center">
          {/* Text Content */}
          <div className="space-y-6 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-6xl text-center px-0 mx-0 my-[20px] py-[16px] pb-0">
              ​TU SPA DE LUJO EN CASA       
            </h1>
            
            
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base group">
                <Link to="/novedades">
                  Ver Novedades
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary/5">
                <Link to="/superventas">
                  Ver dispositivos para cuerpo
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators Mini */}
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Garantía 2 años</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Envío gratis desde 150€</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>En El Corte Inglés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};