import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustBadges } from "@/components/TrustBadges";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Sparkles, Truck, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { KlarnaWidget } from "@/components/KlarnaWidget";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackBeginCheckout, trackViewCart, trackRemoveFromCart } from "@/hooks/usePageTracking";
import { Link } from "react-router-dom";

const FREE_SHIPPING_THRESHOLD = 49;

// Imágenes de fallback para bundles (primer producto del pack)
const BUNDLE_FALLBACK_IMAGES: Record<string, string> = {
  'pack-relax-body-glow': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/172_3afa61d839340df066d5eafa8d38eaaf.jpg?v=1762798843',
  'pack-duo-glow-led': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/manopla-led-1.png?v=1765822763',
  'pack-ritual-piel-nueva': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/177_43667ac48ff0894c9a265cca3cd1b26b.jpg?v=1762798845',
  'pack-lifting-en-casa': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/95_14761db03d22136544659baee30e9203.jpg?v=1762798855',
  'pack-mirada-descansada': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/73_89c81ec9f56eb428ad789c45cd88c12e.jpg?v=1762798852',
  'pack-glow-diario': 'https://cdn.shopify.com/s/files/1/0948/9580/0683/files/175_39199cdc11c520c653601745bf21ed7b.webp?v=1762798844',
};

