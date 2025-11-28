import { Shield, Truck, RotateCcw } from "lucide-react";
import elCorteInglesLogo from "@/assets/el-corte-ingles-logo.png";
interface TrustBadgesProps {
  variant?: 'default' | 'compact';
}
export const TrustBadges = ({
  variant = 'default'
}: TrustBadgesProps) => {
  const isCompact = variant === 'compact';
  return <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 ${isCompact ? 'py-2' : 'py-6 md:py-12'}`}>
      <div className={`flex flex-col items-center text-center ${isCompact ? 'p-3' : 'p-5 md:p-6'} rounded-lg border bg-card`}>
        <Shield className={`text-primary mb-2 md:mb-2 ${isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold mb-1 leading-tight ${isCompact ? 'text-sm md:text-sm' : 'text-sm md:text-lg'}`}>Garantía 2 años</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Contra defectos de fabricación
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center ${isCompact ? 'p-3' : 'p-5 md:p-6'} rounded-lg border bg-card`}>
        <Truck className={`text-primary mb-2 md:mb-2 ${isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold mb-1 leading-tight ${isCompact ? 'text-sm md:text-sm' : 'text-sm md:text-lg'}`}>Envíos gratis durante 72H!</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Entrega 24-48h en península
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center ${isCompact ? 'p-3' : 'p-5 md:p-6'} rounded-lg border bg-card`}>
        <RotateCcw className={`text-primary mb-2 md:mb-2 ${isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold mb-1 leading-tight ${isCompact ? 'text-sm md:text-sm' : 'text-sm md:text-lg'}`}>Devoluciones 30 días</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sin preguntas, sin complicaciones
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center ${isCompact ? 'p-3' : 'p-5 md:p-6'} rounded-lg border bg-card`}>
        <img src={elCorteInglesLogo} alt="El Corte Inglés" className={`object-contain mb-2 md:mb-2 ${isCompact ? 'w-16 h-7 md:w-16 md:h-8' : 'w-20 h-10 md:w-24 md:h-12'}`} />
        <h3 className={`font-semibold mb-1 leading-tight ${isCompact ? 'text-sm md:text-sm' : 'text-sm md:text-lg'}`}>En El Corte Inglés</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Con la confianza de El Corte Inglés       
        </p>
      </div>
    </div>;
};