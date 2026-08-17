import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Heart, X } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Link } from "react-router-dom";

const WISHLIST_KEY = "garett_wishlist";

function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [handles, setHandles] = useState<string[]>([]);
  const [items, setItems] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refresh = () => setHandles(getWishlist());
    refresh();
    window.addEventListener("wishlist-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("wishlist-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (handles.length === 0) {
      setItems([]);
      return;
    }
    setLoading(true);
    fetchProducts(100)
      .then((all) => setItems(all.filter((p) => handles.includes(p.node.handle))))
      .finally(() => setLoading(false));
  }, [isOpen, handles]);

  const remove = (handle: string) => {
    const next = getWishlist().filter((h) => h !== handle);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("wishlist-change"));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-muted">
          <Heart className="h-5 w-5" />
          {handles.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
              {handles.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Favoritos</SheetTitle>
          <SheetDescription>
            {handles.length === 0 ? "No has guardado productos" : `${handles.length} producto${handles.length !== 1 ? "s" : ""} guardado${handles.length !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {handles.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Tu lista de favoritos está vacía</p>
              <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                <Link to="/productos">Explorar productos</Link>
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {loading ? (
                <div className="py-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                </div>
              ) : (
                items.map((p) => {
                  const image = p.node.images.edges[0]?.node;
                  const price = p.node.priceRange.minVariantPrice.amount;
                  return (
                    <div key={p.node.id} className="flex gap-3 p-3 border border-border rounded-lg">
                      <Link
                        to={`/producto/${p.node.handle}`}
                        onClick={() => setIsOpen(false)}
                        className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0"
                      >
                        {image && (
                          <img src={image.url} alt={image.altText || p.node.title} className="w-full h-full object-cover" />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/producto/${p.node.handle}`}
                          onClick={() => setIsOpen(false)}
                          className="font-medium text-sm leading-tight line-clamp-2 hover:text-primary transition-colors"
                        >
                          {p.node.title}
                        </Link>
                        <p className="text-sm font-semibold mt-1">€{parseFloat(price).toFixed(2)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => remove(p.node.handle)}
                        aria-label="Eliminar de favoritos"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
