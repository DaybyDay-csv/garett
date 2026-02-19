import { useEffect, useState, useRef } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { getCategoryFromTags } from "@/lib/categories";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  currentProduct: ShopifyProduct;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const allProducts = await fetchProducts(100);
        
        // Extract category from current product using centralized function
        const currentCategory = getCategoryFromTags(currentProduct.node.tags);
        
        // Filter products: same category OR matching tags
        const filtered = allProducts
          .filter(p => {
            // Exclude current product
            if (p.node.id === currentProduct.node.id) return false;
            
            // Check if product has same category
            const productCategory = getCategoryFromTags(p.node.tags);
            
            // Match by category OR by shared tags
            return (currentCategory && productCategory && productCategory.slug === currentCategory.slug) || 
                   p.node.tags.some(tag => currentProduct.node.tags.includes(tag));
          })
          .sort((a, b) => {
            // First prioritize by category match
            const aCategory = getCategoryFromTags(a.node.tags);
            const bCategory = getCategoryFromTags(b.node.tags);
            
            const aCategoryMatch = (currentCategory && aCategory && aCategory.slug === currentCategory.slug) ? 1 : 0;
            const bCategoryMatch = (currentCategory && bCategory && bCategory.slug === currentCategory.slug) ? 1 : 0;
            
            if (aCategoryMatch !== bCategoryMatch) {
              return bCategoryMatch - aCategoryMatch;
            }
            
            // Then by matching tags
            const aMatchingTags = a.node.tags.filter(tag => 
              currentProduct.node.tags.includes(tag)
            ).length;
            const bMatchingTags = b.node.tags.filter(tag => 
              currentProduct.node.tags.includes(tag)
            ).length;
            return bMatchingTags - aMatchingTags;
          })
          .slice(0, 6);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, [currentProduct]);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [relatedProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t">
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Completa tu rutina
      </h2>
      <p className="text-sm text-muted-foreground mb-8">Productos que complementan tu compra</p>
      
      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg border-2 transition-all duration-300 ${
            canScrollLeft 
              ? 'opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {relatedProducts.map((product) => (
            <div 
              key={product.node.id} 
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <ProductCard 
                product={product}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg border-2 transition-all duration-300 ${
            canScrollRight 
              ? 'opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Gradient Overlays */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </div>
  );
};
