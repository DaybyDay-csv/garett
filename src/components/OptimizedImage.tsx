import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Componente optimizado para carga de imágenes
 * - Lazy loading automático
 * - Decodificación asíncrona
 * - Soporte para WebP cuando esté disponible
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  loading = "lazy",
  decoding = "async",
  ...props 
}: OptimizedImageProps) => {
  // Extraer el nombre del archivo sin extensión
  const srcWithoutExt = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const webpSrc = `${srcWithoutExt}.webp`;
  
  return (
    <picture>
      {/* Intentar cargar WebP primero si existe */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback a la imagen original */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={className}
        {...props}
      />
    </picture>
  );
};
