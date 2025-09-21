// #section Imports
import type { Filter, EqualityFilter, ComparisonFilter, StringFilter, RangeFilter, BooleanFilter } from "./filter";
// #end-section
// #function getValueAtPath - Retrieves a value from an object at a given path
/**
 * Retrieves a value from an object at a given path.
 *
 * The path can be provided as a dot-separated string (e.g. `"user.address.city"`)
 * or as an array of keys (e.g. `["user", "address", "city"]`).
 * If the path does not exist, the function returns `undefined`.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object to traverse.
 * @param {string | (string | number)[]} [path] - The path to the desired value,
 * either as a string with dot notation or an array of keys.
 * @returns {unknown} The value found at the given path, or `undefined` if the path is invalid.
 *
 * @example
 * const user = { address: { city: "Paris" } };
 * getValueAtPath(user, "address.city"); // "Paris"
 *
 * @example
 * getValueAtPath(user, ["address", "city"]); // "Paris"
 *
 * @example
 * getValueAtPath(user, "address.zip"); // undefined
 */
const getValueAtPath = <T>(
  obj: T,
  path?: string | (string | number)[]
): unknown => {
  // #step 1 - if path is empty or undefined, return undefined
  if (!path) return undefined;
  // #end-step

  // #variable pathArray - represents the path as an array of keys
  const pathArray: (string | number)[] =
    typeof path === "string" ? path.split(".") : path;
  // #end-variable

  // #step 2 - iterate over pathArray and resolve nested properties
  return pathArray.reduce<unknown>((acc, key) => {
    // #step 2.a - check if current accumulator is an object and contains the key
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string | number, unknown>)[key];
    }
    // #end-step

    // #step 2.b - if key not found, return undefined
    return undefined;
    // #end-step
  }, obj);
  // #end-step
};
// #end-function
// #function filterData - Filters an array of data objects based on a set of filtering rules
/**
 * Filters an array of data objects based on a set of filtering rules.
 *
 * The function validates that each item in the array contains the required fields,
 * and applies all filter rules to return only the items that match.
 *
 * @template T - The type of items in the data array.
 * @param {T[]} dataArray - The array of data items to filter.
 * @param {Filter[]} filterRules - The set of filtering rules that define the criteria.
 * @returns {T[]} The array of items that passed validation and matched all filter rules.
 *
 * @example
 * const data = [
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 30 },
 *   { name: "Charlie", age: 20 }
 * ];
 * const rules: Filter[] = [
 *   { type: "comparison", field: "age", operator: ">", value: 22 }
 * ];
 * filterData(data, rules);
 * // Returns: [ { name: "Alice", age: 25 }, { name: "Bob", age: 30 } ]
 *
 * @example
 * const stringRules: Filter[] = [
 *   { type: "string", field: "name", operator: "starts_with", value: "A" }
 * ];
 * filterData(data, stringRules);
 * // Returns: [ { name: "Alice", age: 25 } ]
 */
export const filterData = <T>(
  dataArray: T[],
  filterRules: Filter[]
): T[] => {
  // #variable filteredData - contains the filtered data array
  const filteredData: T[] = [];
  // #end-variable

  // #step 1 - algorithm for validating the data structure >> validData[]
  const validData = dataArray.filter((item, index) => {
    // #step 1.a - search for missing fields in the current item, if it has missing fields remove the item
    const missingFields = filterRules
      .map(rule => rule.path ?? rule.field)
      .filter(path => getValueAtPath(item, path) === undefined);
    // #end-step

    // #step 1.b - if the item has missing fields, log a warning and exclude it
    if (missingFields.length > 0) {
      console.warn(
        `Missing field ${missingFields.join(", ")} at the item at index ${index}`
      );
      return false;
    }
    // #end-step

    // #step 1.c - if the item has no missing fields, include it
    return true;
    // #end-step
  });
  // #end-step

  // #step 2 - apply filter rules in the valid data array and push the results into filteredData
  for (const item of validData) {
    // #step 2.a - apply every filter rule to each valid item
    const matchesAll = filterRules.every(rule => applyFilter(item, rule));
    // #end-step

    // #step 2.b - add all matched items into the filteredData array
    if (matchesAll) {
      filteredData.push(item);
    }
    // #end-step
  }
  // #end-step

  // #step 3 - return filteredData
  return filteredData;
  // #end-step
};
// #end-function
// #function normalizeValue - Normalizes a value into a `number`, `Date`, or `null`
/**
 * Normalizes a value into a `number`, `Date`, or `null`.
 *
 * - If the value is already a `number`, it is returned as-is.
 * - If the value is a `Date`, it is returned as-is.
 * - If the value is a `string`, the function will try to:
 *   1. Parse it as a `Date` (ISO format or recognized date string).
 *   2. Parse it as a `number` if date parsing fails.
 * - In all other cases, the function returns `null`.
 *
 * @param {unknown} value - The value to normalize.
 * @returns {number | Date | null} The normalized value, or `null` if it cannot be converted.
 *
 * @example
 * normalizeValue("2025-09-16"); // returns Date object
 * normalizeValue("42"); // returns 42
 * normalizeValue(3.14); // returns 3.14
 * normalizeValue(new Date()); // returns the same Date instance
 * normalizeValue("invalid"); // returns null
 */
