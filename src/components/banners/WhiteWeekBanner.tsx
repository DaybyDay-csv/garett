import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Copy, Check, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import patternImage from "@/assets/garett-pattern-2.png";
import { getCurrentPromotionalStage } from "@/lib/promotions";
import { NewsletterCTA } from "@/components/NewsletterCTA";
export const WhiteWeekBanner = () => {
  const [copied, setCopied] = useState(false);
  const currentStage = getCurrentPromotionalStage();
  const discountCode = "WHITEWEEK20";
  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="relative w-full bg-gradient-to-br from-promo-white via-background to-promo-white overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `url(${patternImage})`,
      backgroundSize: '300px',
      backgroundRepeat: 'repeat'
    }} />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center relative z-10 space-y-3 md:space-y-6 py-8 md:py-12 pb-12 md:pb-16 max-w-5xl">
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
        

        {/* Benefits - Enhanced Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base w-full max-w-2xl">
          <div className="group relative bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-3 md:p-4 hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Percent className="w-5 h-5 md:w-7 md:h-7 text-primary drop-shadow-lg group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs md:text-sm">20% en todo</span>
              <Badge className="bg-primary/20 text-primary text-[9px] px-2 py-0.5">Automático</Badge>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-accent/5 to-primary/5 backdrop-blur-sm border-2 border-accent/20 rounded-xl p-3 md:p-4 hover:border-accent/50 hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Gift className="w-5 h-5 md:w-7 md:h-7 text-accent-foreground drop-shadow-lg group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs md:text-sm">Regalo gratis</span>
              <Badge className="bg-accent/20 text-accent-foreground text-[9px] px-2 py-0.5">€70+</Badge>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border-2 border-border/20 rounded-xl p-3 md:p-4 hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-primary font-bold text-xl drop-shadow-lg group-hover:scale-110 transition-transform">✓</div>
              <span className="font-bold text-xs md:text-sm">Envío rápido</span>
              <Badge className="bg-primary/10 text-primary text-[9px] px-2 py-0.5">24-48h</Badge>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 space-y-2">
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

          <NewsletterCTA 
            variant="inline"
            text="🔔 Recibe notificaciones de nuevas etapas"
            className="text-muted-foreground hover:text-foreground text-xs md:text-sm block"
          />

          {/* Countdown if active */}
          {currentStage?.name === 'White Week' && <p className="text-xs md:text-sm text-muted-foreground mt-3">
              ⏰ Oferta válida hasta el 27 de Noviembre
            </p>}
        </div>
      </div>
    </div>;
};