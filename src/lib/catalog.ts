// Catálogo local Garett — sustituye la capa Shopify (tienda offline).
// Mantiene la forma ShopifyProduct para no romper componentes.
// PRECIOS: derivados de los bundles Navidad + README (ver git log).
// Los marcados como null están pendientes de confirmar.

import { ShopifyProduct } from "./shopify";

import aeroglowDualImg from "@/assets/aeroglow-dual.png";
import aeroglowHeroImg from "@/assets/aeroglow-hero.png";
import aeroglowIonImg from "@/assets/aeroglow-ion-tech.png";
import gwpHeadbandImg from "@/assets/gwp-headband.png";
import catFacialImg from "@/assets/category-masajeadores-faciales.webp";
import catLimpiezaImg from "@/assets/category-limpieza-facial.webp";
import catMesoImg from "@/assets/category-mesoterapia.webp";
import catCorporalImg from "@/assets/category-corporales.webp";
import catCapilarImg from "@/assets/category-cuidado-capilar.webp";
import catIPLImg from "@/assets/category-depilacion-ipl.webp";
import catLEDImg from "@/assets/category-terapia-luz-led.jpg";

const productImgModules = import.meta.glob(
  "@/assets/products/*.{jpg,png}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const IMG = {
  aeroglowDual: aeroglowDualImg,
  aeroglowHero: aeroglowHeroImg,
  aeroglowIon: aeroglowIonImg,
  gwpHeadband: gwpHeadbandImg,
  catFacial: catFacialImg,
  catLimpieza: catLimpiezaImg,
  catMeso: catMesoImg,
  catCorporal: catCorporalImg,
  catCapilar: catCapilarImg,
  catIPL: catIPLImg,
  catLED: catLEDImg,
};

function photo(...names: string[]): string[] {
  return names.map((n) => productImgModules[`/src/assets/products/${n}`]).filter(Boolean);
}

interface LocalProductSeed {
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  price: number | null;
  compareAtPrice?: number | null;
  images: string[];
  options?: Array<{ name: string; values: string[] }>;
  variantTitles?: string[];
}

