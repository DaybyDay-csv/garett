import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
  compact?: boolean;
}

export const CountdownTimer = ({ targetDate, compact = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Clock className="w-4 h-4 text-red-500" />
        <span className="text-gray-300 font-mono">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center">
      <div className="flex flex-col items-center bg-gradient-to-br from-red-950/80 to-pink-950/80 rounded-lg p-2 min-w-[50px] border border-red-600/30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-red-500 font-mono">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Días</div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-br from-red-950/80 to-pink-950/80 rounded-lg p-2 min-w-[50px] border border-red-600/30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-red-500 font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Hrs</div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-br from-red-950/80 to-pink-950/80 rounded-lg p-2 min-w-[50px] border border-red-600/30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-red-500 font-mono">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Min</div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-br from-red-950/80 to-pink-950/80 rounded-lg p-2 min-w-[50px] border border-red-600/30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-red-500 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Seg</div>
      </div>
    </div>
  );
};
