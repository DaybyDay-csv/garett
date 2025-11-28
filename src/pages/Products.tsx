import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { Filter, ShoppingBag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

    // Default category priority (smartwatches last)
    const categoryPriority: Record<string, number> = {
      'masajeadores-faciales': 1,
      'limpieza-facial': 2,
      'cuidado-capilar': 3,
      'mesoterapia': 4,
      'corporales': 5,
      'depilacion-ipl': 6,
      'smartwatches': 999, // Always last
    };

    const getCategoryPriority = (product: ShopifyProduct) => {
      const categoryTag = product.node.tags.find(tag => tag.startsWith('category:'));
      if (!categoryTag) return 500;
      const category = categoryTag.replace('category:', '');
      return categoryPriority[category] || 500;
    };

    // Category priority sorting
    if (categoryFilter !== "all") {
      filtered.sort((a, b) => {
        const aHasCategory = a.node.tags.some(tag => tag === `category:${categoryFilter}`);
        const bHasCategory = b.node.tags.some(tag => tag === `category:${categoryFilter}`);
        
        if (aHasCategory && !bHasCategory) return -1;
        if (!aHasCategory && bHasCategory) return 1;
        
        // Within same filter status, apply default priority
        return getCategoryPriority(a) - getCategoryPriority(b);
      });
    } else if (sortBy === "default") {
      // Default sorting by category priority
      filtered.sort((a, b) => getCategoryPriority(a) - getCategoryPriority(b));
    }

    // Price sorting (applied after category sorting)
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => {
        // Keep category priority if filter is active
        if (categoryFilter !== "all") {
          const aHasCategory = a.node.tags.some(tag => tag === `category:${categoryFilter}`);
          const bHasCategory = b.node.tags.some(tag => tag === `category:${categoryFilter}`);
          if (aHasCategory !== bHasCategory) {
            return aHasCategory ? -1 : 1;
          }
        }
        return parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount);
      });
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => {
        // Keep category priority if filter is active
        if (categoryFilter !== "all") {
          const aHasCategory = a.node.tags.some(tag => tag === `category:${categoryFilter}`);
          const bHasCategory = b.node.tags.some(tag => tag === `category:${categoryFilter}`);
          if (aHasCategory !== bHasCategory) {
            return aHasCategory ? -1 : 1;
          }
        }
        return parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount);
      });
    }
    
    setFilteredProducts(filtered);
  }, [sortBy, categoryFilter, products]);
  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "masajeadores-faciales", label: "Masajeadores faciales" },
    { value: "limpieza-facial", label: "Limpieza facial" },
    { value: "cuidado-capilar", label: "Cuidado capilar" },
    { value: "smartwatches", label: "Smartwatches" },
    { value: "mesoterapia", label: "Dispositivos de Mesoterapia" },
    { value: "corporales", label: "Dispositivos corporales" },
    { value: "depilacion-ipl", label: "Depilación e IPL" }
  ];

  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Productos' }
          ]}
        />
        
        <div className="mb-8 md:mb-10">
          <h1 className="mb-3 text-xl md:text-2xl font-semibold tracking-tight">Todos los productos</h1>
          <p className="text-left font-semibold text-xl md:text-3xl text-foreground leading-tight">
            Reafirmación inmediata, cuidado integral, limpieza profunda.        
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[240px] h-11">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[220px] h-11">
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
        {loading ? <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div> : filteredProducts.length === 0 ? <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos</h3>
            <p className="text-muted-foreground">Estamos preparando nuestro catálogo</p>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {filteredProducts.map(product => <ProductCard key={product.node.id} product={product} />)}
          </div>}
      </div>

      <Footer />
    </div>;
};
export default Products;