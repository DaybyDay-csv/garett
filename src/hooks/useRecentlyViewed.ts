import { useEffect, useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";

const STORAGE_KEY = "garett_recently_viewed";
const MAX_ITEMS = 8;

interface RecentlyViewedItem {
  handle: string;
  title: string;
  image: string;
  price: string;
  currencyCode: string;
  viewedAt: number;
}

export const addToRecentlyViewed = (product: ShopifyProduct) => {
  const { node } = product;
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentlyViewedItem[];
  
  // Remove if already exists
  const filtered = stored.filter(item => item.handle !== node.handle);
  
  // Add to front
  filtered.unshift({
    handle: node.handle,
    title: node.title,
    image: node.images.edges[0]?.node.url || "",
    price: node.priceRange.minVariantPrice.amount,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    viewedAt: Date.now(),
  });
  
  // Keep max items
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
};

export const useRecentlyViewed = (excludeHandle?: string): RecentlyViewedItem[] => {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentlyViewedItem[];
    setItems(stored.filter(item => item.handle !== excludeHandle));
  }, [excludeHandle]);
  
  return items;
};

