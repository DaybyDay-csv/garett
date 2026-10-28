/**
 * DUPLICADO DE src/lib/prices.ts — si cambias uno, cambia el otro.
 * (Las Cloudflare Functions no pueden importar de src/ con seguridad.)
 *
 * PRECIOS — GENERADO DEL CATÁLOGO (src/lib/catalog.ts y src/lib/bundles.ts).
 * Mantener sincronizado: si cambia un precio o un pack en el catálogo,
 * actualizar también aquí y en el duplicado.
 *
 * PRECIOS: los 28 productos visibles del catálogo (23 beauty-tech + 5 relojes
 * Garett en liquidación). Queda fuera el GWP oculto
 * (gwp-hairband), que no se vende. Precios en CÉNTIMOS de euro.
 * PACKS: precio final del pack, YA REBAJADO (bundles.ts `bundlePrice`), en céntimos.
 */

/** Precio de un producto suelto. */
export interface PrecioProducto {
  /** Precio en céntimos de euro. */
  precioCentimos: number;
  /** Nombre del producto, tal y como aparece en el catálogo. */
  nombre: string;
}

/** Componente de un pack y su cantidad. */
export interface ComponentePack {
  /** Handle del producto componente (debe existir en PRECIOS). */
  handle: string;
  /** Unidades de ese componente en el pack. */
  cantidad: number;
}

/** Pack de bundles.ts con su precio final ya rebajado. */
export interface Pack {
  /** Handle del pack. */
  handle: string;
  /** Nombre del pack para la línea del recibo de Stripe. */
  nombre: string;
  /** Componentes con sus cantidades. */
  componentes: ComponentePack[];
  /** Precio final del pack, ya rebajado, en céntimos de euro. */
  precioCentimos: number;
}

/** Los 28 productos visibles del catálogo. */
export const PRECIOS: Record<string, PrecioProducto> = {
  "fresh-eye": { precioCentimos: 2890, nombre: "Fresh Eye - Masajeador Contorno de Ojos" },
  "lift-skin": { precioCentimos: 4490, nombre: "Lift Skin - Masajeador Facial Reafirmante" },
  "lift-skin-pro": { precioCentimos: 7490, nombre: "Lift Skin Pro - Masajeador Facial Profesional" },
  "pretty-face": { precioCentimos: 4290, nombre: "Pretty Face - Masajeador Facial EMS" },
  "beauty-lift": { precioCentimos: 5990, nombre: "Beauty Lift - Masajeador Facial de Lifting" },
  multiclean: { precioCentimos: 3990, nombre: "Multiclean - Cepillo Facial Sónico" },
  "breeze-scrub": { precioCentimos: 4990, nombre: "Breeze Scrub - Exfoliador Facial Sónico" },
  "refresh-scrub": { precioCentimos: 4490, nombre: "Refresh Scrub - Cepillo Facial Refrescante" },
  "calm-skin": { precioCentimos: 6490, nombre: "Calm Skin - Dispositivo de Mesoterapia Calmante" },
  "fresh-skin-pro": { precioCentimos: 8490, nombre: "Fresh Skin Pro - Dispositivo de Mesoterapia" },
  "bright-skin": { precioCentimos: 6990, nombre: "Bright Skin - Dispositivo de Mesoterapia Luminosidad" },
  "serum-skin": { precioCentimos: 2990, nombre: "Serum Skin - Dispositivo de Mesoterapia con Sérums" },
  "cellu-body": { precioCentimos: 9990, nombre: "Cellu-Body - Masajeador Corporal Anticelulítico" },
  "cuerpo-perfecto": { precioCentimos: 8990, nombre: "Cuerpo Perfecto - Tratamiento Corporal Completo" },
  "multi-care-brush": { precioCentimos: 7990, nombre: "Multi Care Brush - Cepillo Multifuncional EMS" },
  curly: { precioCentimos: 11490, nombre: "Curly - Secador y Alisador de Aire" },
  aeroglow: { precioCentimos: 12490, nombre: "AeroGlow - Plancha de Pelo con Tecnología Iónica" },
  "ipl-flash-pro": { precioCentimos: 22490, nombre: "IPL Flash Pro - Depiladora de Luz Pulsada" },
  "ipl-flash-dorada": { precioCentimos: 18990, nombre: "IPL Flash Dorada - Depiladora de Luz Pulsada" },
  "ipl-plateada": { precioCentimos: 16490, nombre: "IPL Plateada - Depiladora de Luz Pulsada" },
  cool: { precioCentimos: 18990, nombre: "Cool - Depiladora IPL con Sistema de Frío" },
  "manopla-led-intermex-beauty": { precioCentimos: 11190, nombre: "Manopla LED Intermex Beauty - Fototerapia LED" },
  "mascara-led-intermex-beauty": { precioCentimos: 14990, nombre: "Máscara LED Intermex Beauty - Fototerapia LED Facial" },
  // Relojes Garett (liquidación): precios PROPUESTA validados en negocio/liquidacion-economia.md §1.
  "reloj-garett-verona": { precioCentimos: 6900, nombre: "Reloj Garett Verona — Smartwatch (Gen 1)" },
  "reloj-garett-atom": { precioCentimos: 3900, nombre: "Reloj Garett Atom — Smartwatch" },
  "reloj-garett-v14": { precioCentimos: 5900, nombre: "Reloj Garett V14 — Smartwatch" },
  "reloj-garett-grs-pro": { precioCentimos: 3900, nombre: "Reloj Garett GRS PRO — Smartwatch GPS 52 mm" },
  "reloj-garett-grc-maxx": { precioCentimos: 3900, nombre: "Reloj Garett GRC MAXX — Smartwatch" },
};

/** Los 3 packs de bundles.ts, con su precio final ya rebajado. */
export const PACKS: Pack[] = [
  {
    handle: "pack-ritual-belleza-eco",
    nombre: "Pack Ritual Belleza Eco",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "serum-skin", cantidad: 1 },
      { handle: "fresh-eye", cantidad: 1 },
    ],
    precioCentimos: 8890,
  },
  {
    handle: "pack-ritual-cara-completa",
    nombre: "Pack Ritual Cara Completa",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "fresh-eye", cantidad: 1 },
      { handle: "serum-skin", cantidad: 1 },
      { handle: "manopla-led-intermex-beauty", cantidad: 1 },
    ],
    precioCentimos: 18990,
  },
  {
    handle: "pack-ritual-premium",
    nombre: "Pack Ritual Premium",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "calm-skin", cantidad: 1 },
      { handle: "cellu-body", cantidad: 1 },
    ],
    precioCentimos: 18390,
  },
];
