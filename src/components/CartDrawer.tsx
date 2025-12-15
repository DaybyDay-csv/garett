import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustBadges } from "@/components/TrustBadges";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  const subtotalOriginal = items.filter(item => !item.isGWP).reduce((sum, item) => {
    // Use the original product price from the product data, not the variant price which might be discounted
    const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
    return sum + originalPrice * item.quantity;
  }, 0);

  // Current stage and discount
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;
  
  // Calculate discounts separately for AeroGlow (30%), LED launch (30%), bundles, and other products
  let totalDiscount = 0;
  const hasAeroGlow = items.some(item => item.product.node.handle === 'plancha-pelo-aeroglow');
  const hasLEDLaunch = items.some(item => 
    item.product.node.handle === 'mascara-led-garett-beauty' || 
    item.product.node.handle === 'manopla-led-garett-beauty'
  );
  
  // Helper to check if item is LED launch product
  const isLEDLaunchProduct = (handle: string) => 
    handle === 'mascara-led-garett-beauty' || handle === 'manopla-led-garett-beauty';
  
  // Helper to check if item is a bundle
  const isBundleProduct = (item: typeof items[0]) => 
    item.product.node.productType === 'Bundle' ||
    item.product.node.handle.startsWith('pack-');
  
  const hasBundles = items.some(item => !item.isGWP && isBundleProduct(item));
  
  // Helper to get fixed LED prices
  const getLEDOriginalPrice = (handle: string) => {
    if (handle === 'mascara-led-garett-beauty') return 350;
    if (handle === 'manopla-led-garett-beauty') return 299;
    return 0;
  };
  
  items.filter(item => !item.isGWP).forEach(item => {
    const handle = item.product.node.handle;
    const itemQuantity = item.quantity;
    
    if (handle === 'plancha-pelo-aeroglow') {
      // AeroGlow: €449 base, 30% off
      totalDiscount += 449 * itemQuantity * 0.3;
    } else if (isLEDLaunchProduct(handle)) {
      // LED launch products: fixed prices, 30% off
      const basePrice = getLEDOriginalPrice(handle);
      totalDiscount += basePrice * itemQuantity * 0.3;
    } else if (isBundleProduct(item)) {
      // Bundles get base discount + bundle extra discount
      const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
      const bundleDiscount = (currentStage?.baseDiscount ?? 0) + (currentStage?.bundleExtraDiscount ?? 0);
      totalDiscount += originalPrice * itemQuantity * (bundleDiscount / 100);
    } else {
      // Other products get stage discount
      const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
      const discountPercentage = currentStage?.baseDiscount ?? 0;
      totalDiscount += originalPrice * itemQuantity * (discountPercentage / 100);
    }
  });
  
  // Calculate subtotal with fixed prices for special products
  const subtotalOriginalFixed = items.filter(item => !item.isGWP).reduce((sum, item) => {
    const handle = item.product.node.handle;
    if (handle === 'plancha-pelo-aeroglow') return sum + 449 * item.quantity;
    if (isLEDLaunchProduct(handle)) return sum + getLEDOriginalPrice(handle) * item.quantity;
    return sum + parseFloat(item.product.node.priceRange.minVariantPrice.amount) * item.quantity;
  }, 0);
  
  const subtotalWithDiscount = subtotalOriginalFixed - totalDiscount;

  // GWP threshold
  const GWP_THRESHOLD = 70;
  const progressPercentage = Math.min(subtotalWithDiscount / GWP_THRESHOLD * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - subtotalWithDiscount, 0);
  const hasUnlockedGWP = subtotalWithDiscount >= GWP_THRESHOLD;

  // Calculate total savings
  const totalSavings = totalDiscount;
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
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Carrito</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito`}
          </SheetDescription>
        </SheetHeader>
        
        {/* GWP Progress Bar - Compact */}
        {hasGWPActive && items.length > 0 && <div className="flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-2 border border-purple-200 dark:border-purple-800 mt-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 rounded-md overflow-hidden bg-white flex-shrink-0 border border-purple-200">
                {gwpProduct?.node.images?.edges?.[0]?.node ? <img src={gwpProduct.node.images.edges[0].node.url} alt="Banda de pelo gratis" className="w-full h-full object-cover" /> : <img src={gwpHeadband} alt="Banda de pelo gratis" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Gift className="w-3 h-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="font-semibold text-sm text-purple-800 leading-tight truncate">
                    {hasUnlockedGWP ? '¡Regalo desbloqueado!' : 'Casi consigues tu regalo gratis'}
                  </span>
                </div>
                <p className="text-[11px] text-purple-700 dark:text-purple-300 leading-tight mt-0.5">
                  Banda de pelo Garett Routine  
                </p>
              </div>
            </div>
            
            {!hasUnlockedGWP && <>
                <Progress value={progressPercentage} className="h-1 mb-1" />
                <p className="text-[10px] text-purple-800 dark:text-purple-200">
                  Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para tu <span className="font-bold">banda gratis</span>
                </p>
              </>}
          </div>}
        
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            </div> : <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-2.5">
                  {items.filter(item => !item.isGWP).map(item => <div key={item.variantId} className={`flex gap-2.5 p-2 border rounded-lg ${item.isGWP ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800' : ''}`}>
                      <div className="w-14 h-14 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0 relative">
                        {item.product.node.images?.edges?.[0]?.node && <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />}
                        {item.isGWP && <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-bl">
                            GRATIS
                          </div>}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-1.5">
                          <h4 className="font-medium text-xs leading-tight flex-1 line-clamp-2">
                            {item.product.node.title}
                          </h4>
                          {item.isGWP && <Gift className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className={`font-semibold text-sm mt-0.5 ${item.isGWP ? 'text-purple-600 dark:text-purple-400' : ''}`}>
                          {item.isGWP ? 'GRATIS' : `€${(() => {
                            const handle = item.product.node.handle;
                            if (handle === 'plancha-pelo-aeroglow') return '449.00';
                            if (handle === 'mascara-led-garett-beauty') return '350.00';
                            if (handle === 'manopla-led-garett-beauty') return '299.00';
                            return parseFloat(item.product.node.priceRange.minVariantPrice.amount).toFixed(2);
                          })()}`}
                        </p>
                      </div>
                      
                      {!item.isGWP && <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeItem(item.variantId)}>
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
                        </div>}
                      
                      {item.isGWP && <div className="flex items-center text-purple-600 dark:text-purple-400">
                          <Badge variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-[10px] px-1.5 py-0.5">
                            Regalo automático
                          </Badge>
                        </div>}
                    </div>)}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-3 pt-3 border-t bg-background mt-3">
                {/* Price Breakdown */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Subtotal</span>
                    <span>€{subtotalOriginalFixed.toFixed(2)}</span>
                  </div>
                  
                  {/* Active Discounts */}
                  {hasAeroGlow && <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Descuento AeroGlow (30%)
                      </span>
                      <span>-€{(items.filter(item => item.product.node.handle === 'plancha-pelo-aeroglow').reduce((sum, item) => {
                        return sum + 449 * item.quantity * 0.3;
                      }, 0)).toFixed(2)}</span>
                    </div>}
                  
                  {hasLEDLaunch && <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Dto. Lanzamiento LED (30%)
                      </span>
                      <span>-€{(items.filter(item => isLEDLaunchProduct(item.product.node.handle)).reduce((sum, item) => {
                        const basePrice = getLEDOriginalPrice(item.product.node.handle);
                        return sum + basePrice * item.quantity * 0.3;
                      }, 0)).toFixed(2)}</span>
                    </div>}
                  
                  {/* Bundle discount */}
                  {hasBundles && currentStage && (currentStage.baseDiscount > 0 || currentStage.bundleExtraDiscount > 0) && <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Dto. Pack ({(currentStage.baseDiscount + currentStage.bundleExtraDiscount)}%)
                      </span>
                      <span>-€{(items.filter(item => !item.isGWP && isBundleProduct(item)).reduce((sum, item) => {
                        const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
                        const bundleDiscount = currentStage.baseDiscount + currentStage.bundleExtraDiscount;
                        return sum + originalPrice * item.quantity * (bundleDiscount / 100);
                      }, 0)).toFixed(2)}</span>
                    </div>}
                  
                  {/* Regular product discount */}
                  {currentStage && currentStage.baseDiscount > 0 && items.some(item => !item.isGWP && item.product.node.handle !== 'plancha-pelo-aeroglow' && !isLEDLaunchProduct(item.product.node.handle) && !isBundleProduct(item)) && <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Descuento Navidad ({currentStage.baseDiscount}%)
                      </span>
                      <span>-€{(items.filter(item => !item.isGWP && item.product.node.handle !== 'plancha-pelo-aeroglow' && !isLEDLaunchProduct(item.product.node.handle) && !isBundleProduct(item)).reduce((sum, item) => {
                        const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
                        return sum + originalPrice * item.quantity * (currentStage.baseDiscount / 100);
                      }, 0)).toFixed(2)}</span>
                    </div>}
                  
                  {/* Gift With Purchase */}
                  {hasGWPActive && hasUnlockedGWP && <div className="flex justify-between text-purple-600 dark:text-purple-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Gift className="w-3 h-3" />
                        Regalo: Banda de pelo
                      </span>
                      <span className="font-semibold">GRATIS</span>
                    </div>}
                  
                  <div className="h-px bg-border my-1.5"></div>
                  
                  {/* Total */}
                  <div className="flex justify-between items-center text-base font-bold">
                    <span>Total</span>
                    <span>€{subtotalWithDiscount.toFixed(2)}</span>
                  </div>
                  
                  {/* Total Savings */}
                  {totalSavings > 0 && <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-lg p-2 text-center">
                      <p className="text-xs font-bold text-green-700 dark:text-green-300">
                        ¡Ahorras €{totalSavings.toFixed(2)} en esta compra!
                      </p>
                      {hasUnlockedGWP && <p className="text-[10px] text-green-600 dark:text-green-400 mt-0.5">
                          Incluye banda de pelo gratis
                        </p>}
                    </div>}
                </div>
                
                <Button onClick={handleCheckout} className="w-full h-11" disabled={items.length === 0 || isLoading}>
                  {isLoading ? <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando checkout...
                    </> : <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Finalizar compra
                    </>}
                </Button>
                
                {/* Trust Badges in Cart */}
                <div className="border-t pt-2.5 mt-2.5">
                  <TrustBadges variant="cart" />
                </div>
              </div>
            </>}
        </div>
      </SheetContent>
    </Sheet>;
};