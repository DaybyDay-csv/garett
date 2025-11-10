import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Gift, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import patternImage from "@/assets/garett-pattern-1.png";
import { getCurrentPromotionalStage } from "@/lib/promotions";

export const BlackFridayBanner = () => {
  const currentStage = getCurrentPromotionalStage();
  const isActive = currentStage?.name === 'Black Friday';

  const tiers = [
    { name: "SUPER EARLY", discount: "50%", uses: 150, icon: Flame, color: "from-promo-bf-start to-promo-bf-mid" },
    { name: "EARLY BIRD", discount: "35%", uses: 450, icon: Zap, color: "from-promo-bf-mid to-promo-bf-start" },
    { name: "BLACK FRIDAY", discount: "25%", uses: "∞", icon: Gift, color: "from-promo-bf-start to-promo-bf-end" },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-promo-bf-start via-promo-bf-mid to-promo-bf-end overflow-hidden">
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
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-promo-bf-mid/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-promo-bf-start/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10 space-y-4 md:space-y-8 py-8">
        {/* Live Badge */}
        {isActive && (
          <Badge className="bg-white text-promo-bf-start animate-pulse text-xs md:text-sm px-3 py-1 md:px-4 md:py-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-promo-bf-start opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-promo-bf-start"></span>
            </span>
            EN VIVO AHORA
          </Badge>
        )}
        
        {/* Date Badge */}
        <Badge variant="outline" className="border-white text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2">
          28 - 30 NOVIEMBRE
        </Badge>
        
        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl">
            Black Friday
            <span className="block text-xl md:text-3xl lg:text-5xl mt-1 md:mt-2">2025</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-4xl font-bold text-white drop-shadow-lg">
            Hasta <span className="text-4xl md:text-5xl lg:text-6xl">50%</span> OFF
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-white/90">
            + Regalo gratis desde €70
          </p>
        </div>

        {/* Tiered Offers - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-4xl px-2">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 md:p-6 text-white space-y-1 md:space-y-3 hover:bg-white/20 transition-all hover:scale-105"
              >
                <Icon className="w-5 h-5 md:w-8 md:h-8 mx-auto" />
                <div>
                  <p className="text-[10px] md:text-sm font-semibold uppercase tracking-wider">{tier.name}</p>
                  <p className="text-2xl md:text-4xl font-bold my-1 md:my-2">-{tier.discount}</p>
                  <p className="text-[10px] md:text-xs text-white/70">
                    {typeof tier.uses === 'number' ? `${tier.uses} usos` : 'Ilimitado'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="space-y-2 md:space-y-4">
          <Button asChild size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8 shadow-2xl hover:scale-105 transition-transform">
            <Link to="/black-friday">
              Ver ofertas Black Friday
            </Link>
          </Button>
          
          {isActive && (
            <p className="text-xs md:text-sm text-white/80">
              ⚡ Las mejores ofertas se agotan rápido
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