const normalizeValue = (value: unknown): number | Date | null => {
  // #step 1 - if the value is a number, return it directly
  if (typeof value === "number") {
    return value;
  }
  // #end-step

  // #step 2 - if the value is a Date instance, return it directly
  if (value instanceof Date) {
    return value;
  }
  // #end-step

  // #step 3 - if the value is a string, attempt to parse
  if (typeof value === "string") {
    // #step 3.a - try to parse as a Date
    const dateValue = new Date(value);
    if (!isNaN(dateValue.getTime())) {
      return dateValue;
    }
    // #end-step

    // #step 3.b - try to parse as a number
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      return numberValue;
    }
    // #end-step
  }
  // #end-step

  // #step 4 - return null if no valid conversion was possible
  return null;
  // #end-step
};
// #end-function
// #function compareValues - Compares two values that can be either `number` or `Date`
/**
 * Compares two values that can be either `number` or `Date`.
 *
 * - If both values are `Date` objects, the comparison is done by their timestamps.
 * - If both values are `number`, the comparison is done directly.
 * - If one is a `Date` and the other is a `number`, the `Date` is converted
 *   to a timestamp before comparing.
 *
 * @param {number | Date} value1 - The first value to compare.
 * @param {number | Date} value2 - The second value to compare.
 * @returns {number} The difference between the two values:
 * - A negative number if `value1` < `value2`.
 * - Zero if `value1` equals `value2`.
 * - A positive number if `value1` > `value2`.
 *
 * @example
 * compareValues(10, 20); // returns -10
 * compareValues(new Date("2025-01-01"), new Date("2025-01-02")); // returns negative
 * compareValues(new Date("2025-01-01"), 1735689600000); // compares Date to timestamp
 */
const compareValues = (value1: number | Date, value2: number | Date): number => {
  // #step 1 - if both values are Dates, compare their timestamps
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() - value2.getTime();
  }
  // #end-step
  // #step 2 - if both values are numbers, compare directly
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 - value2;
  }
  // #end-step
  // #step 3 - if types are mixed, convert Dates to timestamps before comparing
  const val1 = value1 instanceof Date ? value1.getTime() : value1;
  const val2 = value2 instanceof Date ? value2.getTime() : value2;

  return val1 - val2;
  // #end-step
};
// #end-function
// #function applyRangeFilter - Applies a range filter to a given value based on a `RangeFilter` rule
/**
 * Applies a range filter to a given value based on a `RangeFilter` rule.
 *
 * The function normalizes the input value and the rule boundaries (`minValue`, `maxValue`)
 * into either `number` or `Date`, and then checks if the value lies within
 * or outside the range, depending on the operator.
 *
 * - If any of the values (`value`, `minValue`, `maxValue`) cannot be normalized,
 *   the function returns `false`.
 * - The comparison can be inclusive (`>= min && <= max`) or exclusive (`> min && < max`),
 *   controlled by the `inclusive` property of the rule (defaults to `true`).
 *
 * @param {unknown} value - The value to test against the range.
 * @param {RangeFilter} rule - The range filter rule containing min, max, inclusive, and operator.
 * @returns {boolean} `true` if the value matches the rule, otherwise `false`.
 *
 * @example
 * applyRangeFilter(10, { minValue: 5, maxValue: 15, inclusive: true, operator: "between" }); // true
 * applyRangeFilter(20, { minValue: 5, maxValue: 15, inclusive: false, operator: "not_between" }); // true
 * applyRangeFilter("2025-09-16", { minValue: "2025-01-01", maxValue: "2025-12-31", operator: "between" }); // true
 */
