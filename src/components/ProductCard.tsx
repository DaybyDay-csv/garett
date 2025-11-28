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
}

export const ProductCard = ({ product, tagIndex }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const originalPrice = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  
  // Check if this is the AeroGlow product (Black Friday event)
  const isAeroGlow = node.handle.includes('aeroglow') || node.title.toLowerCase().includes('aeroglow');
  
  // Calculate promotional pricing - special handling for AeroGlow
  let priceInfo;
  if (isAeroGlow) {
    priceInfo = {
      originalPrice: 449,
      discountedPrice: 224.50,
      hasDiscount: true,
      discountLabel: '-50%',
      stage: {
        badge: 'BLACK FRIDAY',
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
        
        {/* Max 2 tags at bottom-left - Priority: Lanzamiento > Superventa > Nuevo > X% OFF */}
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
              {!isBestseller && !isNew && priceInfo.hasDiscount && (
                <Badge variant="outline" className="text-xs bg-background">
                  {priceInfo.discountLabel} OFF
                </Badge>
              )}
              {isBestseller && priceInfo.hasDiscount && (
                <Badge variant="outline" className="text-xs bg-background">
                  {priceInfo.discountLabel} OFF
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        
        {/* Description hidden on all screens */}
        {node.description && (
          <p className="hidden text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col flex-1 min-w-0">
            {priceInfo.hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  €{priceInfo.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  €{priceInfo.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                €{priceInfo.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!firstVariant?.availableForSale || isLaunch}
            size="sm"
            className="hidden md:inline-flex w-full sm:w-auto backdrop-blur-sm disabled:opacity-60"
          >
            {isLaunch ? 'Próximamente' : (firstVariant?.availableForSale ? 'Añadir' : 'Agotado')}
          </Button>
        </div>
      </div>
    </Link>
  );
};
