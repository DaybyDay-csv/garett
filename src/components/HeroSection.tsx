import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useState, useEffect } from "react";
// Imágenes actuales (chica joven - fondo claro)
import heroBackground from "@/assets/hero-background.png";
import heroMobile from "@/assets/hero-mobile.png";
// Imágenes nuevas (mujer madura - fondo oscuro)
import heroMatureDesktop from "@/assets/hero-mature-desktop.png";
import heroMatureMobile from "@/assets/hero-mature-mobile.png";
export const HeroSection = () => {
  // true = mujer madura (fondo oscuro), false = chica joven (fondo claro)
  const [isAlternateHero, setIsAlternateHero] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlternateHero(prev => !prev);
    }, 10000); // 10s para cada imagen, rotación cada 10 segundos
    
    return () => clearInterval(interval);
  }, [isAlternateHero]);

  return <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 md:hidden">
        <OptimizedImage 
          src={isAlternateHero ? heroMatureMobile : heroMobile} 
          alt="Hero mobile background" 
          className="w-full h-full object-cover object-center" 
          priority 
          blurPlaceholder
        />
      </div>
      
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <OptimizedImage 
          src={isAlternateHero ? heroMatureDesktop : heroBackground} 
          alt="Hero desktop background" 
          className="w-full h-full object-cover object-right" 
          priority 
          blurPlaceholder
        />
      </div>
      
      <div className="container relative py-8 md:py-20 h-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-4 md:space-y-6 text-left max-w-[320px] md:max-w-xl lg:ml-12 relative">
            {/* Soft gradient behind text for readability */}
            <div className={`absolute inset-0 -inset-x-4 -inset-y-2 bg-gradient-to-r rounded-lg blur-md -z-10 ${
              isAlternateHero ? 'from-black/40' : 'from-background/60'
            } to-transparent`} />
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium animate-fade-in ${
              isAlternateHero ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
            }`}>
              <Sparkles className="w-4 h-4 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight animate-fade-in [animation-delay:100ms] ${
              isAlternateHero ? 'text-white' : 'text-header'
            }`}>
              BLACK FRIDAY<br />
              UP TO 50% OFF<br />
              TU SPA DE<br className="hidden md:block" />{" "}
              LUJO EN CASA
            </h1>
            
            {/* CTAs */}
            <div className="flex flex-col gap-3 md:gap-4 w-full md:max-w-none animate-fade-in [animation-delay:200ms]">
              <Button asChild size="lg" className={`text-base md:text-base group h-12 md:h-12 px-6 max-w-[220px] md:max-w-none ${
                isAlternateHero 
                  ? 'bg-white hover:bg-white/90 text-gray-900' 
                  : 'bg-header hover:bg-header/90 text-header-foreground'
              }`}>
                <Link to="/productos">
                  Ver Productos
                  <ArrowRight className="ml-2 w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className={`text-base md:text-base h-12 md:h-12 px-6 max-w-[220px] md:max-w-none ${
                isAlternateHero 
                  ? 'border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white' 
                  : 'border-header/30 bg-header/5 text-header hover:bg-header/10 hover:text-header'
              }`}>
                <Link to="/superventas">
                  Superventas 
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className={`flex flex-col gap-2 md:gap-3 text-sm md:text-sm pt-2 md:pt-4 animate-fade-in [animation-delay:300ms] ${
              isAlternateHero ? 'text-white' : 'text-header'
            }`}>
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