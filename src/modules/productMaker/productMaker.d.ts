export type ProtuctCategoryType = 'food' | 'electronics' | 'books' | 'clothes' | 'home' | 'beauty' | 'sport' | 'garden' | undefined
export type DimentionUnitType = 'mm' | 'cm' | 'm' | 'in'
export type MoneyTypes = 'pesos'

export type ProductStructureType = {
  name: string
  prices: {
    type: MoneyTypes
    value: number
    discount?:{
      percentage: number    
      validUntil: Date
    }
  }
  description: {
    main: string
    short?: string
  }
  images:{
    main: string | File
    gallery?: (string | File)[]
  }
  category: ProtuctCategoryType[]
  tags?: string[]
  available?: boolean 
  brand?: string
  weight?: {
    value?: number
    unit?: string
  }
  dimensions?: {
    height?: {
      value: number
      unit: DimentionUnitType
    }
    width?: {
      value: number
      unit: DimentionUnitType
    }
    length?: {
      value: number
      unit: DimentionUnitType
    }
  }
  colors?: string[]
  stock?: number
  sku?: string // Stock Keeping Unit (stock control) - example: NIKE-AIRZOOM-42
}