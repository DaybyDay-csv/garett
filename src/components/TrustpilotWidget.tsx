import { useEffect, useRef, useState } from "react";

export const TrustpilotWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    const checkScript = () => {
      if (window.Trustpilot) {
        setScriptLoaded(true);
        console.log("Trustpilot script detected");
        
        if (ref.current) {
          console.log("Initializing Trustpilot widget");
          try {
            window.Trustpilot.loadFromElement(ref.current, true);
          } catch (error) {
            console.error("Error loading Trustpilot:", error);
          }
        }
      } else {
        console.log("Trustpilot script not yet loaded, retrying...");
        setTimeout(checkScript, 200);
      }
    };

    const timeoutId = setTimeout(checkScript, 1000);
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

        {!scriptLoaded && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando reseñas de Trustpilot...</p>
          </div>
        )}
        
        <div
          ref={ref}
          className="trustpilot-widget min-h-[120px] flex justify-center"
          data-locale="es-ES"
          data-template-id="5419b6a8b0d04a076446a9ad"
          data-businessunit-id="691312abf046acf4291c3e32"
          data-style-height="150px"
          data-style-width="100%"
          data-theme="light"
          data-schema-type="Organization"
        >
          <a
            href="https://es.trustpilot.com/review/garett.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-lg"
          >
            Ver reseñas en Trustpilot
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
