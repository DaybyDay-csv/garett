import { useEffect, useState } from "react";
import { X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentPromotionalStage } from "@/lib/promotions";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const FloatingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });
  const [currentStage, setCurrentStage] = useState<ReturnType<typeof getCurrentPromotionalStage> | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const calculateTimeAndStage = () => {
      const now = new Date();
      
      // Get current promotional stage from shared utility
      const activePromo = getCurrentPromotionalStage();

      setCurrentStage(activePromo);

      // If no active stage, hide widget
      if (!activePromo) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      // Calculate time left for current promotional stage
      const difference = activePromo.endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      });
    };

    // Initial calculation
    calculateTimeAndStage();

    // Update every second
    const timer = setInterval(calculateTimeAndStage, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't show if dismissed or no active stage
  if (isDismissed || !isVisible || !currentStage) {
    return null;
  }

  const StageIcon = currentStage.icon;

  return (
    <div className="fixed bottom-3 right-3 z-50 animate-fade-in">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-2.5 pr-8 max-w-[200px] relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-4 w-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-2.5 w-2.5" />
        </Button>

        {/* Stage info */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <StageIcon className="w-3 h-3" />
          <span className="font-semibold text-xs">{currentStage.badge}</span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1 mb-1">
          <Clock className="w-2.5 h-2.5 opacity-80" />
          <span className="text-[9px] opacity-80">Termina en:</span>
        </div>
        
        <div className="flex gap-1">
          {timeLeft.days > 0 && (
            <div className="bg-primary-foreground/20 rounded px-1 py-0.5 min-w-[28px] text-center">
              <div className="text-xs font-bold tabular-nums">{timeLeft.days}</div>
              <div className="text-[7px] opacity-70">días</div>
            </div>
          )}
          <div className="bg-primary-foreground/20 rounded px-1 py-0.5 min-w-[28px] text-center">
            <div className="text-xs font-bold tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-[7px] opacity-70">hrs</div>
          </div>
          <div className="bg-primary-foreground/20 rounded px-1 py-0.5 min-w-[28px] text-center">
            <div className="text-xs font-bold tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-[7px] opacity-70">min</div>
          </div>
          <div className="bg-primary-foreground/20 rounded px-1 py-0.5 min-w-[28px] text-center">
            <div className="text-xs font-bold tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-[7px] opacity-70">seg</div>
          </div>
        </div>

        {/* Urgency indicator */}
        {timeLeft.days === 0 && timeLeft.hours < 6 && (
          <div className="mt-1.5 text-[8px] bg-primary-foreground/20 rounded px-1.5 py-0.5 text-center font-medium animate-pulse">
            ⚡ ¡Últimas horas!
          </div>
        )}
      </div>
    </div>
  );
};
