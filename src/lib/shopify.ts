// Catálogo local (la tienda Shopify está offline — conservada como referencia).
// El catálogo vive en src/lib/catalog.ts (datos locales).
// Este módulo mantiene la interfaz para no romper componentes.
import { LOCAL_PRODUCTS, LOCAL_PRODUCTS_BY_HANDLE } from './catalog';
import { STRIPE_PRICE_BY_HANDLE } from './stripePrices';
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
          /** Unidades reales en stock (solo catálogo local; null/undefined si no se declara). */
          quantityAvailable?: number | null;
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
export const GWP_PRODUCT_TITLE = 'Banda de Pelo Premium Intermex Beauty - Special BF';

// Helper to check if product is GWP (should be hidden from frontend)
export const isGWPProduct = (product: ShopifyProduct): boolean => {
  return product.node.title === GWP_PRODUCT_TITLE || product.node.id === GWP_PRODUCT_ID;
};

// Fetch GWP Product (local catalog)
export async function fetchGWPProduct(): Promise<ShopifyProduct | null> {
  return LOCAL_PRODUCTS_BY_HANDLE['gwp-hairband'] ?? null;
}

export interface CheckoutLineItem {
  handle: string;
  quantity: number;
}

// Create Stripe Checkout via Cloudflare Pages Function (/api/create-checkout).
// Usa los Price IDs de Stripe (productos linkeados) para la contabilidad por producto.
export async function createStorefrontCheckout(
  items: CheckoutLineItem[]
): Promise<string> {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((item) => {
        const price = STRIPE_PRICE_BY_HANDLE[item.handle];
        if (!price) throw new Error(`Precio de Stripe no encontrado: ${item.handle}`);
        return { price, quantity: item.quantity };
      }),
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { url?: string; error?: string }
    | null;

  if (!response.ok || !data?.url) {
    throw new Error(data?.error || 'Error creando el checkout.');
  }

  return data.url;
}
