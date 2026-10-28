/**
 * PRECIOS — GENERADO DEL CATÁLOGO (src/lib/catalog.ts y src/lib/bundles.ts).
 * Mantener sincronizado: si cambia un precio o un pack en el catálogo,
 * actualizar también aquí.
 *
 * Módulo puro, sin imports: seguro para el cliente y para duplicar a
 * functions/api/prices.ts (las Cloudflare Functions no pueden importar de
 * src/ con seguridad; si cambias uno, cambia el otro).
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
  /** Nombre del pack (igual que bundles.ts `title`). */
  nombre: string;
  /** Componentes con sus cantidades. */
  componentes: ComponentePack[];
  /** Precio final del pack, ya rebajado, en céntimos de euro. */
  precioCentimos: number;
}

/** Los 28 productos visibles del catálogo. */
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
  "manopla-led-intermex-beauty": { precioCentimos: 22400, nombre: "Manopla LED Intermex Beauty - Fototerapia LED" },
  "mascara-led-intermex-beauty": { precioCentimos: 29900, nombre: "Máscara LED Intermex Beauty - Fototerapia LED Facial" },
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
    precioCentimos: 16500,
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
    precioCentimos: 34900,
  },
  {
    handle: "pack-ritual-premium",
    nombre: "Pack Ritual Premium",
    componentes: [
      { handle: "multiclean", cantidad: 1 },
      { handle: "calm-skin", cantidad: 1 },
      { handle: "cellu-body", cantidad: 1 },
    ],
    precioCentimos: 26500,
  },
];

/**
 * Espejo del desglose del servidor (functions/api/create-checkout.ts
 * `desglosaCarrito`): extrae packs de forma avariciosa y cobra el resto a
 * precio base. MISMO ALGORITMO — si cambias uno, cambia el otro.
 *
 * Sirve para que el carrito muestre el importe que de verdad se va a cobrar
 * en Stripe (paridad carrito-cobro), incluso cuando el carrito contiene un
 * pack junto a otros productos o cantidades extra.
 */

/** Línea de carrito a desglosar. */
export interface LineaCarrito {
  handle: string;
  cantidad: number;
}

/** Línea ya desglosada, con su importe unitario final en céntimos. */
export interface LineaDesglosada {
  handle: string;
  cantidad: number;
  importeUnitarioCentimos: number;
}

/** Reparto proporcional del precio del pack (última línea absorbe el redondeo). */
function repartePrecioPack(pack: Pack, handles: string[]): number[] {
  const totalBase = handles.reduce((s, h) => s + PRECIOS[h].precioCentimos, 0);
  let asignado = 0;
  return handles.map((h, i) => {
    if (i === handles.length - 1) {
      return pack.precioCentimos - asignado;
    }
    const importe = Math.floor(
      (pack.precioCentimos * PRECIOS[h].precioCentimos) / totalBase,
    );
    asignado += importe;
    return importe;
  });
}

/** Desglosa un carrito en las líneas que se cobrarán en Stripe. */
export function desglosaCarrito(
  lineas: LineaCarrito[],
): LineaDesglosada[] {
  const disponibles = new Map<string, number>(
    lineas.map((l) => [l.handle, l.cantidad]),
  );
  const finales: LineaDesglosada[] = [];

  let quedanPacks = true;
  while (quedanPacks) {
    quedanPacks = false;
    for (const pack of PACKS) {
      if (pack.componentes.every((c) => (disponibles.get(c.handle) ?? 0) >= c.cantidad)) {
        const handles = pack.componentes.map((c) => c.handle);
        const importes = repartePrecioPack(pack, handles);
        handles.forEach((h, i) => {
          finales.push({
            handle: h,
            cantidad: 1,
            importeUnitarioCentimos: importes[i],
          });
          disponibles.set(h, disponibles.get(h)! - 1);
        });
        quedanPacks = true;
      }
    }
  }

  for (const linea of lineas) {
    const restante = disponibles.get(linea.handle) ?? 0;
    if (restante > 0) {
      finales.push({
        handle: linea.handle,
        cantidad: restante,
        importeUnitarioCentimos: PRECIOS[linea.handle].precioCentimos,
      });
    }
  }

  return finales;
}

/** Importe total (en céntimos) que se cobrará en Stripe por este carrito, sin envío. */
export function totalCobro(lineas: LineaCarrito[]): number {
  return desglosaCarrito(lineas).reduce(
    (s, l) => s + l.importeUnitarioCentimos * l.cantidad,
    0,
  );
}
