import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { useEffect, useRef } from "react";

interface InfiniteScrollCarouselProps {
  products: ShopifyProduct[];
}

export const InfiniteScrollCarousel = ({ products }: InfiniteScrollCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || products.length === 0) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!scrollContainer) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled through half (since we duplicate)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after a brief delay
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 100);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [products]);

  if (products.length === 0) return null;

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-hidden scrollbar-hide"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.node.id}-${index}`} className="flex-shrink-0 w-[160px] sm:w-[220px] lg:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};