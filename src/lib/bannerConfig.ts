export interface BannerConfig {
  id: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  priority: number;
  showInCarousel: boolean;
  showInAnnouncementBar: boolean;
}

// Ninguna campaña activa: la última etapa real terminó el 2026-01-04
// (lib/promotions.ts). No marcar nada active "para demo": solo se activa
// una campaña con fechas reales y cuando el funnel la puede cumplir.
export const bannerConfig: Record<string, BannerConfig> = {
  aeroglow: {
    id: 'aeroglow',
    active: false,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-01-04T23:59:59'), // fin de la última campaña real
    priority: 3,
    showInCarousel: true,
    showInAnnouncementBar: false,
  },
  gwp: {
    id: 'gwp',
    // El carrito nunca concede el regalo (cartStore borra items GWP):
    // mantener inactivo hasta que el funnel lo conceda de verdad.
    active: false,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-01-04T23:59:59'), // fin de la última campaña real
    priority: 2,
    showInCarousel: true,
    showInAnnouncementBar: true,
  },
  whiteWeek: {
    id: 'whiteWeek',
    active: false,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-01-04T23:59:59'), // fin de la última campaña real
    priority: 4,
    showInCarousel: true,
    showInAnnouncementBar: true,
  },
  blackFriday: {
    id: 'blackFriday',
    active: false,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-01-04T23:59:59'), // fin de la última campaña real
    priority: 5,
    showInCarousel: false,
    showInAnnouncementBar: false,
  },
  cyberMonday: {
    id: 'cyberMonday',
    active: false,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-01-04T23:59:59'), // fin de la última campaña real
    priority: 5,
    showInCarousel: false,
    showInAnnouncementBar: false,
  },
};

export const getActiveBanners = (forCarousel = true): string[] => {
  const now = new Date();
  return Object.entries(bannerConfig)
    .filter(([_, config]) => {
      const isActive = config.active && now >= config.startDate && now <= config.endDate;
      return forCarousel ? isActive && config.showInCarousel : isActive && config.showInAnnouncementBar;
    })
    .sort(([_, a], [__, b]) => b.priority - a.priority)
    .map(([key]) => key);
};

// Datos del regalo SOLO si una campaña GWP llega a estar activa (hoy no lo
// está: el carrito no concede ningún regalo). No mostrar hasta entonces.
export const gwpConfig = {
  threshold: 70,
  giftName: "Banda de pelo premium",
  giftImage: "/src/assets/gwp-headband.png",
  conditions: "En compras desde €70",
};
