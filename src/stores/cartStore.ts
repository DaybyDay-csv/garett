import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout, fetchGWPProduct, GWP_VARIANT_ID, GWP_THRESHOLD } from '@/lib/shopify';
import { getCurrentPromotionalStage } from '@/lib/promotions';

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
        const currentStage = getCurrentPromotionalStage();
        
        // Only add GWP if stage has GWP active
        if (!currentStage?.hasGWP || !gwpProduct) return;
        
        // Calculate subtotal without GWP items and with discount
        const nonGWPItems = items.filter(item => !item.isGWP);
        const subtotal = nonGWPItems.reduce((sum, item) => {
          const originalPrice = parseFloat(item.product.node.priceRange.minVariantPrice.amount);
          return sum + (originalPrice * item.quantity);
        }, 0);
        
        const discountPercentage = currentStage.baseDiscount ?? 0;
        const subtotalWithDiscount = subtotal * (1 - discountPercentage / 100);
        
        const hasGWP = items.some(item => item.isGWP);
        const meetsThreshold = subtotalWithDiscount >= GWP_THRESHOLD;
        
        // Add GWP if threshold met and not already in cart
        if (meetsThreshold && !hasGWP) {
          const gwpVariant = gwpProduct.node.variants.edges[0].node;
          const gwpItem: CartItem = {
            product: gwpProduct,
            variantId: GWP_VARIANT_ID,
            variantTitle: gwpVariant.title,
            price: {
              amount: '0.00', // Free gift
              currencyCode: 'EUR'
            },
            quantity: 1,
            selectedOptions: gwpVariant.selectedOptions,
            isGWP: true
          };
          set({ items: [...items, gwpItem] });
        }
        
        // Remove GWP if threshold not met
        if (!meetsThreshold && hasGWP) {
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
          // Get current promotional stage and discount code
          const currentStage = getCurrentPromotionalStage();
          const discountCodes: string[] = [];
          
          // Helper to check if item is a bundle
          const isBundleProduct = (item: CartItem) => 
            item.product.node.handle.startsWith('pack-') || 
            item.product.node.productType === 'Bundle' ||
            item.product.node.tags?.includes('bundle:true');
          
          // Check if cart contains AeroGlow products (requires special 30% exclusive code)
          const hasAeroGlow = items.some(item => 
            item.product.node.handle === 'plancha-pelo-aeroglow'
          );
          
          // Check if cart contains LED launch products (30% launch discount)
          const hasLEDLaunch = items.some(item => 
            item.product.node.handle === 'mascara-led-garett-beauty' || 
            item.product.node.handle === 'manopla-led-garett-beauty'
          );
          
          // Check if cart contains bundle products
          const hasBundles = items.some(item => !item.isGWP && isBundleProduct(item));
          
          // Check if cart has non-special products (neither AeroGlow nor LED launch nor bundles)
          const hasOtherProducts = items.some(item => 
            !item.isGWP && 
            item.product.node.handle !== 'plancha-pelo-aeroglow' &&
            item.product.node.handle !== 'mascara-led-garett-beauty' &&
            item.product.node.handle !== 'manopla-led-garett-beauty' &&
            !isBundleProduct(item)
          );
          
          if (hasAeroGlow) {
            // Add AeroGlow exclusive discount code (30% off)
            discountCodes.push('AEROGLOW30');
          }
          
          if (hasLEDLaunch) {
            // Add LED launch discount code (30% off)
            discountCodes.push('LANZAMIENTO30');
          }
          
          // Add stage discount code for other products and bundles if available
          if ((hasOtherProducts || hasBundles) && currentStage?.code) {
            discountCodes.push(currentStage.code);
          }
          
          const checkoutUrl = await createStorefrontCheckout(
            items.map(item => ({ variantId: item.variantId, quantity: item.quantity })),
            discountCodes.length > 0 ? discountCodes : undefined
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
