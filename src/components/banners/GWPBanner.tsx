import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import gwpImage from "@/assets/gwp-headband.jpg";
import patternImage from "@/assets/garett-pattern-2.png";
import { gwpConfig } from "@/lib/bannerConfig";

export const GWPBanner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-promo-gwp via-background to-promo-gwp overflow-hidden">
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Gift Image */}
        <div className="flex-1 flex items-center justify-center order-2 md:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <img 
              src={gwpImage} 
              alt={gwpConfig.giftName}
              className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                GRATIS
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-6 py-12 order-1 md:order-2">
          <Badge variant="outline" className="border-primary text-primary">
            <Gift className="w-3 h-3 mr-1" />
            REGALO GRATIS
          </Badge>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Regalo<br />
              <span className="text-primary">Especial</span> 🎁
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Banda de pelo premium de regalo en compras desde{" "}
              <span className="font-bold text-foreground">€{gwpConfig.threshold}</span>
            </p>
          </div>

          {/* Value Indicator */}
          <div className="bg-primary-light p-4 rounded-lg border border-primary/20 inline-block">
            <p className="text-sm text-muted-foreground mb-1">Valor del regalo</p>
            <p className="text-2xl font-bold text-primary">€12.99</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg">
              <Link to="/productos">
                Comprar ahora
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
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
    </div>
  );
};
