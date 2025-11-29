import { Shield, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import elCorteInglesLogo from "@/assets/el-corte-ingles-logo.png";

export const TrustBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
            Cuidar tu piel sin miedo sí es posible
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nuestros dispositivos combinan tecnología utilizada en cabina (RF, EMS, luz pulsada) con protocolos seguros para usar en casa. Sin agujas, sin dolor y con resultados medibles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                Tecnología clínica adaptada al hogar
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                La misma base que usan las clínicas profesionales, con protocolos seguros para uso doméstico
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                Probado por miles de mujeres en España
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Opiniones verificadas en Trustpilot de clientes reales con resultados medibles
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={elCorteInglesLogo} alt="El Corte Inglés" className="w-12 h-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                Disponible en El Corte Inglés
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Con la confianza del retail líder, garantía extendida y soporte desde España
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
