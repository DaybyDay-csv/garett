import { useState, useEffect } from "react";
import { X, Gift, Percent, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { getActiveBanners } from "@/lib/bannerConfig";
import { getCurrentPromotionalStage } from "@/lib/promotions";
export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const activeBanners = getActiveBanners(false);
  const currentStage = getCurrentPromotionalStage();

  // Rotate messages every 5 seconds if multiple
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  // Check if dismissed in localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-bar-dismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      // Show again after 24 hours
      if (now.getTime() - dismissedDate.getTime() < 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-bar-dismissed", new Date().toISOString());
  };
  if (!isVisible || activeBanners.length === 0) {
    return null;
  }
  const messages: Record<string, {
    text: string;
    link: string;
    icon: any;
    bg: string;
  }> = {
    gwp: {
      text: "Regalo gratis en compras desde €70 - Banda de pelo premium",
      link: "/productos",
      icon: Gift,
      bg: "bg-primary text-primary-foreground"
    },
    whiteWeek: {
      text: "White Week: 10% de descuento en toda la tienda",
      link: "/productos",
      icon: Percent,
      bg: "bg-accent text-accent-foreground"
    },
    blackFriday: {
      text: currentStage?.name === "Black Friday" ? `BLACK FRIDAY EN VIVO: Hasta ${currentStage.baseDiscount}% de descuento + Regalo gratis` : "Black Friday: HASTA 50% de DESCUENTO + Regalo gratis (28-30 Nov)",
      link: "/black-friday",
      icon: Flame,
      bg: "bg-destructive text-destructive-foreground"
    },
    cyberMonday: {
      text: "Cyber Monday 20% - Solo 24h",
      link: "/productos",
      icon: Percent,
      bg: "bg-promo-cm-start text-white"
    }
  };
  const currentBanner = activeBanners[currentMessageIndex];
  const message = messages[currentBanner];
  if (!message) return null;
  const Icon = message.icon;
  return <div className={`${message.bg} sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-center py-2 md:py-3 gap-2 md:gap-4">
          <Link to={message.link} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-base font-medium hover:underline text-center justify-center">
            <Icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="line-clamp-2 sm:line-clamp-1">{message.text}</span>
          </Link>

          
        </div>
      </div>
    </div>;
};