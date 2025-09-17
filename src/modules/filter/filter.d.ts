// #type EqualityOperator
type EqualityOperator = "=" | "!=";
// #end-type
// #type ComparisonOperator
type ComparisonOperator = ">" | "<" | ">=" | "<=";
// #end-type
// #type StringOperator
type StringOperator = 'contains' | 'notContains' | 'startsWith' | 'endsWith';
// #end-type
// #type RangeOperator
type RangeOperator = "between" | "not_between";
// #end-type
// #type BooleanOperator
type BooleanOperator = "isTrue" | "isFalse" | "isNull" | "isNotNull";
// #end-type

// #type EqualityFilter
export interface EqualityFilter{
  type: "equality";
  field: string;
  path?: (string | number)[];  
  operator: EqualityOperator;
  value: string | number | boolean;
}
// #end-type
// #type ComparisonFilter
export interface ComparisonFilter {
  type: "comparison";
  field: string;
  path?: (string | number)[];  
  operator: ComparisonOperator;
  value: number;
}
// #end-type
// #type StringFilter
export interface StringFilter {
  type: "string";
  field: string;
  path?: (string | number)[];  
  operator: SearchOperator;
  value: string;
  caseSensitive?: boolean // false*
}
// #end-type
// #type RangeFilter
export interface RangeFilter {
  type: "range";
  field: string;
  path?: (string | number)[];  
  operator: RangeOperator;
  minValue: number | string | Date;
  maxValue: number | string | Date;
  inclusive?: boolean; // Opcional, por defecto true (incluye los límites)
}
// #end-type
// #type BooleanFilter
export interface BooleanFilter {
  type: "boolean";
  field: string;
  path?: (string | number)[];  
  operator: BooleanOperator;
}
// #end-type
// #type Filter
export type Filter =
  | EqualityFilter
  | ComparisonFilter
  | StringFilter
  | RangeFilter
  | BooleanFilter;
// #end-type
