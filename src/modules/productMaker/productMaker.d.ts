// #type ProductActionsType
export type ProductActionsType = {
  type: 'SET_FORM_FIELD' | 'ADD_PRODUCT' | 'UPDATE_PRODUCT' | 'DELETE_PRODUCT' | 'RESET_FORM' | 'SET_FORM_DATA' | 'EDIT_PRODUCT' | 'TOGGLE_FORM' | 'TOGGLE_DELETE_CONFIRM' | 'ADD_CUSTOM_CATEGORY' | 'UPDATE_CUSTOM_CATEGORY' | 'DELETE_CUSTOM_CATEGORY' | 'TOGGLE_CATEGORY_PANEL'
  payload?: {
    field?: keyof ProductBaseType
    value?: unknown
    productId?: string
    formData?: Partial<ProductBaseType>
    product?: ProductBaseType
    customCategory?: CustomCategoryType
    categoryId?: string
    categoryName?: string
  }
}
// #end-type
// #type ProductCategoryType
export type ProductCategoryType = 'food' | 'electronics' | 'books' | 'clothes' | 'home' | 'beauty' | 'sport' | 'garden' | undefined
// #end-type
// #type DimensionUnitType
export type DimensionUnitType = 'mm' | 'cm' | 'm' | 'in'
// #end-type
// #type WeigthUnitType
export type WeigthUnitType = 'mg' | 'g' | 'kg' | 'lb' | 'oz' | 'ton'
// #end-type
// #type MoneyTypes
export type MoneyTypes = 'pesos' | 'usd' | 'eur'
// #end-type
// #interface DescriptionType
export interface DescriptionType {
  main: string
  short?: string
}
// #end-interface
// #interface ImageType
export interface ImageType {
  main: string | File
  gallery?: (string | File)[]
}
// #end-interface
// #interface PriceType
export interface PriceType {
  type: MoneyTypes
  value: number
  discount?: {
    percentage: number    
    validUntil: Date
  }
}
// #end-interface
// #interface WeightType
export interface WeightType {
  value?: number
  unit?: WeigthUnitType
}
// #end-interface
// #interface DimensionValue
export interface DimensionValue {
  value: number
  unit: DimensionUnitType
}
// #end-interface
// #interface DimensionType
export interface DimensionType {
  height?: DimensionValue
  width?: DimensionValue
  length?: DimensionValue
}
// #end-interface
// #type ProductBaseType
export type ProductBaseType = {
  id?: string
  name: string
  price: PriceType
  description: DescriptionType
  images?: ImageType
  category?: ProductCategoryType[]
  customCategories?: string[] // IDs de las categorías customizables
  tags?: string[]
  available?: boolean
  brand?: string
  weight?: WeightType
  dimensions?: DimensionType
  colors?: string[]
  stock?: number
  sku?: string // Stock Keeping Unit (stock control) - example: NIKE-AIRZOOM-42
}
// #end-type
// #type CustomCategoryType
export type CustomCategoryType = {
  id: string
  name: string
  description?: string
  color?: string
  createdAt: Date
  isExpanded?: boolean
  image?: string | File
}
// #end-type
// #type CustomCategoryActionsType
export type CustomCategoryActionsType = {
  type: 'ADD_CUSTOM_CATEGORY' | 'UPDATE_CUSTOM_CATEGORY' | 'DELETE_CUSTOM_CATEGORY' | 'TOGGLE_CATEGORY_PANEL' | 'TOGGLE_DELETE_CONFIRM' | 'TOGGLE_CATEGORY_FORM' | 'EDIT_CUSTOM_CATEGORY' | 'SET_CATEGORY_FORM_FIELD' | 'RESET_CATEGORY_FORM'  
  payload?: {
    customCategory?: CustomCategoryType
    categoryId?: string
    field?: keyof CustomCategoryType
    value?: unknown
    formData?: Partial<CustomCategoryType>
  }
}
// #end-type
// #interface CustomCategoryListState
export interface CustomCategoryListState {
  categories: CustomCategoryType[]
  showDeleteConfirm: boolean
  categoryToDelete?: string
  isPanelOpen: boolean
}
// #end-interface
// #interface CustomCategoryFormState
export interface CustomCategoryFormState {
  isOpen: boolean
  formData: CustomCategoryType
  isEditing: boolean
  editingCategoryId?: string
}
// #end-interface