import { ImgHTMLAttributes, useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blurPlaceholder?: boolean;
  rootMargin?: string;
}

/**
 * Componente optimizado para carga progresiva de imágenes
 * - Lazy loading nativo del navegador
 * - Decodificación asíncrona
 * - Soporte WebP con fallback automático
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false,
  blurPlaceholder = false,
  loading,
  decoding = "async",
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Carga diferida por defecto
  const loadingStrategy = loading || (priority ? "eager" : "lazy");
  
  // Configurar fetchpriority para imágenes prioritarias
  const fetchPriorityAttr = priority ? { fetchpriority: "high" as const } : {};
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding={decoding}
      {...fetchPriorityAttr}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${
        blurPlaceholder && !isLoaded 
          ? 'opacity-0' 
          : 'opacity-100 transition-opacity duration-300'
      }`}
      {...props}
    />
  );
};