export const CartDrawer = () => {
  const isMobile = useIsMobile();
  const {
    items,
    isLoading,
    isOpen,
    updateQuantity,
    removeItem,
    createCheckout,
    setIsOpen,
    loadGWPProduct,
    checkAndAddGWP,
  } = useCartStore();

  // Load GWP product on mount
  useEffect(() => {
    loadGWPProduct();
  }, [loadGWPProduct]);

  // Check GWP threshold whenever items change
  useEffect(() => {
    checkAndAddGWP();
  }, [items.length, checkAndAddGWP]);

  // Track view_cart when drawer opens
  useEffect(() => {
    if (isOpen && items.length > 0) {
      const cartItems = items.filter(item => !item.isGWP).map(item => ({
        id: item.variantId,
        name: item.product.node.title,
        price: parseFloat(item.price.amount),
        quantity: item.quantity,
      }));
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      trackViewCart(cartItems, total);
    }
  }, [isOpen]);

  // Exclude GWP items from count
  const totalItems = items.filter(item => !item.isGWP).reduce((sum, item) => sum + item.quantity, 0);

  // Check if product is LED launch (permanent 30% discount in Shopify)
  const isLEDLaunchProduct = (handle: string) => handle === 'mascara-led-garett-beauty' || handle === 'manopla-led-garett-beauty';

  // Calculate total price using cart item prices (already correct from Shopify)
  const subtotalWithDiscount = items.filter(item => !item.isGWP).reduce((sum, item) => {
    const price = parseFloat(item.price.amount);
    return sum + price * item.quantity;
  }, 0);

  // Calculate savings only for LED products that have permanent discount
  let totalSavings = 0;
  const hasLEDLaunch = items.some(item => !item.isGWP && isLEDLaunchProduct(item.product.node.handle));
  
  if (hasLEDLaunch) {
    items.filter(item => !item.isGWP && isLEDLaunchProduct(item.product.node.handle)).forEach(item => {
      const handle = item.product.node.handle;
      // LED products have 30% off from compare_at_price
      const originalPrice = handle === 'mascara-led-garett-beauty' ? 450 : 299;
      const currentPrice = parseFloat(item.price.amount);
      totalSavings += (originalPrice - currentPrice) * item.quantity;
    });
  }

  const handleCheckout = async () => {
    // Detectar si estamos en un iframe (preview de Lovable)
    const isInIframe = window.self !== window.top;
    const shouldOpenNewTab = !isMobile || isInIframe;
    
    // Safari bloquea window.open() después de async, así que abrimos antes
    let newWindow: Window | null = null;
    if (shouldOpenNewTab) {
      newWindow = window.open('about:blank', '_blank');
    }
    
    try {
      // Track begin_checkout event (GA4 + Meta Pixel)
      const checkoutItems = items.filter(item => !item.isGWP).map(item => ({
        id: item.variantId,
        name: item.product.node.title,
        price: parseFloat(item.price.amount),
        quantity: item.quantity,
      }));
      trackBeginCheckout(checkoutItems, subtotalWithDiscount);

      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        if (shouldOpenNewTab && newWindow) {
          // Asignar URL a la ventana ya abierta
          newWindow.location.href = checkoutUrl;
        } else if (isMobile && !isInIframe) {
          // En móvil real: redirigir en la misma ventana
          window.location.href = checkoutUrl;
        }
        setIsOpen(false);
      } else if (newWindow) {
        // Si no hay URL, cerrar la ventana vacía
        newWindow.close();
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      // Cerrar ventana vacía si hay error
      if (newWindow) {
        newWindow.close();
      }
      toast.error('Error al crear el checkout', {
        description: 'Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-header-foreground/10 border-header-foreground/30 text-header-foreground hover:bg-header-foreground/20">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <SheetTitle>Carrito</SheetTitle>
            {items.filter(i => !i.isGWP).length > 0 && (
              <Button asChild variant="ghost" size="sm" className="text-xs" onClick={() => setIsOpen(false)}>
                <Link to="/productos">
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Sigue comprando
                </Link>
              </Button>
            )}
          </div>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-2.5">
                  {items.filter(item => !item.isGWP).map(item => (
                    <div key={item.variantId} className="flex gap-2.5 p-2 border rounded-lg">
                      <div className="w-14 h-14 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0 relative">
                        {(() => {
                          const handle = item.product.node.handle;
                          const shopifyImage = item.product.node.images?.edges?.[0]?.node?.url;
                          const bundleFallback = BUNDLE_FALLBACK_IMAGES[handle];
                          const imageUrl = shopifyImage || bundleFallback;
                          
                          return imageUrl ? (
                            <img src={imageUrl} alt={item.product.node.title} className="w-full h-full object-cover" />
                          ) : null;
                        })()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-1.5">
                          <h4 className="font-medium text-xs leading-tight flex-1 line-clamp-2">
                            {item.product.node.title}
                          </h4>
                        </div>
                        
                        {(() => {
                          const handle = item.product.node.handle;
                          const price = parseFloat(item.price.amount);
                          
                          // LED products show original crossed out price
                          if (handle === 'mascara-led-garett-beauty') {
                            return (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-xs text-muted-foreground line-through">€450.00</span>
                                <span className="font-semibold text-sm text-green-600 dark:text-green-400">€{price.toFixed(2)}</span>
                              </div>
                            );
                          } else if (handle === 'manopla-led-garett-beauty') {
                            return (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-xs text-muted-foreground line-through">€299.00</span>
                                <span className="font-semibold text-sm text-green-600 dark:text-green-400">€{price.toFixed(2)}</span>
                              </div>
                            );
                          }
                          
                          // Regular products - just show the price
                          return <p className="font-semibold text-sm mt-0.5">€{price.toFixed(2)}</p>;
                        })()}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5" 
                          onClick={() => {
                            trackRemoveFromCart({
                              id: item.variantId,
                              name: item.product.node.title,
                              price: parseFloat(item.price.amount),
                              quantity: item.quantity,
                            });
                            removeItem(item.variantId);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-0.5">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-2.5 w-2.5" />
                          </Button>
                          <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-2.5 w-2.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-3 pt-3 border-t bg-background mt-3">
                {/* Free Shipping Progress */}
                {(() => {
                  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotalWithDiscount, 0);
                  const progressPercent = Math.min((subtotalWithDiscount / FREE_SHIPPING_THRESHOLD) * 100, 100);
                  const unlocked = subtotalWithDiscount >= FREE_SHIPPING_THRESHOLD;
                  return (
                    <div className={`rounded-lg p-3 border ${unlocked ? 'bg-primary-light border-primary/20' : 'bg-muted border-border'}`}>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Truck className={`w-4 h-4 flex-shrink-0 ${unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                        {unlocked ? (
                          <span className="text-foreground">¡Envío gratis desbloqueado!</span>
                        ) : (
                          <span className="text-foreground">
                            Te faltan <span className="font-bold text-primary">€{remaining.toFixed(2)}</span> para envío gratis
                          </span>
                        )}
                      </div>
                      <Progress value={progressPercent} className="h-1.5 mt-2" />
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Envío gratis en pedidos +{FREE_SHIPPING_THRESHOLD}€ en Península
                      </p>
                    </div>
                  );
                })()}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-sm">
                  {/* LED Launch discount */}
                  {hasLEDLaunch && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Dto. Lanzamiento LED (30%)
                      </span>
                      <span>-€{totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="h-px bg-border my-1.5"></div>
                  
                  {/* Total */}
                  <div className="flex justify-between items-center text-base font-bold">
                    <span>Total</span>
                    <span>€{subtotalWithDiscount.toFixed(2)}</span>
                  </div>
                  
                  {/* Total Savings */}
                  {totalSavings > 0 && (
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-lg p-2 text-center">
                      <p className="text-xs font-bold text-green-700 dark:text-green-300">
                        ¡Ahorras €{totalSavings.toFixed(2)} en esta compra!
                      </p>
                    </div>
                  )}
                  
                  {/* Klarna Widget */}
                  <KlarnaWidget price={subtotalWithDiscount} variant="cart" />
                </div>
                
                <Button onClick={handleCheckout} className="w-full h-11" disabled={items.length === 0 || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Finalizar compra
                    </>
                  )}
                </Button>
                
                {/* Trust Badges in Cart */}
                <div className="border-t pt-2.5 mt-2.5">
                  <TrustBadges variant="cart" />
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
