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

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-promo-white via-background to-promo-white overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10 space-y-8">
        {/* Date Badge */}
        <Badge variant="outline" className="border-primary text-primary text-sm px-4 py-2">
          17 - 27 NOVIEMBRE
        </Badge>
        
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            White Week
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-border" />
            <p className="text-2xl md:text-4xl font-bold text-primary">
              20% de descuento
            </p>
            <div className="h-px w-16 bg-border" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            En toda la tienda + Regalo gratis desde €70
          </p>
        </div>

        {/* Discount Code */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full space-y-4">
          <p className="text-sm text-muted-foreground">Código de descuento</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-secondary text-foreground text-2xl font-mono font-bold px-4 py-3 rounded">
              {discountCode}
            </code>
            <Button
              size="icon"
              variant="outline"
              onClick={copyCode}
              className="h-12 w-12"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 animate-in fade-in">
              ✓ Código copiado al portapapeles
            </p>
          )}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary" />
            <span className="font-medium">20% en todo</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-medium">Regalo desde €70</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center text-primary font-bold">✓</div>
            <span className="font-medium">Envío gratis &gt;€60</span>
          </div>
        </div>

        {/* CTA */}
        <Button asChild size="lg" className="text-lg px-8">
          <Link to="/productos">
            Comprar ahora
          </Link>
        </Button>

        {/* Countdown if active */}
        {currentStage?.name === 'White Week' && (
          <p className="text-sm text-muted-foreground">
            ⏰ Oferta válida hasta el 27 de Noviembre
          </p>
        )}
      </div>
    </div>
  );
};
