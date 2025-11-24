import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import aeroglowHero from "@/assets/aeroglow-hero.png";
export const HeroSection = () => {
  return <section className="relative bg-gradient-to-br from-background via-secondary/5 to-primary/5 overflow-hidden">
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className="md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-6xl text-center px-0 mx-0 my-[20px] py-[16px] pb-0">
              ​TU SPA DE LUJO EN CASA       
            </h1>
            
            
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base group">
                <Link to="/productos?category=masajeadores-faciales">
                  Ver dispositivos para rostro
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary/5">
                <Link to="/productos?category=corporales">
                  Ver dispositivos para cuerpo
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators Mini */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground pt-4">
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
          
          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                <p className="text-sm font-semibold text-foreground">Certificado CE</p>
                <p className="text-xs text-muted-foreground">Tecnología aprobada</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>;
};