import { Star, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import garettPattern from "@/assets/garett-pattern-2.png";
const testimonials = [{
  name: "María L.",
  age: 51,
  location: "Madrid",
  rating: 5,
  timeline: "10 semanas",
  verified: true,
  image: "ML",
  review: "Al principio era escéptica, pero después de 10 semanas el óvalo facial está mucho más definido. Lo uso mientras veo la tele, 15 minutos 4 veces por semana. Mis amigas me preguntan si he ido al dermatólogo.",
  result: "Óvalo facial más firme"
}, {
  name: "Ana R.",
  age: 48,
  location: "Barcelona",
  rating: 5,
  timeline: "8 semanas",
  verified: true,
  image: "AR",
  review: "Trabajo muchas horas y no tengo tiempo para tratamientos en clínica. Este dispositivo me ha cambiado la vida. En 2 meses, las líneas de expresión están mucho menos marcadas. La inversión ha valido totalmente la pena.",
  result: "Líneas de expresión reducidas"
}, {
  name: "Carmen S.",
  age: 53,
  location: "Valencia",
  rating: 5,
  timeline: "12 semanas",
  verified: true,
  image: "CS",
  review: "Tenía dudas porque hay muchos aparatos que no funcionan. Pero la garantía de 3 años y el respaldo de El Corte Inglés me dieron confianza. Tras 3 meses, noto mi piel más firme y luminosa. No necesito tanto maquillaje.",
  result: "Piel más firme y luminosa"
}, {
  name: "Isabel M.",
  age: 55,
  location: "Sevilla",
  rating: 5,
  timeline: "6 semanas",
  verified: true,
  image: "IM",
  review: "Solo llevo 6 semanas y ya noto cambios. La textura de la piel ha mejorado muchísimo. Es superfácil de usar, no requiere técnica especial. Por fin una solución que se adapta a mi ritmo de vida.",
  result: "Textura mejorada visiblemente"
}];
export const Testimonials = () => {
  return <section className="py-16 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: `url(${garettPattern})`,
      backgroundSize: '150px',
      backgroundRepeat: 'repeat'
    }} />
      
      <div className="container relative">
        <div className="text-center mb-12">
          <Badge className="mb-4">Opiniones verificadas</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados reales de clientas como tú
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mujeres que buscaban una solución profesional sin salir de casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="pt-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{testimonial.name}</p>
                        {testimonial.verified && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </div>
                      <p className="text-xs text-muted-foreground">27 años • Sevilla{testimonial.age} años • {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Badge */}
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {testimonial.timeline}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>

                {/* Review */}
                <p className="text-sm text-foreground mb-4 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Result Highlight */}
                <div className="bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
                  <p className="text-xs font-medium text-primary">
                    Resultado: {testimonial.result}
                  </p>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Trust Footer */}
        <div className="bg-muted/30 rounded-lg p-6 border border-border/50 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-semibold">Todas las opiniones son de compras verificadas</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Los resultados individuales pueden variar. Uso constante recomendado: 15 min/día, 3-5 veces por semana.
          </p>
        </div>
      </div>
    </section>;
};