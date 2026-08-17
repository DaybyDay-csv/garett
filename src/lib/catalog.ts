// Catálogo local Garett — sustituye la capa Shopify (tienda offline).
// Mantiene la forma ShopifyProduct para no romper componentes.
// PRECIOS: derivados de los bundles Navidad + README (ver git log).
// Los marcados como null están pendientes de confirmar.

import { ShopifyProduct } from "./shopify";

import aeroglowDualImg from "@/assets/aeroglow-dual.png";
import aeroglowHeroImg from "@/assets/aeroglow-hero.png";
import aeroglowIonImg from "@/assets/aeroglow-ion-tech.png";
import manoplaLed1Img from "@/assets/products/manopla-led-1.png";
import manoplaLed2Img from "@/assets/products/manopla-led-2.png";
import manoplaLed3Img from "@/assets/products/manopla-led-3.png";
import manoplaLed4Img from "@/assets/products/manopla-led-4.png";
import mascaraLed1Img from "@/assets/products/mascara-led-1.png";
import mascaraLed2Img from "@/assets/products/mascara-led-2.png";
import mascaraLed3Img from "@/assets/products/mascara-led-3.png";
import mascaraLed4Img from "@/assets/products/mascara-led-4.jpg";
import mascaraLed5Img from "@/assets/products/mascara-led-5.jpg";
import gwpHeadbandImg from "@/assets/gwp-headband.png";
import catFacialImg from "@/assets/category-masajeadores-faciales.webp";
import catLimpiezaImg from "@/assets/category-limpieza-facial.webp";
import catMesoImg from "@/assets/category-mesoterapia.webp";
import catCorporalImg from "@/assets/category-corporales.webp";
import catCapilarImg from "@/assets/category-cuidado-capilar.webp";
import catIPLImg from "@/assets/category-depilacion-ipl.webp";
import catLEDImg from "@/assets/category-terapia-luz-led.jpg";
import catAccessoriesImg from "@/assets/category-accessories.jpg";
import catSmartImg from "@/assets/category-smartwatches.jpg";

