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
}

export const initialProductMakerState: types.ProductMakerState = {
  products: [],
  currentForm: {
    name: '',
    price: {
      type: 'pesos',
      value: 0
    },
    description: {
      main: '',
      short: ''
    },
    category: [],
    tags: [],
    available: true,
    brand: '',
    stock: 0,
    sku: ''
  },
  isFormVisible: false
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

export const defaultFormValidation = {
  name: { required: true, minLength: 2 },
  price: { required: true, min: 0 },
  description: { required: true, minLength: 10 },
  category: { required: false },
  brand: { required: false },
  stock: { required: false, min: 0 }
}