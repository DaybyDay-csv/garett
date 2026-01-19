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

// Helper function for custom events
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
