import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Zap, Flame, ArrowRight, Timer } from "lucide-react";
import { Link } from "react-router-dom";
export const BlackFridayFeatured = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch products and filter for Black Friday featured items
        const data = await fetchProducts(50);

        // Prioritize AeroGlow and products with launch:bf2025 tag
        const bfProducts = data.filter(p => p.node.handle.includes('aeroglow') || p.node.tags.includes('launch:bf2025') || p.node.tags.includes('bestseller:true'));

        // AeroGlow first, then others
        const sorted = bfProducts.sort((a, b) => {
          if (a.node.handle.includes('aeroglow')) return -1;
          if (b.node.handle.includes('aeroglow')) return 1;
          return 0;
        });
        setProducts(sorted.slice(0, 4)); // Show max 4 products
      } catch (error) {
        console.error('Error loading Black Friday products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  if (loading || products.length === 0) {
    return null;
  }
  return <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-foreground/5 text-foreground px-4 py-2 rounded-md text-sm font-medium border border-border">
            Black Friday
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            Ofertas Especiales
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Descuentos de hasta 50% en productos seleccionados
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>Oferta limitada - Black Friday 2025</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12">
          {products.map(product => <div key={product.node.id}>
              <ProductCard product={product} />
            </div>)}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button asChild size="lg" variant="default" className="px-8 py-6 text-base">
            <Link to="/black-friday">
              Ver las ofertas Black Friday
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <p className="text-muted-foreground text-sm">
            Envío gratis en todos los pedidos - Devoluciones hasta 30 días
          </p>
        </div>
      </div>
    </section>;
};