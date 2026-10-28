import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center container py-20">
        <div className="text-center max-w-xl space-y-6">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Error 404</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Esta página ya no existe
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Lo sentimos: el enlace que has seguido no funciona o el producto se ha agotado en la liquidación.
            El resto del stock sigue disponible:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/productos">
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Ver todo el stock en liquidación
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/categoria/beauty-tech">
                Beauty Tech
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/categoria/relojes">
                Sportwatch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
