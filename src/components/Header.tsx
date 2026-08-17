import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Button } from "./ui/button";
import { Menu, ChevronDown, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import garettIcon from "@/assets/garett-icon-white.png";
import garettLogo from "@/assets/garett-logo-navy.png";
import garettIsotipo from "@/assets/garett-isotipo-white.png";
import garettLogoWhite from "@/assets/garett-logo-white.png";
export const Header = () => {
  const categories = [
    { label: 'Cuidado Capilar', path: '/categoria/cuidado-capilar' },
    { label: 'Masajeadores Faciales', path: '/categoria/masajeadores-faciales' },
    { label: 'Limpieza Facial', path: '/categoria/limpieza-facial' },
    { label: 'Mesoterapia', path: '/categoria/mesoterapia' },
    { label: 'Cuidado Corporal', path: '/categoria/corporales' },
    { label: 'Depilación IPL', path: '/categoria/depilacion-ipl' },
    { label: 'Terapia de Luz LED', path: '/categoria/terapia-luz-led' },
  ];

  const navLinks = [{
    label: 'Inicio',
    to: '/'
  }, {
    label: 'Productos',
    to: '/productos',
    hasDropdown: true
  }, {
    // Hidden for Christmas campaign - will be reactivated as /navidad
    // label: 'Black Friday',
    // to: '/black-friday'
    label: 'Novedades',
    to: '/novedades'
  }];
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={garettLogo} alt="GARETT" className="h-9 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map(link => (
            link.hasDropdown ? (
              <DropdownMenu key={link.to}>
                <DropdownMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide flex items-center gap-1">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/productos" className="w-full cursor-pointer">
                      Todos los productos
                    </Link>
                  </DropdownMenuItem>
                  {categories.map(category => (
                    <DropdownMenuItem key={category.path} asChild>
                      <Link to={category.path} className="w-full cursor-pointer">
                        {category.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link to="/busqueda">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

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
                  link.hasDropdown ? (
                    <div key={link.to} className="flex flex-col">
                      <Link
                        to={link.to}
                        className="text-base font-medium transition-colors hover:text-primary py-3 px-2 border-b border-border/30 hover:bg-muted/50 rounded-lg"
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 mt-1 space-y-1">
                        {categories.map(category => (
                          <Link
                            key={category.path}
                            to={category.path}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-2 block hover:bg-muted/30 rounded"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-base font-medium transition-colors hover:text-primary py-3 px-2 border-b border-border/30 hover:bg-muted/50 rounded-lg"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};