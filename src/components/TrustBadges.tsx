import { Shield, Award, Globe } from "lucide-react";
import elCorteInglesLogo from "@/assets/el-corte-ingles-logo.png";
export const TrustBadges = () => {
  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-6 md:py-12">
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Garantía 24 meses</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Contra defectos de fabricación
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Award className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Científicamente Testado</h3>
        <p className="text-xs md:text-sm text-muted-foreground">Todos nuestros productos son científicamente testados . </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <img 
          src={elCorteInglesLogo} 
          alt="El Corte Inglés" 
          className="w-20 h-10 md:w-24 md:h-12 object-contain mb-3 md:mb-4" 
        />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">En El Corte Inglés</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Disponibles en las principales tiendas de España
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg border bg-card">
        <Globe className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4" />
        <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Tecnología Polaca</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Innovación europea de alta calidad recién llegada a España
        </p>
      </div>
    </div>;
};