import { Shield, Award, Store } from "lucide-react";

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-6 md:py-12">
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Garantía 3 años</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Cobertura completa en todos nuestros dispositivos
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Award className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Certificación CE</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Cumplimos con todas las normativas europeas
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Store className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">En El Corte Inglés</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Disponibles en las principales tiendas de España
        </p>
      </div>
    </div>
  );
};
