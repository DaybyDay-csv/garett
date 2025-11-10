import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Flame, Gift, Sparkles } from "lucide-react";
import { calculatePromotionalPrice, formatPrice, getCurrentPromotionalStage } from "@/lib/promotions";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const items = useCartStore(state => state.items);
  
  // Calculate cart total for GWP
  const cartTotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const GWP_THRESHOLD = 70;
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts(100);
        const found = data.find(p => p.node.handle === handle);
        setProduct(found || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Button asChild>
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { node } = product;
  const variant = node.variants.edges[selectedVariant]?.node;
  const originalPrice = variant ? variant.price.amount : "0";
  
  // Calculate promotional pricing
  const priceInfo = calculatePromotionalPrice(originalPrice);

  const handleAddToCart = () => {
    if (!variant) return;
    
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: {
        ...variant.price,
        // Store the discounted price in cart
        amount: priceInfo.discountedPrice.toString()
      },
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    
    const discountText = priceInfo.hasDiscount 
      ? ` (${priceInfo.discountLabel} aplicado)` 
      : '';
    
    toast.success('Añadido al carrito', {
      description: `${node.title}${discountText}`,
      position: 'top-center',
    });
  };

  const isNew = node.tags.includes('new:true');
  const isBestseller = node.tags.includes('bestseller:true');
  
  // Calculate GWP progress with this product
  const potentialTotal = cartTotal + priceInfo.discountedPrice;
  const progressPercentage = Math.min((potentialTotal / GWP_THRESHOLD) * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - potentialTotal, 0);
  const willUnlockGWP = potentialTotal >= GWP_THRESHOLD && cartTotal < GWP_THRESHOLD;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              {node.images.edges[0]?.node && (
                <img
                  src={node.images.edges[0].node.url}
                  alt={node.images.edges[0].node.altText || node.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {node.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {node.images.edges.slice(1, 5).map((image, idx) => (
                  <div key={idx} className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${node.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3 flex-wrap">
                {/* Promotional Stage Badge - Highest priority */}
                {priceInfo.hasDiscount && priceInfo.stage && (
                  <Badge className={`bg-gradient-to-r ${priceInfo.stage.color} text-white border-0 animate-pulse`}>
                    <Flame className="w-3 h-3 mr-1" />
                    {priceInfo.stage.badge} {priceInfo.discountLabel}
                  </Badge>
                )}
                {isNew && <Badge>Nuevo</Badge>}
                {isBestseller && <Badge variant="secondary">Bestseller</Badge>}
                <Badge variant="outline">Garantía 3 años</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{node.title}</h1>
              
              {node.description && (
                <p className="text-muted-foreground text-lg">{node.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="border-t border-b py-6">
              {priceInfo.hasDiscount ? (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold text-primary">
                      €{priceInfo.discountedPrice.toFixed(2)}
                    </div>
                    <Badge variant="destructive" className="text-base px-3 py-1">
                      {priceInfo.discountLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-muted-foreground line-through">
                      €{priceInfo.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Ahorras €{(priceInfo.originalPrice - priceInfo.discountedPrice).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">IVA incluido</p>
                </div>
              ) : (
                <div>
                  <div className="text-4xl font-bold">€{priceInfo.originalPrice.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground mt-1">IVA incluido</p>
                </div>
              )}
            </div>

            {/* GWP Progress Incentive */}
            {hasGWPActive && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                    ¡Obtén un regalo gratis!
                  </span>
                </div>
                
                {willUnlockGWP ? (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-bold text-sm">¡Añadiendo este producto desbloqueas tu regalo!</p>
                        <p className="text-xs opacity-90">Banda de pelo gratis incluida</p>
                      </div>
                    </div>
                  </div>
                ) : potentialTotal >= GWP_THRESHOLD ? (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-green-900 dark:text-green-100">¡Regalo desbloqueado!</p>
                        <p className="text-xs text-green-700 dark:text-green-300">Banda de pelo gratis con tu compra</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Progress value={progressPercentage} className="h-2 mb-2" />
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      {remainingForGWP > 0 ? (
                        <>Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para obtener una <span className="font-bold">banda de pelo gratis</span></>
                      ) : (
                        <span className="font-bold">¡Banda de pelo gratis desbloqueada!</span>
                      )}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Variants */}
            {node.variants.edges.length > 1 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Variante</label>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map((v, idx) => (
                    <Button
                      key={v.node.id}
                      variant={selectedVariant === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariant(idx)}
                    >
                      {v.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!variant?.availableForSale}
            >
              {variant?.availableForSale ? 'Añadir al carrito' : 'Agotado'}
            </Button>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Garantía 3 años</p>
                  <p className="text-sm text-muted-foreground">Cobertura completa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Envío en 24-48h</p>
                  <p className="text-sm text-muted-foreground">Envío gratuito desde 60€</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Devoluciones 30 días</p>
                  <p className="text-sm text-muted-foreground">Sin preguntas</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
              <p>* Los resultados pueden variar según cada persona. Los dispositivos Garett están certificados CE y cuentan con garantía de 3 años.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
