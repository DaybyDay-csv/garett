import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Zap, Shield, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import aeroglowHero from "@/assets/aeroglow-hero.png";
import aeroglowDual from "@/assets/aeroglow-dual.png";
import hairBefore from "@/assets/hair-before.png";
import hairAfter from "@/assets/hair-after.jpg";
import patternImage from "@/assets/garett-pattern-1.png";
import { NewsletterCTA } from "@/components/NewsletterCTA";

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
          const aeroglow = products.find(p => 
            p.node.title.toLowerCase().includes('aeroglow') || 
            p.node.handle.includes('aeroglow')
          );
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

  // Base price is always 299
  const basePrice = 299;
  // Apply 10% discount
  const discountAmount = 29.90;
  const finalPrice = basePrice - discountAmount; // €269.10
  const currencyCode = product?.node.priceRange.minVariantPrice.currencyCode || 'EUR';

  return (
    <div className="relative w-full bg-gradient-to-br from-[#5D4037]/5 via-background to-[#8B6F47]/5 overflow-hidden">
      {/* Elegant pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${patternImage})`,
            backgroundSize: '250px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B6F47]/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5D4037]/10 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16 lg:py-20">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B6F47]/20 to-[#5D4037]/20 text-[#5D4037] dark:text-[#D7B896] px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border border-[#8B6F47]/30 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-4 h-4 animate-pulse" />
              NOVEDAD EXCLUSIVA 2025
            </div>
            
            {/* Headline */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                <span className="text-sm font-semibold text-muted-foreground ml-1">Resultados Instantáneos</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-muted-foreground text-xl md:text-2xl lg:text-3xl font-medium mb-2">Presentamos</span>
                <span className="bg-gradient-to-r from-[#5D4037] via-[#8B6F47] to-[#D4AF37] bg-clip-text text-transparent">AeroGlow</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transforma tu cabello con tecnología iónica profesional. <span className="font-semibold text-foreground">Resultados visibles desde el primer uso.</span>
              </p>
            </div>

            {/* Pricing */}
            {!loading && (
              <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    €{finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl md:text-2xl text-muted-foreground line-through">
                    €{basePrice.toFixed(2)}
                  </span>
                </div>
                <Badge className="bg-red-500 text-white text-sm px-3 py-1 animate-pulse">
                  AHORRA €{discountAmount.toFixed(2)}
                </Badge>
              </div>
            )}

            {/* Key Benefits - Enhanced Visual */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="group relative p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#8B6F47]/5 backdrop-blur border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-2xl" />
                <Zap className="w-6 h-6 text-[#D4AF37] mb-2 group-hover:scale-125 transition-transform relative z-10 drop-shadow-lg" />
                <div className="font-bold text-sm relative z-10">Calor Uniforme</div>
                <div className="text-xs text-muted-foreground relative z-10">Tecnología avanzada</div>
                <Badge className="mt-2 bg-[#D4AF37]/20 text-[#5D4037] text-[10px] px-2 py-0.5">Premium</Badge>
              </div>
              <div className="group relative p-4 rounded-xl bg-gradient-to-br from-[#8B6F47]/10 to-[#5D4037]/5 backdrop-blur border-2 border-[#8B6F47]/30 hover:border-[#8B6F47] transition-all hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#8B6F47]/10 rounded-full blur-2xl" />
                <Shield className="w-6 h-6 text-[#8B6F47] mb-2 group-hover:scale-125 transition-transform relative z-10 drop-shadow-lg" />
                <div className="font-bold text-sm relative z-10">Protección Total</div>
                <div className="text-xs text-muted-foreground relative z-10">Iones negativos</div>
                <Badge className="mt-2 bg-[#8B6F47]/20 text-[#5D4037] text-[10px] px-2 py-0.5">Seguro</Badge>
              </div>
              <div className="group relative p-4 rounded-xl bg-gradient-to-br from-[#5D4037]/10 to-[#D4AF37]/5 backdrop-blur border-2 border-[#5D4037]/30 hover:border-[#5D4037] transition-all hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#5D4037]/10 rounded-full blur-2xl" />
                <Award className="w-6 h-6 text-[#5D4037] mb-2 group-hover:scale-125 transition-transform relative z-10 drop-shadow-lg" />
                <div className="font-bold text-sm relative z-10">Made in Poland</div>
                <div className="text-xs text-muted-foreground relative z-10">Calidad premium</div>
                <Badge className="mt-2 bg-[#5D4037]/20 text-[#5D4037] text-[10px] px-2 py-0.5">Europa</Badge>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 relative z-20">
              <Link 
                to={product ? `/producto/${product.node.handle}` : "#"}
                className="inline-flex items-center justify-center group text-sm md:text-base h-14 px-10 bg-gradient-to-r from-[#5D4037] to-[#8B6F47] hover:from-[#4A322B] hover:to-[#6E5738] shadow-xl hover:shadow-2xl transition-all text-white border-0 rounded-md font-medium cursor-pointer"
              >
                Comprar Ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={product ? `/producto/${product.node.handle}` : "#"}
                className="inline-flex items-center justify-center text-sm md:text-base h-14 px-10 border-2 border-[#8B6F47] text-[#5D4037] dark:text-[#D7B896] hover:bg-[#8B6F47]/10 rounded-md font-medium transition-colors cursor-pointer bg-background"
              >
                Ver Detalles
              </Link>
            </div>

            <NewsletterCTA 
              variant="inline"
              text="🔔 Notifícame de ofertas exclusivas"
              className="text-muted-foreground hover:text-foreground text-xs md:text-sm text-center lg:text-left"
            />

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="font-medium">En Stock</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-[#8B6F47]" />
                <span>Garantía 3 años</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-4 h-4 text-[#8B6F47]" />
                <span>Envío 24-48h gratis</span>
              </div>
            </div>
          </div>

          {/* Right - Product Showcase */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-2xl mx-auto">
              {/* Main Product Image */}
              <div className="relative z-10">
                <div className="absolute -inset-8 bg-gradient-to-br from-[#D4AF37]/20 via-[#8B6F47]/20 to-[#5D4037]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-white/90 to-white/60 dark:from-background/90 dark:to-background/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 dark:border-border/30">
                  {loading ? (
                    <div className="aspect-square flex items-center justify-center">
                      <Sparkles className="w-20 h-20 text-[#8B6F47] animate-pulse" />
                    </div>
                  ) : (
                    <img 
                      src={aeroglowHero}
                      alt="AeroGlow Hair Straightener"
                      className="w-full h-full object-contain drop-shadow-2xl animate-fade-in hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                
                {/* Floating Discount Badge */}
                <div className="absolute -top-6 -right-6 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center shadow-2xl border-4 border-white dark:border-background font-bold animate-bounce">
                      <span className="text-2xl md:text-3xl">-10%</span>
                      <span className="text-xs">OFF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Transformation Section */}
        <div className="pb-12 md:pb-16 lg:pb-20 border-t border-border/30 pt-12 md:pt-16">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-4 bg-[#8B6F47]/20 text-[#5D4037] dark:text-[#D7B896] border border-[#8B6F47]/30">
              RESULTADOS REALES
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Transformación <span className="text-[#8B6F47]">Profesional</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De cabello rebelde a liso perfecto en minutos. Tecnología iónica que protege mientras alisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition" />
              <div className="relative bg-background rounded-2xl overflow-hidden shadow-xl border border-border">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gray-500 text-white">ANTES</Badge>
                </div>
                <img 
                  src={hairBefore}
                  alt="Cabello antes de usar AeroGlow"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4 bg-gradient-to-t from-background to-transparent">
                  <p className="text-sm text-muted-foreground">Cabello húmedo y sin tratar</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37] to-[#8B6F47] rounded-2xl blur opacity-50 group-hover:opacity-75 transition animate-pulse" />
              <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#8B6F47] text-white">DESPUÉS</Badge>
                </div>
                <img 
                  src={hairAfter}
                  alt="Cabello después de usar AeroGlow"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4 bg-gradient-to-t from-background to-transparent">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <p className="text-sm font-semibold">Liso perfecto y brillante</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-8 md:mt-12 relative z-20 space-y-3">
            <Link 
              to={product ? `/producto/${product.node.handle}` : "#"}
              className="inline-flex items-center justify-center group text-base md:text-lg h-14 md:h-16 px-12 bg-gradient-to-r from-[#5D4037] to-[#8B6F47] hover:from-[#4A322B] hover:to-[#6E5738] shadow-2xl hover:shadow-3xl transition-all text-white rounded-md font-medium cursor-pointer relative z-20"
            >
              Consigue tu AeroGlow Ahora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <NewsletterCTA 
              variant="inline"
              text="🔔 Quiero ofertas exclusivas"
              className="text-muted-foreground hover:text-foreground text-xs md:text-sm block"
            />
            
            <p className="text-xs md:text-sm text-muted-foreground mt-4">
              ⚡ Últimas unidades disponibles • Envío gratis en 24-48h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
