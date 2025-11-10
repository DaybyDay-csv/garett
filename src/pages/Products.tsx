import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
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
        setProducts(data);
        setFilteredProducts(data);
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

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(p => 
        p.node.tags.some(tag => tag.includes(`category:${categoryFilter}`))
      );
    }

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
  }, [categoryFilter, sortBy, products]);

  const categories = [
    { value: "all", label: "Todos" },
    { value: "smartwatch", label: "Smartwatches" },
    { value: "beauty", label: "Beauty Tech" },
    { value: "accessories", label: "Accesorios" },
    { value: "masajeadores-faciales", label: "Masajeadores faciales" },
    { value: "limpieza-facial", label: "Limpieza facial" },
    { value: "mesoterapia", label: "Mesoterapia" },
    { value: "corporales", label: "Corporales" },
    { value: "capilar", label: "Cuidado capilar" },
    { value: "ipl", label: "Depilación IPL" },
  ];

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          {(categoryFilter !== "all" || sortBy !== "default") && (
            <Button
              variant="outline"
              onClick={() => {
                setCategoryFilter("all");
                setSortBy("default");
              }}
            >
              Limpiar filtros
            </Button>
          )}
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
            <p className="text-muted-foreground">
              {categoryFilter !== "all" 
                ? "No se encontraron productos en esta categoría" 
                : "Estamos preparando nuestro catálogo"}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
