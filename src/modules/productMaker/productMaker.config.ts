import * as types from "./productMaker.d";

export const initialProductState: types.ProductBaseType = {
  name: '',
  price: {
    type: 'pesos',
    value: 0
  },
  description: {
    main: ''
  },
  customCategories: []
}

export const productCategories: types.ProductCategoryType[] = [
  'food',
  'electronics', 
  'books',
  'clothes',
  'home',
  'beauty',
  'sport',
  'garden'
]

export const moneyTypes: types.MoneyTypes[] = [
  'pesos',
  'usd',
  'eur'
]

export const weightUnits: types.WeigthUnitType[] = [
  'mg',
  'g', 
  'kg',
  'lb',
  'oz',
  'ton'
]

export const dimensionUnits: types.DimensionUnitType[] = [
  'mm',
  'cm',
  'm',
  'in'
]

export const initialCustomCategoryState: types.CustomCategoryType = {
  id: '',
  name: '',
  description: '',
  color: '#3b82f6',
  image: undefined,
  createdAt: new Date(),
  isExpanded: false
}

// #variable defaultGeneralCategory
export const defaultGeneralCategory: types.CustomCategoryType = {
  id: 'general-category',
  name: 'General',
  description: 'Categoría general para productos sin clasificar',
  color: '#6b7280',
  image: undefined,
  createdAt: new Date(),
  isExpanded: true
}
// #end-variable

// #variable initialCategoryFormState
export const initialCategoryFormState: types.CustomCategoryFormState = {
  isOpen: false,
  formData: initialCustomCategoryState,
  isEditing: false,
  editingCategoryId: undefined
}
// #end-variable

// #variable acceptedImageTypes
export const acceptedImageTypes = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
];
// #end-variable

// #variable maxImageSize
export const maxImageSize = 5 * 1024 * 1024; // 5MB en bytes
// #end-variable

