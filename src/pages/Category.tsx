import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEO } from "@/components/SEO";
import { ChristmasSeal } from "@/components/ChristmasSeal";
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
        <SEO 
          title="Categoría no encontrada"
          description="La categoría que buscas no existe en Garett Beauty"
          canonicalUrl={window.location.pathname}
        />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
          <p className="text-muted-foreground mb-6">La categoría que buscas no existe</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Schema markup para la categoría
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: currentCategory.name,
    description: currentCategory.description,
    url: `${window.location.origin}/categoria/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.node.title,
          description: product.node.description,
          image: product.node.images.edges[0]?.node.url,
          url: `${window.location.origin}/producto/${product.node.handle}`,
          offers: {
            '@type': 'Offer',
            price: product.node.priceRange.minVariantPrice.amount,
            priceCurrency: product.node.priceRange.minVariantPrice.currencyCode,
            availability: product.node.variants.edges[0]?.node.availableForSale
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock'
          },
          brand: {
            '@type': 'Brand',
            name: 'Garett Beauty'
          }
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={currentCategory.name}
        description={`${currentCategory.description}. Descubre nuestra selección de ${currentCategory.name.toLowerCase()} con la mejor tecnología y calidad profesional.`}
        canonicalUrl={`/categoria/${category}`}
        schema={categorySchema}
      />
      <Header />
      
      <div className="container py-8 px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Productos', href: '/productos' },
            { label: currentCategory.name }
          ]}
        />
        
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="mb-3 text-3xl md:text-4xl font-semibold tracking-tight">
              {currentCategory.name}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {currentCategory.description}
            </p>
          </div>
          <ChristmasSeal size="md" className="self-center md:self-auto" />
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
