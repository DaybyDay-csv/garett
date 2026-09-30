import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEO } from "@/components/SEO";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { ENVIO, DEVOLUCION } from "@/lib/policies";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { Gift, Sparkles, Truck, ShieldCheck } from "lucide-react";

/**
 * Ideas regalo (H9): guía de compra por presupuesto con elegidos reales del
 * catálogo. Los motivos de cada pick se apoyan en la descripción y los tags
 * del propio catálogo (superventas, novedades), sin datos inventados.
 */

interface GiftPick {
  handle: string;
  /** Por qué es un buen regalo: derivado de la descripción/tags del catálogo. */
  motivo: string;
}

interface GiftBudgetGroup {
  id: string;
  label: string;
  intro: string;
  picks: GiftPick[];
}

const GIFT_GROUPS: GiftBudgetGroup[] = [
  {
    id: "menos-100",
    label: "Menos de 100 €",
    intro: "Para acertar sin complicarte: limpieza facial, contorno de ojos y mesoterapia de entrada.",
    picks: [
      { handle: "fresh-eye", motivo: "Para quien se preocupa por ojeras y arrugas del contorno: masajeador con vibración y LED." },
      { handle: "serum-skin", motivo: "Para quien ya usa sérums: electroporación sin agujas para que penetren mejor." },
      { handle: "multiclean", motivo: "La apuesta segura: el cepillo facial sónico superventa de la tienda." },
      { handle: "pretty-face", motivo: "Para quien quiere efecto lifting sin agujas: EMS con modo relajación." },
    ],
  },
  {
    id: "100-200",
    label: "100–200 €",
    intro: "La zona donde están varios de los superventas de la casa.",
    picks: [
      { handle: "bright-skin", motivo: "Para quien quiere unificar el tono y difuminar manchas." },
      { handle: "lift-skin-pro", motivo: "El 4-en-1 (sónica, EMS, LED y calor), recién llegado al catálogo." },
      { handle: "multi-care-brush", motivo: "Para quien cuida cuero cabelludo, rostro y cuerpo con un solo dispositivo." },
      { handle: "fresh-skin-pro", motivo: "La mesoterapia superventa: sin agujas ni dolor." },
      { handle: "cellu-body", motivo: "Para quien quiere tratar celulitis y reafirmar piernas, glúteos y abdomen." },
    ],
  },
  {
    id: "200-350",
    label: "200–350 €",
    intro: "El regalo grande: fototerapia LED, depilación IPL y styling con aire.",
    picks: [
      { handle: "manopla-led-garett-beauty", motivo: "Fototerapia LED con 4 modos de luz, recién llegada." },
      { handle: "aeroglow", motivo: "La plancha de aire recién llegada: seca y alisa con tecnología iónica." },
      { handle: "curly", motivo: "Para quien trabaja el pelo con calor: rizos definidos sin daño térmico." },
      { handle: "mascara-led-garett-beauty", motivo: "La máscara LED superventa: 4 modos y temporizador de 5/10/15 min." },
      { handle: "ipl-plateada", motivo: "Para quien piensa a largo plazo: depilación de luz pulsada en casa." },
    ],
  },
];

const IdeasRegalo = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        setProducts(data.filter((p) => !isGWPProduct(p)));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productsByHandle = Object.fromEntries(products.map((p) => [p.node.handle, p]));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ideas regalo"
        description={`Qué regalar según tu presupuesto: dispositivos de belleza elegidos, de menos de 100 € a 350 €. ${ENVIO.textoCorto}.`}
        canonicalUrl="/ideas-regalo"
      />
      <Header />

      <div className="container py-8">
        <Breadcrumb items={[{ label: "Ideas regalo" }]} />

        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Gift className="w-10 h-10 text-primary" />
            Ideas regalo
          </h1>
          <p className="text-muted-foreground text-lg">
            Te decimos exactamente qué comprar según a quién y cuánto. Sin
            catálogo infinito: los elegidos de la casa, ordenados por
            presupuesto.
          </p>
        </div>

        {loading ? (
          <div className="space-y-12">
            <ProductGridSkeleton count={4} />
            <ProductGridSkeleton count={5} />
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hemos podido cargar el catálogo. Inténtalo de nuevo en unos
              minutos.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {GIFT_GROUPS.map((group) => {
              const groupProducts = group.picks
                .map((pick) => ({
                  pick,
                  product: productsByHandle[pick.handle],
                }))
                .filter((entry) => entry.product !== undefined);

              if (groupProducts.length === 0) return null;

              return (
                <section key={group.id} aria-labelledby={`gift-${group.id}`}>
                  <div className="mb-6">
                    <h2
                      id={`gift-${group.id}`}
                      className="text-2xl font-semibold tracking-tight flex items-center gap-2"
                    >
                      {group.label}
                      <Sparkles className="w-5 h-5 text-primary" />
                    </h2>
                    <p className="text-muted-foreground mt-1">{group.intro}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {groupProducts.map(({ pick, product }) => (
                      <div key={product.node.id}>
                        <p className="text-sm text-muted-foreground mb-2 flex items-start gap-1.5">
                          <Gift className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                          {pick.motivo}
                        </p>
                        <ProductCard product={product} listName="Ideas regalo" />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Truck className="w-4 h-4 text-primary" />
                {ENVIO.textoCorto}.
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-primary" />
                {DEVOLUCION.textoCorto}.
              </div>
              <p className="text-sm text-muted-foreground">
                ¿Y si no aciertas? Con el precinto intacto tienes
                {` ${DEVOLUCION.diasPrecintoIntacto} días`} para devolverlo.
              </p>
              <p className="text-sm text-muted-foreground">
                ¿Cuándo te llegaría? Consulta los plazos en{" "}
                <Link
                  to="/envios-y-entregas"
                  className="text-primary hover:underline underline-offset-2"
                >
                  envíos y entregas
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default IdeasRegalo;
