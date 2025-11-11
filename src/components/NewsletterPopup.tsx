import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const hasInteracted = localStorage.getItem("newsletter-popup-interacted");
    
    if (!hasInteracted) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

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
      <DialogContent className="sm:max-w-md">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">¡No te pierdas nuestras ofertas!</DialogTitle>
          <DialogDescription>
            Suscríbete a nuestra newsletter y recibe ofertas exclusivas, descuentos especiales y novedades.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketing"
              checked={acceptsMarketing}
              onCheckedChange={(checked) => setAcceptsMarketing(checked as boolean)}
              disabled={isLoading}
            />
            <Label
              htmlFor="marketing"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Acepto recibir emails promocionales
            </Label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Ahora no
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Suscribirme"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
