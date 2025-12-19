import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
      <div className="bg-[#8B2635] text-white rounded-lg shadow-lg p-2 pr-6 max-w-[180px] relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0.5 right-0.5 h-4 w-4 text-white/70 hover:text-white hover:bg-white/20"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-2.5 w-2.5" />
        </Button>

        {/* Stage info */}
        <div className="flex items-center gap-1 mb-1">
          <StageIcon className="w-2.5 h-2.5" />
          <span className="font-semibold text-[10px]">{currentStage.badge}</span>
        </div>
        
        <div className="flex gap-0.5">
          {timeLeft.days > 0 && (
            <div className="bg-white/20 rounded px-1 py-0.5 min-w-[24px] text-center">
              <div className="text-[10px] font-bold tabular-nums">{timeLeft.days}</div>
              <div className="text-[6px] opacity-70">días</div>
            </div>
          )}
          <div className="bg-white/20 rounded px-1 py-0.5 min-w-[24px] text-center">
            <div className="text-[10px] font-bold tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-[6px] opacity-70">hrs</div>
          </div>
          <div className="bg-white/20 rounded px-1 py-0.5 min-w-[24px] text-center">
            <div className="text-[10px] font-bold tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-[6px] opacity-70">min</div>
          </div>
          <div className="bg-white/20 rounded px-1 py-0.5 min-w-[24px] text-center">
            <div className="text-[10px] font-bold tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-[6px] opacity-70">seg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
