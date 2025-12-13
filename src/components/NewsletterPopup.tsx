import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNewsletterStore } from "@/stores/newsletterStore";
import categoryImage from "@/assets/category-masajeadores-faciales.webp";

export const NewsletterPopup = () => {
  const isOpen = useNewsletterStore(state => state.isOpen);
  const closeNewsletter = useNewsletterStore(state => state.closeNewsletter);
  const [email, setEmail] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasInteracted = localStorage.getItem("newsletter-popup-interacted");
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        useNewsletterStore.getState().openNewsletter();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    closeNewsletter();
    localStorage.setItem("newsletter-popup-interacted", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: {
          email,
          acceptsMarketing
        }
      });

      if (error) {
        const errorContext = (error as any)?.context;
        if (errorContext?.isDuplicate) {
          toast({
            title: "Ya estás suscrito",
            description: "Este email ya está registrado en nuestra newsletter"
          });
          localStorage.setItem("newsletter-popup-interacted", "true");
          closeNewsletter();
          return;
        }
        throw error;
      }

      if (data?.error) {
        if (data.isDuplicate) {
          toast({
            title: "Ya estás suscrito",
            description: "Este email ya está registrado en nuestra newsletter"
          });
          localStorage.setItem("newsletter-popup-interacted", "true");
          closeNewsletter();
        } else {
          throw new Error(data.error);
        }
      } else if (data?.success) {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Newsletter Signup',
            content_category: 'Newsletter'
          });
        }
        
        toast({
          title: "¡Suscripción exitosa!",
          description: "Recibirás ofertas exclusivas y novedades."
        });
        localStorage.setItem("newsletter-popup-interacted", "true");
        closeNewsletter();
      }
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeNewsletter}>
      <DialogContent className="max-w-[380px] p-0 border-0 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute right-3 top-3 z-10 rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 space-y-5">
            {/* Header */}
            <DialogHeader className="space-y-3 text-center">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Únete a Garett Beauty
              </DialogTitle>
              <DialogDescription className="text-sm text-white/80 leading-relaxed">
                Suscríbete y recibe ofertas exclusivas, novedades y consejos de belleza directamente en tu email.
              </DialogDescription>
            </DialogHeader>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Tu email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="h-12 pl-10 text-sm bg-white border-0 placeholder:text-muted-foreground/70" 
                  required 
                  disabled={isLoading} 
                />
              </div>

              <div className="flex items-start space-x-2.5">
                <Checkbox 
                  id="marketing" 
                  checked={acceptsMarketing} 
                  onCheckedChange={checked => setAcceptsMarketing(checked as boolean)} 
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-primary" 
                  disabled={isLoading} 
                />
                <label htmlFor="marketing" className="text-xs leading-relaxed text-white/70 cursor-pointer">
                  Acepto recibir emails con ofertas y novedades. Puedo cancelar en cualquier momento.
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-semibold bg-white text-primary hover:bg-white/90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Suscribirme'
                )}
              </Button>

              <button 
                type="button" 
                onClick={handleClose} 
                className="w-full text-xs text-white/60 hover:text-white/90 transition-colors py-1" 
                disabled={isLoading}
              >
                No, gracias
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
