import { BRAND } from "@/lib/brand";

interface BrandWordmarkProps {
  /** Clases Tailwind para tamaño y color (hereda text-current por defecto). */
  className?: string;
}

/**
 * Wordmark tipográfico de la marca (sustituye a los logotipos PNG).
 * Se tiñe con `currentColor`, así que hereda el color del contenedor
 * (foreground en el header, blanco en el footer).
 */
export const BrandWordmark = ({ className = "" }: BrandWordmarkProps) => (
  <span
    role="img"
    aria-label={BRAND.name}
    className={`inline-flex items-baseline whitespace-nowrap select-none leading-none ${className}`}
  >
    <span className="font-extrabold tracking-[0.14em] uppercase">Intermex</span>
    <span className="ml-1.5 font-light tracking-[0.14em] uppercase opacity-80">Beauty</span>
  </span>
);
