import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Bundle, getAllBundles, getBundlesForHandle } from "@/lib/bundles";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface BundlePickerProps {
  currentProductHandle: string;
  currentProductPrice: number;
}

export const BundlePicker = ({ currentProductHandle, currentProductPrice }: BundlePickerProps) => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selected, setSelected] = useState<Bundle | null>(null);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts(100).then((all) => setAllProducts(all));
    const matches = getBundlesForHandle(currentProductHandle);
    if (matches.length > 0) {
      setBundles(matches);
      // Don't auto-select — let the user choose
    } else {
      setBundles(getAllBundles());
    }
  }, [currentProductHandle]);

  if (bundles.length === 0) return null;

  const handleBuyBundle = (bundle: Bundle) => {
    // Add all products in the bundle to cart
    const included = allProducts.filter((p) => bundle.includes.includes(p.node.handle));
    if (included.length !== bundle.includes.length) {
      toast.error("Faltan productos del pack", { description: "Pocos productos en el catálogo" });
      return;
    }
    // Apply proportional discount to each item's cart price
    const totalOriginal = included.reduce((s, p) => s + parseFloat(p.node.priceRange.minVariantPrice.amount), 0);
    const discountFactor = bundle.bundlePrice / totalOriginal;
    included.forEach((p) => {
      const variant = p.node.variants.edges[0]?.node;
      if (!variant) return;
      const original = parseFloat(p.node.priceRange.minVariantPrice.amount);
      const discountedPrice = (original * discountFactor).toFixed(2);
      addItem({
        product: p,
        variantId: variant.id,
        variantTitle: variant.title,
        price: { ...variant.price, amount: discountedPrice },
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
    });
    toast.success("Pack añadido al carrito", {
      description: `${bundle.title} — ${included.length} productos`,
      position: "top-center",
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4 text-primary" />
        <span className="text-xs uppercase tracking-wider text-primary font-semibold">Ahorra con un pack</span>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 tracking-tight">
        Completa tu rutina y ahorra
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
        Productos seleccionados para tu rutina. Ahorras hasta 70€ comparado con la compra por separado.
      </p>

      <div className="space-y-4">
        {bundles.map((bundle) => {
          const isSelected = selected?.handle === bundle.handle;
          const savings = bundle.originalPrice - bundle.bundlePrice;
          return (
            <Card
              key={bundle.handle}
              onClick={() => setSelected(isSelected ? null : bundle)}
              className={`p-4 md:p-5 cursor-pointer transition-all border-2 ${
                isSelected
                  ? "border-primary bg-primary-light/30"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-semibold text-foreground">{bundle.title}</h4>
                    {bundle.badge && (
                      <Badge className="bg-primary-light text-primary border-primary/20 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {bundle.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{bundle.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {bundle.includes.map((h) => {
                      const prod = allProducts.find((p) => p.node.handle === h);
                      if (!prod) return null;
                      const isCurrent = h === currentProductHandle;
                      return (
                        <span
                          key={h}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border ${
                            isCurrent
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-foreground"
                          }`}
                        >
                          {isCurrent && <Check className="w-3 h-3" />}
                          {prod.node.title.length > 28 ? prod.node.title.slice(0, 28) + "…" : prod.node.title}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-semibold text-foreground tracking-tight">
                      €{bundle.bundlePrice.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-muted-foreground">
                      €{bundle.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">por separado</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-primary-light border border-primary/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{selected.reason || "Ahorra con este pack"}</p>
            <p className="text-xs text-muted-foreground">
              {selected.includes.length} productos · ahorras €{(selected.originalPrice - selected.bundlePrice).toFixed(2)}
            </p>
          </div>
          <Button onClick={() => handleBuyBundle(selected)} size="lg">
            Añadir pack
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        ¿Prefieres comprar por separado? <Link to="/productos" className="underline">Ver todos los productos</Link>
      </p>
    </div>
  );
};