const IMG = {
  aeroglowDual: aeroglowDualImg,
  aeroglowHero: aeroglowHeroImg,
  aeroglowIon: aeroglowIonImg,
  manoplaLed1: manoplaLed1Img,
  manoplaLed2: manoplaLed2Img,
  manoplaLed3: manoplaLed3Img,
  manoplaLed4: manoplaLed4Img,
  mascaraLed1: mascaraLed1Img,
  mascaraLed2: mascaraLed2Img,
  mascaraLed3: mascaraLed3Img,
  mascaraLed4: mascaraLed4Img,
  mascaraLed5: mascaraLed5Img,
  gwpHeadband: gwpHeadbandImg,
  catFacial: catFacialImg,
  catLimpieza: catLimpiezaImg,
  catMeso: catMesoImg,
  catCorporal: catCorporalImg,
  catCapilar: catCapilarImg,
  catIPL: catIPLImg,
  catLED: catLEDImg,
  catAccessories: catAccessoriesImg,
  catSmart: catSmartImg,
};

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
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "lift-skin",
    title: "Lift Skin - Masajeador Facial Reafirmante",
    description: "Masajeador facial con vibración sónica y EMS para reafirmar la piel y definir el óvalo facial desde casa.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "tech:limpieza"],
    price: null, // PENDIENTE
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "lift-skin-pro",
    title: "Lift Skin Pro - Masajeador Facial Profesional",
    description: "Versión Pro con tecnología 4-en-1: vibración sónica, EMS, LED y calor terapéutico para un lifting natural en casa.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "new:true"],
    price: null, // PENDIENTE
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "pretty-face",
    title: "Pretty Face - Masajeador Facial EMS",
    description: "Masajeador facial con EMS Fitness y modo relajación para piel más firme y efecto lifting sin agujas.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face", "tech:mesoterapia"],
    price: 86.11,
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "beauty-lift",
    title: "Beauty Lift - Masajeador Facial de Lifting",
    description: "Dispositivo de lifting facial con tecnología de estimulación para reafirmar y tonificar la piel.",
    productType: "Masajeador facial",
    tags: ["type:device", "category:masajeadores-faciales", "area:face"],
    price: null, // PENDIENTE
    images: [IMG.catFacial],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Limpieza facial =====
  {
    handle: "multiclean",
    title: "Multiclean - Cepillo Facial Sónico",
    description: "Cepillo facial sónico de 7.500 vibraciones/minuto para una limpieza 10x más profunda. Impermeable IPX7 y batería de 2 semanas.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza"],
    price: 79.90,
    images: [IMG.catLimpieza],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "breeze-scrub",
    title: "Breeze Scrub - Exfoliador Facial Sónico",
    description: "Exfoliador facial sónico con cabezales intercambiables para una exfoliación suave y profunda adaptada a tu piel.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza"],
    price: 98.99,
    images: [IMG.catLimpieza],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "refresh-scrub",
    title: "Refresh Scrub - Cepillo Facial Refrescante",
    description: "Cepillo facial sónico para una limpieza profunda y refrescante, ideal para pieles maduras y sensibles.",
    productType: "Limpieza facial",
    tags: ["type:device", "category:limpieza-facial", "area:face", "tech:limpieza"],
    price: null, // PENDIENTE
    images: [IMG.catLimpieza],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Mesoterapia =====
  {
    handle: "calm-skin",
    title: "Calm Skin - Dispositivo de Mesoterapia Calmante",
    description: "Mesoterapia sin agujas con electroporación para máxima absorción de activos. Efecto calmante y reparador.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: null, // PENDIENTE (Calm Skin + Cellu-Body = 236)
    images: [IMG.catMeso],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "fresh-skin-pro",
    title: "Fresh Skin Pro - Dispositivo de Mesoterapia",
    description: "Mesoterapia sin agujas ni dolor. Electroporación que abre microcanales para que tus sérums penetren hasta las capas profundas.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: 169.10,
    images: [IMG.catMeso],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "bright-skin",
    title: "Bright Skin - Dispositivo de Mesoterapia Luminosidad",
    description: "Mesoterapia sin agujas para unificar el tono, difuminar manchas y conseguir una piel luminosa desde casa.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: null, // PENDIENTE
    images: [IMG.catMeso],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "serum-skin",
    title: "Serum Skin - Dispositivo de Mesoterapia con Sérums",
    description: "Mesoterapia sin agujas con electroporación para potenciar la absorción de tus sérums favoritos. Resultados desde semana 4.",
    productType: "Mesoterapia",
    tags: ["type:device", "category:mesoterapia", "area:face", "tech:mesoterapia"],
    price: 59.01,
    images: [IMG.catMeso],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Corporales =====
  {
    handle: "cellu-body",
    title: "Cellu-Body - Masajeador Corporal Anticelulítico",
    description: "Radiofrecuencia + masaje de vacum para reducir celulitis visible y reafirmar piernas, glúteos y abdomen.",
    productType: "Corporal",
    tags: ["type:device", "category:corporales", "area:body"],
    price: null, // PENDIENTE (Calm Skin + Cellu-Body = 236)
    images: [IMG.catCorporal],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "cuerpo-perfecto",
    title: "Cuerpo Perfecto - Tratamiento Corporal Completo",
    description: "Dispositivo corporal con calor y masaje profundo para suavizar, reafirmar y tonificar todo el cuerpo.",
    productType: "Corporal",
    tags: ["type:device", "category:corporales", "area:body"],
    price: null, // PENDIENTE
    images: [IMG.catCorporal],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "multi-care-brush",
    title: "Multi Care Brush - Cepillo Multifuncional EMS",
    description: "Cepillo multifuncional con EMS de 5 niveles, fototerapia LED y 3 cabezales magnéticos para cuero cabelludo, rostro y cuerpo.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "category:corporales", "area:body"],
    price: null, // PENDIENTE
    images: [IMG.catCapilar],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Cuidado capilar =====
  {
    handle: "curly",
    title: "Curly - Secador y Alisador de Aire",
    description: "Dispositivo de styling para rizos definidos sin daño térmico. Tecnología de aire para pelo maduro y teñido.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "area:hair"],
    price: null, // PENDIENTE
    images: [IMG.catCapilar],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "aeroglow",
    title: "AeroGlow - Plancha de Pelo con Tecnología Iónica",
    description: "Plancha de aire profesional con ionización, motor BLDC 110.000 RPM y 5 temperaturas. Seca y alisa sin daño térmico.",
    productType: "Capilar",
    tags: ["type:device", "category:capilar", "area:hair", "new:true", "launch:bf2025"],
    price: null, // PENDIENTE
    compareAtPrice: null,
    images: [IMG.aeroglowHero, IMG.aeroglowDual, IMG.aeroglowIon],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== IPL =====
  {
    handle: "ipl-flash-pro",
    title: "IPL Flash Pro - Depiladora de Luz Pulsada",
    description: "Depilación IPL profesional en casa con 400.000 pulsos, sensor de piel inteligente y certificado médico clase IIa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl", "bestseller:true"],
    price: null, // PENDIENTE
    images: [IMG.catIPL],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "ipl-flash-dorada",
    title: "IPL Flash Dorada - Depiladora de Luz Pulsada",
    description: "Depiladora IPL con acabado dorado. 400.000 pulsos y tecnología de luz pulsada para depilación permanente desde casa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: null, // PENDIENTE
    images: [IMG.catIPL],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "ipl-plateada",
    title: "IPL Plateada - Depiladora de Luz Pulsada",
    description: "Depiladora IPL con acabado plateado. Resultados desde semana 4 y hasta 90% menos vello visible en 8 semanas.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: null, // PENDIENTE
    images: [IMG.catIPL],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "cool",
    title: "Cool - Depiladora IPL con Sistema de Frío",
    description: "Depiladora IPL con sistema de enfriamiento para una experiencia sin molestias. Tecnología de luz pulsada para casa.",
    productType: "IPL",
    tags: ["type:device", "category:ipl", "area:body", "tech:ipl"],
    price: null, // PENDIENTE
    images: [IMG.catIPL],
    options: [{ name: "Title", values: ["Default Title"] }],
  },

  // ===== Terapia de luz LED =====
  {
    handle: "manopla-led-garett-beauty",
    title: "Manopla LED Garett Beauty - Fototerapia LED",
    description: "Manopla de fototerapia LED con 4 modos de luz (Calm, Luminosidad, Rejuvenecimiento, Firmeza) para rejuvenecimiento facial.",
    productType: "LED",
    tags: ["type:device", "category:terapia-luz-led", "area:face"],
    price: 224.00,
    images: [IMG.manoplaLed1, IMG.manoplaLed2, IMG.manoplaLed3, IMG.manoplaLed4],
    options: [{ name: "Title", values: ["Default Title"] }],
  },
  {
    handle: "mascara-led-garett-beauty",
    title: "Máscara LED Garett Beauty - Fototerapia LED Facial",
    description: "Máscara de fototerapia LED con 4 modos de luz, temporizador 5/10/15 min y silicona médica hipoalergénica.",
    productType: "LED",
    tags: ["type:device", "category:terapia-luz-led", "area:face"],
    price: null, // PENDIENTE
    images: [IMG.mascaraLed1, IMG.mascaraLed2, IMG.mascaraLed3, IMG.mascaraLed4, IMG.mascaraLed5],
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
