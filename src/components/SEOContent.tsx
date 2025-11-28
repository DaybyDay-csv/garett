import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

export const SEOContent = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Tecnología de Belleza Profesional en Casa
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              En <strong className="text-foreground">Garett Beauty</strong>, revolucionamos el cuidado personal con dispositivos de belleza profesional diseñados para uso doméstico. Nuestra tecnología avanzada te permite disfrutar de <Link to="/categoria/cuidado-capilar" className="text-primary hover:underline font-medium">tratamientos capilares profesionales</Link>, <Link to="/categoria/masajeadores-faciales" className="text-primary hover:underline font-medium">cuidado facial de alta calidad</Link> y <Link to="/categoria/depilacion-ipl" className="text-primary hover:underline font-medium">depilación láser permanente</Link> sin salir de casa.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Resultados Profesionales
                    </h3>
                    <p className="text-muted-foreground">
                      Tecnología utilizada en salones de belleza profesionales, ahora accesible para tu rutina diaria en casa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Tecnología Avanzada
                    </h3>
                    <p className="text-muted-foreground">
                      Desde tecnología iónica hasta IPL de última generación, cada dispositivo incorpora innovación probada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Garantía 2 Años
                    </h3>
                    <p className="text-muted-foreground">
                      Todos nuestros productos incluyen garantía extendida de 2 años para tu tranquilidad total.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Cuidado Integral
                    </h3>
                    <p className="text-muted-foreground">
                      Soluciones completas para cabello, rostro y cuerpo con tratamientos personalizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Content with Internal Links */}
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-12">
              ¿Por Qué Elegir Dispositivos de Belleza Profesional?
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Los <strong className="text-foreground">dispositivos de belleza profesional</strong> han revolucionado la industria del cuidado personal. A diferencia de los productos convencionales, estos aparatos utilizan tecnologías clínicamente probadas que ofrecen resultados visibles y duraderos.
            </p>

            <h4 className="text-xl font-semibold text-foreground mb-3 mt-8">
              Cuidado Capilar con Tecnología Iónica
            </h4>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nuestra <Link to="/categoria/cuidado-capilar" className="text-primary hover:underline font-medium">línea de cuidado capilar</Link> incluye planchas y secadores con <strong className="text-foreground">tecnología iónica avanzada</strong>. Esta innovación neutraliza la electricidad estática, sella la cutícula del cabello y proporciona un acabado profesional con brillo intenso y suavidad duradera. Perfectas para todo tipo de cabello, desde fino hasta grueso y rizado.
            </p>

            <h4 className="text-xl font-semibold text-foreground mb-3 mt-8">
              Tratamientos Faciales Profesionales en Casa
            </h4>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Los <Link to="/categoria/masajeadores-faciales" className="text-primary hover:underline font-medium">masajeadores faciales profesionales</Link> estimulan la circulación, mejoran la absorción de productos y proporcionan un efecto lifting natural. Nuestros dispositivos de <Link to="/categoria/limpieza-facial" className="text-primary hover:underline font-medium">limpieza facial profunda</Link> eliminan impurezas hasta 10 veces más efectivamente que la limpieza manual, dejando tu piel radiante y renovada.
            </p>

            <h4 className="text-xl font-semibold text-foreground mb-3 mt-8">
              Depilación Láser IPL: Adiós al Vello para Siempre
            </h4>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              La <Link to="/categoria/depilacion-ipl" className="text-primary hover:underline font-medium">tecnología IPL (Luz Pulsada Intensa)</Link> es el método más efectivo para <strong className="text-foreground">depilación permanente</strong> en casa. Nuestros dispositivos ofrecen hasta 500,000 pulsaciones, suficientes para tratar todo el cuerpo durante años. Los resultados son visibles desde las primeras sesiones, con una reducción del vello de hasta el 92% después de 8-12 semanas.
            </p>

            <h4 className="text-xl font-semibold text-foreground mb-3 mt-8">
              Mesoterapia y Tratamientos Corporales
            </h4>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Descubre nuestros <Link to="/categoria/mesoterapia" className="text-primary hover:underline font-medium">dispositivos de mesoterapia</Link> para rejuvenecimiento facial avanzado y nuestros <Link to="/categoria/corporales" className="text-primary hover:underline font-medium">tratamientos corporales</Link> que ayudan a tonificar, reafirmar y mejorar la apariencia de la piel en todo el cuerpo.
            </p>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 mt-12">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Comienza Tu Transformación Hoy
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Más de 50,000 clientes satisfechas ya disfrutan de resultados profesionales en casa. Envío gratis en 24-48h y atención al cliente premium.
              </p>
              <Link 
                to="/superventas" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Ver productos más vendidos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
