import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout, fetchGWPProduct } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  isGWP?: boolean; // Mark if this is a gift with purchase
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isOpen: boolean;
  gwpProduct: ShopifyProduct | null;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  createCheckout: () => Promise<void>;
  checkAndAddGWP: () => void;
  loadGWPProduct: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isOpen: false,
      gwpProduct: null,

      loadGWPProduct: async () => {
        const gwpProduct = await fetchGWPProduct();
        set({ gwpProduct });
      },

      checkAndAddGWP: () => {
        const { items, gwpProduct } = get();
        
        // GWP is no longer active (Christmas campaign ended)
        // Remove any existing GWP items
        const hasGWP = items.some(item => item.isGWP);
        if (hasGWP) {
          set({ items: items.filter(item => !item.isGWP) });
        }
      },

      addItem: (item) => {
        const { items, checkAndAddGWP } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
            isOpen: true
          });
        } else {
          set({ items: [...items, item], isOpen: true });
        }
        
        // Check if we should add GWP after adding item
        setTimeout(() => checkAndAddGWP(), 100);
      },

      updateQuantity: (variantId, quantity) => {
        const { checkAndAddGWP } = get();
        
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
        
        // Check GWP threshold after quantity update
        setTimeout(() => checkAndAddGWP(), 100);
      },

      removeItem: (variantId) => {
        const { checkAndAddGWP } = get();
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
        
        // Check GWP threshold after removal
        setTimeout(() => checkAndAddGWP(), 100);
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      setIsOpen: (isOpen) => set({ isOpen }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          // Note: LED launch products (Máscara LED, Manopla LED) already have discounted prices in Shopify
          // No discount codes needed - prices are set correctly in Shopify
          
          const checkoutUrl = await createStorefrontCheckout(
            items
              .filter(item => !item.isGWP)
              .map(item => ({
                name: item.product.node.title,
                unitAmountCents: Math.round(parseFloat(item.price.amount) * 100),
                quantity: item.quantity,
              }))
          );
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          console.error('Failed to create checkout:', error);
          throw error;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'garett-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
