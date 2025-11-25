import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { Filter, ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // Initialize category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter out GWP product from display
        const filteredData = data.filter(p => !isGWPProduct(p));
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => 
        parseFloat(a.node.priceRange.minVariantPrice.amount) - 
        parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => 
        parseFloat(b.node.priceRange.minVariantPrice.amount) - 
        parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    }

    setFilteredProducts(filtered);
  }, [sortBy, products]);

  const categories = [
    { value: "capilar", label: "Cuidado capilar" },
    { value: "masajeadores-faciales", label: "Masajeadores faciales" },
    { value: "limpieza-facial", label: "Limpieza facial" },
    { value: "mesoterapia", label: "Dispositivos de Mesoterapia" },
    { value: "corporales", label: "Dispositivos corporales" },
    { value: "ipl", label: "Depilación e IPL" },
  ];

  // Group products by category
  const productsByCategory = categories.map(category => ({
    ...category,
    products: filteredProducts.filter(p => 
      p.node.tags.some(tag => tag.includes(`category:${category.value}`))
    )
  })).filter(cat => cat.products.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todos los productos</h1>
          <p className="text-muted-foreground">
            Descubre nuestra gama completa de dispositivos de belleza
          </p>
        </div>

        {/* Sorting */}
        <div className="flex justify-end mb-8">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Predeterminado</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos</h3>
            <p className="text-muted-foreground">Estamos preparando nuestro catálogo</p>
          </div>
        ) : (
          <div className="space-y-12">
            {productsByCategory.map((category) => (
              <div key={category.value}>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{category.label}</h2>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {category.products.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
