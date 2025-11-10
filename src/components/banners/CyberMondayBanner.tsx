import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Check, Gift, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import patternImage from "@/assets/garett-pattern-2.png";

export const CyberMondayBanner = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const discountCode = "CYBERMONDAY15";

  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const targetDate = new Date('2025-12-01T23:59:59');
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[500px] bg-gradient-to-br from-promo-cm-start via-promo-cm-mid to-promo-cm-end overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          filter: 'brightness(0) invert(1)'
        }}
      />
      
      {/* Circuit pattern effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-promo-cm-mid/40 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-promo-cm-end/40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 md:px-8 min-h-full flex flex-col items-center justify-center text-center relative z-10 space-y-4 md:space-y-8 py-16 md:py-20 pb-20 md:pb-20">
        {/* Date Badge */}
        <Badge variant="outline" className="border-white text-white text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2">
          <Zap className="w-3 h-3 mr-1" />
          1 DICIEMBRE
        </Badge>
        
        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Zap className="w-6 h-6 md:w-12 md:h-12 text-white animate-pulse" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              Cyber Monday
            </h1>
            <Zap className="w-6 h-6 md:w-12 md:h-12 text-white animate-pulse" />
          </div>
          
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
            Última oportunidad
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
            15% de descuento
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed">
            + Regalo gratis desde €70
          </p>
        </div>

        {/* Countdown Timer - Improved Spacing */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 max-w-md w-full">
          <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            Termina en
          </p>
          <div className="flex gap-2 md:gap-4 justify-center">
            {[
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Seg', value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="bg-white text-promo-cm-start text-xl md:text-3xl font-bold rounded px-2 py-2 md:px-4 md:py-3 min-w-[50px] md:min-w-[70px]">
                  {String(item.value).padStart(2, '0')}
                </div>
                <p className="text-white/70 text-[10px] md:text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Code - Improved Mobile */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 max-w-lg w-full space-y-2 md:space-y-4">
          <p className="text-white/80 text-xs md:text-sm">Código de descuento</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-white text-promo-cm-start text-lg md:text-2xl font-mono font-bold px-3 md:px-4 py-2 md:py-3 rounded whitespace-nowrap overflow-x-auto">
              {discountCode}
            </code>
            <Button
              size="icon"
              variant="secondary"
              onClick={copyCode}
              className="h-12 w-12 flex-shrink-0"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
          {copied && (
            <p className="text-xs md:text-sm text-white animate-in fade-in">
              ✓ Código copiado
            </p>
          )}
        </div>

        {/* Benefits - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 text-sm md:text-base text-white w-full max-w-2xl">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="font-medium">15% en todo</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="font-medium">Regalo gratis</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="font-medium">Solo 24 horas</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button asChild size="lg" variant="secondary" className="text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto max-w-xs">
            <Link to="/productos">
              Última oportunidad
            </Link>
          </Button>

          <p className="text-xs md:text-sm text-white/70 px-4 mt-3">
            ⚡ La última oferta del año - No te la pierdas
          </p>
        </div>
      </div>
    </div>
  );
};
