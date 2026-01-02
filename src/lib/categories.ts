// Configuración centralizada de categorías
export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  tags: string[]; // Todas las variantes de tags que pueden usar los productos
  disclaimer?: string; // Aviso de precaución para la categoría
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  'terapia-luz-led': {
    slug: 'terapia-luz-led',
    name: 'Terapia de Luz LED',
    description: 'Dispositivos de fototerapia LED para rejuvenecimiento y tratamiento de la piel',
    tags: ['category:terapia-luz-led'],
    disclaimer: 'No recomendado para personas con patologías oculares (glaucoma, desprendimiento de retina), epilepsia fotosensible o medicación fotosensibilizante. Consulta con un profesional sanitario antes de su uso.'
  },
  'cuidado-capilar': {
    slug: 'cuidado-capilar',
    name: 'Cuidado Capilar',
    description: 'Dispositivos profesionales para el cuidado y styling del cabello',
    tags: ['category:cuidado-capilar', 'category:capilar'],
    disclaimer: 'Evitar uso sobre cuero cabelludo irritado, heridas abiertas o infecciones cutáneas. Mantener alejado del agua durante su uso.'
  },
  'masajeadores-faciales': {
    slug: 'masajeadores-faciales',
    name: 'Masajeadores Faciales',
    description: 'Tecnología avanzada para rejuvenecimiento facial y lifting natural',
    tags: ['category:masajeadores-faciales'],
    disclaimer: 'No usar con implantes metálicos faciales, marcapasos, durante el embarazo o sobre piel con infecciones activas. En caso de patologías cutáneas, consultar con un dermatólogo.'
  },
  'limpieza-facial': {
    slug: 'limpieza-facial',
    name: 'Limpieza Facial',
    description: 'Cepillos y dispositivos sónicos para limpieza profunda',
    tags: ['category:limpieza-facial'],
    disclaimer: 'Evitar uso sobre acné severo, rosácea activa, eczema o piel con heridas. No compartir el dispositivo por higiene.'
  },
  'mesoterapia': {
    slug: 'mesoterapia',
    name: 'Mesoterapia',
    description: 'Dispositivos de electroporación para máxima absorción de activos',
    tags: ['category:mesoterapia'],
    disclaimer: 'No usar con marcapasos, implantes metálicos, durante el embarazo o sobre piel con heridas, infecciones o inflamación activa. Consultar con un profesional sanitario en caso de enfermedades cutáneas.'
  },
  'corporales': {
    slug: 'corporales',
    name: 'Cuidado Corporal',
    description: 'Tratamientos profesionales para celulitis y reafirmación',
    tags: ['category:corporales'],
    disclaimer: 'No usar con marcapasos, implantes metálicos, durante el embarazo, sobre varices pronunciadas o áreas con inflamación. Consultar con un médico si tienes problemas circulatorios.'
  },
  'depilacion-ipl': {
    slug: 'depilacion-ipl',
    name: 'Depilación IPL',
    description: 'Tecnología de luz pulsada para depilación permanente en casa',
    tags: ['category:depilacion-ipl', 'category:ipl'],
    disclaimer: 'No apto para pieles muy oscuras (fototipos V-VI), tatuajes, lunares o zonas pigmentadas. No usar durante el embarazo, con medicación fotosensibilizante o sobre piel irritada. Evitar exposición solar intensa antes y después del tratamiento.'
  },
  'smartwatches': {
    slug: 'smartwatches',
    name: 'Smartwatches',
    description: 'Relojes inteligentes para seguimiento de actividad y salud',
    tags: ['category:smartwatches']
  },
  'accesorios': {
    slug: 'accesorios',
    name: 'Accesorios',
    description: 'Recambios y accesorios para tus dispositivos',
    tags: ['category:accesorios', 'category:accessories']
  }
};

// Helper para obtener la categoría desde los tags del producto
export const getCategoryFromTags = (tags: string[]): CategoryConfig | null => {
  for (const [slug, category] of Object.entries(CATEGORIES)) {
    // Verificar si alguno de los tags del producto coincide con los tags de la categoría
    const hasMatchingTag = tags.some(productTag => 
      category.tags.includes(productTag)
    );
    
    if (hasMatchingTag) {
      return category;
    }
  }
  return null;
};

// Helper para verificar si un producto pertenece a una categoría
export const productBelongsToCategory = (productTags: string[], categorySlug: string): boolean => {
  const category = CATEGORIES[categorySlug];
  if (!category) return false;
  
  return productTags.some(productTag => 
    category.tags.includes(productTag)
  );
};
