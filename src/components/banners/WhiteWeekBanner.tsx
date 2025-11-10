import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Copy, Check, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import patternImage from "@/assets/garett-pattern-2.png";
import { getCurrentPromotionalStage } from "@/lib/promotions";
export const WhiteWeekBanner = () => {
  const [copied, setCopied] = useState(false);
  const currentStage = getCurrentPromotionalStage();
  const discountCode = "WHITEWEEK20";
  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="relative w-full min-h-[500px] md:min-h-[500px] bg-gradient-to-br from-promo-white via-background to-promo-white overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `url(${patternImage})`,
      backgroundSize: '300px',
      backgroundRepeat: 'repeat'
    }} />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto px-6 md:px-8 min-h-full flex flex-col items-center justify-center text-center relative z-10 space-y-4 md:space-y-8 py-16 md:py-20 pb-20 md:pb-20 max-w-5xl">
        {/* Date Badge */}
        <Badge variant="outline" className="border-primary text-primary text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2">
          17 - 27 NOVIEMBRE
        </Badge>
        
        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            White Week
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="h-px w-8 md:w-16 bg-border" />
            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-primary">20% de descuento</p>
            <div className="h-px w-8 md:w-16 bg-border" />
          </div>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
            En toda la tienda + Regalo gratis desde €70
          </p>
        </div>

        {/* Discount Code - Improved Mobile */}
        

        {/* Benefits - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 text-sm md:text-base w-full max-w-2xl">
          <div className="flex items-center justify-center gap-2">
            <Percent className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <span className="font-medium">20% en todo</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <span className="font-medium">Regalo desde €70</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-primary font-bold">✓</div>
            <span className="font-medium">Envío 24/48hrs</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button size="lg" className="text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 w-full sm:w-auto max-w-xs" onClick={() => {
          const element = document.getElementById('superventas');
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }}>
            Comprar ahora
          </Button>

          {/* Countdown if active */}
          {currentStage?.name === 'White Week' && <p className="text-xs md:text-sm text-muted-foreground mt-3">
              ⏰ Oferta válida hasta el 27 de Noviembre
            </p>}
        </div>
      </div>
    </div>;
};