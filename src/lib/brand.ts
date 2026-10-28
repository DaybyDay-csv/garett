/**
 * BRAND — ÚNICA FUENTE DE IDENTIDAD DE LA TIENDA.
 *
 * Nombre comercial, entidad legal, dominio y email de contacto se leen de
 * aquí. Cambiar aquí, no en cada fichero: metas, JSON-LD, header/footer,
 * legales y checkout deben renderizar estos datos, nunca texto hardcodeado.
 *
 * Módulo puro: constantes sin efectos. Seguro para usar en el cliente y en
 * Cloudflare Functions (copiar a functions/ si una Function lo necesita).
 */

export const BRAND = {
  /** Nombre comercial de la tienda. */
  name: "Intermex Beauty",
  /** Entidad legal titular del sitio. Razón social pendiente de confirmar. */
  legalName: "INTERMEX BEAUTY — razón social pendiente de confirmar",
  /** Dominio oficial del sitio. */
  domain: "intermexbeauty.es",
  /** URL base absoluta del sitio. */
  url: "https://intermexbeauty.es",
  /** Email público de contacto. */
  email: "info@intermexbeauty.es",
} as const;
