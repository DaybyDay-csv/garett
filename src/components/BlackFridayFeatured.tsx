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
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),transparent_70%)]" />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold border border-red-500/50 mb-4 animate-pulse">
            <Flame className="w-4 h-4" />
            BLACK FRIDAY ACTIVO
            <Flame className="w-4 h-4" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Ofertas <span className="text-red-500">Exclusivas</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-4">
            Descuentos de hasta 50% en productos seleccionados
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Timer className="w-4 h-4 text-red-400" />
            <span>Oferta limitada • Black Friday 2025</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <div key={product.node.id} className="transform hover:scale-105 transition-transform duration-300">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transition-all"
          >
            <Link to="/black-friday">
              <Zap className="w-5 h-5 mr-2" />
              Ver todas las ofertas Black Friday
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <p className="text-gray-400 text-sm mt-4">
            ⚡ Envío gratis en todos los pedidos • Devoluciones hasta 30 días
          </p>
        </div>
      </div>
    </section>
  );
};