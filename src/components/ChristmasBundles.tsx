import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ShoppingBag, Check, Plus } from "lucide-react";
import { christmasBundles, calculateBundlePrice, getCurrentPromotionalStage } from "@/lib/promotions";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

interface BundleProduct {
  handle: string;
  title: string;
  price: number;
  image: string;
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
          fetchProducts(50, "tag:bundle:true"),
          fetchProducts(50) // Load all products to get individual product info
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

  const handleAddToCart = (bundle: typeof christmasBundles[0], shopifyProduct?: ShopifyProduct) => {
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
        toast.success(`${bundle.name} añadido al carrito`);
      }
    } else {
      toast.error("Pack no disponible en este momento");
    }
  };

  // Map static bundle data with Shopify products
  const getBundleShopifyProduct = (bundleId: string): ShopifyProduct | undefined => {
    const handleMap: Record<string, string> = {
      "pack-relax-body-glow": "pack-relax-body-glow",
      "pack-duo-glow-led": "pack-duo-glow-led",
      "pack-ritual-piel-nueva": "pack-ritual-piel-nueva",
      "pack-lifting-en-casa": "pack-lifting-en-casa",
      "pack-mirada-descansada": "pack-mirada-descansada",
      "pack-glow-diario": "pack-glow-diario"
    };
    const handle = handleMap[bundleId];
    return shopifyBundles.find(p => p.node.handle === handle);
  };

  // Get product info from all products by handle
  const getProductByHandle = (handle: string): BundleProduct | null => {
    const product = allProducts.find(p => p.node.handle === handle);
    if (!product) return null;
    
    return {
      handle: product.node.handle,
      title: product.node.title,
      price: parseFloat(product.node.priceRange.minVariantPrice.amount),
      image: product.node.images.edges[0]?.node.url || ''
    };
  };

  // Split bundles into pairs for two-column sections
  const bundlePairs = [];
  for (let i = 0; i < christmasBundles.length; i += 2) {
    bundlePairs.push(christmasBundles.slice(i, i + 2));
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
            Packs diseñados para regalar (o regalarte). Ahorra comprando rutinas completas.
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

        {/* Bundles in pairs */}
        <div className="space-y-12 md:space-y-16">
          {bundlePairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {pair.map((bundle) => {
                const pricing = calculateBundlePrice(bundle);
                const shopifyProduct = getBundleShopifyProduct(bundle.id);
                const bundleProducts = bundle.products.map(handle => getProductByHandle(handle)).filter(Boolean) as BundleProduct[];
                
                return (
                  <div 
                    key={bundle.id} 
                    className="bg-white border border-border/50 shadow-sm overflow-hidden"
                  >
                    {/* Bundle Header */}
                    <div className="bg-gradient-to-r from-red-50 to-secondary/30 p-6 border-b border-border/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-3xl mb-2 block">{bundle.icon}</span>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                            {bundle.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{bundle.subtitle}</p>
                        </div>
                        <Badge className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1">
                          -{pricing.totalSavingsPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Products included */}
                    <div className="p-6">
                      <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                        Productos incluidos
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        {bundleProducts.map((product, idx) => (
                          <div key={`${product.handle}-${idx}`} className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-secondary/30 flex-shrink-0 overflow-hidden">
                              {product.image && (
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">
                                {product.title}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {product.price.toFixed(2)}€
                              </p>
                            </div>
                            {idx < bundleProducts.length - 1 && (
                              <Plus className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div className="border-t border-border/30 pt-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {bundle.benefits.map((benefit, index) => (
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
                      <div className="bg-secondary/20 -mx-6 -mb-6 p-6">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Valor total de productos</p>
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
                          onClick={() => handleAddToCart(bundle, shopifyProduct)}
                          disabled={!shopifyProduct}
                        >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          Añadir pack al carrito
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