const applyRangeFilter = (value: unknown, rule: RangeFilter): boolean => {
  // #variable normalizedValue - normalized representation of the input value
  const normalizedValue = normalizeValue(value);
  // #end-variable
  // #variable normalizedMin - normalized representation of the minimum boundary
  const normalizedMin = normalizeValue(rule.minValue);
  // #end-variable
  // #variable normalizedMax - normalized representation of the maximum boundary
  const normalizedMax = normalizeValue(rule.maxValue);
  // #end-variable
  // #variable isInclusive - determines whether the comparison is inclusive (default true)
  const isInclusive = rule.inclusive !== false;
  // #end-variable
  // #step 1 - return false if any normalized value is null
  if (normalizedValue === null || normalizedMin === null || normalizedMax === null) {
    return false;
  }
  // #end-step
  // #step 2 - compare normalizedValue with boundaries >> minComparison, maxComparison
  const minComparison = compareValues(normalizedValue, normalizedMin);
  const maxComparison = compareValues(normalizedValue, normalizedMax);
  // #end-step
  // #step 3 - determine if the value is within the range >> withinRange
  const withinRange = isInclusive 
    ? minComparison >= 0 && maxComparison <= 0
    : minComparison > 0 && maxComparison < 0;
  // #end-step
  // #step 4 - apply the operator to return the final result
  switch (rule.operator) {
    case "between":
      return withinRange;
    case "notBetween":
      return !withinRange;
    default:
      return false;
  }
  // #end-step
};
// #end-function
// #function applyEqualityFilter - Applies an equality filter to a given value based on an `EqualityFilter` rule
/**
 * Applies an equality filter to a given value based on an `EqualityFilter` rule.
 *
 * - Supports `=` (strict equality) and `!=` (strict inequality) operators.
 * - Returns `false` for any unsupported operator.
 *
 * @param {unknown} value - The value to test against the rule.
 * @param {EqualityFilter} rule - The equality filter rule containing `value` and `operator`.
 * @returns {boolean} `true` if the value matches the rule, otherwise `false`.
 *
 * @example
 * applyEqualityFilter(10, { value: 10, operator: "=" }); // true
 * applyEqualityFilter("test", { value: "test", operator: "!=" }); // false
 */
const applyEqualityFilter = (value: unknown, rule: EqualityFilter): boolean => {
  // #step 1 - apply the equality operator
  switch (rule.operator) {
    case "=":
      return value === rule.value;
    case "!=":
      return value !== rule.value;
    default:
      return false;
  }
  // #end-step
};
// #end-function
// #function applyComparisonFilter - Applies a comparison filter to a given value based on a `ComparisonFilter` rule
/**
 * Applies a comparison filter to a given value based on a `ComparisonFilter` rule.
 *
 * - Supports `>`, `<`, `>=`, `<=` operators.
 * - Returns `false` if the input value is not a number or the operator is unsupported.
 *
 * @param {unknown} value - The value to test against the rule.
 * @param {ComparisonFilter} rule - The comparison filter rule containing `value` and `operator`.
 * @returns {boolean} `true` if the value satisfies the comparison, otherwise `false`.
 *
 * @example
 * applyComparisonFilter(10, { value: 5, operator: ">" }); // true
 * applyComparisonFilter(3, { value: 5, operator: "<=" }); // true
 * applyComparisonFilter("3", { value: 5, operator: "<" }); // false
 */
const applyComparisonFilter = (value: unknown, rule: ComparisonFilter): boolean => {
  // #step 1 - ensure the input value is a number
  if (typeof value !== "number") return false;
  // #end-step

  // #step 2 - apply the comparison operator
  switch (rule.operator) {
    case ">": 
      return value > rule.value;
    case "<": 
      return value < rule.value;
    case ">=": 
      return value >= rule.value;
    case "<=": 
      return value <= rule.value;
    default:
      return false;
  }
  // #end-step
};
// #end-function
// #function applyStringFilter - Applies a string filter to a given value based on a `StringFilter` rule
/**
 * Applies a string filter to a given value based on a `StringFilter` rule.
 *
 * - Supports `contains`, `not_contains`, `starts_with`, and `ends_with` operators.
 * - Respects case sensitivity if `rule.caseSensitive` is `true`; otherwise, converts both
 *   the input value and rule value to lowercase.
 * - Returns `false` if the input value is not a string or the operator is unsupported.
 *
 * @param {unknown} value - The value to test against the string filter rule.
 * @param {StringFilter} rule - The string filter rule containing `value`, `operator`, and `caseSensitive`.
 * @returns {boolean} `true` if the value satisfies the string filter, otherwise `false`.
 *
 * @example
 * applyStringFilter("Hello World", { value: "world", operator: "contains", caseSensitive: false }); // true
 * applyStringFilter("Test", { value: "T", operator: "starts_with" }); // true
 */
