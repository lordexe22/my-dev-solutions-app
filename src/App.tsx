import { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { filterData } from './modules/filter/filter.utils';
import type { Filter, BooleanOperator } from './modules/filter/filter';

interface Specifications {
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  connectivity: string[];
  batteryLife?: number;
}

interface Pricing {
  basePrice: number;
  discount: number;
  finalPrice: number;
  currency: string;
}

interface Ratings {
  average: number;
  totalReviews: number;
  breakdown: {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
  };
}

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  description: string;
  createdDate: string;
  inStock: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  specifications: Specifications;
  pricing: Pricing;
  ratings: Ratings;
}

type StringOperator = 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | '=' | '!=';
type ComparisonOperator = '>' | '<' | '>=' | '<=';
type RangeOperator = 'between' | 'not_between';

interface FilterFormData {
  // String filters
  nameFilter: string;
  nameOperator: StringOperator;
  brandFilter: string;
  brandOperator: StringOperator;
  categoryFilter: string;
  categoryOperator: StringOperator;
  
  // Range filters
  priceMin: string;
  priceMax: string;
  priceOperator: RangeOperator;
  ratingMin: string;
  ratingMax: string;
  ratingOperator: RangeOperator;
  dateMin: string;
  dateMax: string;
  dateOperator: RangeOperator;
  weightMin: string;
  weightMax: string;
  weightOperator: RangeOperator;
  
  // Comparison filters
  priceComparison: string;
  priceComparisonOperator: ComparisonOperator;
  ratingComparison: string;
  ratingComparisonOperator: ComparisonOperator;
  reviewsComparison: string;
  reviewsComparisonOperator: ComparisonOperator;
  
  // Boolean filters
  inStockOperator: BooleanOperator | 'all';
  isOnSaleOperator: BooleanOperator | 'all';
  isFeaturedOperator: BooleanOperator | 'all';
  isNewOperator: BooleanOperator | 'all';
  
  // Options
  caseSensitive: boolean;
  rangeInclusive: boolean;
}

