// Configuración centralizada de categorías
export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  tags: string[]; // Todas las variantes de tags que pueden usar los productos
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  'cuidado-capilar': {
    slug: 'cuidado-capilar',
    name: 'Cuidado Capilar',
    description: 'Dispositivos profesionales para el cuidado y styling del cabello',
    tags: ['category:cuidado-capilar', 'category:capilar']
  },
  'masajeadores-faciales': {
    slug: 'masajeadores-faciales',
    name: 'Masajeadores Faciales',
    description: 'Tecnología avanzada para rejuvenecimiento facial y lifting natural',
    tags: ['category:masajeadores-faciales']
  },
  'limpieza-facial': {
    slug: 'limpieza-facial',
    name: 'Limpieza Facial',
    description: 'Cepillos y dispositivos sónicos para limpieza profunda',
    tags: ['category:limpieza-facial']
  },
  'mesoterapia': {
    slug: 'mesoterapia',
    name: 'Mesoterapia',
    description: 'Dispositivos de electroporación para máxima absorción de activos',
    tags: ['category:mesoterapia']
  },
  'corporales': {
    slug: 'corporales',
    name: 'Cuidado Corporal',
    description: 'Tratamientos profesionales para celulitis y reafirmación',
    tags: ['category:corporales']
  },
  'depilacion-ipl': {
    slug: 'depilacion-ipl',
    name: 'Depilación IPL',
    description: 'Tecnología de luz pulsada para depilación permanente en casa',
    tags: ['category:depilacion-ipl', 'category:ipl']
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
