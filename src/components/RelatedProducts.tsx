import { useEffect, useState, useRef } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { getRecommendations, getRoutineSuggestion } from "@/lib/recommendations";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface RelatedProductsProps {
  currentProduct: ShopifyProduct;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const allProducts = await fetchProducts(100);
        const currentHandle = currentProduct.node.handle;

        // 1) Try matrix of convenience
        const { handles, reason: matrixReason } = getRecommendations(currentHandle, allProducts, 6);
        let picked: ShopifyProduct[] = [];
        if (handles.length > 0) {
          picked = handles
            .map((h) => allProducts.find((p) => p.node.handle === h))
            .filter((p): p is ShopifyProduct => Boolean(p));
          setReason(matrixReason);
        }

        // 2) Fallback: same category, excluding current
        if (picked.length < 6) {
          const currentTags = currentProduct.node.tags;
          const sameCat = allProducts
            .filter((p) => p.node.id !== currentProduct.node.id)
            .filter((p) => p.node.tags.some((t) => currentTags.includes(t)))
            .filter((p) => !picked.some((existing) => existing.node.id === p.node.id));
          picked = [...picked, ...sameCat].slice(0, 6);
          if (!reason && picked.length > 0) setReason("Productos que complementan tu compra");
        }

        setRelatedProducts(picked);
      } catch (error) {
        console.error("Error loading related products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatedProducts]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      const targetScroll =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted rounded-lg h-64" />
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
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              Completa tu rutina
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">Recomendado para tu rutina</h2>
          {reason && (
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{reason}</p>
          )}
        </div>
        <Button asChild variant="outline">
          <a href="/productos">Ver todos</a>
        </Button>
      </div>

      <div className="relative group mt-6">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/3 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg border-2 transition-all duration-300 ${
            canScrollLeft
              ? "opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {relatedProducts.map((product) => (
            <div
              key={product.node.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/3 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg border-2 transition-all duration-300 ${
            canScrollRight
              ? "opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Gradient Overlays */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};
