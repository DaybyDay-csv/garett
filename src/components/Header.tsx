import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { WishlistDrawer } from "./WishlistDrawer";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CategoryNav } from "@/components/CategoryNav";
import { CATEGORY_NAV } from "@/lib/categories";
import garettLogo from "@/assets/garett-logo-navy.png";

export const Header = () => {
  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Productos', to: '/productos' },
    { label: 'Novedades', to: '/novedades' },
    { label: 'Superventas', to: '/superventas' },
  ];

  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={garettLogo} alt="GARETT" className="h-9 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link to="/busqueda">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          <WishlistDrawer />

          <CartDrawer />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="mb-8">
                <SheetTitle className="flex items-center gap-2">
                  <img src={garettLogo} alt="GARETT" className="h-7 object-contain" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-base font-medium transition-colors hover:text-primary py-3 px-2 border-b border-border/30 hover:bg-muted/50 rounded-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                <p className="text-xs uppercase tracking-wider text-muted-foreground pt-4 pb-1 px-2">Categorías</p>
                {CATEGORY_NAV.map(category => (
                  <Link
                    key={category.slug}
                    to={`/categoria/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 block hover:bg-muted/30 rounded"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sticky category bar (desktop) */}
      <div className="hidden md:block border-t border-border bg-background">
        <div className="container py-2">
          <CategoryNav />
        </div>
      </div>
    </header>;
};
