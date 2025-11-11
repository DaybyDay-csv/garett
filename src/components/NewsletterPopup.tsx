import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Gift, Sparkles, Mail, TrendingUp, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasInteracted = localStorage.getItem("newsletter-popup-interacted");
    
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter-popup-interacted", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email, acceptsMarketing }
      });

      if (error) throw error;

      if (data.error) {
        if (data.isDuplicate) {
          toast({
            title: "Ya estás suscrito",
            description: "Este email ya está registrado en nuestra newsletter",
          });
        } else {
          throw new Error(data.error);
        }
      } else {
        toast({
          title: "¡Suscripción exitosa!",
          description: "Gracias por suscribirte. Recibirás nuestras ofertas exclusivas.",
        });
        localStorage.setItem("newsletter-popup-interacted", "true");
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-2 border-primary/20">
        <div className="relative">
          {/* Premium Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-background/80 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative p-8">
            {/* Icon Badge */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative bg-primary/10 p-4 rounded-full border border-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            <DialogHeader className="text-center space-y-3 mb-6">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Únete a Nuestra Comunidad VIP
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                Sé el primero en descubrir productos exclusivos y ofertas especiales
              </DialogDescription>
            </DialogHeader>

            {/* Benefits Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Ofertas Exclusivas
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Primero en Lanzamientos
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Tips de Belleza
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Ingresa tu mejor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-4 pr-4 text-base border-2 focus:border-primary transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-start space-x-3 bg-muted/30 p-3 rounded-lg">
                <Checkbox
                  id="marketing"
                  checked={acceptsMarketing}
                  onCheckedChange={(checked) => setAcceptsMarketing(checked as boolean)}
                  className="mt-0.5"
                  disabled={isLoading}
                />
                <label
                  htmlFor="marketing"
                  className="text-sm leading-snug cursor-pointer select-none"
                >
                  Acepto recibir ofertas exclusivas y novedades. Puedo cancelar en cualquier momento.
                </label>
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Quiero Mis Ofertas Exclusivas"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  No gracias, prefiero pagar precio completo
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Tu información está 100% segura. Sin spam.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
