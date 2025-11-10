import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Badge } from "@/components/ui/badge";
import { Zap, Timer, Gift } from "lucide-react";

const BlackFriday = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter BF products
        const bfProducts = data.filter(p => p.node.tags.includes('bf:2025'));
        setProducts(bfProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-16 md:py-24">
        <div className="container relative text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Black Friday 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Black Friday
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Hasta 20% de descuento en toda la tienda + envío gratuito
          </p>

          {/* Tier Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Zap className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Early Bird -50%</h3>
              <p className="text-sm text-white/80">Primeras 5 unidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Timer className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Early Bird -35%</h3>
              <p className="text-sm text-white/80">Siguientes 15 unidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Gift className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Regalo gratis</h3>
              <p className="text-sm text-white/80">Desde 70€ - Banda de pelo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Productos en oferta</h2>
          <p className="text-muted-foreground">
            Descuentos especiales válidos del 28/11 al 30/11
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando ofertas...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              Las ofertas de Black Friday estarán disponibles pronto
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        {/* T&C */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-bold mb-3">Condiciones de la promoción</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Descuentos válidos del 28/11 al 30/11/2025</li>
            <li>• Early Bird: descuentos adicionales por orden de llegada (5 uds al -50%, 15 uds al -35%, resto al -25%)</li>
            <li>• Regalo gratis (banda de pelo) con compras superiores a 70€ después de descuentos</li>
            <li>• Los descuentos se aplican automáticamente en el checkout</li>
            <li>• Garantía de 3 años en todos los productos</li>
            <li>• Devoluciones gratuitas durante 30 días</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlackFriday;
