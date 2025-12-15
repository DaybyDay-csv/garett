import { Timer, Zap, Flame, Gift, Snowflake } from "lucide-react";

export interface PromotionalStage {
  name: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  baseDiscount: number; // Percentage as a number (e.g., 10 for 10%)
  bundleExtraDiscount: number; // Extra discount for bundles during this stage
  discount: string; // Display string like "-10%"
  discountLabel: string; // Same as discount
  badge: string;
  code?: string | null; // Optional discount code for the stage
  icon: any;
  color: string;
  hasGWP?: boolean; // Whether this stage includes Gift With Purchase
  eciDiscount?: number; // El Corte Inglés discount for comparison
}

// Christmas Campaign Stages 2024
export const promotionalStages: PromotionalStage[] = [
  {
    name: "Pre-Navidad",
    dates: "1-10 Dic",
    startDate: new Date('2024-12-01T00:00:00'),
    endDate: new Date('2024-12-10T23:59:59'),
    baseDiscount: 10,
    bundleExtraDiscount: 0,
    discount: "-10%",
    discountLabel: "-10%",
    badge: "NAVIDAD",
    code: "NAVIDAD10",
    icon: Snowflake,
    color: "from-emerald-600 to-red-600",
    hasGWP: true,
    eciDiscount: 0
  },
  {
    name: "Semana Navidad 1",
    dates: "11-15 Dic",
    startDate: new Date('2024-12-11T00:00:00'),
    endDate: new Date('2024-12-15T23:59:59'),
    baseDiscount: 20,
    bundleExtraDiscount: 10, // +10% extra for bundles
    discount: "-20%",
    discountLabel: "-20%",
    badge: "NAVIDAD -20%",
    code: "NAVIDAD20",
    icon: Gift,
    color: "from-red-700 to-emerald-700",
    hasGWP: true,
    eciDiscount: 15
  },
  {
    name: "Puente",
    dates: "16 Dic",
    startDate: new Date('2024-12-16T00:00:00'),
    endDate: new Date('2024-12-16T23:59:59'),
    baseDiscount: 10,
    bundleExtraDiscount: 10, // Keep bundle extra
    discount: "-10%",
    discountLabel: "-10%",
    badge: "NAVIDAD",
    code: "NAVIDAD10",
    icon: Snowflake,
    color: "from-emerald-600 to-red-600",
    hasGWP: true,
    eciDiscount: 0
  },
  {
    name: "Semana Navidad 2",
    dates: "17-21 Dic",
    startDate: new Date('2024-12-17T00:00:00'),
    endDate: new Date('2024-12-21T23:59:59'),
    baseDiscount: 25,
    bundleExtraDiscount: 10, // +10% extra for bundles (or 5% if margin tight)
    discount: "-25%",
    discountLabel: "-25%",
    badge: "NAVIDAD -25%",
    code: "NAVIDAD25",
    icon: Flame,
    color: "from-red-800 to-emerald-800",
    hasGWP: true,
    eciDiscount: 20
  },
  {
    name: "Navidad-Reyes",
    dates: "22 Dic - 6 Ene",
    startDate: new Date('2024-12-22T00:00:00'),
    endDate: new Date('2025-01-06T23:59:59'),
    baseDiscount: 15,
    bundleExtraDiscount: 0,
    discount: "-15%",
    discountLabel: "-15%",
    badge: "REYES",
    code: "REYES15",
    icon: Gift,
    color: "from-amber-600 to-red-600",
    hasGWP: true,
    eciDiscount: 0
  }
];

// Bundle definitions with pricing
export interface ChristmasBundle {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  products: string[]; // Product handles
  originalValue: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
  icon: string; // Emoji or icon name
  benefits: string[];
}

