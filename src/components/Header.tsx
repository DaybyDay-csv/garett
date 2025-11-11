import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import garettIcon from "@/assets/garett-icon-white.png";
import garettLogo from "@/assets/garett-logo-white.png";
import garettIsotipo from "@/assets/garett-isotipo-white.png";
export const Header = () => {
  const navLinks = [{
    label: 'Inicio',
    to: '/'
  }, {
    label: 'Productos',
    to: '/productos'
  }, {
    label: 'Black Friday',
    to: '/black-friday'
  }, {
    label: 'Novedades',
    to: '/novedades'
  }];
  return <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-[#1a1f3a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1f3a]/90 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {/* Mobile: isotipo (icon only) */}
          <img src={garettIsotipo} alt="GARETT" className="h-8 object-contain md:hidden" />
          {/* Desktop: full logo */}
          <img src={garettLogo} alt="GARETT" className="hidden md:block h-8 object-contain" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => <Link key={link.to} to={link.to} className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              {link.label}
            </Link>)}
        </nav>
        
        <div className="flex items-center gap-3">
          <CartDrawer />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80 hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1a1f3a] rounded-md flex items-center justify-center p-1">
                    <img src={garettIcon} alt="Garett" className="w-full h-full object-contain" />
                  </div>
                  <img src={garettLogo} alt="GARETT" className="h-6 object-contain" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map(link => <Link key={link.to} to={link.to} className="text-base font-medium transition-colors hover:text-primary py-2 border-b border-border/50">
                    {link.label}
                  </Link>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};