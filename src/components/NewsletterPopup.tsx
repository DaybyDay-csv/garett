import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Bell, X, Loader2, Calendar, Tag, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAllStagesWithStatus, getPromotionalProgress, getCurrentPromotionalStage, getNextPromotionalStage } from "@/lib/promotions";

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const stagesWithStatus = getAllStagesWithStatus();
  const progress = getPromotionalProgress();
  const currentStage = getCurrentPromotionalStage();
  const nextStage = getNextPromotionalStage();

  useEffect(() => {
    const hasInteracted = localStorage.getItem("newsletter-popup-interacted");
    
    if (!hasInteracted) {
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-2 border-primary/20">
        <div className="relative">
          {/* Premium Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-background/80 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative p-6 sm:p-8">
            {/* Icon Badge */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-primary/10 p-4 rounded-full border border-primary/20">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            <DialogHeader className="text-center space-y-3 mb-6">
              <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                🔔 No Te Pierdas Ninguna Oferta
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                Recibe alertas exclusivas cuando comience cada nueva etapa promocional
              </DialogDescription>
            </DialogHeader>

            {/* Progress Bar Section */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Calendario Promocional</span>
                <span className="font-semibold text-primary">
                  Etapa {progress.currentStageIndex + 1} de {progress.totalStages}
                </span>
              </div>
              <Progress value={progress.progressPercentage} className="h-2" />
              
              {/* Current Status */}
              {currentStage ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-medium text-primary">¡{currentStage.name} ACTIVA AHORA!</span>
                  </div>
                </div>
              ) : nextStage ? (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Próxima etapa: <strong>{nextStage.name}</strong></span>
                </div>
              ) : null}
            </div>

            {/* Timeline of Stages */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-center mb-4">
                📅 Calendario de Ofertas Progresivas
              </h3>
              {stagesWithStatus.map((stage, index) => {
                const Icon = stage.icon;
                const isActive = stage.status === 'active';
                const isCompleted = stage.status === 'completed';
                const isUpcoming = stage.status === 'upcoming';
                
                return (
                  <div
                    key={stage.name}
                    className={`
                      relative p-4 rounded-lg border-2 transition-all
                      ${isActive ? 'border-primary bg-primary/5 shadow-lg' : ''}
                      ${isCompleted ? 'border-border/50 bg-muted/30 opacity-60' : ''}
                      ${isUpcoming ? 'border-border bg-background' : ''}
                    `}
                  >
                    {/* Stage Number Badge */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>

                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`
                        p-2 rounded-lg shrink-0
                        ${isActive ? 'bg-primary/20 animate-pulse' : 'bg-muted'}
                      `}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`font-bold text-sm ${isActive ? 'text-primary' : ''}`}>
                            {stage.name}
                          </h4>
                          {isActive && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold shrink-0">
                              ACTIVA
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                              Finalizada
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{stage.dates}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span className="font-semibold text-foreground">{stage.discount}</span>
                          </div>
                          {stage.code && (
                            <span className="bg-muted px-2 py-0.5 rounded font-mono text-[10px]">
                              {stage.code}
                            </span>
                          )}
                        </div>

                        {/* Days Remaining */}
                        {stage.daysRemaining !== undefined && (
                          <div className={`
                            text-xs font-medium
                            ${isActive ? 'text-primary' : 'text-muted-foreground'}
                          `}>
                            {isActive ? (
                              <>⏰ Termina en {stage.daysRemaining} {stage.daysRemaining === 1 ? 'día' : 'días'}</>
                            ) : (
                              <>🔔 Comienza en {stage.daysRemaining} {stage.daysRemaining === 1 ? 'día' : 'días'}</>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-center leading-relaxed">
                <strong className="text-primary">Los suscriptores VIP reciben alertas 24h antes</strong>
                <br />
                <span className="text-muted-foreground">
                  No te pierdas ofertas de hasta -25% + códigos exclusivos
                </span>
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Tu email para recibir alertas VIP"
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
                  Sí, quiero recibir notificación al inicio de cada etapa promocional. Puedo cancelar cuando quiera.
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
                      Activando...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 mr-2" />
                      Activar Mis Alertas VIP
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  No gracias, prefiero perder las mejores ofertas
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                🔒 100% seguro. Sin spam. Cancela cuando quieras.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
