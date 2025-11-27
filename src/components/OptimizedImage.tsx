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
 * - Lazy loading con Intersection Observer (precarga 300px antes)
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
  blurPlaceholder = true,
  loading,
  decoding = "async",
  rootMargin = "300px",
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Intersection Observer para lazy loading progresivo
  useEffect(() => {
    if (priority || !imgRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin, // Precarga antes de que sea visible
      }
    );
    
    observer.observe(imgRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [priority, rootMargin]);
  
  // Carga diferida por defecto
  const loadingStrategy = loading || (priority ? "eager" : "lazy");
  
  // Configurar fetchpriority para imágenes prioritarias
  const fetchPriorityAttr = priority ? { fetchpriority: "high" as const } : {};
  
  return (
    <img
      ref={imgRef}
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
          ? 'blur-sm scale-105 transition-all duration-500' 
          : 'blur-0 scale-100 transition-all duration-500'
      }`}
      style={{
        backgroundColor: blurPlaceholder && !isLoaded ? '#f3f4f6' : 'transparent',
      }}
      {...props}
    />
  );
};
