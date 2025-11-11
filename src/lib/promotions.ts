import { Timer, Zap, Flame } from "lucide-react";

export interface PromotionalStage {
  name: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  baseDiscount: number; // Percentage as a number (e.g., 10 for 10%)
  discount: string; // Display string like "-10%"
  discountLabel: string; // Same as discount
  badge: string;
  code?: string | null; // Optional discount code for the stage
  icon: any;
  color: string;
  hasGWP?: boolean; // Whether this stage includes Gift With Purchase
}

export const promotionalStages: PromotionalStage[] = [
  {
    name: "Warm-up",
    dates: "10-16 Noviembre",
    startDate: new Date('2025-11-10T00:00:00'),
    endDate: new Date('2025-11-16T23:59:59'),
    baseDiscount: 10,
    discount: "-10%",
    discountLabel: "-10%",
    badge: "WARM-UP",
    code: null,
    icon: Timer,
    color: "from-blue-500 to-cyan-500",
    hasGWP: true // Enable GWP during Warm-up
  },
  {
    name: "White Week",
    dates: "17-27 Noviembre",
    startDate: new Date('2025-11-17T00:00:00'),
    endDate: new Date('2025-11-27T23:59:59'),
    baseDiscount: 20,
    discount: "-20%",
    discountLabel: "-20%",
    badge: "WHITE WEEK",
    code: "WHITEWEEK20",
    icon: Zap,
    color: "from-slate-400 to-slate-600",
    hasGWP: true
  },
  {
    name: "Black Friday",
    dates: "28-30 Noviembre",
    startDate: new Date('2025-11-28T00:00:00'),
    endDate: new Date('2025-11-30T23:59:59'),
    baseDiscount: 25, // Base discount only, tiers are manual codes
    discount: "-25% + códigos",
    discountLabel: "-25% + códigos",
    badge: "BLACK FRIDAY",
    code: null, // Codes are tiered for Black Friday
    icon: Flame,
    color: "from-red-500 to-orange-500",
    hasGWP: true
  },
  {
    name: "Cyber Monday",
    dates: "1 Diciembre",
    startDate: new Date('2025-12-01T00:00:00'),
    endDate: new Date('2025-12-01T23:59:59'),
    baseDiscount: 15,
    discount: "-15%",
    discountLabel: "-15%",
    badge: "CYBER MONDAY",
    code: "CYBERMONDAY15",
    icon: Zap,
    color: "from-indigo-500 to-purple-500",
    hasGWP: true
  }
];

/**
 * Get the currently active promotional stage
 */
export const getCurrentPromotionalStage = (): PromotionalStage | null => {
  const now = new Date();
  return promotionalStages.find(stage => 
    now >= stage.startDate && now <= stage.endDate
  ) || null;
};

/**
 * Calculate discounted price based on current promotional stage
 * @param originalPrice - Original price as string
 * @returns Object with original price, discounted price, discount percentage, and stage info
 */
export const calculatePromotionalPrice = (originalPrice: string) => {
  const currentStage = getCurrentPromotionalStage();
  const price = parseFloat(originalPrice);
  
  if (!currentStage || isNaN(price)) {
    return {
      originalPrice: price,
      discountedPrice: price,
      discountPercentage: 0,
      hasDiscount: false,
      stage: null
    };
  }
  
  const discountedPrice = price * (1 - currentStage.baseDiscount / 100);
  
  return {
    originalPrice: price,
    discountedPrice: discountedPrice,
    discountPercentage: currentStage.baseDiscount,
    hasDiscount: true,
    stage: currentStage,
    discountLabel: currentStage.discountLabel
  };
};

/**
 * Format price with currency
 */
export const formatPrice = (amount: number, currencyCode: string = 'EUR'): string => {
  return `${amount.toFixed(2)} ${currencyCode}`;
};

/**
 * Get the next upcoming promotional stage
 */
export const getNextPromotionalStage = (): PromotionalStage | null => {
  const now = new Date();
  return promotionalStages.find(stage => now < stage.startDate) || null;
};

/**
 * Calculate days until a specific stage starts
 */
export const getDaysUntilStage = (stage: PromotionalStage): number => {
  const now = new Date();
  const diffTime = stage.startDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get promotional progress (which stage is active/next)
 */
export const getPromotionalProgress = (): {
  currentStageIndex: number;
  totalStages: number;
  progressPercentage: number;
} => {
  const now = new Date();
  const currentStage = getCurrentPromotionalStage();
  
  if (currentStage) {
    const index = promotionalStages.findIndex(s => s.name === currentStage.name);
    return {
      currentStageIndex: index,
      totalStages: promotionalStages.length,
      progressPercentage: ((index + 1) / promotionalStages.length) * 100
    };
  }
  
  const nextStage = getNextPromotionalStage();
  if (nextStage) {
    const index = promotionalStages.findIndex(s => s.name === nextStage.name);
    return {
      currentStageIndex: index > 0 ? index - 1 : 0,
      totalStages: promotionalStages.length,
      progressPercentage: (index / promotionalStages.length) * 100
    };
  }
  
  return {
    currentStageIndex: promotionalStages.length - 1,
    totalStages: promotionalStages.length,
    progressPercentage: 100
  };
};

/**
 * Get all stages with their current status
 */
export const getAllStagesWithStatus = (): Array<PromotionalStage & { 
  status: 'completed' | 'active' | 'upcoming';
  daysRemaining?: number;
}> => {
  const now = new Date();
  const currentStage = getCurrentPromotionalStage();
  
  return promotionalStages.map(stage => {
    let status: 'completed' | 'active' | 'upcoming';
    let daysRemaining: number | undefined;
    
    if (now > stage.endDate) {
      status = 'completed';
    } else if (currentStage && currentStage.name === stage.name) {
      status = 'active';
      daysRemaining = Math.ceil((stage.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else if (now < stage.startDate) {
      status = 'upcoming';
      daysRemaining = getDaysUntilStage(stage);
    } else {
      status = 'completed';
    }
    
    return {
      ...stage,
      status,
      daysRemaining
    };
  });
};
