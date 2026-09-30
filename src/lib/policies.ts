/**
 * POLÍTICAS DE TIENDA — ÚNICA FUENTE DE VERDAD.
 *
 * Devolución, garantía, envío, contacto y cupón de primer pedido se leen de
 * aquí. Cambiar aquí, no en cada fichero: home, fichas, carrito, FAQ, legales
 * y checkout deben renderizar estos datos, nunca texto hardcodeado.
 *
 * Contexto: la auditoría de buyer personas (entregable
 * 2026-09-30-buyer-personas-experiencia-compra.md) encontró 3 versiones de la
 * política de devolución en el mismo recorrido (H2) y dos umbrales de envío
 * contradictorios (H4). Este módulo fija una sola versión de cada política.
 *
 * Módulo puro: sin imports, sin efectos. Seguro para usar en el cliente y en
 * Cloudflare Functions (copiar a functions/ si una Function lo necesita).
 */

/** Política de devolución (una sola, para todo el recorrido). */
export const DEVOLUCION = {
  /** Días de devolución admitidos con el producto precintado. */
  diasPrecintoIntacto: 30,
  /** Condición para devolver dentro del plazo. */
  condicion: "precinto intacto",
  /**
   * Excepción higiénico-sanitaria (art. 103.e RDL 1/2007): una vez
   * desprecintado el producto no admite devolución, salvo defecto verificado.
   */
  desprecintado: {
    admiteDevolucion: false,
    salvoDefectoVerificado: true,
    texto:
      "Por razones higiénico-sanitarias, los productos desprecintados no admiten devolución, salvo defecto verificado.",
  },
  /** Plazo mínimo legal de desistimiento (art. 102 RDL 1/2007). */
  desistimientoLegalDiasMinimo: 14,
  /** Texto corto para badges y avisos junto al botón de compra. */
  textoCorto: "Devolución 30 días con precinto intacto",
  /** Texto completo para FAQ, carrito y legales. */
  textoCompleto:
    "Tienes 30 días para devolver tu producto con el precinto intacto. Por razones higiénico-sanitarias, los productos desprecintados no admiten devolución, salvo defecto verificado. Además, dispones de un derecho legal de desistimiento mínimo de 14 días.",
} as const;

/** Garantías: la comercial y la legal, cada una con su nombre y cifra. */
export const GARANTIA = {
  comercial: {
    nombre: "Garantía comercial",
    anios: 2,
    texto: "2 años de garantía comercial Garett",
  },
  legal: {
    nombre: "Garantía legal",
    anios: 3,
    texto: "3 años de garantía legal (RD 7/2021)",
  },
} as const;

/** Política de envío. */
export const ENVIO = {
  /** Envío gratis en TODOS los pedidos, sin mínimo. Es lo que hoy cobra de verdad Stripe (la sesión de checkout no configura ningún gasto de envío). Si algún día se cobra por debajo de un umbral, decidirlo aquí y sincronizarlo con Stripe. */
  gratisTodosLosPedidos: true,
  /** Sin umbral: null significa que no hay mínimo de compra para el envío gratis. */
  umbralCentimos: null,
  /** Texto corto para badges. */
  textoCorto: "Envío gratis en todos los pedidos",
  /** Plazos de entrega por zona. */
  plazos: [
    { zona: "Península y Baleares", diasMin: 2, diasMax: 4 },
    { zona: "Canarias, Ceuta y Melilla", diasMin: 5, diasMax: 10 },
  ],
} as const;

/** Datos de contacto de la tienda. */
export const CONTACTO = {
  telefono: "+34 679 23 51 48",
  /** Para enlaces tel:. */
  telefonoHref: "tel:+34679235148",
  email: "info@intermexbeauty.es",
  horario: "L-V 9-18h",
  /** Línea lista para poner junto al botón de compra. */
  textoJuntoAlCta: "¿Dudas? Llámanos: 679 23 51 48 (L-V 9-18h)",
} as const;

/** Cupón de bienvenida para el primer pedido. */
export const CUPON_PRIMER_PEDIDO = {
  /** Código que se entrega al suscribirse y se canjea en el checkout. */
  codigo: "PRIMERA13",
  /** Descuento, en porcentaje. */
  porcentaje: 13,
  /** Texto para el footer y los emails de bienvenida. */
  texto: "13% de descuento en tu primer pedido",
} as const;
