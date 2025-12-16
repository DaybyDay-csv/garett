import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { calculatePromotionalPrice, formatPrice } from "@/lib/promotions";
import { Flame } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";

interface ProductCardProps {
  product: ShopifyProduct;
  tagIndex?: number;
  hideBadges?: boolean;
  hideAddToCart?: boolean;
}

export const ProductCard = ({ product, tagIndex, hideBadges = false, hideAddToCart = false }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const originalPrice = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  
  // Check if this is the AeroGlow product (Black Friday event)
  const isAeroGlow = node.handle.includes('aeroglow') || node.title.toLowerCase().includes('aeroglow');
  
  // Check if this is a LED launch product (Máscara LED or Manopla LED)
  const isMascaraLED = node.handle === 'mascara-led-garett-beauty';
  const isManopolaLED = node.handle === 'manopla-led-garett-beauty';
  const isLEDLaunch = isMascaraLED || isManopolaLED;
  
  // Calculate promotional pricing - special handling for AeroGlow and LED launch products
  let priceInfo;
  if (isAeroGlow) {
    priceInfo = {
      originalPrice: 449,
      discountedPrice: 314.30,
      hasDiscount: true,
      discountLabel: '-30%',
      stage: {
        badge: 'LANZAMIENTO',
        color: 'from-red-600 to-pink-600'
      }
    };
  } else if (isMascaraLED) {
    // Máscara LED: €450 base, 30% off = €315
    priceInfo = {
      originalPrice: 450,
      discountedPrice: 315,
      hasDiscount: true,
      discountLabel: '-30%',
      stage: {
        badge: 'LANZAMIENTO',
        color: 'from-red-600 to-pink-600'
      }
    };
  } else if (isManopolaLED) {
    // Manopla LED: €299 base, 30% off = €209.30
    priceInfo = {
      originalPrice: 299,
      discountedPrice: 209.30,
      hasDiscount: true,
      discountLabel: '-30%',
      stage: {
        badge: 'LANZAMIENTO',
        color: 'from-red-600 to-pink-600'
      }
    };
  } else {
    priceInfo = calculatePromotionalPrice(originalPrice.amount);
  }
  
  // Extract badges from tags
  const isNew = node.tags.includes('new:true');
  const isBestseller = node.tags.includes('bestseller:true');
  const isLaunch = node.tags.includes('launch:bf2025');
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: {
        ...firstVariant.price,
        // Store the discounted price in cart
        amount: priceInfo.discountedPrice.toString()
      },
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    
    // Track AddToCart event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: node.title,
        content_ids: [firstVariant.id],
        content_type: 'product',
        value: priceInfo.discountedPrice,
        currency: 'EUR'
      });
    }
    
    const discountText = priceInfo.hasDiscount 
      ? ` (${priceInfo.discountLabel} aplicado)` 
      : '';
    
    toast.success('Añadido al carrito', {
      description: `${node.title}${discountText}`,
      position: 'top-center',
    });
  };

  return (
    <Link 
      to={`/producto/${node.handle}`}
      className="group block bg-card rounded-none overflow-hidden border hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-secondary/20 overflow-hidden relative">
        {image && (
          <OptimizedImage
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            blurPlaceholder
          />
        )}
        
        {/* Max 2 tags at bottom-left - Only show if not hidden */}
        {!hideBadges && (
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            {isLaunch ? (
              <Badge variant="default" className="text-xs">
                Lanzamiento
              </Badge>
            ) : (
              <>
                {isBestseller && (
                  <Badge variant="secondary" className="text-xs">
                    Superventa
                  </Badge>
                )}
                {!isBestseller && isNew && (
                  <Badge variant="default" className="text-xs">
                    Nuevo
                  </Badge>
                )}
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-base mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {node.title}
        </h3>
        
        {/* Description hidden on all screens */}
        {node.description && (
          <p className="hidden text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
        )}
        
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex flex-col flex-1 min-w-0">
            {priceInfo.hasDiscount ? (
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
                    €{priceInfo.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-destructive/90">
                    {priceInfo.discountLabel}
                  </span>
                </div>
                <span className="block text-sm text-muted-foreground line-through">
                  €{priceInfo.originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl md:text-3xl font-semibold tracking-tight">
                €{priceInfo.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Only show button if not hidden */}
          {!hideAddToCart && (
            <Button 
              onClick={handleAddToCart}
              disabled={!firstVariant?.availableForSale}
              size="lg"
              className="w-full md:inline-flex h-12 text-base backdrop-blur-sm disabled:opacity-60"
            >
              {firstVariant?.availableForSale ? 'Añadir al carrito' : 'Agotado'}
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};
