/**
 * DUPLICADO DE src/lib/prices.ts — si cambias uno, cambia el otro.
 * (Las Cloudflare Functions no pueden importar de src/ con seguridad.)
 *
 * PRECIOS — GENERADO DEL CATÁLOGO (src/lib/catalog.ts y src/lib/bundles.ts).
 * Mantener sincronizado: si cambia un precio o un pack en el catálogo,
 * actualizar también aquí y en el duplicado.
 *
 * PRECIOS: los 23 productos visibles del catálogo. Queda fuera el GWP oculto
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
  /** Componentes con sus cantidades. */
  componentes: ComponentePack[];
  /** Precio final del pack, ya rebajado, en céntimos de euro. */
  precioCentimos: number;
}

/** Los 23 productos visibles del catálogo. */
export const PRECIOS: Record<string, PrecioProducto> = {
  "fresh-eye": { precioCentimos: 5689, nombre: "Fresh Eye - Masajeador Contorno de Ojos" },
  "lift-skin": { precioCentimos: 8990, nombre: "Lift Skin - Masajeador Facial Reafirmante" },
  "lift-skin-pro": { precioCentimos: 14900, nombre: "Lift Skin Pro - Masajeador Facial Profesional" },
  "pretty-face": { precioCentimos: 8611, nombre: "Pretty Face - Masajeador Facial EMS" },
  "beauty-lift": { precioCentimos: 11900, nombre: "Beauty Lift - Masajeador Facial de Lifting" },
  multiclean: { precioCentimos: 7990, nombre: "Multiclean - Cepillo Facial Sónico" },
  "breeze-scrub": { precioCentimos: 9899, nombre: "Breeze Scrub - Exfoliador Facial Sónico" },
  "refresh-scrub": { precioCentimos: 8900, nombre: "Refresh Scrub - Cepillo Facial Refrescante" },
  "calm-skin": { precioCentimos: 12900, nombre: "Calm Skin - Dispositivo de Mesoterapia Calmante" },
  "fresh-skin-pro": { precioCentimos: 16910, nombre: "Fresh Skin Pro - Dispositivo de Mesoterapia" },
  "bright-skin": { precioCentimos: 13900, nombre: "Bright Skin - Dispositivo de Mesoterapia Luminosidad" },
  "serum-skin": { precioCentimos: 5901, nombre: "Serum Skin - Dispositivo de Mesoterapia con Sérums" },
  "cellu-body": { precioCentimos: 19900, nombre: "Cellu-Body - Masajeador Corporal Anticelulítico" },
  "cuerpo-perfecto": { precioCentimos: 17900, nombre: "Cuerpo Perfecto - Tratamiento Corporal Completo" },
  "multi-care-brush": { precioCentimos: 15900, nombre: "Multi Care Brush - Cepillo Multifuncional EMS" },
  curly: { precioCentimos: 22900, nombre: "Curly - Secador y Alisador de Aire" },
  aeroglow: { precioCentimos: 24900, nombre: "AeroGlow - Plancha de Pelo con Tecnología Iónica" },
  "ipl-flash-pro": { precioCentimos: 44900, nombre: "IPL Flash Pro - Depiladora de Luz Pulsada" },
  "ipl-flash-dorada": { precioCentimos: 37900, nombre: "IPL Flash Dorada - Depiladora de Luz Pulsada" },
  "ipl-plateada": { precioCentimos: 32900, nombre: "IPL Plateada - Depiladora de Luz Pulsada" },
  cool: { precioCentimos: 37900, nombre: "Cool - Depiladora IPL con Sistema de Frío" },
  "manopla-led-garett-beauty": { precioCentimos: 22400, nombre: "Manopla LED Garett Beauty - Fototerapia LED" },
  "mascara-led-garett-beauty": { precioCentimos: 29900, nombre: "Máscara LED Garett Beauty - Fototerapia LED Facial" },
};

/** Los 3 packs de bundles.ts, con su precio final ya rebajado. */
export const PACKS: Pack[] = [
  {
    handle: "pack-ritual-belleza-eco",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "serum-skin", cantidad: 1 },
      { handle: "fresh-eye", cantidad: 1 },
    ],
    precioCentimos: 16500,
  },
  {
    handle: "pack-ritual-cara-completa",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "fresh-eye", cantidad: 1 },
      { handle: "serum-skin", cantidad: 1 },
      { handle: "manopla-led-garett-beauty", cantidad: 1 },
    ],
    precioCentimos: 34900,
  },
  {
    handle: "pack-ritual-premium",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "calm-skin", cantidad: 1 },
      { handle: "cellu-body", cantidad: 1 },
    ],
    precioCentimos: 26500,
  },
];
