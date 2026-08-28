import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LOCAL_PRODUCTS_BY_HANDLE } from "@/lib/catalog";
import { Check, Minus } from "lucide-react";

interface IPLModel {
  handle: string;
  pulsos: string;
  area: string;
  cooling: boolean;
  modos: string;
  extra: string;
}

const MODELS: IPLModel[] = [
  { handle: "ipl-flash-pro", pulsos: "999.999", area: "4,5 cm²", cooling: true, modos: "Auto + manual", extra: "Gafas + maquinilla" },
  { handle: "ipl-flash-dorada", pulsos: "999.000", area: "3 cm²", cooling: true, modos: "Manual", extra: "Lámpara reemplazable" },
  { handle: "ipl-plateada", pulsos: "999.000", area: "3 cm²", cooling: true, modos: "Manual", extra: "Lámpara reemplazable" },
  { handle: "cool", pulsos: "Larga duración", area: "3 cm²", cooling: true, modos: "Manual", extra: "Gafas + maquinilla" },
];

export const IPLComparison = () => {
  const fmt = (amount: string) => `€${parseFloat(amount).toFixed(2)}`;

  return (
    <section className="my-10">
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Compara modelos</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Elige tu depiladora IPL</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[640px] text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-3 pr-4 font-medium">Modelo</th>
              <th className="py-3 pr-4 font-medium">Pulsos</th>
              <th className="py-3 pr-4 font-medium">Superficie</th>
              <th className="py-3 pr-4 font-medium">Cabezal frío</th>
              <th className="py-3 pr-4 font-medium">Modos</th>
              <th className="py-3 pr-4 font-medium">Extra</th>
              <th className="py-3 pr-4 font-medium">Precio</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => {
              const p = LOCAL_PRODUCTS_BY_HANDLE[m.handle];
              if (!p) return null;
              return (
                <tr key={m.handle} className="border-b border-border/60">
                  <td className="py-4 pr-4 font-medium text-foreground">{p.node.title}</td>
                  <td className="py-4 pr-4">{m.pulsos}</td>
                  <td className="py-4 pr-4">{m.area}</td>
                  <td className="py-4 pr-4">
                    {m.cooling ? <Check className="w-4 h-4 text-green-600" /> : <Minus className="w-4 h-4 text-muted-foreground" />}
                  </td>
                  <td className="py-4 pr-4">{m.modos}</td>
                  <td className="py-4 pr-4 text-muted-foreground">{m.extra}</td>
                  <td className="py-4 pr-4 font-semibold text-primary">{fmt(p.node.priceRange.minVariantPrice.amount)}</td>
                  <td className="py-4">
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/producto/${m.handle}`}>Ver</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
