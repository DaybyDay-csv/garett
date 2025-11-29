import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { OptimizedImage } from "@/components/OptimizedImage";

interface ComparisonFeature {
  name: string;
  values: (boolean | string)[];
}

export const ProductComparison = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        // Filter to get comparison products - prioritize bestsellers and specific categories
        const comparisonProducts = data
          .filter(p => 
            p.node.tags.includes('bestseller:true') || 
            p.node.tags.includes('featured:true')
          )
          .slice(0, 3);
        
        setProducts(comparisonProducts);
      } catch (error) {
        console.error('Error loading comparison products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading || products.length < 2) {
    return null;
  }

  // Define comparison features based on product tags and data
  const getFeatures = (): ComparisonFeature[] => {
    return [
      {
        name: "Tecnología",
        values: products.map(p => {
          if (p.node.title.toLowerCase().includes('ipl')) return "IPL Luz Pulsada";
          if (p.node.title.toLowerCase().includes('rf')) return "Radiofrecuencia";
          if (p.node.title.toLowerCase().includes('ion')) return "Tecnología Iónica";
          return "Avanzada";
        })
      },
      {
        name: "Área de uso",
        values: products.map(p => {
          if (p.node.title.toLowerCase().includes('capilar') || p.node.title.toLowerCase().includes('pelo')) return "Cabello";
          if (p.node.title.toLowerCase().includes('facial') || p.node.title.toLowerCase().includes('cara')) return "Rostro";
          if (p.node.title.toLowerCase().includes('corpo') || p.node.title.toLowerCase().includes('body')) return "Cuerpo completo";
          return "Multifuncional";
        })
      },
      {
        name: "Resultados visibles",
        values: products.map(() => "2-4 semanas")
      },
      {
        name: "Garantía extendida",
        values: products.map(() => true)
      },
      {
        name: "Envío gratis",
        values: products.map(() => true)
      },
      {
        name: "Profesional en casa",
        values: products.map(() => true)
      },
      {
        name: "Disponible en El Corte Inglés",
        values: products.map(p => p.node.tags.includes('eci:true'))
      }
    ];
  };

  const features = getFeatures();

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Comparativa
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
            Compara nuestros productos más populares
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentra el dispositivo perfecto según tus necesidades
          </p>
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block">
          <Card className="overflow-hidden border-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Product Headers */}
                <thead>
                  <tr className="border-b-2">
                    <th className="p-6 text-left bg-muted/30 font-semibold text-foreground">
                      Características
                    </th>
                    {products.map((product) => (
                      <th key={product.node.id} className="p-6 text-center bg-background">
                        <Link to={`/producto/${product.node.handle}`} className="block group">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                            {product.node.images.edges[0] && (
                              <OptimizedImage
                                src={product.node.images.edges[0].node.url}
                                alt={product.node.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                blurPlaceholder
                              />
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {product.node.title}
                          </h3>
                          <p className="text-2xl font-bold text-primary">
                            {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                            {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                          </p>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Features */}
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/20' : 'bg-background'}>
                      <td className="p-4 font-medium text-foreground border-r">
                        {feature.name}
                      </td>
                      {feature.values.map((value, valueIdx) => (
                        <td key={valueIdx} className="p-4 text-center">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-6 h-6 text-primary mx-auto" />
                            ) : (
                              <X className="w-6 h-6 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-foreground">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA Row */}
                  <tr className="bg-muted/30">
                    <td className="p-6"></td>
                    {products.map((product) => (
                      <td key={product.node.id} className="p-6">
                        <Button asChild className="w-full" size="lg">
                          <Link to={`/producto/${product.node.handle}`}>
                            Ver detalles
                          </Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-6">
          {products.map((product) => (
            <Card key={product.node.id} className="overflow-hidden border-2">
              <CardContent className="p-6">
                <Link to={`/producto/${product.node.handle}`} className="block mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      {product.node.images.edges[0] && (
                        <OptimizedImage
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.title}
                          className="w-full h-full object-cover"
                          blurPlaceholder
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {product.node.title}
                      </h3>
                      <p className="text-xl font-bold text-primary">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="space-y-3 mb-4">
                  {features.map((feature, idx) => {
                    const productIndex = products.findIndex(p => p.node.id === product.node.id);
                    const value = feature.values[productIndex];
                    
                    return (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm font-medium text-muted-foreground">
                          {feature.name}
                        </span>
                        <span className="text-sm text-foreground font-medium">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-5 h-5 text-primary" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground" />
                            )
                          ) : (
                            value
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to={`/producto/${product.node.handle}`}>
                    Ver detalles
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
