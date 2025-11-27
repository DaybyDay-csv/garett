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
  
  // Determinar estrategia de carga
  const loadingStrategy = loading || (priority ? "eager" : "lazy");
  
  // Generar ruta WebP si la imagen es JPG/PNG
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture>
      {/* Intentar cargar WebP primero para mejor compresión */}
      <source srcSet={webpSrc} type="image/webp" />
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingStrategy}
        decoding={decoding}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${
          blurPlaceholder && !isLoaded 
            ? 'blur-sm scale-105 transition-all duration-300' 
            : 'blur-0 scale-100 transition-all duration-300'
        }`}
        {...props}
      />
    </picture>
  );
};
