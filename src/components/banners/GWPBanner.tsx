import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import gwpImage from "@/assets/gwp-headband.png";
import patternImage from "@/assets/garett-pattern-2.png";
import { gwpConfig } from "@/lib/bannerConfig";
import { NewsletterCTA } from "@/components/NewsletterCTA";
export const GWPBanner = () => {
  return <div className="relative w-full min-h-[500px] md:min-h-[500px] bg-promo-gwp overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url(${patternImage})`,
      backgroundSize: '400px',
      backgroundRepeat: 'repeat'
    }} />
      
      
      <div className="container mx-auto px-6 md:px-8 min-h-[500px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10 py-16 md:py-20 pb-20 md:pb-20">
        {/* Gift Image */}
        <div className="flex-1 flex items-center justify-center order-2 md:order-1">
          <div className="relative">
            <img src={gwpImage} alt={gwpConfig.giftName} className="w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl" />
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Badge className="bg-accent text-accent-foreground text-xs md:text-lg px-2 py-1 md:px-4 md:py-2">
                <Gift className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2" />
                GRATIS
              </Badge>
            </div>
          </div>
        </div>

        {/* Content - Enhanced Visual */}
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 order-1 md:order-2 max-w-lg mx-auto md:mx-0">
          
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Regalo<br />
              <span className="text-primary">Especial</span>
            </h1>
            <div className="space-y-2">
              <p className="text-base md:text-xl lg:text-2xl font-semibold text-foreground">
                Banda de pelo premium
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
                <Badge className="bg-primary/10 text-primary text-xs md:text-sm px-3 py-1 md:px-4 md:py-1.5 border border-primary/20">
                  Compras €{gwpConfig.threshold}+
                </Badge>
                <Badge className="bg-accent text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-1.5 border-2 border-white/20 font-bold">
                  Valor €20
                </Badge>
              </div>
            </div>
          </div>

          {/* Visual Benefits */}
          

          <div className="flex flex-col gap-3 items-center pt-2">
            <Button size="lg" className="text-sm md:text-base h-12 px-8 w-full sm:w-auto max-w-xs" onClick={() => {
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
            <NewsletterCTA variant="inline" text="Recibe las ofertas" />
          </div>
        </div>
      </div>
    </div>;
};