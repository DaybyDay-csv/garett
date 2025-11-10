import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Timer, Gift, Copy, Check, Flame, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { promotionalStages, getCurrentPromotionalStage } from "@/lib/promotions";
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
interface PromotionalStage {
  name: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  discount: string;
  description: string;
  details: string;
  code?: string | null;
  codes?: Array<{
    code: string;
    discount: string;
    limit: string;
    urgency: string;
  }>;
  gwp?: boolean;
  gwpCode?: string;
  icon: any;
  color: string;
  badge: string;
}
interface BlackFridayTier {
  name: string;
  code: string;
  discount: string;
  startDate: Date;
  endDate: Date;
  remaining: number;
  color: string;
  icon: any;
}
interface CountdownTimerProps {
  promotionalStages: Array<{
    name: string;
    dates: string;
    startDate: Date;
    endDate: Date;
    discount: string;
    code?: string | null;
    icon: any;
    color: string;
    badge: string;
  }>;
}
const CountdownTimer = ({
  promotionalStages
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });
  const [currentPromoStage, setCurrentPromoStage] = useState<CountdownTimerProps['promotionalStages'][0] | null>(null);
  const [nextPromoStage, setNextPromoStage] = useState<CountdownTimerProps['promotionalStages'][0] | null>(null);
  const [currentBFTier, setCurrentBFTier] = useState<BlackFridayTier | null>(null);

  // Black Friday tiers (only active during BF period)
  const blackFridayTiers: BlackFridayTier[] = [{
    name: "SUPER EARLY BIRD",
    code: "EARLYBIRD50",
    discount: "50% OFF",
    startDate: new Date('2024-01-01T00:00:00'),
    // Demo: Active now
    endDate: new Date('2024-12-31T12:00:00'),
    remaining: 150,
    color: "from-red-500 to-orange-500",
    icon: Flame
  }, {
    name: "EARLY BIRD",
    code: "EARLYBIRD35",
    discount: "35% OFF",
    startDate: new Date('2024-01-01T00:00:00'),
    // Demo: Active now
    endDate: new Date('2024-12-31T12:00:00'),
    remaining: 450,
    color: "from-orange-500 to-yellow-500",
    icon: Zap
  }, {
    name: "BLACK FRIDAY",
    code: "BF25",
    discount: "25% OFF",
    startDate: new Date('2024-01-01T00:00:00'),
    // Demo: Active now
    endDate: new Date('2026-12-31T23:59:59'),
    remaining: 0,
    color: "from-primary to-primary-glow",
    icon: Timer
  }];
  useEffect(() => {
    const calculateTimeAndStage = () => {
      const now = new Date();

      // Find current promotional stage
      const activePromo = promotionalStages.find(stage => now >= stage.startDate && now <= stage.endDate);

      // Find next promotional stage
      const upcomingPromo = promotionalStages.find(stage => now < stage.startDate);
      setCurrentPromoStage(activePromo || null);
      setNextPromoStage(upcomingPromo || null);

      // If in Black Friday period, also check for active tier
      const activeBFTier = blackFridayTiers.find(tier => now >= tier.startDate && now <= tier.endDate);
      setCurrentBFTier(activeBFTier || null);

      // Calculate time left for current promotional stage
      const targetDate = activePromo ? activePromo.endDate : promotionalStages[promotionalStages.length - 1].endDate;
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1000 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1000 / 60 % 60),
        seconds: Math.floor(difference / 1000 % 60),
        isExpired: false
      });
    };

    // Initial calculation
    calculateTimeAndStage();

    // Update every second
    const timer = setInterval(() => {
      calculateTimeAndStage();
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  if (timeLeft.isExpired) {
    return <div className="text-center py-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-8">
        <p className="text-2xl font-bold text-white">¡Black Friday ha terminado!</p>
        <p className="text-white/80 mt-2">Gracias por participar. Vuelve el próximo año.</p>
      </div>;
  }
  const timeUnits = [{
    value: timeLeft.days,
    label: 'Días'
  }, {
    value: timeLeft.hours,
    label: 'Horas'
  }, {
    value: timeLeft.minutes,
    label: 'Minutos'
  }, {
    value: timeLeft.seconds,
    label: 'Segundos'
  }];

  // Display the active tier or stage
  const displayStage = currentBFTier || currentPromoStage;
  const StageIcon = displayStage?.icon;
  return <div className="mt-8 space-y-6">
      {/* Current Stage Banner */}
      {displayStage && (
        <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-xs text-white/70 uppercase tracking-wider mb-2">
              ETAPA ACTUAL
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${displayStage.color} flex items-center justify-center`}>
                {StageIcon && <StageIcon className="w-5 h-5 text-white" />}
              </div>
              <div>
                <div className="font-bold text-white text-xl">{displayStage.name}</div>
                {'discount' in displayStage && displayStage.discount && (
                  <Badge className={`bg-gradient-to-r ${displayStage.color} text-white border-0 mt-2`}>
                    {displayStage.discount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Countdown */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-white animate-pulse" />
          <p className="text-white/90 font-medium">
            {currentPromoStage ? `${currentPromoStage.name} termina en:` : 'Promociones terminan en:'}
          </p>
        </div>
        
        <div className="flex justify-center gap-3 md:gap-4">
          {timeUnits.map(unit => <div key={unit.label} className="flex flex-col items-center">
              <div className="relative">
                {/* Animated background */}
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm animate-pulse" />
                
                {/* Time box */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl md:text-5xl font-bold text-white text-center tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              {/* Label */}
              <div className="mt-2 text-xs md:text-sm text-white/80 font-medium uppercase tracking-wider">
                {unit.label}
              </div>
            </div>)}
        </div>
      </div>

      {/* Next Stage Preview */}
      {nextPromoStage && <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-5">
          <div className="text-center">
            <div className="text-xs text-white/70 uppercase tracking-wider mb-2">
              SIGUIENTE ETAPA
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${nextPromoStage.color} flex items-center justify-center opacity-60`}>
                <nextPromoStage.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">{nextPromoStage.name}</div>
                <div className="text-sm text-white/70">{nextPromoStage.dates}</div>
                {nextPromoStage.code && <div className="text-xs text-white/60 mt-1">Código: {nextPromoStage.code}</div>}
              </div>
            </div>
            <Badge className={`bg-gradient-to-r ${nextPromoStage.color} text-white border-0`}>
              {nextPromoStage.discount}
            </Badge>
          </div>
        </div>}

      {/* Urgency message */}
      {currentPromoStage && timeLeft.days === 0 && timeLeft.hours < 6 && <div className="text-center">
          <Badge variant="destructive" className="animate-pulse text-base px-4 py-2">
            <Flame className="w-4 h-4 mr-2" />
            ¡ÚLTIMA OPORTUNIDAD! Quedan menos de {timeLeft.hours}h
          </Badge>
        </div>}
    </div>;
};
const BlackFriday = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter BF products
        const bfProducts = data.filter(p => p.node.tags.includes('bf:2025'));
        setProducts(bfProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("¡Código copiado!", {
        description: `${code} copiado al portapapeles`
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error("Error al copiar código");
    }
  };

  // Promotional stages calendar - now imported from lib/promotions with extended properties
  const extendedPromotionalStages = promotionalStages.map(stage => ({
    ...stage,
    discount: stage.discountLabel,
    description: stage.name === "Warm-up" ? "Descuento aplicado directamente en productos" : stage.name === "White Week" ? "20% OFF (10% + 10% extra) + Regalo" : stage.name === "Black Friday" ? "Descuentos por etapas + Regalo" : "15% OFF + Regalo",
    details: stage.name === "Warm-up" ? "10% de descuento en toda la tienda" : stage.name === "White Week" ? "Descuento aplicado en productos + Banda de pelo gratis desde €70" : stage.name === "Black Friday" ? "20% base + códigos tier (-50%/-35%/-25%) + Banda de pelo gratis desde €70" : "Descuento aplicado en productos + Banda de pelo gratis desde €70",
    code: stage.name === "White Week" ? "WHITEWEEK20" : stage.name === "Cyber Monday" ? "CYBERMONDAY15" : null,
    codes: stage.name === "Black Friday" ? [{
      code: "EARLYBIRD50",
      discount: "50% OFF",
      limit: "150 usos",
      urgency: "high"
    }, {
      code: "EARLYBIRD35",
      discount: "35% OFF",
      limit: "450 usos",
      urgency: "medium"
    }, {
      code: "BF25",
      discount: "25% OFF",
      limit: "Ilimitado",
      urgency: "low"
    }] : [] as Array<{
      code: string;
      discount: string;
      limit: string;
      urgency: string;
    }>,
    gwp: stage.name !== "Warm-up",
    gwpCode: stage.name === "White Week" ? "REGALOWW70" : stage.name === "Black Friday" ? "REGALOBF70" : stage.name === "Cyber Monday" ? "REGALOCM70" : undefined
  }));

  // Determine current stage
  const currentStageData = getCurrentPromotionalStage();
  const getStageStatus = (stage: typeof extendedPromotionalStages[0]) => {
    const now = new Date();
    if (now < stage.startDate) return 'upcoming';
    if (now > stage.endDate) return 'ended';
    return 'active';
  };
  const currentStage = currentStageData ? extendedPromotionalStages.find(s => s.name === currentStageData.name) : null;
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-16 md:py-24">
        <div className="container relative text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Promociones Noviembre-Diciembre 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Calendario de Ofertas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl">
            Warm-up · White Week · Black Friday · Cyber Monday
          </p>
          <p className="text-lg text-white/80 mb-4 max-w-2xl">
            Hasta 50% de descuento + regalo gratis desde €70
          </p>

          {/* Countdown Timer */}
          <CountdownTimer promotionalStages={promotionalStages} />

          {/* Tier Info */}
          
        </div>
      </section>

      {/* Discount Codes Section */}
      <section className="container py-12 -mt-8">
        <div className="bg-background rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Calendario de Promociones</h2>
              <p className="text-muted-foreground">
                Descuentos progresivos desbloqueándose por etapas
              </p>
            </div>
            {currentStage && <Badge variant="default" className={`bg-gradient-to-r ${currentStage.color} text-white border-0 animate-pulse`}>
                <AlertCircle className="w-3 h-3 mr-1" />
                {currentStage.badge} ACTIVO
              </Badge>}
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="relative">
              {/* Progress bar track */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-slate-500 via-red-500 to-purple-500 transition-all duration-1000 relative" style={{
                width: (() => {
                  const now = new Date();
                  const start = extendedPromotionalStages[0].startDate;
                  const end = extendedPromotionalStages[extendedPromotionalStages.length - 1].endDate;
                  const total = end.getTime() - start.getTime();
                  const elapsed = now.getTime() - start.getTime();
                  const progress = Math.min(Math.max(elapsed / total * 100, 0), 100);
                  return `${progress}%`;
                })()
              }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              
              {/* Stage markers */}
              <div className="flex justify-between mt-3">
                {extendedPromotionalStages.map((stage, index) => {
                const Icon = stage.icon;
                const status = getStageStatus(stage);
                const isActive = status === 'active';
                const isEnded = status === 'ended';
                return <div key={stage.name} className="flex flex-col items-center" style={{
                  width: `${100 / extendedPromotionalStages.length}%`
                }}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${isActive ? `bg-gradient-to-br ${stage.color} shadow-lg scale-110 animate-pulse` : isEnded ? 'bg-primary/80' : 'bg-muted border-2 border-border'}`}>
                        <Icon className={`w-5 h-5 ${isActive || isEnded ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      <span className={`text-xs font-medium text-center ${isActive ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                        {stage.name}
                      </span>
                    </div>;
              })}
              </div>
            </div>
          </div>

          {/* Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extendedPromotionalStages.map(stage => {
            const Icon = stage.icon;
            const status = getStageStatus(stage);
            const isActive = status === 'active';
            const isUpcoming = status === 'upcoming';
            const isEnded = status === 'ended';
            return <div key={stage.name} className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${isActive ? 'border-primary shadow-2xl scale-[1.02]' : isEnded ? 'border-border/50 opacity-75' : 'border-border hover:border-primary/30 hover:shadow-lg'}`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} ${isActive ? 'opacity-10' : 'opacity-5'}`} />
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {isActive && <Badge className={`bg-gradient-to-r ${stage.color} text-white border-0 animate-pulse shadow-lg`}>
                        <Clock className="w-3 h-3 mr-1" />
                        EN CURSO
                      </Badge>}
                    {isUpcoming && <Badge variant="secondary" className="shadow-sm">
                        PRÓXIMAMENTE
                      </Badge>}
                    {isEnded && <Badge variant="outline" className="opacity-60">
                        FINALIZADO
                      </Badge>}
                  </div>

                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center flex-shrink-0 shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{stage.name}</h3>
                        <Badge variant="outline" className="text-xs font-normal">
                          {stage.dates}
                        </Badge>
                      </div>
                    </div>

                    {/* Discount */}
                    <div className={`text-3xl font-bold bg-gradient-to-br ${stage.color} bg-clip-text text-transparent mb-3`}>
                      {stage.discount}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {stage.details}
                    </p>

                    {/* Codes - Only show for Black Friday tiers */}
                    <div className="space-y-3">
                      {stage.codes && stage.codes.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">Códigos por nivel:</p>
                          {stage.codes.map(codeObj => (
                            <div 
                              key={codeObj.code} 
                              className={`bg-background/50 border-2 rounded-lg p-3 ${
                                codeObj.urgency === 'high' ? 'border-red-500/30' : 
                                codeObj.urgency === 'medium' ? 'border-orange-500/30' : 
                                'border-primary/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant={codeObj.urgency === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                                  {codeObj.discount}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{codeObj.limit}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="flex-1 font-mono text-sm font-bold">
                                  {codeObj.code}
                                </span>
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyCode(codeObj.code)}>
                                  {copiedCode === codeObj.code ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300 border-0">
                              ✓ Descuento automático
                            </Badge>
                          </div>
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            Se aplica directamente en productos
                          </p>
                        </div>
                      )}
                      
                      {/* GWP info without code */}
                      {stage.gwp && (
                        <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/20 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Gift className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                            <span className="text-xs font-medium text-pink-700 dark:text-pink-300">
                              Regalo gratis desde €70
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <p className="text-sm font-medium text-center mb-2">
              💡 <span className="font-bold">Descuentos automáticos</span>
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Los descuentos se aplican directamente. Solo en Black Friday necesitas códigos para los descuentos tier adicionales.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Productos en promoción</h2>
          <p className="text-muted-foreground">
            Descuentos especiales durante todo noviembre y principios de diciembre
          </p>
        </div>

        {loading ? <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando ofertas...</p>
          </div> : products.length === 0 ? <div className="py-20 text-center">
            <p className="text-muted-foreground">
              Las ofertas de Black Friday estarán disponibles pronto
            </p>
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => <ProductCard key={product.node.id} product={product} />)}
          </div>}

        {/* T&C */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-bold mb-3">Calendario y condiciones de las promociones</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <span className="font-semibold text-foreground">Warm-up (10-16 Nov):</span> 10% de descuento aplicado directamente en productos</li>
            <li>• <span className="font-semibold text-foreground">White Week (17-27 Nov):</span> 20% OFF (10% + 10% extra) aplicado en productos + Código REGALOWW70 para banda de pelo gratis desde €70</li>
            <li>• <span className="font-semibold text-foreground">Black Friday (28-30 Nov):</span> 20% base + códigos tier (EARLYBIRD50: 50% OFF limitado, EARLYBIRD35: 35% OFF limitado, BF25: 25% OFF) + Código REGALOBF70 para regalo desde €70</li>
            <li>• <span className="font-semibold text-foreground">Cyber Monday (1 Dic):</span> 15% OFF aplicado en productos + Código REGALOCM70 para regalo desde €70</li>
            <li>• Los descuentos Warm-up y White Week se aplican automáticamente en los precios de productos</li>
            <li>• Para Black Friday y Cyber Monday, introduce los códigos en el checkout</li>
            <li>• Los códigos EARLYBIRD tienen límite de usos (150 y 450 respectivamente, 1 por cliente)</li>
            <li>• El regalo (banda de pelo premium) se añade con el código específico de cada etapa</li>
            <li>• Garantía de 3 años en todos los productos</li>
            <li>• Devoluciones gratuitas durante 30 días</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>;
};
export default BlackFriday;