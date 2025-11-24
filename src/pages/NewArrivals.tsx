import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { Sparkles } from "lucide-react";
import { InfiniteScrollCarousel } from "@/components/InfiniteScrollCarousel";

const NewArrivals = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter out GWP product - show all products
        const filteredProducts = data.filter(p => !isGWPProduct(p));
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    { value: "capilar", label: "Cuidado capilar", icon: "💇" },
    { value: "masajeadores-faciales", label: "Masajeadores faciales", icon: "✨" },
    { value: "limpieza-facial", label: "Limpieza facial", icon: "🧼" },
    { value: "mesoterapia", label: "Mesoterapia", icon: "💉" },
    { value: "corporales", label: "Dispositivos corporales", icon: "🏋️" },
    { value: "ipl", label: "Depilación e IPL", icon: "💡" },
  ];

  // Group products by category
  const productsByCategory = categories.map(category => ({
    ...category,
    products: products.filter(p => 
      p.node.tags.some(tag => tag.includes(`category:${category.value}`))
    )
  })).filter(cat => cat.products.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            Novedades
          </h1>
          <p className="text-muted-foreground text-lg">
            Lo último en tecnología de belleza y cuidado personal
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando novedades...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Próximamente nuevos productos
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {productsByCategory.map((category) => (
              <div key={category.value} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{category.label}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category.products.length} producto{category.products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <InfiniteScrollCarousel products={category.products} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NewArrivals;
