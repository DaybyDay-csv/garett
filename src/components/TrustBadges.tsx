import { Shield, Award, Store } from "lucide-react";

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
      <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
        <Shield className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-semibold text-lg mb-2">Garantía 3 años</h3>
        <p className="text-sm text-muted-foreground">
          Cobertura completa en todos nuestros dispositivos
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
        <Award className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-semibold text-lg mb-2">Certificación CE</h3>
        <p className="text-sm text-muted-foreground">
          Cumplimos con todas las normativas europeas
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
        <Store className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-semibold text-lg mb-2">En El Corte Inglés</h3>
        <p className="text-sm text-muted-foreground">
          Disponibles en las principales tiendas de España
        </p>
      </div>
    </div>
  );
};
