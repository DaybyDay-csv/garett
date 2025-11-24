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
  return <div className="relative w-full bg-black overflow-hidden">
      {/* Dark pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
        backgroundImage: `url(${patternImage})`,
        backgroundSize: '250px',
        backgroundRepeat: 'repeat'
      }} />
      </div>

      
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center py-4 md:py-6 lg:py-8">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-2 md:space-y-4 order-2 lg:order-1">
            {/* Black Friday Event Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border border-red-500/50 animate-pulse">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              AEROGLOW DROP • BLACK FRIDAY
            </div>
            
            {/* Unlock Date */}
            
            
            {/* Headline */}
            <div className="space-y-2 px-2">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-red-500 text-red-500" />)}
                <span className="text-xs md:text-sm font-semibold text-gray-300 ml-1">Resultados Instantáneos</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight">
                <span className="block text-gray-400 text-base md:text-lg lg:text-xl font-medium mb-1">Presentamos</span>
                <span className="text-red-400">AeroGlow</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transforma tu cabello con tecnología iónica profesional. <span className="font-semibold text-foreground">Resultados visibles desde el primer uso.</span>
              </p>
            </div>

            {/* Pricing */}
            {!loading && <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap px-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    €{finalPrice.toFixed(2)}
                  </span>
                  <span className="text-lg md:text-xl text-muted-foreground line-through">
                    €{basePrice.toFixed(2)}
                  </span>
                </div>
                <Badge className="bg-red-500 text-white text-xs md:text-sm px-2 py-0.5 animate-pulse">
                  AHORRA €{discountAmount.toFixed(2)}
                </Badge>
              </div>}

            {/* Key Benefits - Enhanced Visual */}
            <div className="grid grid-cols-3 gap-2 px-2">
              <div className="p-2 md:p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] mb-1" />
                <div className="font-bold text-[11px] md:text-xs">Calor Uniforme</div>
                <div className="text-[10px] md:text-[11px] text-muted-foreground">Tecnología avanzada</div>
              </div>
              <div className="p-2 md:p-3 rounded-xl bg-[#8B6F47]/10 border border-[#8B6F47]/30 hover:border-[#8B6F47] transition-all">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#8B6F47] mb-1" />
                <div className="font-bold text-[11px] md:text-xs">Protección Total</div>
                <div className="text-[10px] md:text-[11px] text-muted-foreground">Iones negativos</div>
              </div>
              <div className="p-2 md:p-3 rounded-xl bg-[#5D4037]/10 border border-[#5D4037]/30 hover:border-[#5D4037] transition-all">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-[#5D4037] mb-1" />
                <div className="font-bold text-[11px] md:text-xs">Made in Poland</div>
                <div className="text-[10px] md:text-[11px] text-muted-foreground">Calidad premium</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 md:gap-3 items-center lg:items-start pt-2 relative z-20 px-2">
              <Link to={product ? `/producto/${product.node.handle}` : "#"} className="inline-flex items-center justify-center group text-sm md:text-base h-10 md:h-12 px-6 md:px-8 bg-[#5D4037] hover:bg-[#4A322B] transition-all text-white border-0 rounded-lg font-semibold cursor-pointer w-full sm:w-auto max-w-xs">
                Comprar Ahora
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to={product ? `/producto/${product.node.handle}` : "#"} className="inline-flex items-center justify-center text-sm md:text-base h-10 md:h-12 px-6 md:px-8 border-2 border-[#8B6F47] text-[#5D4037] dark:text-[#D7B896] hover:bg-[#8B6F47]/10 rounded-lg font-semibold transition-colors cursor-pointer bg-background w-full sm:w-auto max-w-xs">
                Ver Detalles
              </Link>
              <NewsletterCTA variant="inline" text="Recibe las ofertas" />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 pt-2 text-xs px-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="font-medium">En Stock</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#8B6F47]" />
                <span>Garantía 24 meses</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#8B6F47]" />
                <span>Envío 24-48h gratis</span>
              </div>
            </div>
          </div>

          {/* Right - Product Showcase with Video */}
          <div className="order-1 lg:order-2 relative">
              <div className="relative max-w-xl mx-auto">
                {/* Main Product Video */}
                <div className="relative z-10">
                  <div className="relative bg-gray-900/90 rounded-2xl p-3 md:p-6 border border-red-600/30 overflow-hidden">
                  {loading ? <div className="aspect-square flex items-center justify-center">
                      <Zap className="w-20 h-20 text-red-500 animate-pulse" />
                    </div> : <VideoPlayer src="/videos/aeroglow-product.mp4" poster={aeroglowHero} autoplay={true} muted={true} loop={true} controls={false} className="animate-fade-in" fallback={<img src={aeroglowHero} alt="AeroGlow Hair Straightener" className="w-full h-full object-contain animate-fade-in" />} />}
                </div>
                
                {/* Floating Discount Badge */}
                <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-20">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Transformation Section */}
        <div className="pb-4 md:pb-8 lg:pb-10 border-t border-red-600/20 pt-4 md:pt-8">
          <div className="text-center mb-3 md:mb-6 px-4">
            <Badge className="mb-2 bg-red-950/50 text-red-400 border border-red-600/30 text-xs px-2 py-0.5">
              RESULTADOS REALES
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">
              Transformación <span className="text-red-400">Profesional</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              De cabello rebelde a liso perfecto en minutos. Tecnología iónica que protege mientras alisa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-4xl mx-auto px-4">
            {/* Before */}
            <div className="relative">
              <div className="bg-background rounded-lg md:rounded-xl overflow-hidden border border-border">
                <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                  <Badge className="bg-gray-500 text-white text-[10px] md:text-xs px-1.5 py-0.5">ANTES</Badge>
                </div>
                <img src={hairBefore} alt="Cabello antes de usar AeroGlow" className="w-full h-[150px] md:h-[250px] object-cover" />
                <div className="p-2 md:p-3 bg-background">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Cabello sin tratar</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className="bg-background rounded-lg md:rounded-xl overflow-hidden border-2 border-red-500">
                <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                  <Badge className="bg-red-500 text-white text-[10px] md:text-xs px-1.5 py-0.5">DESPUÉS</Badge>
                </div>
                <img src={hairAfter} alt="Cabello después de usar AeroGlow" className="w-full h-[150px] md:h-[250px] object-cover" />
                <div className="p-2 md:p-3 bg-background">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-500" />
                    <p className="text-[10px] md:text-xs font-semibold">Liso perfecto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-4 md:mt-6 relative z-20 space-y-2 px-4 flex flex-col items-center">
            <Link to={product ? `/producto/${product.node.handle}` : "#"} className="inline-flex items-center justify-center group text-sm md:text-base h-10 md:h-12 px-8 md:px-10 bg-red-600 hover:bg-red-700 transition-all text-white rounded-lg font-bold cursor-pointer relative z-20 w-full sm:w-auto max-w-xs">Desbloquear Black Friday<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <NewsletterCTA variant="inline" text="Recibe las ofertas" className="bg-red-950/50 hover:bg-red-950/70 border-red-600/30 text-red-300" />
            
            <p className="text-[10px] md:text-xs text-gray-400 mt-2">
              ⚡ Oferta limitada - 28 de Noviembre • Solo Black Friday
            </p>
          </div>
        </div>
      </div>
    </div>;
};