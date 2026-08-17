// Shopify API Configuration (tienda offline — conservada como referencia)
export const SHOPIFY_API_VERSION = '2025-07';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'garett-connect-shop-w1cxe.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = 'a85fa80606d59d56da27fc9c3f2075b3';

// La tienda Shopify está offline (plan no activo).
// El catálogo vive ahora en src/lib/catalog.ts (datos locales).
// Este módulo mantiene la interfaz para no romper componentes.
import { LOCAL_PRODUCTS, LOCAL_PRODUCTS_BY_HANDLE } from './catalog';
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    productType: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// Fetch Products (local catalog)
export async function fetchProducts(first: number = 50, query?: string): Promise<ShopifyProduct[]> {
  let products = LOCAL_PRODUCTS;

  // Apply Shopify-style query filter (e.g. "product_type:Plancha OR title:AeroGlow")
  if (query) {
    const normalized = query.toLowerCase();
    products = products.filter((p) => {
      const node = p.node;
      const conditions = normalized.split(/\s+or\s+/i);
      return conditions.some((cond) => {
        const m = cond.trim().match(/^([a-z_]+):(.+)$/);
        if (m) {
          const [, field, value] = m;
          const v = value.toLowerCase();
          if (field === 'product_type' || field === 'type') return node.productType.toLowerCase().includes(v);
          if (field === 'title') return node.title.toLowerCase().includes(v);
          if (field === 'tag') return node.tags.some((t) => t.toLowerCase().includes(v));
          return false;
        }
        return node.title.toLowerCase().includes(cond.trim());
      });
    });
  }

  return products.slice(0, first);
}

// GWP Product Configuration
export const GWP_PRODUCT_ID = 'gid://local/Product/gwp-hairband';
export const GWP_VARIANT_ID = 'local://gwp-hairband/variant/0';
export const GWP_THRESHOLD = 70; // €70 threshold
export const GWP_PRODUCT_TITLE = 'Banda de Pelo Premium Garett - Special BF';

// Helper to check if product is GWP (should be hidden from frontend)
export const isGWPProduct = (product: ShopifyProduct): boolean => {
  return product.node.title === GWP_PRODUCT_TITLE || product.node.id === GWP_PRODUCT_ID;
};

// Fetch GWP Product (local catalog)
export async function fetchGWPProduct(): Promise<ShopifyProduct | null> {
  return LOCAL_PRODUCTS_BY_HANDLE['gwp-hairband'] ?? null;
}

// Create Checkout (Stripe pending — throws for now)
export async function createStorefrontCheckout(
  items: Array<{ variantId: string; quantity: number }>,
  discountCodes?: string[]
): Promise<string> {
  console.log('Checkout requested:', { items, discountCodes });
  throw new Error('El checkout con Stripe aún no está configurado. Próximamente.');
}