import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEO } from "@/components/SEO";
import { ENVIO, DEVOLUCION, GARANTIA, CONTACTO } from "@/lib/policies";
import { Link } from "react-router-dom";
import { Truck, MapPin, Phone, Mail, PackageCheck, RotateCcw, AlertCircle } from "lucide-react";

/**
 * Envíos y entregas (H4): la página que prometía el footer. Todo se lee de
 * src/lib/policies.ts (única fuente de verdad); aquí no se hardcodea ninguna
 * cifra de envío, plazo ni contacto.
 */

const plazosTexto = ENVIO.plazos
  .map((p) => `${p.zona}: ${p.diasMin}–${p.diasMax} días laborables`)
  .join("; ");

const EnviosYEntregas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Envíos y entregas"
        description={`${ENVIO.textoCorto}. ${plazosTexto}.`}
        canonicalUrl="/envios-y-entregas"
        faqs={[
          {
            question: "¿Cuánto cuesta el envío?",
            answer:
              "El envío es gratis en todos los pedidos, sin mínimo de compra.",
          },
          {
            question: "¿Cuánto tarda mi pedido?",
            answer: `${plazosTexto}.`,
          },
          {
            question: "¿Puedo devolver un producto?",
            answer: DEVOLUCION.textoCompleto,
          },
        ]}
      />
      <Header />

      <div className="container py-8 max-w-4xl">
        <Breadcrumb items={[{ label: "Envíos y entregas" }]} />

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Truck className="w-10 h-10 text-primary" />
            Envíos y entregas
          </h1>
          <p className="text-muted-foreground text-lg">
            Cuánto cuesta, cuánto tarda y qué pasa si algo no sale bien.
          </p>
        </div>

        <div className="space-y-8">
          {/* Coste del envío */}
          <section className="rounded-lg border bg-primary/5 border-primary/20 p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-primary" />
              {ENVIO.textoCorto}
            </h2>
            <p className="text-muted-foreground">
              Sin mínimo de compra: todos los pedidos salen con envío gratis.
              No hay letra pequeña: en el checkout no se añade ningún gasto de
              envío.
            </p>
          </section>

          {/* Plazos por zona */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              ¿Cuánto tarda en llegar?
            </h2>
            <p className="text-muted-foreground">
              Enviamos a toda España. Estos son los plazos de entrega según tu
              zona:
            </p>
            <div className="rounded-lg border divide-y overflow-hidden">
              {ENVIO.plazos.map((plazo) => (
                <div
                  key={plazo.zona}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-5 py-4 bg-card"
                >
                  <span className="font-medium">{plazo.zona}</span>
                  <span className="text-muted-foreground">
                    Entre {plazo.diasMin} y {plazo.diasMax} días laborables
                  </span>
                </div>
              ))}
            </div>
            {ENVIO.plazos.some((p) => p.zona.includes("Canarias")) && (
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                En Canarias, Ceuta y Melilla pueden aplicarse tasas aduaneras e
                impuestos locales no incluidos en el precio del pedido.
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Los plazos pueden verse afectados por la agencia de transporte o
              por causas de fuerza mayor.
            </p>
          </section>

          {/* Devoluciones */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-primary" />
              ¿Y si quiero devolverlo?
            </h2>
            <p className="text-muted-foreground">{DEVOLUCION.textoCompleto}</p>
            <p className="text-muted-foreground">
              Si aparece un defecto, tienes{" "}
              <strong className="text-foreground">
                {GARANTIA.comercial.texto}
              </strong>{" "}
              y {GARANTIA.legal.texto}. Consulta las condiciones completas en{" "}
              <Link
                to="/garantia"
                className="text-primary hover:underline underline-offset-2"
              >
                garantía
              </Link>
              .
            </p>
          </section>

          {/* Contacto */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">¿Tu pedido no llega?</h2>
            <p className="text-muted-foreground">
              Escríbenos o llámanos y lo miramos. No te dejes con la duda:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={CONTACTO.telefonoHref} className="hover:text-primary transition-colors">
                  {CONTACTO.telefono}
                </a>
                <span className="text-sm">({CONTACTO.horario})</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${CONTACTO.email}`} className="hover:text-primary transition-colors">
                  {CONTACTO.email}
                </a>
              </li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground border-t pt-6">
            ¿Lo compras para regalar? En{" "}
            <Link
              to="/ideas-regalo"
              className="text-primary hover:underline underline-offset-2"
            >
              Ideas regalo
            </Link>{" "}
            te decimos qué comprar según a quién y cuánto.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnviosYEntregas;
