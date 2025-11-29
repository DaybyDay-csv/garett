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
              isAlternateHero ? 'bg-white/20 text-white border border-white/30' : 'bg-primary/10 text-primary border border-primary/20'
            }`}>
              <Sparkles className="w-4 h-4 md:w-4 md:h-4" />
              Tecnología polaca de última generación
            </div>
            
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight animate-fade-in [animation-delay:100ms] ${
              isAlternateHero ? 'text-white' : 'text-foreground'
            }`}>
              Tecnología estética profesional<br />
              con resultados en semanas.<br />
              <span className={isAlternateHero ? 'text-white' : 'text-primary'}>Hoy con hasta -50%</span>
            </h1>
            
            <p className={`text-base md:text-lg leading-relaxed animate-fade-in [animation-delay:150ms] ${
              isAlternateHero ? 'text-white/90' : 'text-foreground/80'
            }`}>
              Dispositivos faciales y corporales con base científica, sin agujas ni dolor, con la confianza de El Corte Inglés.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col gap-3 md:gap-4 w-full md:max-w-none animate-fade-in [animation-delay:200ms]">
              <Button asChild size="lg" className={`text-base md:text-base group h-12 md:h-12 px-6 max-w-[240px] md:max-w-none ${
                isAlternateHero 
                  ? 'bg-white hover:bg-white/90 text-gray-900 shadow-lg' 
                  : 'bg-foreground hover:bg-foreground/90 text-background shadow-lg'
              }`}>
                <Link to="/black-friday">
                  Ver dispositivos Black Friday
                  <ArrowRight className="ml-2 w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className={`text-base md:text-base h-12 md:h-12 px-6 max-w-[240px] md:max-w-none ${
                isAlternateHero 
                  ? 'border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white' 
                  : 'border-foreground/30 bg-background/80 text-foreground hover:bg-foreground/10 hover:border-foreground/50'
              }`}>
                <Link to="/superventas">
                  Superventas 
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className={`flex flex-col gap-2 md:gap-3 text-sm md:text-sm pt-2 md:pt-4 animate-fade-in [animation-delay:300ms] ${
              isAlternateHero ? 'text-white' : 'text-foreground'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isAlternateHero ? 'bg-green-400' : 'bg-green-600'}`}></div>
                <span className="font-medium">Firmeza visible en 4 semanas desde casa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isAlternateHero ? 'bg-green-400' : 'bg-green-600'}`}></div>
                <span className="font-medium">Hasta un 90% menos de vello en 8 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isAlternateHero ? 'bg-green-400' : 'bg-green-600'}`}></div>
                <span className="font-medium">Ahorra hasta 3.000€/año vs clínicas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isAlternateHero ? 'bg-green-400' : 'bg-green-600'}`}></div>
                <span className="font-medium">Garantía extendida + En El Corte Inglés</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Free space for model */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>;
};