import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import gwpImage from "@/assets/gwp-headband.png";
import patternImage from "@/assets/garett-pattern-2.png";
import { gwpConfig } from "@/lib/bannerConfig";
export const GWPBanner = () => {
  return <div className="relative w-full bg-gradient-to-br from-promo-gwp via-background to-promo-gwp overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url(${patternImage})`,
      backgroundSize: '400px',
      backgroundRepeat: 'repeat'
    }} />
      
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 relative z-10 py-8 md:py-12 pb-12 md:pb-12">
        {/* Gift Image */}
        <div className="flex-1 flex items-center justify-center order-2 md:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <img src={gwpImage} alt={gwpConfig.giftName} className="relative w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-2xl" />
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Badge className="bg-accent text-accent-foreground text-xs md:text-lg px-2 py-1 md:px-4 md:py-2">
                <Gift className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2" />
                GRATIS
              </Badge>
            </div>
          </div>
        </div>

        {/* Content - Enhanced Visual */}
        <div className="flex-1 text-center md:text-left space-y-2 md:space-y-6 order-1 md:order-2 max-w-lg mx-auto md:mx-0">
          
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Regalo<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Especial</span> 🎁
            </h1>
            <div className="space-y-2">
              <p className="text-base md:text-xl lg:text-2xl font-semibold text-foreground">
                Banda de pelo premium
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge className="bg-primary/10 text-primary text-xs md:text-sm px-3 py-1">
                  Compras €{gwpConfig.threshold}+
                </Badge>
                <Badge className="bg-accent/10 text-accent-foreground text-xs md:text-sm px-3 py-1">
                  Valor €20
                </Badge>
              </div>
            </div>
          </div>

          {/* Visual Benefits */}
          

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
            <Button size="lg" className="text-sm md:text-base h-12 px-8 w-full sm:w-auto" onClick={() => {
            const element = document.getElementById('superventas');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}>
              Comprar ahora
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="text-sm md:text-base h-12 px-8 w-full sm:w-auto">
                  <Info className="w-4 h-4 mr-2" />
                  Ver condiciones
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Condiciones del Regalo</DialogTitle>
                  <DialogDescription className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">¿Cómo conseguir tu regalo?</h4>
                      <p>Añade productos por valor de €{gwpConfig.threshold} o más a tu carrito y el regalo se añadirá automáticamente.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Producto de regalo</h4>
                      <p>{gwpConfig.giftName} - Valor: €12.99</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Válido hasta</h4>
                      <p>31 de Diciembre de 2025 o hasta agotar existencias</p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>;
};