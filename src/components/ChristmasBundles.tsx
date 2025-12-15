import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, ShoppingBag, Check } from "lucide-react";
import { christmasBundles, calculateBundlePrice, getCurrentPromotionalStage } from "@/lib/promotions";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export const ChristmasBundles = () => {
  const currentStage = getCurrentPromotionalStage();
  const addItem = useCartStore(state => state.addItem);
  const setIsOpen = useCartStore(state => state.setIsOpen);
  const [shopifyBundles, setShopifyBundles] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBundles = async () => {
      try {
        const products = await fetchProducts(50, "tag:bundle:true");
        setShopifyBundles(products);
      } catch (error) {
        console.error('Error loading bundles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBundles();
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
      toast.success(`${bundle.name} añadido`, {
        description: "Ve al carrito para completar tu compra"
      });
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

  return (
    <section id="christmas-bundles" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
            <Gift className="w-4 h-4 mr-2" />
            Edición Navidad
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

        {/* Bundles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {christmasBundles.map((bundle) => {
            const pricing = calculateBundlePrice(bundle);
            const shopifyProduct = getBundleShopifyProduct(bundle.id);
            
            return (
              <Card 
                key={bundle.id} 
                className="group relative overflow-hidden border-2 border-transparent hover:border-red-200 transition-all duration-300 bg-white"
              >
                {/* Savings badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1">
                    -{pricing.totalSavingsPercent}%
                  </Badge>
                </div>

                <CardContent className="p-6">
                  {/* Icon and title */}
                  <div className="mb-4">
                    <span className="text-4xl mb-3 block">{bundle.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-red-700 transition-colors">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{bundle.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {bundle.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {bundle.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-foreground">
                        {pricing.finalPrice.toFixed(2)}€
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {pricing.originalValue.toFixed(2)}€
                      </span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium">
                      Ahorras {pricing.totalSavings.toFixed(2)}€
                    </p>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-red-700 hover:bg-red-800 text-white"
                    onClick={() => handleAddToCart(bundle, shopifyProduct)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Añadir pack
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Prefieres elegir tú mismo? Todos los productos también disponibles por separado.
          </p>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/productos">Ver catálogo completo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
