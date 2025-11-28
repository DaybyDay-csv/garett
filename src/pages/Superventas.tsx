import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { Trophy } from "lucide-react";
const Superventas = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter out GWP product and get only bestsellers
        const bestSellers = data.filter(p => !isGWPProduct(p) && p.node.tags.includes('bestseller:true'));
        setProducts(bestSellers);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Superventas' }
          ]}
        />
        
        <div className="mb-8">
          <h1 className="text-4xl mb-2 flex items-center gap-3 font-thin">
            
            Superventas
          </h1>
          <p className="text-muted-foreground text-sm">
            Los favoritos de nuestros clientes
          </p>
        </div>

        {loading ? <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando superventas...</p>
          </div> : products.length === 0 ? <div className="py-20 text-center">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Próximamente productos destacados
            </p>
          </div> : <>
            <p className="text-sm text-muted-foreground mb-4">
              {products.length} producto{products.length !== 1 ? 's' : ''} más vendido{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map(product => <ProductCard key={product.node.id} product={product} />)}
            </div>
          </>}
      </div>

      <Footer />
    </div>;
};
export default Superventas;