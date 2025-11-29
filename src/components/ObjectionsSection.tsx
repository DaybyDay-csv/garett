import { Shield, Euro, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ObjectionsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
            Resolvemos tus dudas antes de empezar
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Las preguntas más comunes que nos hacen nuestras clientas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Objeción 1: Miedo */}
          <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                    ¿Te asusta probar algo nuevo?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Tranquila. Sin agujas, sin dolor. Dispositivos certificados CE clase IIa, con el respaldo de El Corte Inglés y garantía de 2 años. Te acompañamos en cada paso.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Objeción 2: Precio clínicas */}
          <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Euro className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                    No gastes 3.000€ en clínicas cada año
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                    Una sesión de mesoterapia profesional: 100-150€ × 10 sesiones = 1.500€. Con nuestros dispositivos, lo amortizas en semanas y lo usas años.
                  </p>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Ahorro: hasta 3.000€/año
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Objeción 3: Falta de tiempo */}
          <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                    ¿Sin tiempo para cuidarte?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Solo 10-15 minutos al día. Mientras ves tu serie favorita, lees o simplemente te relajas. Tu momento de autocuidado, cuando tú quieras.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Objeción 4: Urgencia colágeno */}
          <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
            <CardContent className="pt-6 pb-6 px-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                    Se pierde 1% de colágeno cada año
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    A partir de los 25 años, la piel pierde firmeza naturalmente. Cuanto antes empieces, más fácil es mantener los resultados. El efecto es acumulativo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
