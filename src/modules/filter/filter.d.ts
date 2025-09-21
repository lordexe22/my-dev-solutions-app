// #type EqualityOperator
/**
 * Defines equality operators used for strict comparison.
 * 
 * - `"="`: Checks if two values are equal.
 * - `"!="`: Checks if two values are not equal.
 */
type EqualityOperator = "=" | "!=";
// #end-type
// #type ComparisonOperator
/**
 * Defines operators for numeric or date-based comparisons.
 * 
 * - `">"`: Greater than.
 * - `"<"`: Less than.
 * - `">="`: Greater than or equal.
 * - `"<="`: Less than or equal.
 */
type ComparisonOperator = ">" | "<" | ">=" | "<=";
// #end-type
// #type StringOperator
/**
 * Defines operators for string-based filtering.
 * 
 * - `"contains"`: Checks if the field contains a substring.
 * - `"notContains"`: Checks if the field does not contain a substring.
 * - `"startsWith"`: Checks if the field starts with a substring.
 * - `"endsWith"`: Checks if the field ends with a substring.
 */
type StringOperator = 'contains' | 'notContains' | 'startsWith' | 'endsWith';
// #end-type
// #type RangeOperator
/**
 * Defines operators for range-based filtering.
 * 
 * - `"between"`: Checks if a value is within a range.
 * - `"notBetween"`: Checks if a value is outside a range.
 */
type RangeOperator = "between" | "notBetween";
// #end-type
// #type BooleanOperator
/**
 * Defines operators for boolean and null checks.
 * 
 * - `"isTrue"`: Field must be `true`.
 * - `"isFalse"`: Field must be `false`.
 * - `"isNull"`: Field must be `null` or undefined.
 * - `"isNotNull"`: Field must not be `null` or undefined.
 */
type BooleanOperator = "isTrue" | "isFalse" | "isNull" | "isNotNull";
// #end-type
// #interface EqualityFilter
/**
 * Represents a filter for equality checks between a field and a value.
 */
export interface EqualityFilter{
  // #key type: "equality"
  /** Identifies the filter type as `"equality"`. */
  type: "equality";
  // #end-key
  // #key field: string
  /** Name of the field being filtered. */
  field: string;
  // #end-key
  // #key path?: (string | number)[]
  /**
   * Optional path to a nested field.  
   * Can be expressed as dot-notation or array of keys.
   */
  path?: (string | number)[];  
  // #end-key
  // #key operator: EqualityOperator
  /** Equality operator to apply (`"="` or `"!="`). */
  operator: EqualityOperator;
  // #end-key
  // #key value: string | number | boolean
  /** The value to compare the field against. */
  value: string | number | boolean;
  // #end-key
}
// #end-interface
// #interface ComparisonFilter
/**
 * Represents a filter for numeric or date comparisons.
 */
export interface ComparisonFilter {
  // #key type: "comparison"
  /** Identifies the filter type as `"comparison"`. */
  type: "comparison";
  // #end-key

  // #key field: string
  /** Name of the field being filtered. */
  field: string;
  // #end-key

  // #key path?: (string | number)[]
  /**
   * Optional path to a nested field.  
   * Can be expressed as dot-notation or array of keys.
   */
  path?: (string | number)[];  
  // #end-key

  // #key operator: ComparisonOperator
  /** Comparison operator to apply (e.g., `">"`, `"<"`, etc.). */
  operator: ComparisonOperator;
  // #end-key

  // #key value: number
  /** The numeric value to compare the field against. */
  value: number;
  // #end-key
}
// #end-interface
// #interface StringFilter
/**
 * Represents a filter for string comparisons.
 */
export interface StringFilter {
  // #key type: "string"
  /** Identifies the filter type as `"string"`. */
  type: "string";
  // #end-key

  // #key field: string
  /** Name of the field being filtered. */
  field: string;
  // #end-key

  // #key path?: (string | number)[]
  /**
   * Optional path to a nested field.  
   * Can be expressed as dot-notation or array of keys.
   */
  path?: (string | number)[];  
  // #end-key

  // #key operator: StringOperator
  /** String operator to apply (`"contains"`, `"startsWith"`, etc.). */
  operator: StringOperator;
  // #end-key

  // #key value: string
  /** The string to compare against the field. */
  value: string;
  // #end-key

  // #key caseSensitive?: boolean
  /**
   * If `true`, enforces case-sensitive comparison.  
   * Defaults to `false` if not provided.
   */
  caseSensitive?: boolean // false*
  // #end-key
}
// #end-interface
// #interface RangeFilter
/**
 * Represents a filter for values within a range.
 * 
 * ⚠️ Note: Using `string` values will result in lexicographical comparison.
 */
export interface RangeFilter {
  // #key type: "range"
  /** Identifies the filter type as `"range"`. */
  type: "range";
  // #end-key

  // #key field: string
  /** Name of the field being filtered. */
  field: string;
  // #end-key

  // #key path?: (string | number)[]
  /**
   * Optional path to a nested field.  
   * Can be expressed as dot-notation or array of keys.
   */
  path?: (string | number)[];  
  // #end-key

  // #key operator: RangeOperator
  /** Range operator (`"between"` or `"not_between"`). */
  operator: RangeOperator;
  // #end-key

  // #key minValue: number | string | Date
  /** Lower bound of the range. */
  minValue: number | string | Date;
  // #end-key

  // #key maxValue: number | string | Date
  /** Upper bound of the range. */
  maxValue: number | string | Date;
  // #end-key

  // #key inclusive?: boolean
  /**
   * Whether range bounds are inclusive.  
   * Defaults to `true` if not provided.
   */
  inclusive?: boolean; // Opcional, por defecto true (incluye los límites)
  // #end-key
}
// #end-interface
// #interface BooleanFilter
/**
 * Represents a filter for boolean flags and null checks.
 */
export interface BooleanFilter {
  // #key type: "boolean"
  /** Identifies the filter type as `"boolean"`. */
  type: "boolean";
  // #end-key

  // #key field: string
  /** Name of the field being filtered. */
  field: string;
  // #end-key

  // #key path?: (string | number)[]
  /**
   * Optional path to a nested field.  
   * Can be expressed as dot-notation or array of keys.
   */
  path?: (string | number)[];  
  // #end-key

  // #key operator: BooleanOperator
  /** Boolean operator to apply (`"isTrue"`, `"isFalse"`, `"isNull"`, `"isNotNull"`). */
  operator: BooleanOperator;
  // #end-key
}
// #end-interface
// #type Filter
/**
 * Union type representing all supported filter variants.
 */
export type Filter =
  | EqualityFilter
  | ComparisonFilter
  | StringFilter
  | RangeFilter
  | BooleanFilter;
// #end-type