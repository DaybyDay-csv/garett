import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export const ResultsTimeline = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
            Resultados visibles en 4-8 semanas, sin agujas ni quirófano
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            La constancia es la clave. Aquí tienes qué esperar según el tipo de tratamiento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Firmeza / Lifting */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
            <CardContent className="pt-6 pb-6 px-6">
              <Badge className="mb-4 bg-primary text-primary-foreground">FIRMEZA</Badge>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                Efecto 'lifting' en 4 semanas
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Dispositivos de mesoterapia con RF + EMS + LED
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 2</p>
                    <p className="text-sm text-muted-foreground">Piel más luminosa e hidratada</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 4</p>
                    <p className="text-sm text-muted-foreground">Firmeza visible, contornos definidos</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 8</p>
                    <p className="text-sm text-muted-foreground">Líneas finas suavizadas, lifting natural</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* IPL */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
            <CardContent className="pt-6 pb-6 px-6">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">DEPILACIÓN</Badge>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                90% menos vello en 8 semanas
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tecnología IPL profesional en casa
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 4</p>
                    <p className="text-sm text-muted-foreground">Vello más fino y menos visible</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 8</p>
                    <p className="text-sm text-muted-foreground">Reducción notable, sesiones espaciadas</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 12</p>
                    <p className="text-sm text-muted-foreground">Hasta 90% menos vello, solo retoques</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Limpieza */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
            <CardContent className="pt-6 pb-6 px-6">
              <Badge className="mb-4 bg-accent text-accent-foreground">LIMPIEZA</Badge>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                Piel más luminosa y uniforme
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Limpieza sónica profunda + cuidado diario
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 1</p>
                    <p className="text-sm text-muted-foreground">Piel más suave al tacto</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semanas 2-4</p>
                    <p className="text-sm text-muted-foreground">Brotes reducidos, textura uniforme</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Semana 8</p>
                    <p className="text-sm text-muted-foreground">Poros menos visibles, piel radiante</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
