// Shopify API Configuration
export const SHOPIFY_API_VERSION = '2025-07';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'garett-connect-shop-w1cxe.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = 'a85fa80606d59d56da27fc9c3f2075b3';

// TypeScript Interfaces
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

// Storefront API helper
export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    throw new Error('Shopify API access requires an active billing plan');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch Products Query
export const STOREFRONT_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

// Fetch Products
export async function fetchProducts(first: number = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query });
  return data.data.products.edges;
}

// Cart Create Mutation with Discount Codes
export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        discountCodes {
          code
          applicable
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// AeroGlow discount code (must be created in Shopify)
export const AEROGLOW_DISCOUNT_CODE = 'BLACKFRIDAY50';
export const AEROGLOW_HANDLE = 'plancha-pelo-aeroglow';

// GWP Product Configuration
export const GWP_PRODUCT_ID = 'gid://shopify/Product/14828986794347';
export const GWP_VARIANT_ID = 'gid://shopify/ProductVariant/52558159380843';
export const GWP_THRESHOLD = 70; // €70 threshold
export const GWP_PRODUCT_TITLE = 'Banda de Pelo Premium Garett - Special BF';

// Helper to check if product is GWP (should be hidden from frontend)
export const isGWPProduct = (product: ShopifyProduct): boolean => {
  return product.node.title === GWP_PRODUCT_TITLE || product.node.id === GWP_PRODUCT_ID;
};

// Fetch GWP Product
export async function fetchGWPProduct(): Promise<ShopifyProduct | null> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { 
      first: 1, 
      query: 'title:"Banda de Pelo Premium Garett - Special BF"' 
    });
    return data.data.products.edges[0] || null;
  } catch (error) {
    console.error('Failed to fetch GWP product:', error);
    return null;
  }
}

// Create Checkout with optional discount codes
export async function createStorefrontCheckout(
  items: Array<{ variantId: string; quantity: number }>,
  discountCodes?: string[]
): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const input: any = { lines };
  
  // Add discount codes if provided
  if (discountCodes && discountCodes.length > 0) {
    input.discountCodes = discountCodes;
  }

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input,
  });

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;
  
  if (!cart.checkoutUrl) {
    throw new Error('No checkout URL returned from Shopify');
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}
