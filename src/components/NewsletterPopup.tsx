import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Bell, Loader2, Calendar, Tag, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAllStagesWithStatus, getPromotionalProgress, getCurrentPromotionalStage, getNextPromotionalStage } from "@/lib/promotions";
import { useNewsletterStore } from "@/stores/newsletterStore";
export const NewsletterPopup = () => {
  const isOpen = useNewsletterStore(state => state.isOpen);
  const closeNewsletter = useNewsletterStore(state => state.closeNewsletter);
  const [email, setEmail] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  const {
    toast
  } = useToast();
  const stagesWithStatus = getAllStagesWithStatus();
  const progress = getPromotionalProgress();
  const currentStage = getCurrentPromotionalStage();
  const nextStage = getNextPromotionalStage();

  // Live countdown update
  useEffect(() => {
    const updateCountdown = () => {
      const targetStage = currentStage || nextStage;
      if (!targetStage) return;
      const now = new Date();
      const targetDate = currentStage ? targetStage.endDate : targetStage.startDate;
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
        setCountdown({
          days,
          hours,
          minutes
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currentStage, nextStage]);
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
      const {
        data,
        error
      } = await supabase.functions.invoke('newsletter-signup', {
        body: {
          email,
          acceptsMarketing
        }
      });

      // Handle HTTP errors (400, 500, etc)
      if (error) {
        // Try to parse the error context for duplicate detection
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

      // Handle application-level errors in response data
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
        toast({
          title: "¡Suscripción exitosa!",
          description: "Gracias por suscribirte. Recibirás notificaciones de cada etapa."
        });
        localStorage.setItem("newsletter-popup-interacted", "true");
        closeNewsletter();
      }
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const targetStage = currentStage || nextStage;
  const isActiveStage = !!currentStage;
  return <Dialog open={isOpen} onOpenChange={closeNewsletter}>
      <DialogContent className="sm:max-w-[480px] p-0 border border-border/50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 pointer-events-none" />
          
          <button onClick={handleClose} className="absolute right-3 top-3 z-10 rounded-sm p-1.5 opacity-60 hover:opacity-100 transition-opacity" aria-label="Cerrar">
            
          </button>

          <div className="relative p-6 space-y-6">
            {/* Header */}
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-xl font-semibold tracking-tight text-center">
                Calendario de Ofertas Progresivas
              </DialogTitle>
              <DialogDescription className="text-sm text-center text-muted-foreground">
                Recibe notificaciones al inicio de cada etapa
              </DialogDescription>
            </DialogHeader>

            {/* Progress Timeline */}
            <div className="space-y-4">
              {/* Progress Bar with Stages */}
              <div className="relative p-4 bg-muted/40 rounded-lg border border-border/60">
                <Progress value={progress.progressPercentage} className="h-2" />
                <div className="flex justify-between mt-3">
                  {stagesWithStatus.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = stage.status === 'active';
                  const isCompleted = stage.status === 'completed';
                  return <div key={stage.name} className="flex flex-col items-center gap-1.5 flex-1">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                          ${isActive ? 'border-primary bg-primary/20 scale-110 shadow-lg shadow-primary/20' : ''}
                          ${isCompleted ? 'border-primary/40 bg-muted/80' : ''}
                          ${stage.status === 'upcoming' ? 'border-border/80 bg-muted/30' : ''}
                        `}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className={`text-[10px] font-medium text-center leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stage.name}
                        </span>
                        <span className={`text-[10px] font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                          {stage.name === 'Black Friday' ? 'HASTA 50%' : stage.discount}
                        </span>
                      </div>;
                })}
                </div>
              </div>

              {/* Live Countdown */}
              {targetStage && <div className="bg-muted/80 rounded-lg p-4 space-y-2 border border-border/60">
                  <div className="text-center">
                    <p className="text-xs text-foreground/70 mb-2 font-medium">
                      {isActiveStage ? 'Termina en' : 'Comienza en'}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold tabular-nums text-foreground">{countdown.days}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Días</div>
                      </div>
                      <div className="text-2xl font-light text-muted-foreground">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold tabular-nums text-foreground">{countdown.hours}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Horas</div>
                      </div>
                      <div className="text-2xl font-light text-muted-foreground">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold tabular-nums text-foreground">{countdown.minutes}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Min</div>
                      </div>
                    </div>
                    <p className="text-xs font-medium mt-2 text-foreground">
                      {isActiveStage ? <>{targetStage.name} <span className="text-primary font-semibold">{targetStage.discount}</span></> : <>Próxima etapa: <span className="text-primary font-semibold">{targetStage.name}</span></>}
                    </p>
                  </div>
                </div>}

              {/* Stage Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {stagesWithStatus.map(stage => <div key={stage.name} className="flex items-center justify-between p-2 bg-muted/60 rounded border border-border/50">
                    <span className="text-foreground/70">{stage.dates}</span>
                    <span className="font-semibold text-foreground">{stage.discount}</span>
                  </div>)}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="h-11 text-sm" required disabled={isLoading} />

              <div className="flex items-start space-x-2">
                <Checkbox id="marketing" checked={acceptsMarketing} onCheckedChange={checked => setAcceptsMarketing(checked as boolean)} className="mt-0.5" disabled={isLoading} />
                <label htmlFor="marketing" className="text-xs leading-relaxed text-muted-foreground cursor-pointer">
                  Acepto recibir notificaciones de nuevas etapas. Cancelable en cualquier momento.
                </label>
              </div>

              <Button type="submit" className="w-full h-11 text-sm font-semibold" disabled={isLoading}>
                {isLoading ? <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando
                  </> : 'Activar Notificaciones'}
              </Button>

              <button type="button" onClick={handleClose} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors" disabled={isLoading}>
                Continuar sin notificaciones
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};