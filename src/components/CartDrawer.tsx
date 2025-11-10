import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  
  // GWP threshold
  const GWP_THRESHOLD = 70;
  const progressPercentage = Math.min((totalPrice / GWP_THRESHOLD) * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - totalPrice, 0);
  const hasUnlockedGWP = totalPrice >= GWP_THRESHOLD;
  
  // Check if current stage has GWP
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;

  const handleCheckout = async () => {
    try {
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
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                {hasUnlockedGWP ? '¡Regalo desbloqueado!' : 'Casi consigues tu regalo gratis'}
              </span>
            </div>
            
            {hasUnlockedGWP ? (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">¡Banda de pelo gratis incluida!</p>
                    <p className="text-xs opacity-90">Se añadirá automáticamente en el checkout</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para obtener una <span className="font-bold">banda de pelo gratis</span>
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
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2 border rounded-lg">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className="font-semibold text-sm mt-1">
                          €{parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      
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
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    €{totalPrice.toFixed(2)}
                  </span>
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
                
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>✓ Devoluciones 30 días</p>
                  <p>✓ Garantía 3 años</p>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
