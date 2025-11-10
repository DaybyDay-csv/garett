import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Timer, Gift, Copy, Check, Flame, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date('2025-11-30T23:59:59');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isExpired) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl font-bold text-white">¡Black Friday ha terminado!</p>
        <p className="text-white/80 mt-2">Gracias por participar</p>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-white" />
        <p className="text-white/90 font-medium">La oferta termina en:</p>
      </div>
      
      <div className="flex justify-center gap-3 md:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="relative">
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm animate-pulse" />
              
              {/* Time box */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] hover:scale-110 transition-transform duration-300">
                <div className="text-3xl md:text-5xl font-bold text-white text-center tabular-nums animate-scale-in">
                  {String(unit.value).padStart(2, '0')}
                </div>
              </div>
            </div>
            
            {/* Label */}
            <div className="mt-2 text-xs md:text-sm text-white/80 font-medium uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Urgency message */}
      <div className="mt-6 text-center">
        <Badge variant="destructive" className="animate-pulse">
          <Flame className="w-3 h-3 mr-1" />
          ¡Solo quedan {timeLeft.days} días!
        </Badge>
      </div>
    </div>
  );
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
        description: `${code} copiado al portapapeles`,
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast.error("Error al copiar código");
    }
  };

  const discountCodes = [
    {
      code: "EARLYBIRD50",
      discount: "50% OFF",
      description: "Primeras 5 unidades",
      remaining: 150,
      total: 150,
      urgency: "high",
      icon: Flame,
      color: "from-red-500 to-orange-500",
      badge: "SÚPER LIMITADO"
    },
    {
      code: "EARLYBIRD35",
      discount: "35% OFF",
      description: "Siguientes 15 unidades",
      remaining: 450,
      total: 450,
      urgency: "medium",
      icon: Zap,
      color: "from-orange-500 to-yellow-500",
      badge: "LIMITADO"
    },
    {
      code: "BF25",
      discount: "25% OFF",
      description: "Descuento base toda la tienda",
      remaining: null,
      total: null,
      urgency: "low",
      icon: Timer,
      color: "from-primary to-primary-glow",
      badge: "PARA TODOS"
    },
    {
      code: "REGALOBF70",
      discount: "REGALO",
      description: "Banda de pelo gratis desde €70",
      remaining: null,
      total: null,
      urgency: "special",
      icon: Gift,
      color: "from-pink-500 to-purple-500",
      badge: "REGALO"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-16 md:py-24">
        <div className="container relative text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Black Friday 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Black Friday
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl">
            Hasta 50% de descuento + regalo gratis desde €70
          </p>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Tier Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Zap className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Early Bird -50%</h3>
              <p className="text-sm text-white/80">Primeras 5 unidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Timer className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Early Bird -35%</h3>
              <p className="text-sm text-white/80">Siguientes 15 unidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Gift className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Regalo gratis</h3>
              <p className="text-sm text-white/80">Desde 70€ - Banda de pelo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Codes Section */}
      <section className="container py-12 -mt-8">
        <div className="bg-background rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Códigos de descuento</h2>
              <p className="text-muted-foreground">
                Copia tu código y úsalo en el checkout
              </p>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              <AlertCircle className="w-3 h-3 mr-1" />
              ¡Solo 72h!
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {discountCodes.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedCode === item.code;
              const percentage = item.remaining && item.total 
                ? (item.remaining / item.total) * 100 
                : null;

              return (
                <div
                  key={item.code}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    item.urgency === 'high' 
                      ? 'border-red-500/50 hover:border-red-500' 
                      : item.urgency === 'medium'
                      ? 'border-orange-500/50 hover:border-orange-500'
                      : item.urgency === 'special'
                      ? 'border-pink-500/50 hover:border-pink-500'
                      : 'border-primary/50 hover:border-primary'
                  }`}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge 
                      variant={item.urgency === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs font-bold"
                    >
                      {item.badge}
                    </Badge>
                  </div>

                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Discount */}
                    <div className="mb-3">
                      <div className={`text-3xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                        {item.discount}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Progress bar for limited codes */}
                    {percentage !== null && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Disponibles</span>
                          <span className="font-bold">{item.remaining}/{item.total}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Code */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2 font-mono text-sm font-bold text-center border border-border">
                        {item.code}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyCode(item.code)}
                        className="hover-scale"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* Urgency indicator */}
                    {item.urgency === 'high' && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-red-500 font-medium animate-pulse">
                        <Flame className="w-3 h-3" />
                        ¡Se están agotando!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20 text-center">
            <p className="text-sm font-medium mb-2">
              💡 <span className="font-bold">Tip:</span> Los códigos Early Bird se agotan rápido - ¡Copia tu favorito ahora!
            </p>
            <p className="text-xs text-muted-foreground">
              Los descuentos se aplican automáticamente en el carrito al introducir el código
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Productos en oferta</h2>
          <p className="text-muted-foreground">
            Descuentos especiales válidos del 28/11 al 30/11
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando ofertas...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              Las ofertas de Black Friday estarán disponibles pronto
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        {/* T&C */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-bold mb-3">Condiciones de la promoción</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Descuentos válidos del 28/11 al 30/11/2025</li>
            <li>• <span className="font-semibold text-foreground">EARLYBIRD50:</span> 50% OFF - Limitado a 150 usos (1 por cliente)</li>
            <li>• <span className="font-semibold text-foreground">EARLYBIRD35:</span> 35% OFF - Limitado a 450 usos (1 por cliente)</li>
            <li>• <span className="font-semibold text-foreground">BF25:</span> 25% OFF - Descuento base en toda la tienda</li>
            <li>• <span className="font-semibold text-foreground">REGALOBF70:</span> Banda de pelo premium gratis con compras superiores a €70 (después de descuentos)</li>
            <li>• Introduce el código en el checkout antes de finalizar la compra</li>
            <li>• Garantía de 3 años en todos los productos</li>
            <li>• Devoluciones gratuitas durante 30 días</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlackFriday;
