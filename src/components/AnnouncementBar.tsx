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
      setCurrentMessageIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  // Check if dismissed in localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-bar-dismissed');
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
    localStorage.setItem('announcement-bar-dismissed', new Date().toISOString());
  };

  if (!isVisible || activeBanners.length === 0) {
    return null;
  }

  const messages: Record<string, { text: string; link: string; icon: any; bg: string }> = {
    gwp: {
      text: "🎁 Regalo gratis en compras desde €70 - Banda de pelo premium",
      link: "/productos",
      icon: Gift,
      bg: "bg-primary text-primary-foreground",
    },
    whiteWeek: {
      text: "✨ White Week: 20% de descuento en toda la tienda con WHITEWEEK20",
      link: "/productos",
      icon: Percent,
      bg: "bg-accent text-accent-foreground",
    },
    blackFriday: {
      text: currentStage?.name === 'Black Friday' 
        ? `🔥 BLACK FRIDAY EN VIVO: Hasta ${currentStage.baseDiscount}% de descuento + Regalo gratis`
        : "🔥 Black Friday: Hasta 50% de descuento + Regalo gratis (28-30 Nov)",
      link: "/black-friday",
      icon: Flame,
      bg: "bg-destructive text-destructive-foreground",
    },
    cyberMonday: {
      text: "⚡ ÚLTIMA OPORTUNIDAD: Cyber Monday 15% con CYBERMONDAY15 - Solo 24h",
      link: "/productos",
      icon: Percent,
      bg: "bg-promo-cm-start text-white",
    },
  };

  const currentBanner = activeBanners[currentMessageIndex];
  const message = messages[currentBanner];

  if (!message) return null;

  const Icon = message.icon;

  return (
    <div className={`${message.bg} sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          <div className="flex-1" />
          
          <Link 
            to={message.link}
            className="flex items-center gap-2 text-sm md:text-base font-medium hover:underline text-center"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{message.text}</span>
          </Link>

          <div className="flex-1 flex justify-end">
            <button
              onClick={handleDismiss}
              className="hover:opacity-70 transition-opacity p-1"
              aria-label="Cerrar anuncio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
