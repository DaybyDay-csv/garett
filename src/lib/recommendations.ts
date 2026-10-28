// Matriz de conveniencia — recomendaciones por handle de producto.
// Lógica basada en reglas (no ML). El orden es: primary → secondary → fallback.
// Cada "reason" es un texto corto que justifica la sugerencia y se muestra en la PDP.

export interface RecommendationRule {
  primary: string[];
  secondary: string[];
  reason: string;
}

export const RECOMMENDATION_MATRIX: Record<string, RecommendationRule> = {
  // ===== Limpieza facial =====
  "multiclean": {
    primary: ["breeze-scrub", "fresh-skin-pro", "manopla-led-intermex-beauty"],
    secondary: ["lift-skin-pro", "aeroglow", "pretty-face"],
    reason: "Tu paso 1 limpia, ahora aplica el tratamiento",
  },
  "breeze-scrub": {
    primary: ["fresh-skin-pro", "manopla-led-intermex-beauty", "cellu-body"],
    secondary: ["aeroglow", "lift-skin-pro", "serum-skin"],
    reason: "Después de exfoliar, tu piel absorbe mejor los activos",
  },
  "refresh-scrub": {
    primary: ["fresh-skin-pro", "multiclean"],
    secondary: ["manopla-led-intermex-beauty", "lift-skin-pro", "serum-skin"],
    reason: "Prepara la piel antes del tratamiento",
  },

  // ===== Masajeadores faciales =====
  "fresh-eye": {
    primary: ["pretty-face", "manopla-led-intermex-beauty", "lift-skin-pro"],
    secondary: ["multiclean", "serum-skin", "calm-skin"],
    reason: "Completa el cuidado del contorno, suma firmeza",
  },
  "lift-skin": {
    primary: ["lift-skin-pro", "manopla-led-intermex-beauty", "serum-skin"],
    secondary: ["pretty-face", "fresh-eye", "multiclean"],
    reason: "Sube a Pro: más LED, calor y EMS",
  },
  "lift-skin-pro": {
    primary: ["manopla-led-intermex-beauty", "pretty-face", "serum-skin"],
    secondary: ["fresh-eye", "aeroglow", "mascara-led-intermex-beauty"],
    reason: "Maximiza resultados con LED therapy",
  },
  "pretty-face": {
    primary: ["lift-skin-pro", "manopla-led-intermex-beauty", "fresh-eye"],
    secondary: ["multiclean", "serum-skin", "mascara-led-intermex-beauty"],
    reason: "Completa el triángulo facial: EMS + LED",
  },
  "beauty-lift": {
    primary: ["lift-skin-pro", "manopla-led-intermex-beauty", "pretty-face"],
    secondary: ["fresh-eye", "multiclean", "serum-skin"],
    reason: "Misma familia con mejor tecnología",
  },

  // ===== Mesoterapia =====
  "calm-skin": {
    primary: ["fresh-skin-pro", "bright-skin", "serum-skin"],
    secondary: ["manopla-led-intermex-beauty", "multiclean", "lift-skin-pro"],
    reason: "Compara la familia mesoterapia o sella con LED",
  },
  "fresh-skin-pro": {
    primary: ["calm-skin", "bright-skin", "manopla-led-intermex-beauty"],
    secondary: ["serum-skin", "multiclean", "lift-skin-pro"],
    reason: "Tu paso 2: combina mesoterapia con LED",
  },
  "bright-skin": {
    primary: ["fresh-skin-pro", "calm-skin", "manopla-led-intermex-beauty"],
    secondary: ["serum-skin", "multiclean", "lift-skin-pro"],
    reason: "Luminosidad + firmeza con LED",
  },
  "serum-skin": {
    primary: ["fresh-skin-pro", "manopla-led-intermex-beauty", "calm-skin"],
    secondary: ["multiclean", "breeze-scrub", "lift-skin-pro"],
    reason: "Tu sérum × la máquina",
  },

  // ===== Corporal =====
  "cellu-body": {
    primary: ["cuerpo-perfecto", "cool", "breeze-scrub"],
    secondary: ["multiclean", "ipl-flash-dorada", "multi-care-brush"],
    reason: "Cuerpo completo: añade IPL para finalizar",
  },
  "cuerpo-perfecto": {
    primary: ["cellu-body", "cool", "breeze-scrub"],
    secondary: ["multiclean", "ipl-flash-pro", "multi-care-brush"],
    reason: "Maximiza el área + depilación",
  },
  "multi-care-brush": {
    primary: ["lift-skin-pro", "multiclean", "aeroglow"],
    secondary: ["manopla-led-intermex-beauty", "fresh-skin-pro", "cellu-body"],
    reason: "Multifuncional 5-en-1, recomendado con EMS",
  },

  // ===== Capilar =====
  "curly": {
    primary: ["aeroglow", "multi-care-brush"],
    secondary: ["lift-skin-pro", "fresh-skin-pro", "manopla-led-intermex-beauty"],
    reason: "Rutina completa cabello",
  },
  "aeroglow": {
    primary: ["curly", "multi-care-brush"],
    secondary: ["fresh-skin-pro", "manopla-led-intermex-beauty", "lift-skin-pro"],
    reason: "Seca y alisa: completa con scalp massage",
  },

  // ===== IPL =====
  "ipl-flash-pro": {
    primary: ["ipl-flash-dorada", "ipl-plateada", "cellu-body"],
    secondary: ["cool", "multiclean", "multi-care-brush"],
    reason: "Compara la familia IPL o suma corporal",
  },
  "ipl-flash-dorada": {
    primary: ["ipl-flash-pro", "ipl-plateada", "cellu-body"],
    secondary: ["cool", "multiclean", "multi-care-brush"],
    reason: "Mismo acabado en otras potencias",
  },
  "ipl-plateada": {
    primary: ["ipl-flash-pro", "ipl-flash-dorada", "cellu-body"],
    secondary: ["cool", "multiclean", "multi-care-brush"],
    reason: "Sube o baja de gama IPL",
  },
  "cool": {
    primary: ["ipl-flash-pro", "ipl-flash-dorada", "cellu-body"],
    secondary: ["ipl-plateada", "multiclean", "multi-care-brush"],
    reason: "Mismo segmento, distintas sensaciones",
  },

  // ===== LED Therapy =====
  "manopla-led-intermex-beauty": {
    primary: ["mascara-led-intermex-beauty", "lift-skin-pro", "fresh-skin-pro"],
    secondary: ["calm-skin", "multiclean", "serum-skin"],
    reason: "LED terapia corporal + facial",
  },
  "mascara-led-intermex-beauty": {
    primary: ["manopla-led-intermex-beauty", "fresh-skin-pro", "pretty-face"],
    secondary: ["lift-skin-pro", "multiclean", "serum-skin"],
    reason: "LED + mesoterapia: cara completa",
  },

  // ===== Relojes Garett (liquidación: compara modelos de la marca) =====
  "reloj-garett-verona": {
    primary: ["reloj-garett-atom", "reloj-garett-v14", "reloj-garett-grs-pro"],
    secondary: ["reloj-garett-grc-maxx"],
    reason: "Compara los modelos Garett que quedan en liquidación",
  },
  "reloj-garett-atom": {
    primary: ["reloj-garett-grs-pro", "reloj-garett-verona", "reloj-garett-v14"],
    secondary: ["reloj-garett-grc-maxx"],
    reason: "Compara los modelos Garett que quedan en liquidación",
  },
  "reloj-garett-v14": {
    primary: ["reloj-garett-verona", "reloj-garett-grc-maxx", "reloj-garett-atom"],
    secondary: ["reloj-garett-grs-pro"],
    reason: "Compara los modelos Garett que quedan en liquidación",
  },
  "reloj-garett-grs-pro": {
    primary: ["reloj-garett-grc-maxx", "reloj-garett-atom", "reloj-garett-v14"],
    secondary: ["reloj-garett-verona"],
    reason: "Compara los modelos Garett que quedan en liquidación",
  },
  "reloj-garett-grc-maxx": {
    primary: ["reloj-garett-grs-pro", "reloj-garett-v14", "reloj-garett-atom"],
    secondary: ["reloj-garett-verona"],
    reason: "Compara los modelos Garett que quedan en liquidación",
  },
};

/**
 * Devuelve hasta `limit` productos recomendados para el handle dado.
 * Prioriza primary, luego secondary, deduplicando.
 * Si no hay regla definida, devuelve productos de la misma categoría o null.
 */
export function getRecommendations(
  handle: string,
  allProducts: Array<{ node: { id: string; handle: string } }>,
  limit: number = 6,
): { handles: string[]; reason: string | null } {
  const rule = RECOMMENDATION_MATRIX[handle];
  if (!rule) {
    return { handles: [], reason: null };
  }

  const all = [...rule.primary, ...rule.secondary];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const h of all) {
    if (seen.has(h)) continue;
    if (h === handle) continue;
    const exists = allProducts.some((p) => p.node.handle === h);
    if (!exists) continue;
    seen.add(h);
    result.push(h);
    if (result.length >= limit) break;
  }
  return { handles: result, reason: rule.reason };
}

export function getRoutineSuggestion(handle: string): string | null {
  return RECOMMENDATION_MATRIX[handle]?.reason ?? null;
}
