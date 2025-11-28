import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { CATEGORIES, productBelongsToCategory } from "@/lib/categories";
import { ShoppingBag } from "lucide-react";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = category ? CATEGORIES[category] : null;

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        const data = await fetchProducts(100);
        // Filter products by category using the centralized function
        const categoryProducts = data.filter(p => 
          !isGWPProduct(p) && 
          productBelongsToCategory(p.node.tags, category)
        );
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Categoría no encontrada</h2>
          <p className="text-muted-foreground mb-6">La categoría que buscas no existe</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Productos', href: '/productos' },
            { label: currentCategory.name }
          ]}
        />
        
        <div className="mb-8 md:mb-10">
          <h1 className="mb-3 text-3xl md:text-4xl font-semibold tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {currentCategory.description}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos en esta categoría</h3>
            <p className="text-muted-foreground">Pronto añadiremos más productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.node.id} 
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Category;
