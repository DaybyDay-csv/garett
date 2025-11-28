import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  currentProduct: ShopifyProduct;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const allProducts = await fetchProducts(100);
        
        // Filter out current product and get related ones based on tags
        const filtered = allProducts
          .filter(p => p.node.id !== currentProduct.node.id)
          .sort((a, b) => {
            // Prioritize products with matching tags
            const aMatchingTags = a.node.tags.filter(tag => 
              currentProduct.node.tags.includes(tag)
            ).length;
            const bMatchingTags = b.node.tags.filter(tag => 
              currentProduct.node.tags.includes(tag)
            ).length;
            return bMatchingTags - aMatchingTags;
          })
          .slice(0, 4);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        También te puede interesar
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard 
            key={product.node.id} 
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
