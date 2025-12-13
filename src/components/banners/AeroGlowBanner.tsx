import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Shield, Award, Star, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import aeroglowHero from "@/assets/aeroglow-hero.png";
import aeroglowDual from "@/assets/aeroglow-dual.png";
import hairBefore from "@/assets/hair-before.png";
import hairAfter from "@/assets/hair-after.jpg";
import patternImage from "@/assets/garett-pattern-1.png";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { VideoPlayer } from "@/components/VideoPlayer";
export const AeroGlowBanner = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Search for AeroGlow or hair straightener products
        const products = await fetchProducts(50, 'product_type:Plancha OR title:AeroGlow OR title:plancha');
        if (products && products.length > 0) {
          // Find the AeroGlow product specifically
          const aeroglow = products.find(p => p.node.title.toLowerCase().includes('aeroglow') || p.node.handle.includes('aeroglow'));
          setProduct(aeroglow || products[0]);
        }
      } catch (error) {
        console.error('Error loading AeroGlow product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, []);

  // Black Friday pricing
  const basePrice = 449;
  const discountPercent = 50;
  const finalPrice = basePrice * (1 - discountPercent / 100); // €224.50
  const discountAmount = basePrice - finalPrice;
  const currencyCode = product?.node.priceRange.minVariantPrice.currencyCode || 'EUR';
  return <div className="relative w-full bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center py-6 md:py-8 lg:py-12">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-3 md:space-y-4 order-2 lg:order-1">
            {/* Black Friday Event Badge */}
            
            
            {/* Headline */}
            <div className="space-y-2 px-2">
              <div className="flex items-center justify-center lg:justify-start gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-foreground/20 text-foreground/20" />)}
                <span className="text-xs md:text-sm font-medium text-muted-foreground ml-2">Resultados profesionales</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight">
                <span className="block text-muted-foreground text-base md:text-lg lg:text-xl font-medium mb-1">Presentamos</span>
                <span className="text-foreground">AeroGlow</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-muted-foreground">
                Transforma tu cabello con tecnología iónica profesional. <span className="font-semibold text-foreground">
Resultados visibles desde el primer uso.</span>
              </p>
            </div>

            {/* Pricing */}
            {!loading}

            {/* Key Benefits */}
            <div className="grid grid-cols-3 gap-2 px-2">
              <div className="p-2 md:p-3 rounded-lg bg-muted border border-border hover:border-foreground/20 transition-all">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 mb-1" />
                <div className="font-semibold text-xs md:text-sm text-foreground">Calor Uniforme</div>
                <div className="text-[11px] md:text-xs text-muted-foreground">Tecnología avanzada</div>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-muted border border-border hover:border-foreground/20 transition-all">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 mb-1" />
                <div className="font-semibold text-xs md:text-sm text-foreground">Protección Total</div>
                <div className="text-[11px] md:text-xs text-muted-foreground">Iones negativos</div>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-muted border border-border hover:border-foreground/20 transition-all">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 mb-1" />
                <div className="font-semibold text-xs md:text-sm text-foreground">Made in Poland</div>
                <div className="text-[11px] md:text-xs text-muted-foreground">Calidad premium</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 md:gap-3 items-center lg:items-start pt-2 px-2">
              <Link to={product ? `/producto/${product.node.handle}` : "#"} className="inline-flex items-center justify-center text-sm md:text-base h-10 md:h-12 px-6 md:px-8 bg-foreground hover:bg-foreground/90 transition-all text-background border-0 rounded-md font-semibold cursor-pointer w-full sm:w-auto max-w-xs">
                Comprar Ahora
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
              <Link to={product ? `/producto/${product.node.handle}` : "#"} className="inline-flex items-center justify-center text-sm md:text-base h-10 md:h-12 px-6 md:px-8 border border-border text-foreground hover:bg-muted rounded-md font-medium transition-colors cursor-pointer w-full sm:w-auto max-w-xs">
                Ver Detalles
              </Link>
              <NewsletterCTA variant="inline" text="Recibe las ofertas" />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 pt-2 text-xs px-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="font-medium">En Stock</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Envío 24-48h gratis</span>
              </div>
            </div>
          </div>

          {/* Right - Product Showcase with Video */}
          <div className="order-1 lg:order-2 relative">
              <div className="relative max-w-xl mx-auto">
                {/* Main Product Video */}
                <div className="relative z-10">
                  <div className="relative bg-muted rounded-xl p-3 md:p-6 border border-border overflow-hidden">
                  {loading ? <div className="aspect-square flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground" />
                    </div> : <VideoPlayer srcWebM="/videos/aeroglow-product.webm" poster={aeroglowHero} autoplay={true} muted={true} loop={true} controls={false} className="animate-fade-in" fallback={<img src={aeroglowHero} alt="AeroGlow Hair Straightener" className="w-full h-full object-contain animate-fade-in" />} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Transformation Section */}
        <div className="pb-6 md:pb-10 lg:pb-12 border-t border-border pt-6 md:pt-10">
          <div className="text-center mb-4 md:mb-8 px-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-foreground">
              Transformación Profesional
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              De cabello rebelde a liso perfecto en minutos. Tecnología iónica que protege mientras alisa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-4xl mx-auto px-4">
            {/* Before */}
            <div className="relative">
              <div className="bg-background rounded-lg md:rounded-xl overflow-hidden border border-border">
                <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                  <Badge variant="secondary" className="text-[10px] md:text-xs px-1.5 py-0.5">ANTES</Badge>
                </div>
                <img src={hairBefore} alt="Cabello antes de usar AeroGlow" className="w-full h-[150px] md:h-[250px] object-cover" />
                <div className="p-2 md:p-3 bg-background">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Cabello sin tratar</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className="bg-background rounded-lg md:rounded-xl overflow-hidden border-2 border-foreground">
                <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                  <Badge className="text-[10px] md:text-xs px-1.5 py-0.5">DESPUÉS</Badge>
                </div>
                <img src={hairAfter} alt="Cabello después de usar AeroGlow" className="w-full h-[150px] md:h-[250px] object-cover" />
                <div className="p-2 md:p-3 bg-background">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <p className="text-[10px] md:text-xs font-semibold">Liso perfecto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-6 md:mt-8 space-y-3 px-4 flex flex-col items-center">
            <NewsletterCTA variant="inline" text="Recibe las ofertas" />
            <p className="text-[10px] md:text-xs text-muted-foreground">
              Oferta limitada - Black Friday
            </p>
          </div>
        </div>
      </div>
    </div>;
};