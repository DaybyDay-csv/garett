import { useEffect, useRef, useState } from "react";

export const TrustpilotWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for Trustpilot script to load
    const loadWidget = () => {
      if (window.Trustpilot && ref.current) {
        console.log("Loading Trustpilot widget...");
        window.Trustpilot.loadFromElement(ref.current, true);
        setIsLoading(false);
      } else {
        // Retry after a short delay if script not loaded yet
        setTimeout(loadWidget, 100);
      }
    };

    // Start loading after a small delay to ensure script is loaded
    const timeoutId = setTimeout(loadWidget, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Miles de clientes satisfechos confían en Garett
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando reseñas...</p>
          </div>
        )}
        
        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale="es-ES"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="691312abf046acf4291c3e32"
          data-style-height="140px"
          data-style-width="100%"
          data-theme="light"
          data-stars="1,2,3,4,5"
          data-review-languages="es"
        >
          <a
            href="https://es.trustpilot.com/review/garett.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, forceReload: boolean) => void;
    };
  }
}
