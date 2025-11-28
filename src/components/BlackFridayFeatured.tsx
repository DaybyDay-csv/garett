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
        const bfProducts = data.filter(p => 
          p.node.handle.includes('aeroglow') || 
          p.node.tags.includes('launch:bf2025') ||
          p.node.tags.includes('bestseller:true')
        );
        
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

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-foreground/5 text-foreground px-4 py-2 rounded-md text-sm font-medium border border-border mb-4">
            Black Friday
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Ofertas Especiales
          </h2>
          
          <p className="text-muted-foreground text-lg mb-4">
            Descuentos de hasta 50% en productos seleccionados
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>Oferta limitada - Black Friday 2025</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {products.map((product) => (
            <div key={product.node.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg"
            variant="default"
          >
            <Link to="/black-friday">
              Ver todas las ofertas Black Friday
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <p className="text-muted-foreground text-sm mt-4">
            Envío gratis en todos los pedidos - Devoluciones hasta 30 días
          </p>
        </div>
      </div>
    </section>
  );
};