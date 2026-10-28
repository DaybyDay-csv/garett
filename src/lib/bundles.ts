// Packs / bundles Intermex Beauty — combinatorio de productos con descuento.
// Source: README.md §6 (Ritual Belleza Eco + Ritual Premium) + extensión "Ritual Cara Completa".

import { ShopifyProduct } from "@/lib/shopify";

export interface Bundle {
  handle: string;
  title: string;
  description: string;
  includes: string[]; // product handles included
  originalPrice: number; // sum of individual prices
  bundlePrice: number; // discount applied
  badge?: string;
  reason?: string;
}

export const BUNDLES: Bundle[] = [
  {
    handle: "pack-ritual-belleza-eco",
    title: "Pack Ritual Belleza Eco",
    description: "Limpieza, sérum y contorno de ojos. La rutina mínima de 6 minutos para empezar el día.",
    includes: ["multiclean", "serum-skin", "fresh-eye"],
    originalPrice: 98.70,
    bundlePrice: 88.90,
    badge: "AHORRA 9,80€",
    reason: "Tu rutina mínima diaria",
  },
  {
    handle: "pack-ritual-cara-completa",
    title: "Pack Ritual Cara Completa",
    description: "Limpieza + contorno de ojos + sérum. Ideal para quienes empiezan y quieren cubrir los 3 pasos clave.",
    includes: ["multiclean", "fresh-eye", "serum-skin", "manopla-led-intermex-beauty"],
    originalPrice: 210.60,
    bundlePrice: 189.90,
    badge: "AHORRA 20,70€",
    reason: "Limpieza + tratamiento + LED",
  },
  {
    handle: "pack-ritual-premium",
    title: "Pack Ritual Premium",
    description: "Multiclean + Calm Skin + Cellu-Body. La rutina facial y corporal completa para uso intensivo.",
    includes: ["multiclean", "calm-skin", "cellu-body"],
    originalPrice: 204.70,
    bundlePrice: 183.90,
    badge: "AHORRA 20,80€",
    reason: "Cara + cuerpo: la rutina completa",
  },
];

export function getBundlesForHandle(handle: string): Bundle[] {
  return BUNDLES.filter((b) => b.includes.includes(handle));
}

export function getAllBundles(): Bundle[] {
  return BUNDLES;
}
