import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustBadges } from "@/components/TrustBadges";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Gift, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { getCurrentPromotionalStage } from "@/lib/promotions";
import { toast } from "sonner";
import gwpHeadband from "@/assets/gwp-headband.png";

export const CartDrawer = () => {
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
    gwpProduct
  } = useCartStore();
  
  // Load GWP product on mount
  useEffect(() => {
    loadGWPProduct();
  }, [loadGWPProduct]);
  
  // Check GWP threshold whenever items change
  useEffect(() => {
    checkAndAddGWP();
  }, [items.length, checkAndAddGWP]);
  
  // Exclude GWP items from count
  const totalItems = items.filter(item => !item.isGWP).reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate original prices (without discounts) - exclude GWP items
  const subtotalOriginal = items
    .filter(item => !item.isGWP)
    .reduce((sum, item) => {
      // Use the actual variant price, not the minimum price
      const originalPrice = parseFloat(item.price.amount);
      return sum + (originalPrice * item.quantity);
    }, 0);
  
  // Current stage and discount
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;
  const discountPercentage = currentStage?.baseDiscount ?? 0;
  const discountAmount = subtotalOriginal * (discountPercentage / 100);
  const subtotalWithDiscount = subtotalOriginal - discountAmount;
  
  // GWP threshold
  const GWP_THRESHOLD = 70;
  const progressPercentage = Math.min((subtotalWithDiscount / GWP_THRESHOLD) * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - subtotalWithDiscount, 0);
  const hasUnlockedGWP = subtotalWithDiscount >= GWP_THRESHOLD;
  
  // Calculate GWP value for total savings
  const gwpValue = gwpProduct ? parseFloat(gwpProduct.node.priceRange.minVariantPrice.amount) : 0;
  const totalSavings = discountAmount + (hasUnlockedGWP ? gwpValue : 0);

  const handleCheckout = async () => {
    try {
      // Track InitiateCheckout event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_ids: items.filter(item => !item.isGWP).map(item => item.variantId),
          contents: items.filter(item => !item.isGWP).map(item => ({
            id: item.variantId,
            quantity: item.quantity
          })),
          value: subtotalWithDiscount,
          currency: 'EUR',
          num_items: totalItems
        });
      }
      
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Error al crear el checkout', {
        description: 'Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
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
          <SheetTitle>Carrito</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito`}
          </SheetDescription>
        </SheetHeader>
        
        {/* GWP Progress Bar */}
        {hasGWPActive && items.length > 0 && (
          <div className="flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800 mt-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border-2 border-purple-200">
                {gwpProduct?.node.images?.edges?.[0]?.node ? (
                  <img 
                    src={gwpProduct.node.images.edges[0].node.url} 
                    alt="Banda de pelo gratis" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={gwpHeadband} 
                    alt="Banda de pelo gratis" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                    {hasUnlockedGWP ? '¡Regalo desbloqueado!' : 'Casi consigues tu regalo gratis'}
                  </span>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Banda de pelo deportiva
                </p>
              </div>
            </div>
            
            {hasUnlockedGWP ? (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">¡Regalo incluido gratis!</p>
                    <p className="text-xs opacity-90">Se añadirá automáticamente en el checkout</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para obtener tu <span className="font-bold">banda de pelo gratis</span>
                </p>
              </>
            )}
          </div>
        )}
        
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
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.filter(item => !item.isGWP).map((item) => (
                    <div 
                      key={item.variantId} 
                      className={`flex gap-4 p-2 border rounded-lg ${
                        item.isGWP ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800' : ''
                      }`}
                    >
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0 relative">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.isGWP && (
                          <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-bl">
                            GRATIS
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <h4 className="font-medium truncate text-sm flex-1">
                            {item.product.node.title}
                          </h4>
                          {item.isGWP && <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className={`font-semibold text-sm mt-1 ${item.isGWP ? 'text-purple-600 dark:text-purple-400' : ''}`}>
                          {item.isGWP ? 'GRATIS' : `€${parseFloat(item.price.amount).toFixed(2)}`}
                        </p>
                      </div>
                      
                      {!item.isGWP && (
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {item.isGWP && (
                        <div className="flex items-center text-purple-600 dark:text-purple-400">
                          <Badge variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                            Regalo automático
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background mt-4">
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>€{subtotalOriginal.toFixed(2)}</span>
                  </div>
                  
                  {/* Active Discount */}
                  {currentStage && discountPercentage > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Descuento {currentStage.badge} ({discountPercentage}%)
                      </span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Discount Code Info */}
                  {currentStage?.code && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-xs text-green-800 dark:text-green-200 font-semibold mb-1">
                        Código de descuento activo
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-sm font-bold text-green-900 dark:text-green-100 bg-white dark:bg-green-950 px-3 py-1 rounded border border-green-300 dark:border-green-700">
                          {currentStage.code}
                        </code>
                        <span className="text-xs text-green-700 dark:text-green-300">
                          Ya aplicado
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Gift With Purchase */}
                  {hasGWPActive && hasUnlockedGWP && (
                    <div className="flex justify-between text-purple-600 dark:text-purple-400">
                      <span className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Regalo: Banda de pelo
                      </span>
                      <span className="font-semibold">GRATIS</span>
                    </div>
                  )}
                  
                  <div className="h-px bg-border my-2"></div>
                  
                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>€{subtotalWithDiscount.toFixed(2)}</span>
                  </div>
                  
                  {/* Total Savings */}
                  {totalSavings > 0 && (
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                      <p className="text-sm font-bold text-green-700 dark:text-green-300">
                        ¡Ahorras €{totalSavings.toFixed(2)} en esta compra!
                      </p>
                      {hasUnlockedGWP && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Incluye banda de pelo gratis (€{gwpValue.toFixed(2)})
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
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
                <div className="border-t pt-4 mt-4">
                  <TrustBadges variant="compact" />
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
