import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
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
      
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p>Envío gratuito a partir de 60€ • Garantía extendida 3 años • Soporte técnico en español</p>
      </div>

      {/* Hero Section - Clean & Professional */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,25%,92%)] to-[hsl(200,20%,95%)] py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                Black Friday 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Tecnología de belleza profesional
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Dispositivos avanzados con hasta <span className="font-bold text-primary">20% de descuento</span>. 
                Resultados visibles en 8-12 semanas.
              </p>
              
              {/* Key Features */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Timer className="w-4 h-4 text-primary" />
                  </div>
                  <span>Envío 24-48h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span>Garantía 3 años</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-glow text-white shadow-lg">
                  <Link to="/black-friday">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Ver Black Friday
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  <Link to="/productos">
                    Ver productos
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Featured Product */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
                {bestSellers.length > 0 && bestSellers[0]?.node.images.edges[0] ? (
                  <img 
                    src={bestSellers[0].node.images.edges[0].node.url} 
                    alt={bestSellers[0].node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Sparkles className="w-24 h-24 text-muted-foreground" />
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-white px-6 py-3 rounded-full shadow-lg font-bold">
                -20%
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Trust Badges */}
        <TrustBadges />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      <div className="container py-16">
        {/* New Arrivals */}
        {newProducts.length > 0 && (
          <section className="py-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Novedades
                </h2>
                <p className="text-muted-foreground mt-2 text-lg">Lo último en tecnología de belleza</p>
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
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
          <section className="py-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Best Sellers
                </h2>
                <p className="text-muted-foreground mt-2 text-lg">Los más vendidos de Garett</p>
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
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
