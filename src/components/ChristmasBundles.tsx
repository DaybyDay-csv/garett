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
const BUNDLE_CONFIG = [
  {
    id: "pack-relax-body-glow",
    name: "Pack Relax & Body Glow",
    subtitle: "Calm Skin + Cellu Body",
    productPatterns: ["Calm Skin", "Cellu Body"],
    benefits: ["Relajacion profunda", "Tonificacion corporal", "Piel mas suave"],
    originalValue: 236
  },
  {
    id: "pack-duo-glow-led",
    name: "Pack Duo Glow LED",
    subtitle: "2 Manoplas LED",
    productPatterns: ["Manopla LED"],
    productQuantities: [2],
    benefits: ["Rejuvenecimiento dual", "Tratamiento completo", "Resultados visibles"],
    originalValue: 448
  },
  {
    id: "pack-ritual-piel-nueva",
    name: "Pack Ritual Piel Nueva",
    subtitle: "Multiclean + Breeze Scrub + Pretty Face",
    productPatterns: ["Multi Clean", "Breeze", "Pretty Face"],
    benefits: ["Limpieza profunda", "Exfoliacion suave", "Hidratacion intensiva"],
    originalValue: 265
  },
  {
    id: "pack-lifting-en-casa",
    name: "Pack Lifting en Casa",
    subtitle: "Multiclean + Fresh Skin Pro",
    productPatterns: ["Multi Clean", "Fresh Skin Pro"],
    benefits: ["Efecto tensor", "Limpieza profesional", "Piel rejuvenecida"],
    originalValue: 249
  },
  {
    id: "pack-mirada-descansada",
    name: "Pack Mirada Descansada",
    subtitle: "Fresh Skin Pro + Fresh Eye",
    productPatterns: ["Fresh Skin Pro", "Fresh Eye"],
    benefits: ["Reduce ojeras", "Minimiza arrugas", "Mirada luminosa"],
    originalValue: 225.99
  },
  {
    id: "pack-glow-diario",
    name: "Pack Glow Diario",
    subtitle: "Pretty Face + Fresh Eye",
    productPatterns: ["Pretty Face", "Fresh Eye"],
    benefits: ["Uso diario", "Luminosidad natural", "Facil de usar"],
    originalValue: 143
  }
];

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
        const [bundles, products] = await Promise.all([
          fetchProducts(50, "product_type:Bundle"),
          fetchProducts(100)
        ]);
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
    
    config.productPatterns.forEach((pattern, index) => {
      const matchingProduct = allProducts.find(p => 
        p.node.title.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (matchingProduct) {
        const quantity = config.productQuantities?.[index] || 1;
        products.push({
          title: matchingProduct.node.title,
          price: parseFloat(matchingProduct.node.priceRange.minVariantPrice.amount),
          image: matchingProduct.node.images.edges[0]?.node.url || '',
          quantity
        });
      }
    });
    
    return products;
  };

  // Calculate pricing with current promo
  const calculatePricing = (shopifyBundle: ShopifyProduct | undefined, originalValue: number) => {
    const bundleBasePrice = shopifyBundle 
      ? parseFloat(shopifyBundle.node.priceRange.minVariantPrice.amount)
      : originalValue * 0.87; // Fallback ~13% bundle discount
    
    if (!currentStage) {
      return {
        originalValue,
        bundleBasePrice,
        finalPrice: bundleBasePrice,
        totalSavings: originalValue - bundleBasePrice,
        totalSavingsPercent: Math.round(((originalValue - bundleBasePrice) / originalValue) * 100)
      };
    }
    
    const promoDiscount = currentStage.baseDiscount + currentStage.bundleExtraDiscount;
    const finalPrice = bundleBasePrice * (1 - promoDiscount / 100);
    const totalSavings = originalValue - finalPrice;
    const totalSavingsPercent = Math.round((totalSavings / originalValue) * 100);
    
    return {
      originalValue,
      bundleBasePrice,
      finalPrice: Math.round(finalPrice * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      totalSavingsPercent,
      promoDiscount
    };
  };

  // Split bundles into pairs
  const bundlePairs = [];
  for (let i = 0; i < BUNDLE_CONFIG.length; i += 2) {
    bundlePairs.push(BUNDLE_CONFIG.slice(i, i + 2));
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary/50 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-secondary/50 rounded w-96 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="christmas-bundles" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Packs disenados para regalar (o regalarte). Ahorra comprando rutinas completas.
          </p>
          
          {/* Current promo indicator */}
          {currentStage && currentStage.bundleExtraDiscount > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-emerald-50 border border-red-200 rounded-full px-5 py-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-red-700 font-medium">
                +{currentStage.bundleExtraDiscount}% extra en packs hasta el {currentStage.endDate.getDate()}/{currentStage.endDate.getMonth() + 1}
              </span>
            </div>
          )}
        </div>

        {/* Bundles grid */}
        <div className="space-y-12 md:space-y-16">
          {bundlePairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {pair.map((config) => {
                const shopifyBundle = getShopifyBundle(config.id);
                const bundleProducts = getBundleProducts(config);
                const pricing = calculatePricing(shopifyBundle, config.originalValue);
                
                return (
                  <div 
                    key={config.id} 
                    className="bg-white border border-border/50 shadow-sm overflow-hidden"
                  >
                    {/* Bundle Header */}
                    <div className="bg-gradient-to-r from-red-50 to-secondary/30 p-5 md:p-6 border-b border-border/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                            {config.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{config.subtitle}</p>
                        </div>
                        <Badge className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1">
                          -{pricing.totalSavingsPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Products Grid - Visual Display */}
                    <div className="p-5 md:p-6">
                      <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                        Productos incluidos
                      </p>
                      
                      <div className={`grid gap-4 mb-6 ${bundleProducts.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {bundleProducts.map((product, idx) => (
                          <div key={idx} className="text-center">
                            <div className="aspect-square bg-secondary/20 mb-3 overflow-hidden">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                  <Gift className="w-12 h-12" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs md:text-sm font-medium text-foreground line-clamp-2 mb-1">
                              {product.title}
                              {product.quantity > 1 && <span className="text-muted-foreground"> x{product.quantity}</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(product.price * product.quantity).toFixed(2)}€
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div className="border-t border-border/30 pt-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {config.benefits.map((benefit, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5"
                            >
                              <Check className="w-3 h-3" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and CTA */}
                      <div className="bg-secondary/20 -mx-5 md:-mx-6 -mb-5 md:-mb-6 p-5 md:p-6">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Valor total</p>
                            <p className="text-lg text-muted-foreground line-through">
                              {pricing.originalValue.toFixed(2)}€
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-emerald-600 font-medium mb-1">
                              Ahorras {pricing.totalSavings.toFixed(2)}€
                            </p>
                            <p className="text-3xl font-bold text-foreground">
                              {pricing.finalPrice.toFixed(2)}€
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-red-700 hover:bg-red-800 text-white h-12 text-base"
                          onClick={() => handleAddToCart(config.name, shopifyBundle)}
                          disabled={!shopifyBundle}
                        >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          Anadir pack al carrito
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Prefieres elegir tu mismo? Todos los productos tambien disponibles por separado.
          </p>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/productos">Ver catalogo completo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
