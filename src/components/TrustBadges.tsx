import { Shield, Truck, RotateCcw } from "lucide-react";
import elCorteInglesLogo from "@/assets/el-corte-ingles-logo.png";
interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'cart';
}
export const TrustBadges = ({
  variant = 'default'
}: TrustBadgesProps) => {
  const isCompact = variant === 'compact';
  const isCart = variant === 'cart';
  
  return <div className={`grid grid-cols-2 gap-2 ${isCart ? 'py-0' : isCompact ? 'py-2' : 'py-6 md:py-12'} ${!isCart && 'lg:grid-cols-4 gap-3 md:gap-4'}`}>
      <div className={`flex flex-col items-center text-center rounded-lg border bg-card ${isCart ? 'p-2' : isCompact ? 'p-3' : 'p-5 md:p-6'}`}>
        <Shield className={`text-primary mb-1 ${isCart ? 'w-5 h-5' : isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold leading-tight ${isCart ? 'text-[11px] mb-0.5' : isCompact ? 'text-sm md:text-sm mb-1' : 'text-sm md:text-lg mb-1'}`}>
          Garantía 2 años
        </h3>
        <p className={`text-muted-foreground leading-tight ${isCart ? 'text-[9px]' : 'text-xs leading-relaxed'}`}>
          Contra defectos de fabricación
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center rounded-lg border bg-card ${isCart ? 'p-2' : isCompact ? 'p-3' : 'p-5 md:p-6'}`}>
        <Truck className={`text-primary mb-1 ${isCart ? 'w-5 h-5' : isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold leading-tight ${isCart ? 'text-[11px] mb-0.5' : isCompact ? 'text-sm md:text-sm mb-1' : 'text-sm md:text-lg mb-1'}`}>
          Envíos gratis durante 72H!
        </h3>
        <p className={`text-muted-foreground leading-tight ${isCart ? 'text-[9px]' : 'text-xs leading-relaxed'}`}>
          Entrega 24-48h en península
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center rounded-lg border bg-card ${isCart ? 'p-2' : isCompact ? 'p-3' : 'p-5 md:p-6'}`}>
        <RotateCcw className={`text-primary mb-1 ${isCart ? 'w-5 h-5' : isCompact ? 'w-7 h-7 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'}`} />
        <h3 className={`font-semibold leading-tight ${isCart ? 'text-[11px] mb-0.5' : isCompact ? 'text-sm md:text-sm mb-1' : 'text-sm md:text-lg mb-1'}`}>
          Devoluciones 30 días
        </h3>
        <p className={`text-muted-foreground leading-tight ${isCart ? 'text-[9px]' : 'text-xs leading-relaxed'}`}>
          Sin preguntas, sin complicaciones
        </p>
      </div>
      
      <div className={`flex flex-col items-center text-center rounded-lg border bg-card ${isCart ? 'p-2' : isCompact ? 'p-3' : 'p-5 md:p-6'}`}>
        <img src={elCorteInglesLogo} alt="El Corte Inglés" className={`object-contain mb-1 ${isCart ? 'w-12 h-5' : isCompact ? 'w-16 h-7 md:w-16 md:h-8' : 'w-20 h-10 md:w-24 md:h-12'}`} />
        <h3 className={`font-semibold leading-tight ${isCart ? 'text-[11px] mb-0.5' : isCompact ? 'text-sm md:text-sm mb-1' : 'text-sm md:text-lg mb-1'}`}>
          En El Corte Inglés
        </h3>
        <p className={`text-muted-foreground leading-tight ${isCart ? 'text-[9px]' : 'text-xs leading-relaxed'}`}>
          Con la confianza de El Corte Inglés       
        </p>
      </div>
    </div>;
};