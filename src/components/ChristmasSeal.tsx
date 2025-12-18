import ventajasNavidadSeal from "@/assets/ventajas-navidad-seal.png";

interface ChristmasSealProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ChristmasSeal = ({ size = "md", className = "" }: ChristmasSealProps) => {
  const sizeClasses = {
    sm: "w-16 h-16 md:w-20 md:h-20",
    md: "w-20 h-20 md:w-28 md:h-28",
    lg: "w-28 h-28 md:w-36 md:h-36"
  };

  return (
    <img 
      src={ventajasNavidadSeal} 
      alt="Ventajas de Navidad - Ofertas especiales" 
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};
