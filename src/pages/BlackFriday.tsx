import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterCTA } from "@/components/NewsletterCTA";

// Fuera de campaña: sin countdown, sin códigos y sin promesas que el carrito
// no puede cumplir. Cuando vuelva una campaña, se anunciará aquí.
const BlackFriday = () => {
  return <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="container pt-8 px-6">
        <Breadcrumb
          items={[
            { label: 'Black Friday' }
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-16 md:py-24">
        <div className="container relative text-white text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Campaña finalizada
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-4 font-extrabold">Black Friday terminó</h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-base">
            Las próximas campañas se anunciarán aquí. Mientras tanto, la tienda sigue abierta con sus precios normales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="white" size="lg">
              <Link to="/superventas">Ver superventas</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/novedades">Ver novedades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container py-12">
        <NewsletterCTA variant="card" className="max-w-2xl mx-auto" />
      </section>

      <Footer />
    </div>;
};
export default BlackFriday;