const seeds: LocalProductSeed[] = [
  // ===== Masajeadores faciales =====
  {
    handle: "fresh-eye",
    title: "Fresh Eye - Masajeador Contorno de Ojos",
    description: "Masajeador de contorno de ojos con vibración y LED para reducir ojeras, minimizar arrugas y conseguir una mirada luminosa.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:eye", "tech:limpieza"],
    price: 56.89,
    images: photo("fresh-eye-1.jpg", "fresh-eye-2.jpg", "fresh-eye-3.jpg", "fresh-eye-4.jpg", "fresh-eye-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "lift-skin",
    title: "Lift Skin - Masajeador Facial Reafirmante",
    description: "Masajeador facial con vibración sónica y EMS para reafirmar la piel y definir el óvalo facial desde casa.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "tech:limpieza", "bestseller:true"],
    price: 89.90, // ESTIMADO — masajeador facial medio (rango FOREO Bear 200+/ZIIP similar 90-120)
    images: photo("lift-skin-1.png", "lift-skin-2.png", "lift-skin-3.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "lift-skin-pro",
    title: "Lift Skin Pro - Masajeador Facial Profesional",
    description: "Versión Pro con tecnología 4-en-1: vibración sónica, EMS, LED y calor terapéutico para un lifting natural en casa.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "new:true"],
    price: 149.00, // ESTIMADO — Pro 4-en-1 (sónica+EMS+LED+calor) ~CurrentBody RF 349 / FOREO Bear 249
    images: photo("lift-skin-pro-1.jpg", "lift-skin-pro-2.jpg", "lift-skin-pro-3.jpg", "lift-skin-pro-4.jpg", "lift-skin-pro-5.jpg", "lift-skin-pro-6.jpg", "lift-skin-pro-7.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "pretty-face",
    title: "Pretty Face - Masajeador Facial EMS",
    description: "Masajeador facial con EMS Fitness y modo relajación para piel más firme y efecto lifting sin agujas.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "tech:mesoterapia"],
    price: 86.11,
    images: photo("pretty-face-1.png", "pretty-face-2.png", "pretty-face-3.png"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "beauty-lift",
    title: "Beauty Lift - Masajeador Facial de Lifting",
    description: "Dispositivo de lifting facial con tecnología de estimulación para reafirmar y tonificar la piel.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face"],
    price: 119.00, // ESTIMADO — dispositivo de lifting básico
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Limpieza facial =====
  {
    handle: "multiclean",
    title: "Multiclean - Cepillo Facial Sónico",
    description: "Cepillo facial sónico de 7.500 vibraciones/minuto para una limpieza 10x más profunda. Impermeable IPX7 y batería de 2 semanas.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza", "bestseller:true"],
    price: 79.90,
    images: photo("multiclean-1.jpg", "multiclean-2.jpg", "multiclean-3.jpg", "multiclean-4.jpg", "multiclean-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "breeze-scrub",
    title: "Breeze Scrub - Exfoliador Facial Sónico",
    description: "Exfoliador facial sónico con cabezales intercambiables para una exfoliación suave y profunda adaptada a tu piel.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza"],
    price: 98.99,
    images: photo("breeze-scrub-1.jpg", "breeze-scrub-2.jpg", "breeze-scrub-3.jpg", "breeze-scrub-4.jpg", "breeze-scrub-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "refresh-scrub",
    title: "Refresh Scrub - Cepillo Facial Refrescante",
    description: "Cepillo facial sónico para una limpieza profunda y refrescante, ideal para pieles maduras y sensibles.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza"],
    price: 89.00, // ESTIMADO — cepillo sónico medio (rango FOREO LUNA 199 / ZIIP equivalente 80-100)
    images: photo("refresh-scrub-1.jpg", "refresh-scrub-2.jpg", "refresh-scrub-3.jpg", "refresh-scrub-4.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Mesoterapia =====
  {
    handle: "calm-skin",
    title: "Calm Skin - Dispositivo de Mesoterapia Calmante",
    description: "Mesoterapia sin agujas con electroporación para máxima absorción de activos. Efecto calmante y reparador.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: 129.00, // ESTIMADO — mesoterapia medio (Fresh Skin Pro 169, Fresh Eye 56,89 → encaja con jerarquía)
    images: photo("calm-skin-1.jpg", "calm-skin-2.jpg", "calm-skin-3.jpg", "calm-skin-4.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "fresh-skin-pro",
    title: "Fresh Skin Pro - Dispositivo de Mesoterapia",
    description: "Mesoterapia sin agujas ni dolor. Electroporación que abre microcanales para que tus sérums penetren hasta las capas profundas.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia", "bestseller:true"],
    price: 169.10,
    images: photo("fresh-skin-pro-1.jpg", "fresh-skin-pro-2.jpg", "fresh-skin-pro-3.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "bright-skin",
    title: "Bright Skin - Dispositivo de Mesoterapia Luminosidad",
    description: "Mesoterapia sin agujas para unificar el tono, difuminar manchas y conseguir una piel luminosa desde casa.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: 139.00, // ESTIMADO — mesoterapia luminosidad (cerca de Calm Skin)
    images: photo("bright-skin-1.jpg", "bright-skin-2.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "serum-skin",
    title: "Serum Skin - Dispositivo de Mesoterapia con Sérums",
    description: "Mesoterapia sin agujas con electroporación para potenciar la absorción de tus sérums favoritos. Resultados desde semana 4.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: 59.01,
    images: photo("serum-skin-1.jpg", "serum-skin-2.jpg", "serum-skin-3.jpg", "serum-skin-4.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Corporales =====
  {
    handle: "cellu-body",
    title: "Cellu-Body - Masajeador Corporal Anticelulítico",
    description: "Radiofrecuencia + masaje de vacum para reducir celulitis visible y reafirmar piernas, glúteos y abdomen.",
    productType: "Corporal",
    tags: ["type:device", "category:corporales", "area:body", "bestseller:true"],
    price: 199.00, // ESTIMADO — corporal RF+vacum (rango Medicube Body 199-249, FOREO Bear body 249)
    images: photo("cellu-body-1.jpg", "cellu-body-2.jpg", "cellu-body-3.jpg", "cellu-body-4.jpg", "cellu-body-5.jpg", "cellu-body-6.jpg", "cellu-body-7.jpg", "cellu-body-8.jpg", "cellu-body-9.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "cuerpo-perfecto",
    title: "Cuerpo Perfecto - Tratamiento Corporal Completo",
    description: "Dispositivo corporal con calor y masaje profundo para suavizar, reafirmar y tonificar todo el cuerpo.",
    productType: "Corporal",
    tags: ["type:device", "category:corporales", "area:body"],
    price: 179.00, // ESTIMADO — corporal completo (entre Cellu-Body 199 y cuerpo básico)
    images: photo("cuerpo-perfecto-1.jpg", "cuerpo-perfecto-2.jpg", "cuerpo-perfecto-3.jpg", "cuerpo-perfecto-4.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "multi-care-brush",
    title: "Multi Care Brush - Cepillo Multifuncional EMS",
    description: "Cepillo multifuncional con EMS de 5 niveles, fototerapia LED y 3 cabezales magnéticos para cuero cabelludo, rostro y cuerpo.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "category:corporales", "area:body"],
    price: 159.00, // ESTIMADO — cepillo multifuncional EMS (rango Medicube Booster Pro 199-249)
    images: photo("multi-care-brush-1.jpg", "multi-care-brush-2.jpg", "multi-care-brush-3.jpg", "multi-care-brush-4.jpg", "multi-care-brush-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Cuidado capilar =====
  {
    handle: "curly",
    title: "Curly - Secador y Alisador de Aire",
    description: "Dispositivo de styling para rizos definidos sin daño térmico. Tecnología de aire para pelo maduro y teñido.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "area:hair"],
    price: 229.00, // ESTIMADO — secador/alisador aire profesional (rango Dyson 350-450 / Revlon 100-150 / Laifen 169)
    images: photo("curly-1.jpg", "curly-2.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "aeroglow",
    title: "AeroGlow - Plancha de Pelo con Tecnología Iónica",
    description: "Plancha de aire profesional con ionización, motor BLDC 110.000 RPM y 5 temperaturas. Seca y alisa sin daño térmico.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "area:hair", "new:true", "launch:bf2025"],
    price: 249.00, // ESTIMADO — plancha aire profesional (similar a Dyson Airstrait 399-499, pero sin marca premium)
    compareAtPrice: 299.00,
    images: photo("aeroglow-1.jpg", "aeroglow-2.jpg", "aeroglow-3.jpg", "aeroglow-4.jpg", "aeroglow-5.jpg", "aeroglow-6.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== IPL =====
  {
    handle: "ipl-flash-pro",
    title: "IPL Flash Pro - Depiladora de Luz Pulsada",
    description: "Depilación IPL profesional en casa con 400.000 pulsos, sensor de piel inteligente y certificado médico clase IIa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl", "bestseller:true"],
    price: 449.00, // ESTIMADO — IPL Pro 400.000 pulsos certificado médico (CurrentBody Lumea 449, Philips Lumea 449)
    images: photo("ipl-flash-pro-1.jpg", "ipl-flash-pro-2.jpg", "ipl-flash-pro-3.jpg", "ipl-flash-pro-4.jpg", "ipl-flash-pro-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "ipl-flash-dorada",
    title: "IPL Flash Dorada - Depiladora de Luz Pulsada",
    description: "Depiladora IPL con acabado dorado. 400.000 pulsos y tecnología de luz pulsada para depilación permanente desde casa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: 379.00, // ESTIMADO — IPL Dorada (acabado premium, rango Philips Lumea Advanced 549-649, pero Garett no es Philips)
    images: photo("ipl-flash-dorada-1.jpg", "ipl-flash-dorada-2.jpg", "ipl-flash-dorada-3.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "ipl-plateada",
    title: "IPL Plateada - Depiladora de Luz Pulsada",
    description: "Depiladora IPL con acabado plateado. Resultados desde semana 4 y hasta 90% menos vello visible en 8 semanas.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: 329.00, // ESTIMADO — IPL Plateada (rango medio entre Dorada y Pro)
    images: photo("ipl-plateada-1.jpg", "ipl-plateada-2.jpg", "ipl-plateada-3.jpg", "ipl-plateada-4.jpg", "ipl-plateada-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "cool",
    title: "Cool - Depiladora IPL con Sistema de Frío",
    description: "Depiladora IPL con sistema de enfriamiento para una experiencia sin molestias. Tecnología de luz pulsada para casa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: 379.00, // ESTIMADO — IPL con sistema de frío (Cool, similar a Dorada, +precio por tecnología cooling)
    images: photo("cool-1.jpg", "cool-2.jpg", "cool-3.jpg", "cool-4.jpg", "cool-5.jpg", "cool-6.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Terapia de luz LED =====
  {
    handle: "manopla-led-garett-beauty",
    title: "Manopla LED Garett Beauty - Fototerapia LED",
    description: "Manopla de fototerapia LED con 4 modos de luz (Calm, Luminosidad, Rejuvenecimiento, Firmeza) para rejuvenecimiento facial.",
    productType: "LED",
    tags: ["type:device", "category:terapia-luz-led", "area:face", "new:true"],
    price: 224.00,
    images: photo("manopla-led-1.png", "manopla-led-2.png", "manopla-led-3.png", "manopla-led-4.png"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "mascara-led-garett-beauty",
    title: "Máscara LED Garett Beauty - Fototerapia LED Facial",
    description: "Máscara de fototerapia LED con 4 modos de luz, temporizador 5/10/15 min y silicona médica hipoalergénica.",
    productType: "LED",
    tags: ["type:device", "category:terapia-luz-led", "area:face", "bestseller:true", "new:true"],
    price: 299.00, // ESTIMADO — Máscara LED (CurrentBody LED Mask 449, pero con menos LEDs/warranty)
    images: photo("mascara-led-1.png", "mascara-led-2.png", "mascara-led-3.png", "mascara-led-4.jpg", "mascara-led-5.jpg"),
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== GWP (oculto de la tienda, se añade automáticamente) =====
  {
    handle: "gwp-hairband",
    title: "Banda de Pelo Premium Garett - Special BF",
    description: "Regalo por compras superiores a 70€. Banda de pelo premium Garett.",
    productType: "Accesorio",
    tags: ["type:accessory", "category:accesorios", "gift:true"],
    price: 12.99,
    compareAtPrice: 20.00,
    images: [IMG.gwpHeadband],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
];

function buildVariantId(handle: string, index: number): string {
  return `local://${handle}/variant/${index}`;
}

export const LOCAL_PRODUCTS: ShopifyProduct[] = seeds.map((seed, idx) => {
  const priceAmount = seed.price !== null ? seed.price.toFixed(2) : "0.00";
  const compareAmount = seed.compareAtPrice !== null && seed.compareAtPrice !== undefined
    ? seed.compareAtPrice.toFixed(2)
    : null;

  return {
    node: {
      id: `gid://local/Product/${idx + 1}`,
      title: seed.title,
      description: seed.description,
      handle: seed.handle,
      tags: seed.tags,
      productType: seed.productType,
      priceRange: {
        minVariantPrice: { amount: priceAmount, currencyCode: "EUR" },
      },
      images: {
        edges: seed.images.map((url, i) => ({
          node: { url, altText: seed.title },
        })),
      },
      variants: {
        edges: [
          {
            node: {
              id: buildVariantId(seed.handle, 0),
              title: seed.variantTitles?.[0] ?? "Default Title",
              price: { amount: priceAmount, currencyCode: "EUR" },
              compareAtPrice: compareAmount
                ? { amount: compareAmount, currencyCode: "EUR" }
                : null,
              availableForSale: true,
              selectedOptions: [
                { name: "Title", value: seed.variantTitles?.[0] ?? "Default Title" },
              ],
            },
          },
        ],
      },
      options: seed.options ?? [{ name: "Title", values: ["Default Title"] }],
    },
  };
});

export const LOCAL_PRODUCTS_BY_HANDLE: Record<string, ShopifyProduct> =
  Object.fromEntries(LOCAL_PRODUCTS.map((p) => [p.node.handle, p]));