export const christmasBundles: ChristmasBundle[] = [
  {
    id: "pack-relax-body-glow",
    name: "Pack Relax & Body Glow",
    subtitle: "Calm Skin + Cellu Body",
    description: "Ritual completo de relajación y cuidado corporal",
    products: ["calm-skin", "cellu-body"],
    originalValue: 236,
    bundlePrice: 205,
    savings: 31,
    savingsPercent: 13,
    icon: "✨",
    benefits: ["Relajación profunda", "Tonificación corporal", "Piel más suave"]
  },
  {
    id: "pack-duo-glow-led",
    name: "Pack Dúo Glow LED",
    subtitle: "2 Manoplas LED",
    description: "Terapia de luz LED para rostro y cuerpo",
    products: ["manopla-led-garett-beauty", "manopla-led-garett-beauty"],
    originalValue: 448,
    bundlePrice: 379,
    savings: 69,
    savingsPercent: 15,
    icon: "💡",
    benefits: ["Rejuvenecimiento dual", "Tratamiento completo", "Resultados visibles"]
  },
  {
    id: "pack-ritual-piel-nueva",
    name: "Pack Ritual Piel Nueva",
    subtitle: "Multiclean + Breeze Scrub + Pretty Face",
    description: "Rutina completa de renovación facial",
    products: ["multiclean", "breeze-scrub", "pretty-face"],
    originalValue: 265,
    bundlePrice: 235,
    savings: 30,
    savingsPercent: 11,
    icon: "🌸",
    benefits: ["Limpieza profunda", "Exfoliación suave", "Hidratación intensiva"]
  },
  {
    id: "pack-lifting-en-casa",
    name: "Pack Lifting en Casa",
    subtitle: "Multiclean + Fresh Skin Pro",
    description: "Efecto lifting profesional desde casa",
    products: ["multiclean", "fresh-skin-pro"],
    originalValue: 249,
    bundlePrice: 215,
    savings: 34,
    savingsPercent: 14,
    icon: "⬆️",
    benefits: ["Efecto tensor", "Limpieza profesional", "Piel rejuvenecida"]
  },
  {
    id: "pack-mirada-descansada",
    name: "Pack Mirada Descansada",
    subtitle: "Fresh Skin Pro + Fresh Eye",
    description: "Cuidado intensivo del contorno de ojos",
    products: ["fresh-skin-pro", "fresh-eye"],
    originalValue: 225.99,
    bundlePrice: 199,
    savings: 27,
    savingsPercent: 12,
    icon: "👁️",
    benefits: ["Reduce ojeras", "Minimiza arrugas", "Mirada luminosa"]
  },
  {
    id: "pack-glow-diario",
    name: "Pack Glow Diario",
    subtitle: "Pretty Face + Fresh Eye",
    description: "Tu rutina diaria de luminosidad",
    products: ["pretty-face", "fresh-eye"],
    originalValue: 143,
    bundlePrice: 125,
    savings: 18,
    savingsPercent: 13,
    icon: "☀️",
    benefits: ["Uso diario", "Luminosidad natural", "Fácil de usar"]
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
 * @param isBundle - Whether this is a bundle product
 * @returns Object with original price, discounted price, discount percentage, and stage info
 */
export const calculatePromotionalPrice = (originalPrice: string, isBundle: boolean = false) => {
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
  
  // Calculate total discount for bundles (base + extra)
  const totalDiscount = isBundle 
    ? currentStage.baseDiscount + currentStage.bundleExtraDiscount
    : currentStage.baseDiscount;
  
  const discountedPrice = price * (1 - totalDiscount / 100);
  
  return {
    originalPrice: price,
    discountedPrice: discountedPrice,
    discountPercentage: totalDiscount,
    hasDiscount: true,
    stage: currentStage,
    discountLabel: `-${totalDiscount}%`
  };
};

/**
 * Calculate bundle price with current promotional stage discounts
 */
export const calculateBundlePrice = (bundle: ChristmasBundle) => {
  const currentStage = getCurrentPromotionalStage();
  
  if (!currentStage) {
    return {
      originalValue: bundle.originalValue,
      bundleBasePrice: bundle.bundlePrice,
      finalPrice: bundle.bundlePrice,
      totalSavings: bundle.savings,
      totalSavingsPercent: bundle.savingsPercent,
      hasPromoDiscount: false,
      stage: null
    };
  }
  
  // Apply promotional discount to bundle price
  const promoDiscount = currentStage.baseDiscount + currentStage.bundleExtraDiscount;
  const finalPrice = bundle.bundlePrice * (1 - promoDiscount / 100);
  const totalSavings = bundle.originalValue - finalPrice;
  const totalSavingsPercent = Math.round((totalSavings / bundle.originalValue) * 100);
  
  return {
    originalValue: bundle.originalValue,
    bundleBasePrice: bundle.bundlePrice,
    finalPrice: Math.round(finalPrice * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    totalSavingsPercent,
    hasPromoDiscount: true,
    promoDiscount,
    stage: currentStage
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

/**
 * Check if we're in a high-discount period (for emphasis in UI)
 */
export const isHighDiscountPeriod = (): boolean => {
  const stage = getCurrentPromotionalStage();
  return stage ? stage.baseDiscount >= 20 : false;
};

/**
 * Get comparison message vs El Corte Inglés
 */
export const getECIComparisonMessage = (): string | null => {
  const stage = getCurrentPromotionalStage();
  if (!stage || !stage.eciDiscount) return null;
  
  const difference = stage.baseDiscount - stage.eciDiscount;
  return `${difference}% más descuento que en El Corte Inglés`;
};
