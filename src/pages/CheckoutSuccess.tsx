import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { CONTACTO } from "@/lib/policies";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface LineaPedido {
  nombre: string;
  cantidad: number;
  importe: number | null;
}

interface ResumenSesion {
  id: string;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  lineas: LineaPedido[];
  email: string | null;
}

const euros = (centimos: number) => `€${(centimos / 100).toFixed(2)}`;

const CheckoutSuccess = () => {
  const clearCart = useCartStore((s) => s.clearCart);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [resumen, setResumen] = useState<ResumenSesion | null>(null);
  const [errorResumen, setErrorResumen] = useState(false);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return;
    let activo = true;
    fetch(`/api/checkout-session?id=${encodeURIComponent(sessionId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: ResumenSesion) => {
        if (activo) setResumen(data);
      })
      .catch(() => {
        if (activo) setErrorResumen(true);
      });
    return () => {
      activo = false;
    };
  }, [sessionId]);

  const pagoConfirmado = resumen?.payment_status === "paid";
  const pagoPendiente =
    resumen !== null && resumen.payment_status !== null && !pagoConfirmado;

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
          {pagoConfirmado
            ? "Tu pago está confirmado y tu pedido en marcha."
            : pagoPendiente
              ? "Hemos recibido tu pedido, pero el pago está pendiente de confirmación."
              : "Tu pedido se ha completado."}{" "}
          Recibirás la confirmación del pago de Stripe en tu email.
          {resumen?.email ? ` (${resumen.email})` : ""} Para cualquier duda
          sobre tu pedido o el envío, llámanos al{" "}
          <a href={CONTACTO.telefonoHref} className="underline underline-offset-4 hover:text-foreground transition-colors">
            {CONTACTO.telefono}
          </a>{" "}
          ({CONTACTO.horario}).
        </p>

        {resumen && (
          <div className="w-full max-w-md mx-auto text-left rounded-2xl border bg-card/60 backdrop-blur-sm p-6 mb-8">
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <span className="text-sm text-muted-foreground">Pedido</span>
              <span className="font-mono text-xs break-all text-right">
                {resumen.id}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4 pb-3 border-b">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-semibold">
                {resumen.amount_total !== null ? euros(resumen.amount_total) : "—"}
              </span>
            </div>
            {resumen.lineas.length > 0 && (
              <ul className="mt-3 space-y-2">
                {resumen.lineas.map((linea, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                    <span>
                      {linea.nombre}
                      <span className="text-muted-foreground"> × {linea.cantidad}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {linea.importe !== null ? euros(linea.importe) : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {errorResumen && (
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            No hemos podido cargar el resumen del pedido. Si tienes cualquier
            duda, llámanos al {CONTACTO.telefono} ({CONTACTO.horario}).
          </p>
        )}

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
