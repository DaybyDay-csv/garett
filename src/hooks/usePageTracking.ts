import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    fbq: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-0HPYB6ZXQ5';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }

    // Track Facebook Pixel page view
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};

// Helper function for GA4 custom events
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// Helper for Facebook custom events
export const trackFBEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
};

// ============ E-COMMERCE TRACKING EVENTS ============

// Track when user views a product
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string;
}) => {
  // GA4 view_item
  trackEvent('view_item', {
    currency: 'EUR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      item_variant: product.variant,
    }]
  });

  // Meta Pixel ViewContent
  trackFBEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'EUR'
  });
};

// Track when user clicks on a product (from list)
export const trackProductClick = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  position?: number;
  listName?: string;
}) => {
  // GA4 select_item
  trackEvent('select_item', {
    item_list_name: product.listName || 'Product List',
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      index: product.position,
    }]
  });
};

// Track add to cart
export const trackAddToCart = (item: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  category?: string;
}) => {
  // GA4 add_to_cart
  trackEvent('add_to_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_variant: item.variant,
      item_category: item.category,
    }]
  });

  // Meta Pixel AddToCart
  trackFBEvent('AddToCart', {
    content_name: item.name,
    content_ids: [item.id],
    content_type: 'product',
    value: item.price * item.quantity,
    currency: 'EUR'
  });
};

// Track remove from cart
export const trackRemoveFromCart = (item: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  // GA4 remove_from_cart
  trackEvent('remove_from_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    }]
  });
};

// Track begin checkout
export const trackBeginCheckout = (items: Array<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}>, totalValue: number) => {
  // GA4 begin_checkout
  trackEvent('begin_checkout', {
    currency: 'EUR',
    value: totalValue,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))
  });

  // Meta Pixel InitiateCheckout
  trackFBEvent('InitiateCheckout', {
    content_ids: items.map(item => item.id),
    contents: items.map(item => ({
      id: item.id,
      quantity: item.quantity
    })),
    value: totalValue,
    currency: 'EUR',
    num_items: items.reduce((sum, item) => sum + item.quantity, 0)
  });
};

// Track view cart
export const trackViewCart = (items: Array<{
  id: string;
  name: string;
  price: number;
  quantity: number;
}>, totalValue: number) => {
  // GA4 view_cart
  trackEvent('view_cart', {
    currency: 'EUR',
    value: totalValue,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))
  });
};