const App = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Smartphones",
      brand: "Apple",
      description: "Premium smartphone con chip A17 Pro y cámara profesional",
      createdDate: "2024-09-15",
      inStock: true,
      isOnSale: false,
      isFeatured: true,
      isNew: true,
      tags: ["premium", "5G", "iOS", "titanium"],
      specifications: {
        weight: 221,
        dimensions: { width: 76.7, height: 159.9, depth: 8.25 },
        connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "NFC"],
        batteryLife: 29
      },
      pricing: { basePrice: 1199.99, discount: 0, finalPrice: 1199.99, currency: "USD" },
      ratings: { average: 4.8, totalReviews: 1247, breakdown: { fiveStars: 896, fourStars: 234, threeStars: 67, twoStars: 34, oneStar: 16 } }
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "Smartphones",
      brand: "Samsung",
      description: "Flagship Android con S Pen y cámara de 200MP",
      createdDate: "2024-01-20",
      inStock: true,
      isOnSale: true,
      isFeatured: true,
      isNew: false,
      tags: ["android", "s-pen", "camera", "5G"],
      specifications: {
        weight: 232,
        dimensions: { width: 79.0, height: 162.3, depth: 8.6 },
        connectivity: ["5G", "WiFi 7", "Bluetooth 5.3", "NFC", "UWB"],
        batteryLife: 28
      },
      pricing: { basePrice: 1299.99, discount: 200, finalPrice: 1099.99, currency: "USD" },
      ratings: { average: 4.6, totalReviews: 892, breakdown: { fiveStars: 542, fourStars: 223, threeStars: 89, twoStars: 28, oneStar: 10 } }
    },
    {
      id: 3,
      name: "MacBook Air M3",
      category: "Laptops",
      brand: "Apple",
      description: "Ultrabook con chip M3 y pantalla Liquid Retina",
      createdDate: "2024-03-10",
      inStock: false,
      isOnSale: false,
      isFeatured: false,
      isNew: true,
      tags: ["ultrabook", "M3", "productivity", "silent"],
      specifications: {
        weight: 1240,
        dimensions: { width: 304.1, height: 215.0, depth: 11.3 },
        connectivity: ["WiFi 6E", "Bluetooth 5.3", "Thunderbolt"],
        batteryLife: 18
      },
      pricing: { basePrice: 1299.99, discount: 0, finalPrice: 1299.99, currency: "USD" },
      ratings: { average: 4.9, totalReviews: 567, breakdown: { fiveStars: 456, fourStars: 78, threeStars: 23, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 4,
      name: "Dell XPS 13 Plus",
      category: "Laptops",
      brand: "Dell",
      description: "Laptop premium con Intel Core i7 de 13va gen",
      createdDate: "2023-11-05",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["windows", "intel", "business", "touchbar"],
      specifications: {
        weight: 1260,
        dimensions: { width: 295.3, height: 199.0, depth: 15.3 },
        connectivity: ["WiFi 6E", "Bluetooth 5.2", "USB-C"],
        batteryLife: 12
      },
      pricing: { basePrice: 1399.99, discount: 300, finalPrice: 1099.99, currency: "USD" },
      ratings: { average: 4.4, totalReviews: 334, breakdown: { fiveStars: 189, fourStars: 98, threeStars: 34, twoStars: 9, oneStar: 4 } }
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      category: "Headphones",
      brand: "Sony",
      description: "Auriculares premium con cancelación de ruido líder",
      createdDate: "2024-02-14",
      inStock: true,
      isOnSale: false,
      isFeatured: true,
      isNew: false,
      tags: ["wireless", "noise-cancelling", "premium", "travel"],
      specifications: {
        weight: 250,
        dimensions: { width: 254, height: 195, depth: 102 },
        connectivity: ["Bluetooth 5.2", "NFC", "USB-C"],
        batteryLife: 30
      },
      pricing: { basePrice: 399.99, discount: 0, finalPrice: 399.99, currency: "USD" },
      ratings: { average: 4.7, totalReviews: 1823, breakdown: { fiveStars: 1234, fourStars: 378, threeStars: 143, twoStars: 47, oneStar: 21 } }
    },
    {
      id: 6,
      name: "AirPods Pro 2nd Gen",
      category: "Headphones",
      brand: "Apple",
      description: "Auriculares inalámbricos con audio espacial personalizado",
      createdDate: "2024-01-08",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["wireless", "spatial-audio", "compact", "MagSafe"],
      specifications: {
        weight: 56,
        dimensions: { width: 30.9, height: 21.8, depth: 24.0 },
        connectivity: ["Bluetooth 5.3", "Lightning", "MagSafe"],
        batteryLife: 6
      },
      pricing: { basePrice: 249.99, discount: 50, finalPrice: 199.99, currency: "USD" },
      ratings: { average: 4.5, totalReviews: 2134, breakdown: { fiveStars: 1234, fourStars: 567, threeStars: 234, twoStars: 67, oneStar: 32 } }
    },
    {
      id: 7,
      name: "iPad Pro 12.9 M4",
      category: "Tablets",
      brand: "Apple",
      description: "Tablet profesional con chip M4 y pantalla OLED Tandem",
      createdDate: "2024-05-20",
      inStock: false,
      isOnSale: false,
      isFeatured: true,
      isNew: true,
      tags: ["professional", "M4", "creative", "OLED", "Apple Pencil"],
      specifications: {
        weight: 682,
        dimensions: { width: 280.6, height: 214.9, depth: 5.1 },
        connectivity: ["WiFi 6E", "Bluetooth 5.3", "USB-C", "5G"],
        batteryLife: 10
      },
      pricing: { basePrice: 1299.99, discount: 0, finalPrice: 1299.99, currency: "USD" },
      ratings: { average: 4.8, totalReviews: 456, breakdown: { fiveStars: 334, fourStars: 89, threeStars: 23, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 8,
      name: "Budget Phone X1",
      category: "Smartphones",
      brand: "TechValue",
      description: "Smartphone económico con funciones esenciales",
      createdDate: "2023-12-01",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["budget", "basic", "affordable", "dual-sim"],
      specifications: {
        weight: 180,
        dimensions: { width: 75.0, height: 158.0, depth: 8.9 },
        connectivity: ["4G", "WiFi 5", "Bluetooth 5.0"],
        batteryLife: 24
      },
      pricing: { basePrice: 199.99, discount: 30, finalPrice: 169.99, currency: "USD" },
      ratings: { average: 3.8, totalReviews: 789, breakdown: { fiveStars: 234, fourStars: 267, threeStars: 189, twoStars: 67, oneStar: 32 } }
    },
    {
      id: 9,
      name: "Lenovo ThinkPad X1 Carbon",
      category: "Laptops",
      brand: "Lenovo",
      description: "Laptop empresarial ultraliviana con seguridad avanzada",
      createdDate: "2024-04-15",
      inStock: true,
      isOnSale: false,
      isFeatured: false,
      isNew: true,
      tags: ["business", "enterprise", "carbon-fiber", "security"],
      specifications: {
        weight: 1120,
        dimensions: { width: 314.4, height: 221.6, depth: 14.95 },
        connectivity: ["WiFi 6E", "Bluetooth 5.1", "5G", "USB-C"],
        batteryLife: 15
      },
      pricing: { basePrice: 1899.99, discount: 0, finalPrice: 1899.99, currency: "USD" },
      ratings: { average: 4.6, totalReviews: 278, breakdown: { fiveStars: 167, fourStars: 78, threeStars: 23, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 10,
      name: "Bose QuietComfort Ultra",
      category: "Headphones",
      brand: "Bose",
      description: "Auriculares con la mejor cancelación de ruido del mundo",
      createdDate: "2024-06-10",
      inStock: true,
      isOnSale: false,
      isFeatured: true,
      isNew: true,
      tags: ["premium", "noise-cancelling", "comfort", "immersive"],
      specifications: {
        weight: 254,
        dimensions: { width: 203, height: 135, depth: 76 },
        connectivity: ["Bluetooth 5.3", "USB-C", "3.5mm"],
        batteryLife: 24
      },
      pricing: { basePrice: 429.99, discount: 0, finalPrice: 429.99, currency: "USD" },
      ratings: { average: 4.9, totalReviews: 567, breakdown: { fiveStars: 478, fourStars: 67, threeStars: 15, twoStars: 5, oneStar: 2 } }
    },
    {
      id: 11,
      name: "Google Pixel 8 Pro",
      category: "Smartphones",
      brand: "Google",
      description: "Smartphone con IA avanzada y cámara computacional",
      createdDate: "2024-07-22",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["AI", "computational-photography", "pure-android", "tensor"],
      specifications: {
        weight: 213,
        dimensions: { width: 76.5, height: 162.6, depth: 8.8 },
        connectivity: ["5G", "WiFi 7", "Bluetooth 5.3", "NFC"],
        batteryLife: 26
      },
      pricing: { basePrice: 999.99, discount: 150, finalPrice: 849.99, currency: "USD" },
      ratings: { average: 4.4, totalReviews: 623, breakdown: { fiveStars: 334, fourStars: 178, threeStars: 78, twoStars: 23, oneStar: 10 } }
    },
    {
      id: 12,
      name: "Microsoft Surface Laptop 5",
      category: "Laptops",
      brand: "Microsoft",
      description: "Laptop elegante con pantalla táctil y Windows 11",
      createdDate: "2023-10-12",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["touchscreen", "windows", "elegant", "alcantara"],
      specifications: {
        weight: 1390,
        dimensions: { width: 308.0, height: 223.0, depth: 14.7 },
        connectivity: ["WiFi 6", "Bluetooth 5.1", "USB-A", "USB-C"],
        batteryLife: 17
      },
      pricing: { basePrice: 1299.99, discount: 200, finalPrice: 1099.99, currency: "USD" },
      ratings: { average: 4.3, totalReviews: 445, breakdown: { fiveStars: 223, fourStars: 134, threeStars: 56, twoStars: 23, oneStar: 9 } }
    },
    {
      id: 13,
      name: "Samsung Galaxy Tab S9 Ultra",
      category: "Tablets",
      brand: "Samsung",
      description: "Tablet gigante con S Pen y pantalla AMOLED de 14.6\"",
      createdDate: "2024-08-05",
      inStock: false,
      isOnSale: false,
      isFeatured: true,
      isNew: true,
      tags: ["large-screen", "s-pen", "AMOLED", "productivity", "DeX"],
      specifications: {
        weight: 732,
        dimensions: { width: 326.4, height: 208.6, depth: 5.5 },
        connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3", "USB-C"],
        batteryLife: 14
      },
      pricing: { basePrice: 1199.99, discount: 0, finalPrice: 1199.99, currency: "USD" },
      ratings: { average: 4.5, totalReviews: 234, breakdown: { fiveStars: 145, fourStars: 56, threeStars: 23, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 14,
      name: "OnePlus 11 5G",
      category: "Smartphones",
      brand: "OnePlus",
      description: "Smartphone premium con carga rápida de 100W",
      createdDate: "2024-02-28",
      inStock: true,
      isOnSale: false,
      isFeatured: false,
      isNew: false,
      tags: ["fast-charging", "flagship", "OxygenOS", "performance"],
      specifications: {
        weight: 205,
        dimensions: { width: 74.1, height: 163.1, depth: 8.53 },
        connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "NFC"],
        batteryLife: 25
      },
      pricing: { basePrice: 699.99, discount: 0, finalPrice: 699.99, currency: "USD" },
      ratings: { average: 4.2, totalReviews: 756, breakdown: { fiveStars: 378, fourStars: 234, threeStars: 89, twoStars: 34, oneStar: 21 } }
    },
    {
      id: 15,
      name: "Razer Blade 15",
      category: "Laptops",
      brand: "Razer",
      description: "Laptop gaming premium con RTX 4080 y pantalla 240Hz",
      createdDate: "2024-01-30",
      inStock: true,
      isOnSale: false,
      isFeatured: true,
      isNew: false,
      tags: ["gaming", "RTX", "240Hz", "RGB", "premium"],
      specifications: {
        weight: 2090,
        dimensions: { width: 355.0, height: 235.0, depth: 16.99 },
        connectivity: ["WiFi 6E", "Bluetooth 5.3", "Ethernet", "Thunderbolt"],
        batteryLife: 6
      },
      pricing: { basePrice: 2999.99, discount: 0, finalPrice: 2999.99, currency: "USD" },
      ratings: { average: 4.7, totalReviews: 189, breakdown: { fiveStars: 123, fourStars: 45, threeStars: 15, twoStars: 4, oneStar: 2 } }
    },
    {
      id: 16,
      name: "Sennheiser Momentum 4",
      category: "Headphones",
      brand: "Sennheiser",
      description: "Auriculares audiófilo con sonido de estudio",
      createdDate: "2023-09-18",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["audiophile", "studio-quality", "leather", "adaptive-ANC"],
      specifications: {
        weight: 293,
        dimensions: { width: 195, height: 172, depth: 77 },
        connectivity: ["Bluetooth 5.2", "USB-C", "3.5mm"],
        batteryLife: 60
      },
      pricing: { basePrice: 349.99, discount: 70, finalPrice: 279.99, currency: "USD" },
      ratings: { average: 4.6, totalReviews: 432, breakdown: { fiveStars: 267, fourStars: 123, threeStars: 32, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 17,
      name: "Nothing Phone 2",
      category: "Smartphones",
      brand: "Nothing",
      description: "Smartphone único con Glyph Interface trasero LED",
      createdDate: "2024-03-25",
      inStock: true,
      isOnSale: false,
      isFeatured: false,
      isNew: true,
      tags: ["unique-design", "glyph", "transparent", "innovative"],
      specifications: {
        weight: 201,
        dimensions: { width: 76.4, height: 162.1, depth: 8.6 },
        connectivity: ["5G", "WiFi 6", "Bluetooth 5.3", "NFC"],
        batteryLife: 22
      },
      pricing: { basePrice: 599.99, discount: 0, finalPrice: 599.99, currency: "USD" },
      ratings: { average: 4.1, totalReviews: 345, breakdown: { fiveStars: 167, fourStars: 112, threeStars: 45, twoStars: 15, oneStar: 6 } }
    },
    {
      id: 18,
      name: "ASUS ROG Zephyrus G14",
      category: "Laptops",
      brand: "ASUS",
      description: "Laptop gaming compacto con AMD Ryzen y RTX 4060",
      createdDate: "2024-05-08",
      inStock: false,
      isOnSale: false,
      isFeatured: false,
      isNew: true,
      tags: ["gaming", "AMD", "compact", "AniMe-Matrix", "portable"],
      specifications: {
        weight: 1650,
        dimensions: { width: 312.0, height: 227.0, depth: 19.5 },
        connectivity: ["WiFi 6E", "Bluetooth 5.2", "USB-C", "HDMI"],
        batteryLife: 8
      },
      pricing: { basePrice: 1799.99, discount: 0, finalPrice: 1799.99, currency: "USD" },
      ratings: { average: 4.4, totalReviews: 267, breakdown: { fiveStars: 145, fourStars: 89, threeStars: 23, twoStars: 7, oneStar: 3 } }
    },
    {
      id: 19,
      name: "iPad Air M2",
      category: "Tablets",
      brand: "Apple",
      description: "Tablet versátil con chip M2 y soporte para Apple Pencil",
      createdDate: "2024-07-12",
      inStock: true,
      isOnSale: true,
      isFeatured: false,
      isNew: false,
      tags: ["M2", "Apple Pencil", "versatile", "color-options"],
      specifications: {
        weight: 461,
        dimensions: { width: 247.6, height: 178.5, depth: 6.1 },
        connectivity: ["WiFi 6", "Bluetooth 5.3", "USB-C"],
        batteryLife: 10
      },
      pricing: { basePrice: 599.99, discount: 100, finalPrice: 499.99, currency: "USD" },
      ratings: { average: 4.5, totalReviews: 678, breakdown: { fiveStars: 389, fourStars: 189, threeStars: 67, twoStars: 23, oneStar: 10 } }
    },
    {
      id: 20,
      name: "JBL Tour One M2",
      category: "Headphones",
      brand: "JBL",
      description: "Auriculares con ANC inteligente y sonido JBL Pro",
      createdDate: "2023-11-22",
      inStock: true,
      isOnSale: false,
      isFeatured: false,
      isNew: false,
      tags: ["smart-ANC", "JBL-Pro", "multipoint", "app-control"],
      specifications: {
        weight: 261,
        dimensions: { width: 182, height: 163, depth: 73 },
        connectivity: ["Bluetooth 5.3", "USB-C", "3.5mm"],
        batteryLife: 30
      },
      pricing: { basePrice: 299.99, discount: 0, finalPrice: 299.99, currency: "USD" },
      ratings: { average: 4.0, totalReviews: 523, breakdown: { fiveStars: 234, fourStars: 178, threeStars: 78, twoStars: 23, oneStar: 10 } }
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  
  const [formData, setFormData] = useState<FilterFormData>({
    // String filters
    nameFilter: '',
    nameOperator: 'contains',
    brandFilter: '',
    brandOperator: 'contains',
    categoryFilter: '',
    categoryOperator: 'contains',
    
    // Range filters
    priceMin: '',
    priceMax: '',
    priceOperator: 'between',
    ratingMin: '',
    ratingMax: '',
    ratingOperator: 'between',
    dateMin: '',
    dateMax: '',
    dateOperator: 'between',
    weightMin: '',
    weightMax: '',
    weightOperator: 'between',
    
    // Comparison filters
    priceComparison: '',
    priceComparisonOperator: '>=',
    ratingComparison: '',
    ratingComparisonOperator: '>=',
    reviewsComparison: '',
    reviewsComparisonOperator: '>=',
    
    // Boolean filters
    inStockOperator: 'all',
    isOnSaleOperator: 'all',
    isFeaturedOperator: 'all',
    isNewOperator: 'all',
    
    // Options
    caseSensitive: false,
    rangeInclusive: true
  });

  const buildFiltersFromForm = useCallback((): Filter[] => {
    const filters: Filter[] = [];

    // String filters
    if (formData.nameFilter.trim()) {
      if (['=', '!='].includes(formData.nameOperator)) {
        filters.push({
          type: 'equality',
          field: 'name',
          operator: formData.nameOperator as '=' | '!=',
          value: formData.nameFilter
        });
      } else {
        filters.push({
          type: 'string',
          field: 'name',
          operator: formData.nameOperator as 'contains' | 'not_contains' | 'starts_with' | 'ends_with',
          value: formData.nameFilter,
          caseSensitive: formData.caseSensitive
        });
      }
    }

    if (formData.brandFilter.trim()) {
      if (['=', '!='].includes(formData.brandOperator)) {
        filters.push({
          type: 'equality',
          field: 'brand',
          operator: formData.brandOperator as '=' | '!=',
          value: formData.brandFilter
        });
      } else {
        filters.push({
          type: 'string',
          field: 'brand',
          operator: formData.brandOperator as 'contains' | 'not_contains' | 'starts_with' | 'ends_with',
          value: formData.brandFilter,
          caseSensitive: formData.caseSensitive
        });
      }
    }

    if (formData.categoryFilter.trim()) {
      if (['=', '!='].includes(formData.categoryOperator)) {
        filters.push({
          type: 'equality',
          field: 'category',
          operator: formData.categoryOperator as '=' | '!=',
          value: formData.categoryFilter
        });
      } else {
        filters.push({
          type: 'string',
          field: 'category',
          operator: formData.categoryOperator as 'contains' | 'not_contains' | 'starts_with' | 'ends_with',
          value: formData.categoryFilter,
          caseSensitive: formData.caseSensitive
        });
      }
    }

    // Range filters
    if (formData.priceMin.trim() && formData.priceMax.trim()) {
      filters.push({
        type: 'range',
        field: 'pricing',
        path: ['pricing', 'finalPrice'],
        operator: formData.priceOperator,
        minValue: parseFloat(formData.priceMin),
        maxValue: parseFloat(formData.priceMax),
        inclusive: formData.rangeInclusive
      });
    }

    if (formData.ratingMin.trim() && formData.ratingMax.trim()) {
      filters.push({
        type: 'range',
        field: 'ratings',
        path: ['ratings', 'average'],
        operator: formData.ratingOperator,
        minValue: parseFloat(formData.ratingMin),
        maxValue: parseFloat(formData.ratingMax),
        inclusive: formData.rangeInclusive
      });
    }

    if (formData.dateMin.trim() && formData.dateMax.trim()) {
      filters.push({
        type: 'range',
        field: 'createdDate',
        operator: formData.dateOperator,
        minValue: formData.dateMin,
        maxValue: formData.dateMax,
        inclusive: formData.rangeInclusive
      });
    }

    if (formData.weightMin.trim() && formData.weightMax.trim()) {
      filters.push({
        type: 'range',
        field: 'specifications',
        path: ['specifications', 'weight'],
        operator: formData.weightOperator,
        minValue: parseFloat(formData.weightMin),
        maxValue: parseFloat(formData.weightMax),
        inclusive: formData.rangeInclusive
      });
    }

    // Comparison filters
    if (formData.priceComparison.trim()) {
      filters.push({
        type: 'comparison',
        field: 'pricing',
        path: ['pricing', 'finalPrice'],
        operator: formData.priceComparisonOperator,
        value: parseFloat(formData.priceComparison)
      });
    }

    if (formData.ratingComparison.trim()) {
      filters.push({
        type: 'comparison',
        field: 'ratings',
        path: ['ratings', 'average'],
        operator: formData.ratingComparisonOperator,
        value: parseFloat(formData.ratingComparison)
      });
    }

    if (formData.reviewsComparison.trim()) {
      filters.push({
        type: 'comparison',
        field: 'ratings',
        path: ['ratings', 'totalReviews'],
        operator: formData.reviewsComparisonOperator,
        value: parseInt(formData.reviewsComparison)
      });
    }

    // Boolean filters
    if (formData.inStockOperator !== 'all') {
      filters.push({
        type: 'boolean',
        field: 'inStock',
        operator: formData.inStockOperator as BooleanOperator
      });
    }

    if (formData.isOnSaleOperator !== 'all') {
      filters.push({
        type: 'boolean',
        field: 'isOnSale',
        operator: formData.isOnSaleOperator as BooleanOperator
      });
    }

    if (formData.isFeaturedOperator !== 'all') {
      filters.push({
        type: 'boolean',
        field: 'isFeatured',
        operator: formData.isFeaturedOperator as BooleanOperator
      });
    }

    if (formData.isNewOperator !== 'all') {
      filters.push({
        type: 'boolean',
        field: 'isNew',
        operator: formData.isNewOperator as BooleanOperator
      });
    }

    return filters;
  }, [formData]);

  // Aplicar filtros cuando cambie el formulario
  useEffect(() => {
    const filters = buildFiltersFromForm();
    setActiveFilters(filters);
    
    if (filters.length === 0) {
      setFilteredProducts(products);
    } else {
      const result = filterData(products, filters);
      setFilteredProducts(result);
    }
    
    console.log('Filtros activos:', filters);
  }, [buildFiltersFromForm]);

  const handleInputChange = (field: keyof FilterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFormData({
      nameFilter: '',
      nameOperator: 'contains',
      brandFilter: '',
      brandOperator: 'contains',
      categoryFilter: '',
      categoryOperator: 'contains',
      priceMin: '',
      priceMax: '',
      priceOperator: 'between',
      ratingMin: '',
      ratingMax: '',
      ratingOperator: 'between',
      dateMin: '',
      dateMax: '',
      dateOperator: 'between',
      weightMin: '',
      weightMax: '',
      weightOperator: 'between',
      priceComparison: '',
      priceComparisonOperator: '>=',
      ratingComparison: '',
      ratingComparisonOperator: '>=',
      reviewsComparison: '',
      reviewsComparisonOperator: '>=',
      inStockOperator: 'all',
      isOnSaleOperator: 'all',
      isFeaturedOperator: 'all',
      isNewOperator: 'all',
      caseSensitive: false,
      rangeInclusive: true
    });
  };

  return (
    <div className="app">
      <h1>Sistema de Filtros Avanzado</h1>
      
      <div className="layout">
        <div className="sidebar">
          <div className="filter-form">
            <div className="form-section">
              <h3>🔤 Filtros de Texto</h3>
              
              <div className="filter-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={formData.nameFilter}
                  onChange={(e) => handleInputChange('nameFilter', e.target.value)}
                  placeholder="Buscar..."
                />
                <select
                  value={formData.nameOperator}
                  onChange={(e) => handleInputChange('nameOperator', e.target.value as StringOperator)}
                >
                  <option value="contains">Contiene</option>
                  <option value="not_contains">No contiene</option>
                  <option value="starts_with">Comienza</option>
                  <option value="ends_with">Termina</option>
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Marca:</label>
                <input
                  type="text"
                  value={formData.brandFilter}
                  onChange={(e) => handleInputChange('brandFilter', e.target.value)}
                  placeholder="Marca..."
                />
                <select
                  value={formData.brandOperator}
                  onChange={(e) => handleInputChange('brandOperator', e.target.value as StringOperator)}
                >
                  <option value="contains">Contiene</option>
                  <option value="not_contains">No contiene</option>
                  <option value="starts_with">Comienza</option>
                  <option value="ends_with">Termina</option>
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Categoría:</label>
                <input
                  type="text"
                  value={formData.categoryFilter}
                  onChange={(e) => handleInputChange('categoryFilter', e.target.value)}
                  placeholder="Categoría..."
                />
                <select
                  value={formData.categoryOperator}
                  onChange={(e) => handleInputChange('categoryOperator', e.target.value as StringOperator)}
                >
                  <option value="contains">Contiene</option>
                  <option value="not_contains">No contiene</option>
                  <option value="starts_with">Comienza</option>
                  <option value="ends_with">Termina</option>
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>📊 Filtros de Rango</h3>
              
              <div className="filter-group">
                <label>Precio ($):</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceMin}
                    onChange={(e) => handleInputChange('priceMin', e.target.value)}
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceMax}
                    onChange={(e) => handleInputChange('priceMax', e.target.value)}
                    placeholder="Max"
                  />
                </div>
                <select
                  value={formData.priceOperator}
                  onChange={(e) => handleInputChange('priceOperator', e.target.value as RangeOperator)}
                >
                  <option value="between">Entre</option>
                  <option value="not_between">Fuera</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Rating:</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.ratingMin}
                    onChange={(e) => handleInputChange('ratingMin', e.target.value)}
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.ratingMax}
                    onChange={(e) => handleInputChange('ratingMax', e.target.value)}
                    placeholder="Max"
                  />
                </div>
                <select
                  value={formData.ratingOperator}
                  onChange={(e) => handleInputChange('ratingOperator', e.target.value as RangeOperator)}
                >
                  <option value="between">Entre</option>
                  <option value="not_between">Fuera</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Peso (g):</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    value={formData.weightMin}
                    onChange={(e) => handleInputChange('weightMin', e.target.value)}
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={formData.weightMax}
                    onChange={(e) => handleInputChange('weightMax', e.target.value)}
                    placeholder="Max"
                  />
                </div>
                <select
                  value={formData.weightOperator}
                  onChange={(e) => handleInputChange('weightOperator', e.target.value as RangeOperator)}
                >
                  <option value="between">Entre</option>
                  <option value="not_between">Fuera</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Fecha:</label>
                <div className="range-inputs">
                  <input
                    type="date"
                    value={formData.dateMin}
                    onChange={(e) => handleInputChange('dateMin', e.target.value)}
                  />
                  <input
                    type="date"
                    value={formData.dateMax}
                    onChange={(e) => handleInputChange('dateMax', e.target.value)}
                  />
                </div>
                <select
                  value={formData.dateOperator}
                  onChange={(e) => handleInputChange('dateOperator', e.target.value as RangeOperator)}
                >
                  <option value="between">Entre</option>
                  <option value="not_between">Fuera</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>⚖️ Comparaciones</h3>
              
              <div className="filter-group">
                <label>Precio:</label>
                <div className="comparison-inputs">
                  <select
                    value={formData.priceComparisonOperator}
                    onChange={(e) => handleInputChange('priceComparisonOperator', e.target.value as ComparisonOperator)}
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceComparison}
                    onChange={(e) => handleInputChange('priceComparison', e.target.value)}
                    placeholder="Valor"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Rating:</label>
                <div className="comparison-inputs">
                  <select
                    value={formData.ratingComparisonOperator}
                    onChange={(e) => handleInputChange('ratingComparisonOperator', e.target.value as ComparisonOperator)}
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.ratingComparison}
                    onChange={(e) => handleInputChange('ratingComparison', e.target.value)}
                    placeholder="Valor"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Reviews:</label>
                <div className="comparison-inputs">
                  <select
                    value={formData.reviewsComparisonOperator}
                    onChange={(e) => handleInputChange('reviewsComparisonOperator', e.target.value as ComparisonOperator)}
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    type="number"
                    value={formData.reviewsComparison}
                    onChange={(e) => handleInputChange('reviewsComparison', e.target.value)}
                    placeholder="Cantidad"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>✅ Filtros Booleanos</h3>
              
              <div className="filter-group">
                <label>En Stock:</label>
                <select
                  value={formData.inStockOperator}
                  onChange={(e) => handleInputChange('inStockOperator', e.target.value as BooleanOperator | 'all')}
                >
                  <option value="all">Todos</option>
                  <option value="is_true">Sí</option>
                  <option value="is_false">No</option>
                  <option value="is_null">Sin definir</option>
                  <option value="is_not_null">Definido</option>
                </select>
              </div>

              <div className="filter-group">
                <label>En Oferta:</label>
                <select
                  value={formData.isOnSaleOperator}
                  onChange={(e) => handleInputChange('isOnSaleOperator', e.target.value as BooleanOperator | 'all')}
                >
                  <option value="all">Todos</option>
                  <option value="is_true">Sí</option>
                  <option value="is_false">No</option>
                  <option value="is_null">Sin definir</option>
                  <option value="is_not_null">Definido</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Destacado:</label>
                <select
                  value={formData.isFeaturedOperator}
                  onChange={(e) => handleInputChange('isFeaturedOperator', e.target.value as BooleanOperator | 'all')}
                >
                  <option value="all">Todos</option>
                  <option value="is_true">Sí</option>
                  <option value="is_false">No</option>
                  <option value="is_null">Sin definir</option>
                  <option value="is_not_null">Definido</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Nuevo:</label>
                <select
                  value={formData.isNewOperator}
                  onChange={(e) => handleInputChange('isNewOperator', e.target.value as BooleanOperator | 'all')}
                >
                  <option value="all">Todos</option>
                  <option value="is_true">Sí</option>
                  <option value="is_false">No</option>
                  <option value="is_null">Sin definir</option>
                  <option value="is_not_null">Definido</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>⚙️ Opciones</h3>
              
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.caseSensitive}
                    onChange={(e) => handleInputChange('caseSensitive', e.target.checked)}
                  />
                  Sensible a mayúsculas
                </label>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.rangeInclusive}
                    onChange={(e) => handleInputChange('rangeInclusive', e.target.checked)}
                  />
                  Rangos inclusivos
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={resetFilters} className="reset-btn">
                🔄 Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="results-header">
            <div className="results-info">
              <h2>Resultados: {filteredProducts.length} de {products.length}</h2>
              <p>Filtros activos: {activeFilters.length}</p>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <div className="badges">
                    <span className={`badge ${product.inStock ? 'stock-in' : 'stock-out'}`}>
                      {product.inStock ? '✅' : '❌'}
                    </span>
                    {product.isOnSale && <span className="badge sale">🏷️</span>}
                    {product.isFeatured && <span className="badge featured">⭐</span>}
                    {product.isNew && <span className="badge new">🆕</span>}
                  </div>
                </div>
                
                <div className="product-body">
                  <div className="brand-category">
                    <span className="brand">{product.brand}</span>
                    <span className="category">{product.category}</span>
                  </div>
                  
                  <div className="pricing">
                    {product.pricing.discount > 0 && (
                      <span className="old-price">${product.pricing.basePrice}</span>
                    )}
                    <span className="final-price">${product.pricing.finalPrice}</span>
                    {product.pricing.discount > 0 && (
                      <span className="discount">-${product.pricing.discount}</span>
                    )}
                  </div>
                  
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.ratings.average))}</span>
                    <span className="rating-text">{product.ratings.average} ({product.ratings.totalReviews})</span>
                  </div>
                  
                  <div className="specs">
                    <small>
                      {product.specifications.weight}g • {product.specifications.batteryLife}h • {product.createdDate}
                    </small>
                  </div>
                  
                  <div className="tags">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <h3>😔 No se encontraron productos</h3>
              <p>Intenta ajustar los filtros para ver más resultados.</p>
            </div>
          )}
        </div>
      </div>

      <details className="debug-section">
        <summary>🔧 Debug: Filtros Activos ({activeFilters.length})</summary>
        <pre>{JSON.stringify(activeFilters, null, 2)}</pre>
      </details>
    </div>
  );
};

export default App;