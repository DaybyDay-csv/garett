import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { calculatePromotionalPrice, formatPrice } from "@/lib/promotions";
import { Flame } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const originalPrice = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  
  // Calculate promotional pricing
  const priceInfo = calculatePromotionalPrice(originalPrice.amount);
  
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
      className="group block bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-secondary/20 overflow-hidden relative">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-2">
          {/* Left side badges - Priority: Promotional > Launch > Bestseller > New (max 2) */}
          <div className="flex flex-col gap-1 max-w-[60%]">
            {priceInfo.hasDiscount && priceInfo.stage && (
              <Badge className={`bg-gradient-to-r ${priceInfo.stage.color} text-white border-0 animate-pulse`}>
                <Flame className="w-3 h-3 mr-1" />
                {priceInfo.stage.badge}
              </Badge>
            )}
            {!priceInfo.hasDiscount && isLaunch && (
              <Badge variant="destructive">
                Lanzamiento
              </Badge>
            )}
            {!priceInfo.hasDiscount && !isLaunch && isBestseller && (
              <Badge variant="secondary">
                Bestseller
              </Badge>
            )}
            {!priceInfo.hasDiscount && !isLaunch && !isBestseller && isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Nuevo
              </Badge>
            )}
          </div>
          
          {/* Right side badge - Only show if no promotional badge */}
          {!priceInfo.hasDiscount && (
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
              Garantía 3 años
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        
        {node.description && (
          <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col flex-1 min-w-0">
            {priceInfo.hasDiscount ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-2xl font-bold text-primary">
                    €{priceInfo.discountedPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-xs w-fit">
                    {priceInfo.discountLabel}
                  </Badge>
                </div>
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
            disabled={!firstVariant?.availableForSale}
            size="sm"
            className="hidden md:inline-flex w-full sm:w-auto"
          >
            {firstVariant?.availableForSale ? 'Añadir' : 'Agotado'}
          </Button>
        </div>
      </div>
    </Link>
  );
};
