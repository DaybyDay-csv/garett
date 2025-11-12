import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNewsletterStore } from "@/stores/newsletterStore";
import { cn } from "@/lib/utils";
interface NewsletterCTAProps {
  variant?: "default" | "inline" | "card";
  size?: "sm" | "default" | "lg";
  text?: string;
  className?: string;
}
export const NewsletterCTA = ({
  variant = "inline",
  size = "sm",
  text = "Recibe las ofertas",
  className
}: NewsletterCTAProps) => {
  const openNewsletter = useNewsletterStore(state => state.openNewsletter);
  if (variant === "inline") {
    return <Button 
      onClick={openNewsletter} 
      variant="outline" 
      size="sm"
      className={cn("gap-2", className)}
    >
      <Bell className="w-4 h-4" />
      {text}
    </Button>;
  }
  if (variant === "card") {
    return <div className={cn("bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all", className)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">No te pierdas ninguna oferta</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Recibe notificaciones de cada etapa de descuentos y ofertas exclusivas
            </p>
            <Button onClick={openNewsletter} variant="default" size="sm">
              Notificarme
            </Button>
          </div>
        </div>
      </div>;
  }
  return <Button onClick={openNewsletter} variant="outline" size={size} className={cn("gap-2", className)}>
      <Bell className="w-4 h-4" />
      {text}
    </Button>;
};