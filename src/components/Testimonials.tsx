import { Star, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import garettPattern from "@/assets/garett-pattern-2.png";
const testimonials = [
  {
    name: "Sofía R.",
    age: 29,
    location: "Madrid",
    rating: 5,
    timeline: "6 semanas",
    verified: true,
    image: "SR",
    review:
      "Como creadora de contenido necesito verme bien siempre, pero las citas en clínica no encajan con mi agenda. Uso mi Garett antes de grabar y la diferencia en mi piel es increíble. Lo mejor es que lo hago mientras respondo emails.",
    result: "Piel radiante para cámara",
  },
  {
    name: "Ana R.",
    age: 48,
    location: "Barcelona",
    rating: 5,
    timeline: "8 semanas",
    verified: true,
    image: "AR",
    review:
      "Trabajo muchas horas y no tengo tiempo para tratamientos en clínica. Este dispositivo me ha cambiado la vida. En 2 meses, las líneas de expresión están mucho menos marcadas. La inversión ha valido totalmente la pena.",
    result: "Líneas de expresión reducidas",
  },
  {
    name: "Laura M.",
    age: 32,
    location: "Valencia",
    rating: 5,
    timeline: "7 semanas",
    verified: true,
    image: "LM",
    review:
      "Entre el trabajo y el gimnasio apenas tengo tiempo. Quería prevenir sin gastar fortunas en tratamientos mensuales. En menos de 2 meses ya veo mi piel más luminosa y uniforme. Lo uso mientras veo Netflix, súper práctico.",
    result: "Prevención antiedad efectiva",
  },
  {
    name: "Isabel M.",
    age: 55,
    location: "Sevilla",
    rating: 5,
    timeline: "6 semanas",
    verified: true,
    image: "IM",
    review:
      "Solo llevo 6 semanas y ya noto cambios. La textura de la piel ha mejorado muchísimo. Es superfácil de usar, no requiere técnica especial. Por fin una solución que se adapta a mi ritmo de vida.",
    result: "Textura mejorada visiblemente",
  },
  {
    name: "Carmen L.",
    age: 42,
    location: "Málaga",
    rating: 5,
    timeline: "5 semanas",
    verified: true,
    image: "CL",
    review:
      "Después de mi segundo hijo, mi piel perdió firmeza. Probé cremas caras sin resultados. Con Garett noto la piel más firme y los poros menos visibles. Mi marido dice que luzco más descansada.",
    result: "Firmeza recuperada",
  },
  {
    name: "Patricia G.",
    age: 35,
    location: "Bilbao",
    rating: 4,
    timeline: "4 semanas",
    verified: true,
    image: "PG",
    review:
      "Llevo un mes usándolo y aunque todavía no veo cambios dramáticos, mi piel se siente mejor hidratada y más suave. Es cómodo de usar mientras trabajo desde casa. Espero ver más resultados pronto.",
    result: "Mejora progresiva",
  },
  {
    name: "Elena S.",
    age: 51,
    location: "Zaragoza",
    rating: 5,
    timeline: "10 semanas",
    verified: true,
    image: "ES",
    review:
      "Llevo más de 2 meses y los resultados superan mis expectativas. Las manchas solares han aclarado notablemente. Mis amigas me preguntan qué me he hecho. Vale cada euro invertido.",
    result: "Manchas reducidas visiblemente",
  },
  {
    name: "Marta F.",
    age: 27,
    location: "Granada",
    rating: 5,
    timeline: "5 semanas",
    verified: true,
    image: "MF",
    review:
      "Trabajo en una tienda y paso muchas horas de pie. Este dispositivo lo uso por las noches mientras descanso. Mi piel luce más despierta y fresca. El mejor regalo que me he hecho.",
    result: "Piel más luminosa",
  },
  {
    name: "Rosa P.",
    age: 60,
    location: "Murcia",
    rating: 5,
    timeline: "9 semanas",
    verified: true,
    image: "RP",
    review:
      "A mi edad ya no esperaba grandes cambios, pero este aparato me ha sorprendido. Las arrugas profundas no se han ido, pero sí se notan más suaves. Mi piel está más hidratada y tersa.",
    result: "Arrugas suavizadas",
  },
  {
    name: "Beatriz N.",
    age: 38,
    location: "Alicante",
    rating: 4,
    timeline: "6 semanas",
    verified: true,
    image: "BN",
    review:
      "Buenos resultados hasta ahora. La textura de mi piel ha mejorado y las líneas alrededor de los ojos son menos notorias. Uso constante es clave. Me hubiera gustado que viniera con más accesorios.",
    result: "Contorno de ojos mejorado",
  },
  {
    name: "Lucía V.",
    age: 44,
    location: "Santander",
    rating: 5,
    timeline: "7 semanas",
    verified: true,
    image: "LV",
    review:
      "Soy enfermera y los turnos me dejan agotada. Usar mi Garett es mi momento de autocuidado. En casi 2 meses, mi piel se ve más joven y revitalizada. Totalmente recomendable.",
    result: "Piel revitalizada",
  },
  {
    name: "Cristina M.",
    age: 31,
    location: "Pamplona",
    rating: 5,
    timeline: "5 semanas",
    verified: true,
    image: "CM",
    review:
      "Quería algo efectivo para prevenir el envejecimiento sin gastar en clínicas. Este dispositivo cumple perfectamente. Mi piel se siente más elástica y el tono es más uniforme. Muy satisfecha.",
    result: "Tono uniforme conseguido",
  },
];
export const Testimonials = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url(${garettPattern})`,
          backgroundSize: "150px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        {/* Trustpilot-style Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6">
            Miles de clientes satisfechos confían en Garett
          </p>

          {/* Trustpilot Rating Summary */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 md:w-8 md:h-8 fill-[#00b67a] text-[#00b67a]" />
                ))}
              </div>
              <span className="text-2xl md:text-3xl font-bold">5.0</span>
            </div>
            <p className="text-sm text-muted-foreground">Basado en opiniones verificadas</p>
          </div>

          {/* Trustpilot Button */}
          <a
            href="https://es.trustpilot.com/review/garett.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00b67a] hover:bg-[#00a870] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Deja tu reseña en Trustpilot
            <Star className="w-5 h-5 fill-white" />
          </a>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full mb-8"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 h-full">
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
                          <p className="text-xs text-muted-foreground">
                            {testimonial.age} años • {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Timeline Badge */}
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {testimonial.timeline}
                      </Badge>
                    </div>

                    {/* Rating - Trustpilot Green */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-sm text-foreground mb-4 leading-relaxed">"{testimonial.review}"</p>

                    {/* Result Highlight */}
                    <div className="bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
                      <p className="text-xs font-medium text-primary">Resultado: {testimonial.result}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

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
    </section>
  );
};
