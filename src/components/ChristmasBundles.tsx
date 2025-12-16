import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ShoppingBag, Check } from "lucide-react";
import { getCurrentPromotionalStage } from "@/lib/promotions";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

// Bundle configuration with product title patterns for matching
const BUNDLE_CONFIG = [{
  id: "pack-relax-body-glow",
  name: "Pack Relax & Body Glow",
  subtitle: "Calm Skin + Cellu Body",
  productPatterns: ["Calm Skin", "Cellu Body"],
  benefits: ["Relajacion profunda", "Tonificacion corporal", "Piel mas suave"],
  originalValue: 236
}, {
  id: "pack-duo-glow-led",
  name: "Pack Duo Glow LED",
  subtitle: "2 Manoplas LED",
  productPatterns: ["Manopla LED", "Manopla LED"],
  benefits: ["Rejuvenecimiento dual", "Tratamiento completo", "Resultados visibles"],
  originalValue: 448
}, {
  id: "pack-ritual-piel-nueva",
  name: "Pack Ritual Piel Nueva",
  subtitle: "Multiclean + Breeze Scrub + Pretty Face",
  productPatterns: ["Multi Clean", "Breeze", "Pretty Face"],
  benefits: ["Limpieza profunda", "Exfoliacion suave", "Hidratacion intensiva"],
  originalValue: 265
}, {
  id: "pack-lifting-en-casa",
  name: "Pack Lifting en Casa",
  subtitle: "Multiclean + Fresh Skin Pro",
  productPatterns: ["Multi Clean", "Fresh Skin Pro"],
  benefits: ["Efecto tensor", "Limpieza profesional", "Piel rejuvenecida"],
  originalValue: 249
}, {
  id: "pack-mirada-descansada",
  name: "Pack Mirada Descansada",
  subtitle: "Fresh Skin Pro + Fresh Eye",
  productPatterns: ["Fresh Skin Pro", "Fresh Eye"],
  benefits: ["Reduce ojeras", "Minimiza arrugas", "Mirada luminosa"],
  originalValue: 225.99
}, {
  id: "pack-glow-diario",
  name: "Pack Glow Diario",
  subtitle: "Pretty Face + Fresh Eye",
  productPatterns: ["Pretty Face", "Fresh Eye"],
  benefits: ["Uso diario", "Luminosidad natural", "Facil de usar"],
  originalValue: 143
}];
interface BundleProductInfo {
  title: string;
  price: number;
  image: string;
  quantity: number;
}
export const ChristmasBundles = () => {
  const currentStage = getCurrentPromotionalStage();
  const addItem = useCartStore(state => state.addItem);
  const setIsOpen = useCartStore(state => state.setIsOpen);
  const [shopifyBundles, setShopifyBundles] = useState<ShopifyProduct[]>([]);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [bundles, products] = await Promise.all([fetchProducts(50, "product_type:Bundle"), fetchProducts(100)]);
        setShopifyBundles(bundles);
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  const handleAddToCart = (bundleName: string, shopifyProduct?: ShopifyProduct) => {
    if (shopifyProduct) {
      const variant = shopifyProduct.node.variants.edges[0]?.node;
      if (variant) {
        addItem({
          product: shopifyProduct,
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: variant.selectedOptions || []
        });
        setIsOpen(true);
        toast.success(`${bundleName} anadido al carrito`);
      }
    } else {
      toast.error("Pack no disponible en este momento");
    }
  };

  // Match bundle config with Shopify bundle
  const getShopifyBundle = (configId: string): ShopifyProduct | undefined => {
    const handleMap: Record<string, string> = {
      "pack-relax-body-glow": "pack-relax-body-glow",
      "pack-duo-glow-led": "pack-duo-glow-led",
      "pack-ritual-piel-nueva": "pack-ritual-piel-nueva",
      "pack-lifting-en-casa": "pack-lifting-en-casa",
      "pack-mirada-descansada": "pack-mirada-descansada",
      "pack-glow-diario": "pack-glow-diario"
    };
    const handle = handleMap[configId];
    return shopifyBundles.find(p => p.node.handle === handle);
  };

  // Find products matching the bundle patterns
  const getBundleProducts = (config: typeof BUNDLE_CONFIG[0]): BundleProductInfo[] => {
    const products: BundleProductInfo[] = [];
    config.productPatterns.forEach(pattern => {
      const matchingProduct = allProducts.find(p => p.node.title.toLowerCase().includes(pattern.toLowerCase()));
      if (matchingProduct) {
        products.push({
          title: matchingProduct.node.title,
          price: parseFloat(matchingProduct.node.priceRange.minVariantPrice.amount),
          image: matchingProduct.node.images.edges[0]?.node.url || '',
          quantity: 1
        });
      }
    });
    return products;
  };

  // Calculate pricing with current promo
  const calculatePricing = (shopifyBundle: ShopifyProduct | undefined, originalValue: number) => {
    const bundleBasePrice = shopifyBundle ? parseFloat(shopifyBundle.node.priceRange.minVariantPrice.amount) : originalValue * 0.87;
    if (!currentStage) {
      return {
        originalValue,
        bundleBasePrice,
        finalPrice: bundleBasePrice,
        totalSavings: originalValue - bundleBasePrice,
        totalSavingsPercent: Math.round((originalValue - bundleBasePrice) / originalValue * 100)
      };
    }
    const promoDiscount = currentStage.baseDiscount + currentStage.bundleExtraDiscount;
    const finalPrice = bundleBasePrice * (1 - promoDiscount / 100);
    const totalSavings = originalValue - finalPrice;
    const totalSavingsPercent = Math.round(totalSavings / originalValue * 100);
    return {
      originalValue,
      bundleBasePrice,
      finalPrice: Math.round(finalPrice * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      totalSavingsPercent,
      promoDiscount
    };
  };
  if (loading) {
    return <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary/50 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-secondary/50 rounded w-96 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>;
  }
  return <section id="christmas-bundles" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
            <Gift className="w-4 h-4 mr-2" />
            Edicion Navidad
          </Badge>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            Rutinas de{" "}
            <span className="font-semibold text-red-700">spa en casa</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Disenados para regalar (o regalarte).
          </p>
          
          {/* Current promo indicator */}
          {currentStage && currentStage.bundleExtraDiscount > 0 && <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-emerald-50 border border-red-200 rounded-full px-5 py-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-red-700 font-medium">
                +{currentStage.bundleExtraDiscount}% extra hasta el {currentStage.endDate.getDate()}/{currentStage.endDate.getMonth() + 1}
              </span>
            </div>}
        </div>

        {/* Bundles grid - 2 columns mobile, 3 columns desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {BUNDLE_CONFIG.map(config => {
          const shopifyBundle = getShopifyBundle(config.id);
          const bundleProducts = getBundleProducts(config);
          const pricing = calculatePricing(shopifyBundle, config.originalValue);
          return <div key={config.id} className="bg-white border border-border/50 shadow-sm overflow-hidden flex flex-col">
                {/* Bundle Header */}
                <div className="bg-gradient-to-r from-red-50 to-secondary/30 p-3 md:p-4 border-b border-border/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-lg font-semibold text-foreground leading-tight">
                        {config.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{config.subtitle}</p>
                    </div>
                    <Badge className="bg-red-600 text-white hover:bg-red-700 text-xs px-2 py-0.5 flex-shrink-0">
                      -{pricing.totalSavingsPercent}%
                    </Badge>
                  </div>
                </div>

                {/* Products Grid - Visual Display */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Incluye
                  </p>
                  
                  <div className={`grid gap-2 mb-3 ${bundleProducts.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {bundleProducts.map((product, idx) => <div key={idx} className="text-center">
                        <div className="aspect-square bg-secondary/20 mb-1.5 overflow-hidden">
                          {product.image ? <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                              <Gift className="w-6 h-6" />
                            </div>}
                        </div>
                        <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">
                          {product.price.toFixed(0)}€
                        </p>
                      </div>)}
                  </div>

                  {/* Benefits - Hidden on mobile for space */}
                  <div className="hidden md:flex flex-wrap gap-1.5 mb-3 border-t border-border/30 pt-3">
                    {config.benefits.slice(0, 2).map((benefit, index) => <span key={index} className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1">
                        <Check className="w-2.5 h-2.5" />
                        {benefit}
                      </span>)}
                  </div>

                  {/* Pricing and CTA */}
                  <div className="mt-auto bg-secondary/20 -mx-3 md:-mx-4 -mb-3 md:-mb-4 p-3 md:p-4">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Valor</p>
                        <p className="text-xs md:text-sm text-muted-foreground line-through">
                          {pricing.originalValue.toFixed(0)}€
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-emerald-600 font-medium">
                          Ahorras {pricing.totalSavings.toFixed(0)}€
                        </p>
                        <p className="text-lg md:text-2xl font-bold text-foreground">
                          {pricing.finalPrice.toFixed(0)}€
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-red-700 hover:bg-red-800 text-white h-9 md:h-10 text-xs md:text-sm" onClick={() => handleAddToCart(config.name, shopifyBundle)} disabled={!shopifyBundle}>
                      <ShoppingBag className="w-4 h-4 mr-1.5" />
                      Anadir pack
                    </Button>
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* Bottom message */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Prefieres elegir tu mismo? Todos los productos tambien disponibles por separado.
          </p>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/productos">Ver catalogo completo</Link>
          </Button>
        </div>
      </div>
    </section>;
};