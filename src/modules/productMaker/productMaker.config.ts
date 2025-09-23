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