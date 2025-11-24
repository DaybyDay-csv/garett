import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface InfiniteScrollCarouselProps {
  products: ShopifyProduct[];
}

export const InfiniteScrollCarousel = ({ products }: InfiniteScrollCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationFrameIdRef = useRef<number>();
  
  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollAmount = 300;
    const targetScroll = scrollContainer.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || products.length === 0) return;

    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!scrollContainer || !isAutoScrolling) return;
      
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    if (isAutoScrolling) {
      const timeoutId = setTimeout(() => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      };
    }
  }, [products, isAutoScrolling]);

  if (products.length === 0) return null;

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative overflow-hidden group">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-hidden scrollbar-hide"
        style={{ scrollBehavior: 'auto' }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.node.id}-${index}`} className="flex-shrink-0 w-[160px] sm:w-[220px] lg:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/60 hover:bg-background/80 border border-border/50 z-10 transition-all"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/60 hover:bg-background/80 border border-border/50 z-10 transition-all"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-8 sm:w-12 h-full bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 sm:w-12 h-full bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
    </div>
  );
};