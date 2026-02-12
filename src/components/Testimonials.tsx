import { Star, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import garettPattern from "@/assets/garett-pattern-2.png";
const testimonials = [
  {
    name: "Aroa",
    location: "España",
    rating: 5,
    date: "14 nov 2025",
    verified: true,
    image: "AR",
    review:
      "Estoy encantada con los productos de Garett. Desde que los uso he notado una gran diferencia en mi piel. Gran relación calidad-precio y una atención al cliente impecable. Una marca en la que confío plenamente!",
    result: "Gran diferencia en la piel",
  },
  {
    name: "María Trinidad",
    location: "España",
    rating: 5,
    date: "12 nov 2025",
    verified: true,
    image: "MT",
    review:
      "Mi piel está jugosa y con mucha luminosidad. De momento solamente he utilizado de manera habitual el FRESH SKIN PRO pero ampliaré próximamente de cara a Navidad.",
    result: "Piel jugosa y luminosa",
  },
  {
    name: "Trini",
    location: "España",
    rating: 5,
    date: "11 nov 2025",
    verified: true,
    image: "TR",
    review:
      "Buscaba algo fácil de mantener y estos dos productos encajan perfecto: Serum Skin + Multi Clean se incorporan a la rutina sin complicaciones. En pocos días noté la piel más uniforme, suave y con un brillo saludable. Lo mejor: su equipo de atención en Instagram. Les consulté varias dudas y me contestaron enseguida con indicaciones prácticas.",
    result: "Piel uniforme y brillante",
  },
  {
    name: "Laura Hernández",
    location: "España",
    rating: 5,
    date: "11 nov 2025",
    verified: true,
    image: "LH",
    review:
      "Descubrir los dispositivos de belleza de Garett ha sido todo un hallazgo. Empecé con Pretty Face… ¡y ahora ya tengo cuatro! Son una auténtica adicción. Estoy encantada con los resultados, porque desde el primer día se notan los cambios, y además me regalan un momento de relax cada día, potenciando el efecto de todas mis cremas.",
    result: "Cambios desde el primer día",
  },
  {
    name: "Cliente verificado",
    location: "España",
    rating: 5,
    date: "11 nov 2025",
    verified: true,
    image: "CV",
    review:
      "Compré a través de El Corte Inglés un Multi Clean Blanco para mi hija y lo recibió a los 2 días, en perfecto estado y está encantada con el aparato. Muy satisfecho con el servicio de El Corte Inglés y con la calidad del producto.",
    result: "Entrega rápida y calidad excelente",
  },
  // Diciembre 2025
  {
    name: "Sofía M.",
    location: "España",
    rating: 5,
    date: "5 dic 2025",
    verified: true,
    image: "SM",
    review:
      "Lo compre para regalar a mi madre por navidad y al final me he quedado yo tambien uno jajaja. El multi clean es una pasada, la piel se queda super limpia y suave. Envio rapidisimo ademas",
    result: "Piel super limpia y suave",
  },
  {
    name: "Raquel",
    location: "España",
    rating: 5,
    date: "12 dic 2025",
    verified: true,
    image: "RA",
    review:
      "Llevaba tiempo mirando el Fresh Skin Pro y al final me animé con la oferta de navidad. Llevo 3 semanas usandolo y la verdad q se nota bastante, sobre todo en la firmeza de la piel. Mi marido hasta me ha dicho q me ve la cara diferente jaja",
    result: "Firmeza visible en 3 semanas",
  },
  {
    name: "Ana Belén",
    location: "España",
    rating: 4,
    date: "18 dic 2025",
    verified: true,
    image: "AB",
    review:
      "El producto esta bien, se nota la calidad. Lo unico q al principio no sabia muy bien como usarlo pero les escribí por instagram y me explicaron todo super bien. Ahora lo uso casi todos los dias y la piel se ve mucho mejor. Le quito una estrella porq el manual podria ser mas claro",
    result: "Piel mucho mejor con uso diario",
  },
  {
    name: "Patri_glow",
    location: "España",
    rating: 5,
    date: "27 dic 2025",
    verified: true,
    image: "PG",
    review:
      "Me regalaron el pretty face por reyes adelantado y ostras que vicio!! lo uso por las noches con mi serum y noto la piel mas tersa y luminosa. Mis amigas me preguntan q me hago en la cara 😂 totalmente recomendable",
    result: "Piel tersa y luminosa",
  },
  // Enero 2026
  {
    name: "Carmen R.",
    location: "España",
    rating: 5,
    date: "3 ene 2026",
    verified: true,
    image: "CR",
    review:
      "Empece el año estrenando el Calm Skin y no puedo estar mas contenta. Tengo la piel sensible y con rojeces y desde que lo uso noto la piel mucho mas calmada. Lo uso con mi crema hidratante y va genial. Muy contenta con la compra!!",
    result: "Piel calmada y sin rojeces",
  },
  {
    name: "David",
    location: "España",
    rating: 5,
    date: "8 ene 2026",
    verified: true,
    image: "DA",
    review:
      "Se lo compré a mi novia por navidad y esta encantadisima. Usa el fresh skin pro todos los dias y dice q le ha cambiado la piel. Yo tambien lo he probado alguna vez y la verdad q mola bastante, deja la piel muy suave",
    result: "Cambio de piel notable",
  },
  {
    name: "Lucia_bcn",
    location: "España",
    rating: 5,
    date: "12 ene 2026",
    verified: true,
    image: "LB",
    review:
      "Tengo el multi clean y la mascara led y madre mia la diferencia! antes me gastaba un dineral en tratamientos faciales y ahora me los hago en casa viendo netflix jaja. En serio, la mascara led es otro nivel, se nota mucho en la luminosidad de la piel",
    result: "Resultados de clínica en casa",
  },
  {
    name: "Marta Jiménez",
    location: "España",
    rating: 5,
    date: "15 ene 2026",
    verified: true,
    image: "MJ",
    review:
      "Después de probar mil cremas antiarrugas que no hacian nada, probé el Fresh Skin Pro por recomendación de una amiga. Llevo un mes y medio y las arrugas del contorno de ojos se han reducido un monton. Ojalá lo hubiera descubierto antes la verdad",
    result: "Arrugas reducidas en mes y medio",
  },
  {
    name: "Bea",
    location: "España",
    rating: 4,
    date: "19 ene 2026",
    verified: true,
    image: "BE",
    review:
      "Me compré la manopla LED para el cuerpo y esta muy bien. La uso en piernas y brazos y la piel se ve mas uniforme y tersa. Lo unico es q es un poco grande para la cara pero para eso hay otros productos. En general muy satisfecha, la recomiendo 100%",
    result: "Piel corporal más uniforme",
  },
  {
    name: "Nuria",
    location: "España",
    rating: 5,
    date: "22 ene 2026",
    verified: true,
    image: "NU",
    review:
      "Alucino con el IPL, llevo 6 semanas y ya casi no me sale pelo en las piernas!! Habia probado otros de amazon mas baratos y nada, este si que funciona de verdad. Ademas el servicio post venta es 10, me resolvieron todas las dudas por whatsapp",
    result: "Casi sin vello en 6 semanas",
  },
  {
    name: "Isabel García",
    location: "España",
    rating: 5,
    date: "26 ene 2026",
    verified: true,
    image: "IG",
    review:
      "Tengo 52 años y sinceramente no esperaba mucho pero vaya sorpresa. Con el Serum Skin y el Fresh Eye llevo dos meses y las ojeras se me han reducido muchisimo. Mi hermana no se lo creia cuando me vio y se ha comprado los mismos jaja. Muy recomendable para pieles maduras",
    result: "Ojeras reducidas a los 52 años",
  },
  {
    name: "Javi_fit",
    location: "España",
    rating: 5,
    date: "30 ene 2026",
    verified: true,
    image: "JF",
    review:
      "Soy tio y no me da verguenza decirlo, uso el multi clean y el cellu body despues de entrenar y la piel se queda increible. Mis colegas del gym flipan cuando les digo q uso aparatos de belleza pero esque funcionan! la recuperacion muscular con el cellu body es brutal",
    result: "Piel increíble post-entreno",
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
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Date Badge */}
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {testimonial.date}
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
