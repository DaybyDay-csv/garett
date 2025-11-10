import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Zap, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import patternImage from "@/assets/garett-pattern-1.png";

export const AeroGlowBanner = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(1, 'handle:253-garett-beauty-plancha-de-pelo-aerea-marron-aeroglow');
        if (products && products.length > 0) {
          setProduct(products[0]);
        }
      } catch (error) {
        console.error('Error loading AeroGlow product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, []);

  const productImage = product?.node.images.edges[0]?.node.url;
  const price = product?.node.priceRange.minVariantPrice.amount;

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[650px] bg-gradient-to-br from-[#8B4513]/5 via-background to-[#D2691E]/5 overflow-hidden">
      {/* Elegant geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${patternImage})`,
            backgroundSize: '300px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 md:px-12 min-h-full flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 md:gap-16 py-16 md:py-20">
        {/* Content - Premium Focus */}
        <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-primary/20">
            <Sparkles className="w-4 h-4" />
            LANZAMIENTO EXCLUSIVO 2025
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              <span className="block text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-normal mb-2">Descubre</span>
              <span className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#D2691E] bg-clip-text text-transparent">AeroGlow</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Plancha de pelo profesional con tecnología aérea avanzada. Resultados de salón desde casa.
            </p>
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center md:items-start gap-2 p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all">
              <Zap className="w-5 h-5 text-primary" />
              <div className="text-center md:text-left">
                <div className="font-semibold text-sm">Calor Uniforme</div>
                <div className="text-xs text-muted-foreground">Tecnología avanzada</div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all">
              <Shield className="w-5 h-5 text-primary" />
              <div className="text-center md:text-left">
                <div className="font-semibold text-sm">Protección Total</div>
                <div className="text-xs text-muted-foreground">Cuida tu cabello</div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all">
              <Award className="w-5 h-5 text-primary" />
              <div className="text-center md:text-left">
                <div className="font-semibold text-sm">Calidad Premium</div>
                <div className="text-xs text-muted-foreground">Tecnología Polaca</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button asChild size="lg" className="group text-sm md:text-base h-14 px-10 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              <Link to="/producto/253-garett-beauty-plancha-de-pelo-aerea-marron-aeroglow">
                Comprar Ahora {price && `- €${parseFloat(price).toFixed(2)}`}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm md:text-base h-14 px-10 w-full sm:w-auto border-2 hover:bg-primary/5">
              <Link to="/productos">
                Ver Toda la Colección
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span>En stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Garantía 3 años</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Envío 24-48h</span>
            </div>
          </div>
        </div>

        {/* Product Image - Hero Focus */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-full max-w-md md:max-w-lg">
            {/* Decorative circles */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-[#8B4513]/20 rounded-full blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent rounded-full" />
            
            {/* Product image container */}
            <div className="relative bg-gradient-to-br from-white/80 to-white/40 dark:from-background/80 dark:to-background/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-border/20">
              {loading ? (
                <div className="aspect-square flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-primary animate-pulse" />
                </div>
              ) : productImage ? (
                <img 
                  src={productImage} 
                  alt="AeroGlow Hair Straightener"
                  className="w-full h-full object-contain drop-shadow-2xl animate-fade-in hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="aspect-square flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-primary" />
                </div>
              )}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-pulse">
              -10% OFF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
