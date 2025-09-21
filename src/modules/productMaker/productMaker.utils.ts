import * as types from "./productMaker.d";
import { defaultFormValidation } from "./productMaker.config";

// #region Validaciones
export interface ValidationError {
  field: keyof types.ProductBaseType;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Valida un producto completo antes de guardarlo
 */
export const validateProduct = (product: Partial<types.ProductBaseType>): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validar nombre
  if (!product.name?.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio' });
  } else if (product.name.trim().length < defaultFormValidation.name.minLength) {
    errors.push({ 
      field: 'name', 
      message: `El nombre debe tener al menos ${defaultFormValidation.name.minLength} caracteres` 
    });
  }

  // Validar descripción
  if (!product.description?.main?.trim()) {
    errors.push({ field: 'description', message: 'La descripción principal es obligatoria' });
  } else if (product.description.main.trim().length < defaultFormValidation.description.minLength) {
    errors.push({ 
      field: 'description', 
      message: `La descripción debe tener al menos ${defaultFormValidation.description.minLength} caracteres` 
    });
  }

  // Validar precio
  if (!product.price || product.price.value < 0) {
    errors.push({ field: 'price', message: 'El precio debe ser mayor o igual a 0' });
  }

  // Validar stock si está presente
  if (product.stock !== undefined && product.stock < 0) {
    errors.push({ field: 'stock', message: 'El stock no puede ser negativo' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida un campo específico del producto
 */
export const validateField = (
  field: keyof types.ProductBaseType, 
  value: unknown
): ValidationError | null => {
  switch (field) {
    case 'name':
      if (!value || typeof value !== 'string' || !value.trim()) {
        return { field, message: 'El nombre es obligatorio' };
      }
      if (value.trim().length < defaultFormValidation.name.minLength) {
        return { 
          field, 
          message: `El nombre debe tener al menos ${defaultFormValidation.name.minLength} caracteres` 
        };
      }
      break;

    case 'price': {
      if (!value || typeof value !== 'object' || !('value' in value)) {
        return { field, message: 'El precio es obligatorio' };
      }
      const price = value as types.PriceType;
      if (price.value < 0) {
        return { field, message: 'El precio no puede ser negativo' };
      }
      break;
    }

    case 'stock':
      if (value !== undefined && typeof value === 'number' && value < 0) {
        return { field, message: 'El stock no puede ser negativo' };
      }
      break;
  }

  return null;
};
// #endregion

// #region Formateo y Visualización
/**
 * Formatea el precio para mostrar en la UI
 */
export const formatPrice = (price: types.PriceType): string => {
  const currencySymbols: Record<types.MoneyTypes, string> = {
    pesos: '$',
    usd: '$',
    eur: '€'
  };

  const symbol = currencySymbols[price.type] || '$';
  const formattedValue = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price.value);

  return `${symbol}${formattedValue} ${price.type.toUpperCase()}`;
};

/**
 * Formatea el peso para mostrar en la UI
 */
export const formatWeight = (weight: types.WeightType): string => {
  if (!weight.value || !weight.unit) return '';
  return `${weight.value} ${weight.unit}`;
};

/**
 * Formatea las dimensiones para mostrar en la UI
 */
export const formatDimensions = (dimensions: types.DimensionType): string => {
  const parts: string[] = [];
  
  if (dimensions.height) {
    parts.push(`Alto: ${dimensions.height.value}${dimensions.height.unit}`);
  }
  if (dimensions.width) {
    parts.push(`Ancho: ${dimensions.width.value}${dimensions.width.unit}`);
  }
  if (dimensions.length) {
    parts.push(`Largo: ${dimensions.length.value}${dimensions.length.unit}`);
  }
  
  return parts.join(' × ');
};

/**
 * Formatea una lista de categorías como string legible
 */
export const formatCategories = (categories: types.ProductCategoryType[]): string => {
  return categories
    .filter(Boolean)
    .map(cat => cat!.charAt(0).toUpperCase() + cat!.slice(1))
    .join(', ');
};

/**
 * Trunca texto si excede la longitud máxima
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
// #endregion

// #region Generadores y Transformadores
/**
 * Genera un ID único más robusto
 */
export const generateUniqueId = (prefix = 'product'): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${randomPart}`;
};

/**
 * Genera un SKU más inteligente basado en los datos del producto
 */
export const generateSmartSKU = (product: Partial<types.ProductBaseType>): string => {
  const parts: string[] = [];
  
  // Parte de la marca o primera palabra del nombre
  if (product.brand) {
    parts.push(product.brand.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4));
  } else if (product.name) {
    const firstWord = product.name.split(' ')[0];
    parts.push(firstWord.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4));
  } else {
    parts.push('PROD');
  }

  // Parte de la categoría principal
  if (product.category && product.category.length > 0) {
    const category = product.category[0]!;
    parts.push(category.toUpperCase().slice(0, 3));
  } else {
    parts.push('GEN');
  }

  // Timestamp corto
  const timestamp = Date.now().toString().slice(-6);
  parts.push(timestamp);

  return parts.join('-');
};

/**
 * Limpia y normaliza los datos del producto antes de guardarlo
 */
export const sanitizeProduct = (product: Partial<types.ProductBaseType>): Partial<types.ProductBaseType> => {
  return {
    ...product,
    name: product.name?.trim(),
    brand: product.brand?.trim() || undefined,
    description: {
      main: product.description?.main?.trim() || '',
      short: product.description?.short?.trim() || undefined
    },
    tags: product.tags?.filter(tag => tag.trim().length > 0).map(tag => tag.trim()),
    category: product.category?.filter(Boolean),
    sku: product.sku?.trim() || generateSmartSKU(product)
  };
};
// #endregion

// #region Búsqueda y Filtrado
/**
 * Filtra productos por texto de búsqueda
 */
export const searchProducts = (
  products: types.ProductBaseType[], 
  searchTerm: string
): types.ProductBaseType[] => {
  if (!searchTerm.trim()) return products;

  const term = searchTerm.toLowerCase().trim();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.main.toLowerCase().includes(term) ||
    product.brand?.toLowerCase().includes(term) ||
    product.sku?.toLowerCase().includes(term) ||
    product.tags?.some(tag => tag.toLowerCase().includes(term)) ||
    product.category?.some(cat => cat?.toLowerCase().includes(term))
  );
};

/**
 * Filtra productos por categoría
 */
export const filterByCategory = (
  products: types.ProductBaseType[], 
  category: types.ProductCategoryType
): types.ProductBaseType[] => {
  if (!category) return products;
  return products.filter(product => product.category?.includes(category));
};

/**
 * Filtra productos por disponibilidad
 */
export const filterByAvailability = (
  products: types.ProductBaseType[], 
  available: boolean
): types.ProductBaseType[] => {
  return products.filter(product => product.available === available);
};

/**
 * Ordena productos por diferentes criterios
 */
export const sortProducts = (
  products: types.ProductBaseType[], 
  sortBy: 'name' | 'price' | 'stock' | 'created',
  order: 'asc' | 'desc' = 'asc'
): types.ProductBaseType[] => {
  const sorted = [...products].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price.value - b.price.value;
        break;
      case 'stock':
        comparison = (a.stock || 0) - (b.stock || 0);
        break;
      case 'created': {
        // Asumir que el ID contiene timestamp
        const aTime = a.id ? parseInt(a.id.split('_')[1] || '0', 36) : 0;
        const bTime = b.id ? parseInt(b.id.split('_')[1] || '0', 36) : 0;
        comparison = aTime - bTime;
        break;
      }
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};
// #endregion

// #region Estadísticas y Analytics
/**
 * Calcula estadísticas básicas de los productos
 */
export const calculateProductStats = (products: types.ProductBaseType[]) => {
  const total = products.length;
  const available = products.filter(p => p.available !== false).length;
  const unavailable = total - available;
  
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const avgPrice = products.length > 0 
    ? products.reduce((sum, p) => sum + p.price.value, 0) / products.length 
    : 0;

  const categoriesCount = products
    .flatMap(p => p.category || [])
    .filter(Boolean)
    .reduce((acc, cat) => {
      acc[cat!] = (acc[cat!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return {
    total,
    available,
    unavailable,
    totalStock,
    avgPrice,
    categoriesCount
  };
};

/**
 * Encuentra productos con stock bajo
 */
export const getLowStockProducts = (
  products: types.ProductBaseType[], 
  threshold = 5
): types.ProductBaseType[] => {
  return products.filter(product => 
    product.stock !== undefined && 
    product.stock <= threshold && 
    product.available !== false
  );
};
// #endregion

// #region Importación/Exportación
/**
 * Convierte productos a formato CSV
 */
export const exportToCSV = (products: types.ProductBaseType[]): string => {
  const headers = [
    'ID', 'Nombre', 'Marca', 'Precio', 'Moneda', 'Descripción', 
    'Categorías', 'Tags', 'Stock', 'SKU', 'Disponible'
  ];

  const rows = products.map(product => [
    product.id || '',
    product.name,
    product.brand || '',
    product.price.value,
    product.price.type,
    product.description.main,
    formatCategories(product.category || []),
    (product.tags || []).join('; '),
    product.stock || 0,
    product.sku || '',
    product.available !== false ? 'Sí' : 'No'
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  return csvContent;
};

/**
 * Descarga productos como archivo CSV
 */
export const downloadCSV = (products: types.ProductBaseType[], filename = 'productos.csv'): void => {
  const csvContent = exportToCSV(products);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
// #endregion