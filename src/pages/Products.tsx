import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { productBelongsToCategory, CATEGORY_NAV } from "@/lib/categories";
import { Filter, ShoppingBag, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "all", label: "Todas" },
  ...CATEGORY_NAV.map((c) => ({ value: c.slug, label: c.name })),
];

const PRICE_BUCKETS = [
  { value: "all", label: "Todos los precios", min: 0, max: Infinity },
  { value: "lt100", label: "Menos de 100€", min: 0, max: 100 },
  { value: "100-200", label: "100€ – 200€", min: 100, max: 200 },
  { value: "200-350", label: "200€ – 350€", min: 200, max: 350 },
  { value: "gte350", label: "Más de 350€", min: 350, max: Infinity },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [activeBadges, setActiveBadges] = useState<string[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) setCategoryFilter(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        const filteredData = data.filter((p) => !isGWPProduct(p));
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) =>
        productBelongsToCategory(p.node.tags, categoryFilter),
      );
    }

    const priceBucket = PRICE_BUCKETS.find((b) => b.value === priceFilter) ?? PRICE_BUCKETS[0];
    filtered = filtered.filter((p) => {
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      return price >= priceBucket.min && price < priceBucket.max;
    });

    if (activeBadges.includes("bestseller")) {
      filtered = filtered.filter((p) => p.node.tags.includes("bestseller:true"));
    }
    if (activeBadges.includes("new")) {
      filtered = filtered.filter((p) => p.node.tags.includes("new:true"));
    }
    if (activeBadges.includes("discount")) {
      filtered = filtered.filter((p) => {
        const v = p.node.variants.edges[0]?.node;
        if (!v?.compareAtPrice) return false;
        return parseFloat(v.compareAtPrice.amount) > parseFloat(v.price.amount);
      });
    }

    if (sortBy === "price-asc") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount),
      );
    } else if (sortBy === "price-desc") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount),
      );
    }

    setFilteredProducts(filtered);
  }, [sortBy, categoryFilter, priceFilter, activeBadges, products]);

  const toggleBadge = (badge: string) => {
    setActiveBadges((prev) => (prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]));
  };

  const clearAll = () => {
    setCategoryFilter("all");
    setPriceFilter("all");
    setActiveBadges([]);
  };

  const hasActiveFilters = categoryFilter !== "all" || priceFilter !== "all" || activeBadges.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Breadcrumb items={[{ label: "Productos" }]} />

        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Catálogo</p>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">Todos los productos</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Reafirmación inmediata, cuidado integral, limpieza profunda.
          </p>
        </div>

        {/* Filter chips row */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-6 border-b border-border">
          {CATEGORIES.map((cat) => {
            const active = categoryFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active filter chips + sort */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {activeBadges.includes("bestseller") && (
              <button onClick={() => toggleBadge("bestseller")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-medium border border-primary/20">
                Bestseller
                <X className="w-3 h-3" />
              </button>
            )}
            {activeBadges.includes("new") && (
              <button onClick={() => toggleBadge("new")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-medium border border-primary/20">
                Nuevo
                <X className="w-3 h-3" />
              </button>
            )}
            {activeBadges.includes("discount") && (
              <button onClick={() => toggleBadge("discount")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-medium border border-primary/20">
                En oferta
                <X className="w-3 h-3" />
              </button>
            )}
            {hasActiveFilters && (
              <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline">
                Limpiar todo
              </button>
            )}
          </div>
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-10">
              <SelectValue placeholder="Rango de precio" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_BUCKETS.map((bucket) => (
                <SelectItem key={bucket.value} value={bucket.value}>
                  {bucket.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Toolbar second row: badges + sort */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Filtrar:</span>
            <button
              onClick={() => toggleBadge("bestseller")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeBadges.includes("bestseller")
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              Más vendidos
            </button>
            <button
              onClick={() => toggleBadge("new")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeBadges.includes("new")
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              Novedades
            </button>
            <button
              onClick={() => toggleBadge("discount")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeBadges.includes("discount")
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              En oferta
            </button>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px] h-10">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Result count */}
        <p className="text-sm text-muted-foreground mb-4">
          {loading ? "Cargando..." : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""}`}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos</h3>
            <p className="text-muted-foreground">Prueba a quitar algunos filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Products;