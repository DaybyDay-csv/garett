import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { CheckCircle2, ArrowRight } from "lucide-react";

const CheckoutSuccess = () => {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gracias por tu compra - Garett Beauty"
        description="Tu pedido se ha completado correctamente."
        canonicalUrl="/checkout/gracias"
      />
      <Header />
      <div className="container py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
          Tu pedido se ha completado. Recibirás un email de confirmación con los
          detalles y el seguimiento del envío.
        </p>
        <Button asChild size="lg">
          <Link to="/productos">
            Seguir comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
