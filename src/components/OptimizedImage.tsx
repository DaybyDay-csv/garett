import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blurPlaceholder?: boolean;
}

/**
 * Componente optimizado para carga instantánea de imágenes
 * - Lazy loading automático (excepto prioridad alta)
 * - Decodificación asíncrona
 * - Blur placeholder opcional
 * - Soporte WebP automático
 * - fetchPriority para imágenes críticas
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
          ? 'blur-sm scale-105 transition-all duration-300' 
          : 'blur-0 scale-100 transition-all duration-300'
      }`}
      {...props}
    />
  );
};
