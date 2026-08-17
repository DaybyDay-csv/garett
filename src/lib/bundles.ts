// Packs / bundles Garett — combinatorio de productos con descuento.
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
    originalPrice: 195.80,
    bundlePrice: 165.0,
    badge: "AHORRA 30,80€",
    reason: "Tu rutina mínima diaria",
  },
  {
    handle: "pack-ritual-cara-completa",
    title: "Pack Ritual Cara Completa",
    description: "Limpieza + contorno de ojos + sérum. Ideal para quienes empiezan y quieren cubrir los 3 pasos clave.",
    includes: ["multiclean", "fresh-eye", "serum-skin", "manopla-led-garett-beauty"],
    originalPrice: 419.80,
    bundlePrice: 349.0,
    badge: "AHORRA 70,80€",
    reason: "Limpieza + tratamiento + LED",
  },
  {
    handle: "pack-ritual-premium",
    title: "Pack Ritual Premium",
    description: "Multiclean + Calm Skin + Cellu-Body. La rutina facial y corporal completa para uso intensivo.",
    includes: ["multiclean", "calm-skin", "cellu-body"],
    originalPrice: 315.90,
    bundlePrice: 265.0,
    badge: "AHORRA 50,90€",
    reason: "Cara + cuerpo: la rutina completa",
  },
];

export function getBundlesForHandle(handle: string): Bundle[] {
  return BUNDLES.filter((b) => b.includes.includes(handle));
}

export function getAllBundles(): Bundle[] {
  return BUNDLES;
}
