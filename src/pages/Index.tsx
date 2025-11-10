import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Sparkles, Zap, Timer, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const newProducts = products.filter(p => p.node.tags.includes('new:true'));
  const bestSellers = products.filter(p => p.node.tags.includes('bestseller:true'));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Black Friday */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        
        <div className="container relative">
          <div className="text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Black Friday 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
              Belleza innovadora<br />al mejor precio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Dispositivos de última tecnología con hasta 20% de descuento
            </p>
            
            {/* BF Timer Placeholder */}
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Timer className="w-6 h-6 mb-1" />
                <div className="text-sm">Quedan pocas unidades</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Zap className="w-6 h-6 mb-1" />
                <div className="text-sm">Envío en 24-48h</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                <Link to="/black-friday">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver ofertas Black Friday
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/productos">
                  Ver todos los productos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Trust Badges */}
        <TrustBadges />

        {/* New Arrivals */}
        {newProducts.length > 0 && (
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-primary" />
                  Novedades
                </h2>
                <p className="text-muted-foreground mt-2">Lo último en tecnología de belleza</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/novedades">Ver todas</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Zap className="w-8 h-8 text-primary" />
                  Best Sellers
                </h2>
                <p className="text-muted-foreground mt-2">Los más vendidos de Garett</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/productos?filter=bestseller">Ver todos</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products or Empty State */}
        {products.length === 0 && !loading && (
          <section className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos aún</h3>
            <p className="text-muted-foreground mb-6">
              Estamos preparando nuestro catálogo. ¡Vuelve pronto!
            </p>
          </section>
        )}

        {loading && (
          <section className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Index;
