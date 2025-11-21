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
 * - Renderizado eficiente
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
  return (
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
  );
};
