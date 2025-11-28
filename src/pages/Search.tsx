import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search as SearchIcon, ShoppingBag, X, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [suggestions, setSuggestions] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'cuidado-capilar', label: 'Cuidado Capilar' },
    { value: 'masajeadores-faciales', label: 'Masajeadores Faciales' },
    { value: 'limpieza-facial', label: 'Limpieza Facial' },
    { value: 'mesoterapia', label: 'Mesoterapia' },
    { value: 'corporales', label: 'Cuidado Corporal' },
    { value: 'depilacion-ipl', label: 'Depilación IPL' },
  ];

  const priceRanges = [
    { value: 'all', label: 'Todos los precios' },
    { value: '0-50', label: 'Menos de €50' },
    { value: '50-100', label: '€50 - €100' },
    { value: '100-200', label: '€100 - €200' },
    { value: '200+', label: 'Más de €200' },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(100);
        const nonGWPProducts = data.filter(p => !isGWPProduct(p));
        setAllProducts(nonGWPProducts);
        
        // Show suggestions if no search query
        if (!searchQuery) {
          const randomProducts = [...nonGWPProducts]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setSuggestions(randomProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.node.title.toLowerCase().includes(query) ||
        p.node.description.toLowerCase().includes(query) ||
        p.node.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => 
        p.node.tags.some(tag => tag === `category:${categoryFilter}`)
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        
        if (priceFilter === '0-50') return price < 50;
        if (priceFilter === '50-100') return price >= 50 && price < 100;
        if (priceFilter === '100-200') return price >= 100 && price < 200;
        if (priceFilter === '200+') return price >= 200;
        
        return true;
      });
    }

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => 
        parseFloat(a.node.priceRange.minVariantPrice.amount) - 
        parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => 
        parseFloat(b.node.priceRange.minVariantPrice.amount) - 
        parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.node.title.localeCompare(b.node.title));
    } else {
      // Default sorting by category priority
      const categoryPriority: Record<string, number> = {
        'masajeadores-faciales': 1,
        'limpieza-facial': 2,
        'cuidado-capilar': 3,
        'smartwatches': 4,
        'mesoterapia': 5,
        'corporales': 6,
        'depilacion-ipl': 7,
      };
      
      filtered.sort((a, b) => {
        const getCategoryPriority = (product: ShopifyProduct) => {
          const categoryTag = product.node.tags.find(tag => tag.startsWith('category:'));
          if (!categoryTag) return 999;
          const category = categoryTag.replace('category:', '');
          return categoryPriority[category] || 999;
        };
        
        return getCategoryPriority(a) - getCategoryPriority(b);
      });
    }

    setFilteredProducts(filtered);

    // Update URL
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (priceFilter !== 'all') params.set('price', priceFilter);
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    setSearchParams(params);
  }, [searchQuery, categoryFilter, priceFilter, sortBy, allProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPriceFilter('all');
    setSortBy('relevance');
  };

  const hasActiveFilters = categoryFilter !== 'all' || priceFilter !== 'all' || sortBy !== 'relevance' || searchQuery;

  const FilterSection = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Categoría</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Rango de precio</label>
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map(range => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Ordenar por</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevancia</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" className="w-full">
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 px-6">
        <Breadcrumb 
          items={[
            { label: 'Búsqueda' }
          ]}
        />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Búsqueda de productos
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden h-12 px-4">
                  <Filter className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </form>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Búsqueda: "{searchQuery}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchQuery('')}
                  />
                </Badge>
              )}
              {categoryFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find(c => c.value === categoryFilter)?.label}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setCategoryFilter('all')}
                  />
                </Badge>
              )}
              {priceFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {priceRanges.find(p => p.value === priceFilter)?.label}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setPriceFilter('all')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-[240px,1fr] gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Filtros</h2>
              <FilterSection />
            </div>
          </aside>

          {/* Results */}
          <div>
            {loading ? (
              <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Cargando productos...</p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </p>
                </div>

                {/* Suggestions (when no search query) */}
                {!searchQuery && suggestions.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Te podría interesar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {suggestions.map(product => (
                        <ProductCard key={product.node.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No se encontraron productos</h3>
                    <p className="text-muted-foreground mb-4">
                      Intenta con otros términos de búsqueda o filtros
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