const applyStringFilter = (value: unknown, rule: StringFilter): boolean => {
  // #step 1 - ensure the input value is a string
  if (typeof value !== "string") return false;
  // #end-step
  // #variable searchValue - normalized rule value based on case sensitivity
  const searchValue = rule.caseSensitive === true ? rule.value : rule.value.toLowerCase();
  // #end-variable
  // #variable targetValue - normalized input string based on case sensitivity
  const targetValue = rule.caseSensitive === true ? value : value.toLowerCase();
  // #end-variable
  // #step 2 - apply string comparison operator
  switch (rule.operator) {
    case "contains":
      return targetValue.includes(searchValue);
    case "notContains":
      return !targetValue.includes(searchValue);
    case "startsWith":
      return targetValue.startsWith(searchValue);
    case "endsWith":
      return targetValue.endsWith(searchValue);
    default:
      return false;
  }
  // #end-step
};
// #end-function
// #function applyBooleanFilter - Applies a boolean filter to a given value based on a `BooleanFilter` rule
/**
 * Applies a boolean filter to a given value based on a `BooleanFilter` rule.
 *
 * - Supports `isTrue`, `isFalse`, `isNull`, and `isNotNull` operators.
 * - Returns `false` for any unsupported operator.
 *
 * @param {unknown} value - The value to test against the boolean filter rule.
 * @param {BooleanFilter} rule - The boolean filter rule containing the operator.
 * @returns {boolean} `true` if the value satisfies the boolean condition, otherwise `false`.
 *
 * @example
 * applyBooleanFilter(true, { operator: "isTrue" }); // true
 * applyBooleanFilter(null, { operator: "isNull" }); // true
 * applyBooleanFilter(false, { operator: "isNotNull" }); // true
 */
const applyBooleanFilter = (value: unknown, rule: BooleanFilter): boolean => {
  // #step 1 - apply the boolean operator
  switch (rule.operator) {
    case "isTrue":
      return value === true;
    case "isFalse":
      return value === false;
    case "isNull":
      return value === null || value === undefined;
    case "isNotNull":
      return value !== null && value !== undefined;
    default:
      return false;
  }
  // #end-step
};
// #end-function
// #function applyFilter - Applies a filter rule to a given item property
/**
 * Applies a filter rule to a given item property.
 *
 * - Determines the value from the item based on the filter's `path` or `field`.
 * - Delegates evaluation to the specific filter function based on the filter type:
 *   `equality`, `comparison`, `string`, `range`, or `boolean`.
 * - Returns `false` if the filter type is unsupported.
 *
 * @param {T} item - The object containing the property to filter.
 * @param {Filter} rule - The filter rule to apply.
 * @returns {boolean} `true` if the item satisfies the filter rule, otherwise `false`.
 *
 * @example
 * applyFilter({ age: 25 }, { type: "comparison", operator: ">", value: 20, field: "age" }); // true
 * applyFilter({ name: "Alice" }, { type: "string", operator: "starts_with", value: "A", field: "name" }); // true
 */
const applyFilter = <T>(item: T, rule: Filter): boolean => {
  // #variable value - the property value extracted from the item
  const value = getValueAtPath(item, rule.path ?? rule.field);
  // #end-variable
  // #step 1 - determine filter type and delegate to the corresponding filter function
  switch (rule.type) {
    case "equality": {
      const eqRule = rule as EqualityFilter;
      return applyEqualityFilter(value, eqRule);
    }
    case "comparison": {
      const compRule = rule as ComparisonFilter;
      return applyComparisonFilter(value, compRule);
    }
    case "string": {
      const stringRule = rule as StringFilter;
      return applyStringFilter(value, stringRule);
    }
    case "range": {
      const rangeRule = rule as RangeFilter;
      return applyRangeFilter(value, rangeRule);
    }
    case "boolean": {
      const boolRule = rule as BooleanFilter;
      return applyBooleanFilter(value, boolRule);
    }
    default:
      return false;
  }
  // #end-step
};
// #end-function

/** #info - Estructura de uso 
 * filterData
 * ├─ getValueAtPath
 * └─ applyFilter
 *    ├─ getValueAtPath
 *    ├─ applyEqualityFilter
 *    ├─ applyComparisonFilter
 *    ├─ applyBooleanFilter
 *    ├─ applyStringFilter
 *    └─ applyRangeFilter
 *       ├─ normalizeValue
 *       └─ compareValues
*/