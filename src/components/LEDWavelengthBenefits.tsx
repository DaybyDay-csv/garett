import { Sparkles, Sun, Zap, AlertTriangle, Clock, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LEDWavelengthBenefitsProps {
  productHandle?: string;
}

const wavelengths = [
  {
    name: "Luz Verde (Calm)",
    wavelength: "520nm",
    color: "bg-green-500",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    icon: Sparkles,
    penetration: "3-5mm",
    benefits: [
      "Calma y reduce rojeces",
      "Efecto calmante y anti-estrés",
      "Regula producción de melanina",
      "Unifica el tono de piel"
    ],
    bestFor: "Calmar y reducir irritación"
  },
  {
    name: "Luz Amarilla (Luminosidad)",
    wavelength: "590nm",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
    icon: Sun,
    penetration: "4-6mm",
    benefits: [
      "Aporta luminosidad y vitalidad",
      "Mejora la oxigenación celular",
      "Reduce aspecto apagado",
      "Revitaliza pieles cansadas"
    ],
    bestFor: "Luminosidad y vitalidad"
  },
  {
    name: "Luz Roja (Rejuvenecimiento)",
    wavelength: "630nm",
    color: "bg-red-500",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    icon: Zap,
    penetration: "8-10mm",
    benefits: [
      "Estimula producción de colágeno",
      "Reduce arrugas y líneas finas",
      "Acelera regeneración celular",
      "Mejora textura de la piel"
    ],
    bestFor: "Anti-edad y rejuvenecimiento"
  },
  {
    name: "Luz Roja (Firmeza)",
    wavelength: "660nm",
    color: "bg-rose-600",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    bgColor: "bg-rose-50",
    icon: Zap,
    penetration: "10-12mm",
    benefits: [
      "Penetra tejidos más profundos",
      "Mejora firmeza y elasticidad",
      "Reafirma contornos faciales",
      "Efecto lifting natural"
    ],
    bestFor: "Firmeza y elasticidad profunda"
  }
];

const treatmentRoutines = [
  {
    title: "Rutina Calmante",
    frequency: "3-4 veces/semana",
    duration: "10-15 minutos",
    lights: ["Luz Verde (Calm)"],
    description: "Luz verde para calmar rojeces e irritación. Ideal después de tratamientos intensos."
  },
  {
    title: "Rutina Luminosidad",
    frequency: "3-4 veces/semana",
    duration: "10-15 minutos",
    lights: ["Luz Amarilla (Luminosidad)"],
    description: "Devuelve vitalidad y brillo a pieles apagadas y cansadas."
  },
  {
    title: "Rutina Anti-Edad",
    frequency: "4-5 veces/semana",
    duration: "15 minutos",
    lights: ["Luz Roja (Rejuvenecimiento)"],
    description: "Estimula colágeno para reducir arrugas y líneas finas."
  },
  {
    title: "Rutina Firmeza",
    frequency: "4-5 veces/semana",
    duration: "15 minutos",
    lights: ["Luz Roja (Firmeza)"],
    description: "Penetración profunda para reafirmar y definir contornos."
  }
];

const contraindications = [
  "Embarazo o lactancia",
  "Epilepsia o sensibilidad a la luz",
  "Uso de medicamentos fotosensibilizantes",
  "Heridas abiertas o infecciones activas",
  "Cáncer de piel o lesiones sospechosas",
  "Uso reciente de retinoides fuertes (esperar 2 semanas)"
];

const safetyTips = [
  "Usar las gafas protectoras incluidas",
  "No mirar directamente a los LEDs",
  "Mantener los ojos cerrados durante el tratamiento",
  "Empezar con sesiones cortas e ir aumentando",
  "Consultar con tu médico si tienes dudas"
];

export const LEDWavelengthBenefits = ({ productHandle }: LEDWavelengthBenefitsProps) => {
  return (
    <div className="space-y-12 py-8">
      {/* Wavelength Benefits Section */}
      <section>
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 border-header-foreground/30 text-header-foreground">Tecnología LED Avanzada</Badge>
          <h2 className="text-2xl md:text-3xl font-thin tracking-tight text-header-foreground mb-3">
            Beneficios de cada longitud de onda
          </h2>
          <p className="text-header-foreground/70 max-w-2xl mx-auto">
            Cada color de luz penetra a diferente profundidad y activa procesos específicos de regeneración celular
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wavelengths.map((wavelength) => {
            const IconComponent = wavelength.icon;
            return (
              <Card key={wavelength.name} className={`${wavelength.borderColor} border-2 overflow-hidden bg-header-foreground/5`}>
                <div className={`${wavelength.color} h-2`} />
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${wavelength.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${wavelength.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${wavelength.textColor}`}>{wavelength.name}</h3>
                      <p className="text-xs text-header-foreground/60">{wavelength.wavelength}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs font-medium text-header-foreground/60">Penetración:</span>
                    <span className="ml-2 text-sm font-semibold text-header-foreground">{wavelength.penetration}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {wavelength.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${wavelength.textColor}`} />
                        <span className="text-header-foreground/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`${wavelength.bgColor} rounded-lg p-3`}>
                    <p className="text-xs font-medium text-gray-600">Ideal para:</p>
                    <p className={`text-sm font-semibold ${wavelength.textColor}`}>{wavelength.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Treatment Routines Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-thin tracking-tight text-header-foreground mb-3">
            Rutinas de tratamiento recomendadas
          </h2>
          <p className="text-header-foreground/70 max-w-2xl mx-auto">
            Programas diseñados para diferentes objetivos de belleza
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {treatmentRoutines.map((routine, idx) => (
            <Card key={idx} className="bg-header-foreground/10 border-header-foreground/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3 text-header-foreground">{routine.title}</h3>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-header-foreground/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-header-foreground" />
                    <span>{routine.duration}</span>
                  </div>
                  <span>•</span>
                  <span>{routine.frequency}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {routine.lights.map((light) => {
                    const lightData = wavelengths.find(w => w.name === light);
                    return (
                      <Badge 
                        key={light} 
                        variant="outline" 
                        className={`${lightData?.borderColor} ${lightData?.textColor}`}
                      >
                        {light}
                      </Badge>
                    );
                  })}
                </div>

                <p className="text-sm text-header-foreground/70">{routine.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Safety & Contraindications Section */}
      <section className="bg-header-foreground/10 rounded-2xl p-6 md:p-8 border border-header-foreground/20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contraindications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-lg text-header-foreground">Contraindicaciones</h3>
            </div>
            <p className="text-sm text-header-foreground/70 mb-4">
              No uses este dispositivo si tienes alguna de estas condiciones:
            </p>
            <ul className="space-y-2">
              {contraindications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <span className="text-header-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-lg text-header-foreground">Consejos de seguridad</h3>
            </div>
            <p className="text-sm text-header-foreground/70 mb-4">
              Para un uso seguro y efectivo:
            </p>
            <ul className="space-y-2">
              {safetyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className="text-header-foreground/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
