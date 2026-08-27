import { ShopifyProduct, isGWPProduct } from "./shopify";

// Búsqueda por intención (estilo Google Ads / broad match).
// Cada grupo mapea palabras relevantes (y sus sinónimos) a los productos
// que dan solución a esa preocupación. Se combina con coincidencia exacta.
const INTENT_GROUPS: Array<{ keywords: string[]; handles: string[] }> = [
  {
    keywords: ['arrugas', 'arruga', 'antiarrugas', 'rejuvenecimiento', 'rejuvenecer', 'antiaging', 'anti-age', 'envejecimiento', 'flacidez', 'flacida', 'flacido', 'firmeza', 'firmar', 'firma', 'lifting', 'reafirmar', 'reafirmante', 'edad', 'papada', 'cuello', 'escote', 'ovalo'],
    handles: ['lift-skin', 'lift-skin-pro', 'pretty-face', 'beauty-lift', 'fresh-skin-pro', 'manopla-led-garett-beauty', 'mascara-led-garett-beauty'],
  },
  {
    keywords: ['ojos', 'ojeras', 'bolsas', 'contorno', 'mirada', 'parpados', 'párpados'],
    handles: ['fresh-eye'],
  },
  {
    keywords: ['manchas', 'pigmentacion', 'pigmentación', 'luminosidad', 'tono', 'brillo', 'iluminar', 'apagada'],
    handles: ['bright-skin', 'manopla-led-garett-beauty', 'mascara-led-garett-beauty'],
  },
  {
    keywords: ['celulitis', 'anticelulitico', 'anticelulítico', 'grasa', 'gluteos', 'glúteos', 'piernas', 'abdomen', 'corporal', 'cuerpo', 'radiofrecuencia', 'reafirmar cuerpo'],
    handles: ['cellu-body', 'cuerpo-perfecto', 'multi-care-brush'],
  },
  {
    keywords: ['depilacion', 'depilación', 'vello', 'depiladora', 'depilar', 'depiladora laser', 'luz pulsada', 'ipl', 'laser'],
    handles: ['ipl-flash-pro', 'ipl-flash-dorada', 'ipl-plateada', 'cool'],
  },
  {
    keywords: ['pelo', 'cabello', 'rizos', 'rizado', 'alisar', 'alisado', 'plancha', 'secador', 'styling', 'peinado', 'ionico', 'iónico', 'capilar', 'encrespamiento', 'frizz'],
    handles: ['curly', 'aeroglow', 'multi-care-brush'],
  },
  {
    keywords: ['limpieza', 'poros', 'acne', 'acné', 'puntos negros', 'exfoliar', 'exfoliacion', 'exfoliación', 'cepillo', 'cepillar', 'impurezas', 'grasa facial', 'limpiar'],
    handles: ['multiclean', 'breeze-scrub', 'refresh-scrub'],
  },
  {
    keywords: ['mesoterapia', 'serum', 'serums', 'sérums', 'suero', 'absorcion', 'absorción', 'electroporacion', 'electroporación', 'activos', 'penetrar'],
    handles: ['calm-skin', 'fresh-skin-pro', 'bright-skin', 'serum-skin'],
  },
  {
    keywords: ['rojeces', 'calmar', 'calmante', 'sensibilidad', 'sensible', 'irritacion', 'irritación', 'rojez', 'piel sensible'],
    handles: ['calm-skin'],
  },
  {
    keywords: ['led', 'fototerapia', 'mascara', 'máscara', 'manopla', 'luz roja', 'luz'],
    handles: ['manopla-led-garett-beauty', 'mascara-led-garett-beauty'],
  },
  {
    keywords: ['masajeador', 'masaje', 'masajear', 'estimulacion', 'estimulación', 'micorriente', 'ems'],
    handles: ['fresh-eye', 'lift-skin', 'lift-skin-pro', 'pretty-face', 'beauty-lift'],
  },
  {
    keywords: ['cuero cabelludo', 'cepillar pelo', 'masaje capilar', 'multi'],
    handles: ['multi-care-brush'],
  },
];

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'de', 'del', 'para', 'con', 'y', 'o', 'un',
  'una', 'mi', 'tu', 'su', 'que', 'por', 'en', 'al', 'es', 'lo', 'me', 'se',
]);

const tokenize = (query: string): string[] => {
  const normalized = normalize(query);
  return normalized
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
};

const intentMatch = (token: string, keyword: string): boolean =>
  token === keyword || token.includes(keyword) || keyword.includes(token);

export function searchProducts(
  query: string,
  products: ShopifyProduct[]
): ShopifyProduct[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return products.filter((p) => !isGWPProduct(p));

  const ranked = products
    .filter((p) => !isGWPProduct(p))
    .map((p) => {
      const title = normalize(p.node.title);
      const description = normalize(p.node.description);
      const tags = p.node.tags.map(normalize).join(' ');
      let score = 0;

      for (const token of tokens) {
        // Coincidencia exacta (más peso en el título)
        if (title.includes(token)) {
          score += 3;
        } else if (description.includes(token) || tags.includes(token)) {
          score += 1;
        }

        // Coincidencia por intención / sinónimos (semántica)
        for (const group of INTENT_GROUPS) {
          if (
            group.handles.includes(p.node.handle) &&
            group.keywords.some((kw) => intentMatch(token, normalize(kw)))
          ) {
            score += 3;
            break;
          }
        }
      }

      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.product);

  return ranked;
}
