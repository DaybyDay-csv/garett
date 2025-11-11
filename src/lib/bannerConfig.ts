export interface BannerConfig {
  id: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  priority: number;
  showInCarousel: boolean;
  showInAnnouncementBar: boolean;
}

export const bannerConfig: Record<string, BannerConfig> = {
  aeroglow: {
    id: 'aeroglow',
    active: true,
    startDate: new Date('2024-01-01'), // Active now for demo
    endDate: new Date('2026-12-31'),
    priority: 3,
    showInCarousel: true,
    showInAnnouncementBar: false,
  },
  gwp: {
    id: 'gwp',
    active: true,
    startDate: new Date('2024-01-01'), // Active now for demo
    endDate: new Date('2026-12-31'),
    priority: 2,
    showInCarousel: true,
    showInAnnouncementBar: true,
  },
  whiteWeek: {
    id: 'whiteWeek',
    active: true,
    startDate: new Date('2024-01-01'), // Active now for demo
    endDate: new Date('2026-12-31'),
    priority: 4,
    showInCarousel: true,
    showInAnnouncementBar: true,
  },
  blackFriday: {
    id: 'blackFriday',
    active: true,
    startDate: new Date('2024-01-01'), // Active now for demo
    endDate: new Date('2026-12-31'),
    priority: 5,
    showInCarousel: true,
    showInAnnouncementBar: true,
  },
  cyberMonday: {
    id: 'cyberMonday',
    active: true,
    startDate: new Date('2024-01-01'), // Active now for demo
    endDate: new Date('2026-12-31'),
    priority: 5,
    showInCarousel: true,
    showInAnnouncementBar: true,
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

export const gwpConfig = {
  threshold: 70,
  giftName: "Banda de pelo premium",
  giftImage: "/src/assets/gwp-headband.png",
  conditions: "En compras desde €70",
};
