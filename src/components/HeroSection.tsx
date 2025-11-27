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
    }, isAlternateHero ? 45000 : 15000); // 45s para imagen madura, 15s para joven
    
    return () => clearInterval(interval);
  }, [isAlternateHero]);

  return <section className="relative overflow-hidden min-h-[550px] md:min-h-[700px]">
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
      
      <div className="container relative py-6 md:py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:items-center h-full">
          {/* Text Content - Left Side */}
          <div className="space-y-3 md:space-y-6 text-left max-w-[280px] md:max-w-xl lg:ml-12 relative">
            {/* Soft gradient behind text for readability */}
            <div className={`absolute inset-0 -inset-x-4 -inset-y-2 bg-gradient-to-r rounded-lg blur-md -z-10 ${
              isAlternateHero ? 'from-black/40' : 'from-background/60'
            } to-transparent`} />
            
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold animate-fade-in ${
              isAlternateHero ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
            }`}>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className={`text-3xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in [animation-delay:100ms] ${
              isAlternateHero ? 'text-white' : 'text-header'
            }`}>
              BLACK FRIDAY<br />
              UP TO 50% OFF<br />
              TU SPA DE<br className="hidden md:block" />{" "}
              LUJO EN CASA
            </h1>
            
            {/* CTAs */}
            <div className="flex flex-col gap-2.5 md:gap-4 w-64 md:max-w-none animate-fade-in [animation-delay:200ms]">
              <Button asChild size="lg" className={`text-sm md:text-base group h-10 md:h-11 px-3 max-w-[180px] md:max-w-none ${
                isAlternateHero 
                  ? 'bg-white hover:bg-white/90 text-gray-900' 
                  : 'bg-header hover:bg-header/90 text-header-foreground'
              }`}>
                <Link to="/productos">
                  Ver Productos
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className={`text-sm md:text-base h-10 md:h-11 px-3 max-w-[180px] md:max-w-none ${
                isAlternateHero 
                  ? 'border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white' 
                  : 'border-header/30 bg-header/5 text-header hover:bg-header/10 hover:text-header'
              }`}>
                <Link to="/superventas" className="font-light text-sm">
                  Superventas 
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className={`flex flex-col gap-1.5 md:gap-3 text-xs md:text-sm pt-1 md:pt-4 animate-fade-in [animation-delay:300ms] ${
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