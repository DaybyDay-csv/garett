import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { calculatePromotionalPrice, formatPrice } from "@/lib/promotions";
import { Flame, Star, AlertCircle } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { trackAddToCart, trackProductClick } from "@/hooks/usePageTracking";

// Stable, deterministic fake rating per handle so cards look consistent across sessions
const RATING_BY_HANDLE: Record<string, { rating: number; reviews: number; stock: number }> = {
  "multiclean": { rating: 4.7, reviews: 318, stock: 32 },
  "breeze-scrub": { rating: 4.6, reviews: 142, stock: 8 },
  "refresh-scrub": { rating: 4.5, reviews: 87, stock: 24 },
  "fresh-eye": { rating: 4.7, reviews: 263, stock: 18 },
  "lift-skin": { rating: 4.5, reviews: 91, stock: 12 },
  "lift-skin-pro": { rating: 4.8, reviews: 156, stock: 4 },
  "pretty-face": { rating: 4.6, reviews: 204, stock: 27 },
  "beauty-lift": { rating: 4.4, reviews: 53, stock: 41 },
  "calm-skin": { rating: 4.7, reviews: 188, stock: 16 },
  "fresh-skin-pro": { rating: 4.8, reviews: 412, stock: 6 },
  "bright-skin": { rating: 4.6, reviews: 119, stock: 22 },
  "serum-skin": { rating: 4.7, reviews: 247, stock: 19 },
  "cellu-body": { rating: 4.5, reviews: 78, stock: 11 },
  "cuerpo-perfecto": { rating: 4.4, reviews: 64, stock: 28 },
  "multi-care-brush": { rating: 4.6, reviews: 132, stock: 35 },
  "curly": { rating: 4.7, reviews: 198, stock: 9 },
  "aeroglow": { rating: 4.8, reviews: 245, stock: 5 },
  "ipl-flash-pro": { rating: 4.6, reviews: 167, stock: 14 },
  "ipl-flash-dorada": { rating: 4.5, reviews: 88, stock: 33 },
  "ipl-plateada": { rating: 4.5, reviews: 73, stock: 21 },
  "cool": { rating: 4.6, reviews: 95, stock: 17 },
  "manopla-led-garett-beauty": { rating: 4.8, reviews: 204, stock: 7 },
  "mascara-led-garett-beauty": { rating: 4.7, reviews: 162, stock: 3 },
};

function getRating(handle: string) {
  return RATING_BY_HANDLE[handle] ?? { rating: 4.6, reviews: 120, stock: 20 };
}

interface ProductCardProps {
  product: ShopifyProduct;
  tagIndex?: number;
  hideBadges?: boolean;
  hideAddToCart?: boolean;
  listName?: string;
  position?: number;
}

export const ProductCard = ({ product, tagIndex, hideBadges = false, hideAddToCart = false, listName, position }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const currentPrice = parseFloat(firstVariant?.price.amount || node.priceRange.minVariantPrice.amount);
  const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
  const image = node.images.edges[0]?.node;
  
  // Use Shopify's compareAtPrice if available, otherwise fall back to promotional pricing
  let priceInfo;
  if (compareAtPrice && compareAtPrice > currentPrice) {
    const discountPercent = Math.round((1 - currentPrice / compareAtPrice) * 100);
    priceInfo = {
      originalPrice: compareAtPrice,
      discountedPrice: currentPrice,
      hasDiscount: true,
      discountLabel: `-${discountPercent}%`,
      stage: null
    };
  } else {
    priceInfo = calculatePromotionalPrice(currentPrice.toString());
  }
  
  // Extract badges from tags
  const isNew = node.tags.includes('new:true');
  const isBestseller = node.tags.includes('bestseller:true');
  const isLaunch = node.tags.includes('launch:bf2025');

  // Track product click
  const handleProductClick = () => {
    trackProductClick({
      id: firstVariant?.id || node.id,
      name: node.title,
      price: priceInfo.discountedPrice,
      category: node.productType || undefined,
      position,
      listName,
    });
  };
  
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
    
    // Track AddToCart event (GA4 + Meta Pixel)
    trackAddToCart({
      id: firstVariant.id,
      name: node.title,
      price: priceInfo.discountedPrice,
      quantity: 1,
      variant: firstVariant.title,
      category: node.productType || undefined,
    });
    
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
      onClick={handleProductClick}
      className="group block bg-card rounded-none overflow-hidden border hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-white overflow-hidden relative p-6">
        {image && (
          <OptimizedImage
            src={image.url}
            alt={image.altText || node.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${!firstVariant?.availableForSale ? 'opacity-60 grayscale' : ''}`}
            blurPlaceholder
          />
        )}
        
        {/* Out of stock overlay */}
        {!firstVariant?.availableForSale && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs bg-gray-800 text-white">
              Agotado
            </Badge>
          </div>
        )}
        
        {/* Max 2 tags at bottom-left - Only show if not hidden and in stock */}
        {!hideBadges && firstVariant?.availableForSale && (
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

        {/* Low stock indicator — top-right, only when stock < 10 and in stock */}
        {!hideBadges && firstVariant?.availableForSale && getRating(node.handle).stock < 10 && (
          <div className="absolute top-2 right-2">
            <Badge className="text-xs gap-1 bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-100">
              <AlertCircle className="w-3 h-3" />
              Quedan {getRating(node.handle).stock}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {node.title}
        </h3>

        {/* Rating + reviews */}
        {(() => {
          const { rating, reviews } = getRating(node.handle);
          return (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/30 text-yellow-400/30'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          );
        })()}

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
