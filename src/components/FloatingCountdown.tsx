import { useEffect, useState } from "react";
import { X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`bg-gradient-to-br ${currentStage.color} text-white rounded-2xl shadow-2xl p-4 pr-12 max-w-sm border-2 border-white/30 backdrop-blur-sm relative`}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Stage info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <StageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs opacity-90 uppercase tracking-wide">Oferta Activa</div>
            <div className="font-bold text-lg leading-tight">{currentStage.badge}</div>
          </div>
        </div>

        {/* Discount badge */}
        <Badge className="bg-white/30 text-white border-0 mb-3">
          {currentStage.discount}
          {currentStage.code && ` · ${currentStage.code}`}
        </Badge>

        {/* Countdown */}
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-xs opacity-90">Termina en:</span>
        </div>
        
        <div className="flex gap-2">
          {timeLeft.days > 0 && (
            <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[44px] text-center">
              <div className="text-xl font-bold tabular-nums">{timeLeft.days}</div>
              <div className="text-[10px] opacity-80">días</div>
            </div>
          )}
          <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[44px] text-center">
            <div className="text-xl font-bold tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-[10px] opacity-80">hrs</div>
          </div>
          <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[44px] text-center">
            <div className="text-xl font-bold tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-[10px] opacity-80">min</div>
          </div>
          <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[44px] text-center">
            <div className="text-xl font-bold tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-[10px] opacity-80">seg</div>
          </div>
        </div>

        {/* Urgency indicator */}
        {timeLeft.days === 0 && timeLeft.hours < 6 && (
          <div className="mt-3 text-xs bg-white/20 rounded-lg px-3 py-1.5 text-center font-medium animate-pulse">
            ⚡ ¡Últimas horas!
          </div>
        )}
      </div>
    </div>
  );
};
