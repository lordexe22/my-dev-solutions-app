## Indice
<nav>
  <ul>
    <li><a href="#t1">¿Qué hace el módulo?</a></li>
    <li><a href="#t2">¿Cómo se usa?</a></li>
    <li><a href="#t3">Requisitos</a></li>
    <li><a href="#t4">Alcance y limitaciones del módulo</a></li>
    <li><a href="#t5">Notas importantes</a></li>
  </ul>
</nav>

<h2 id="t1">¿Qué hace el módulo?</h2>
El Módulo de Filtrado de Datos es una librería TypeScript especializada que proporciona un sistema completo y type-safe para filtrar arrays de objetos usando reglas de filtrado flexibles y configurables.

### Funcionalidades principales:
#### Filtrado avanzado de datos
Aplica múltiples reglas de filtrado simultáneamente a arrays de objetos
Soporta navegación profunda de propiedades usando dot notation (user.address.city) o arrays de claves.
Valida automáticamente la estructura de datos antes de aplicar filtros
#### Tipos de filtros especializados:

* **Filtros de Igualdad (EqualityFilter)**

      Operadores: =, !=
      Para comparaciones exactas de valores primitivos


* **Filtros de Comparación (ComparisonFilter)**

        Operadores: >, <, >=, <=
        Específicamente para valores numéricos


* **Filtros de Texto (StringFilter)**

        Operadores: contains, not_contains, starts_with, ends_with
        Soporte para búsquedas case-sensitive/insensitive


* **Filtros de Rango (RangeFilter)**

        Operadores: between, not_between
        Maneja números, fechas y strings de fecha con comparaciones inclusivas/exclusivas


* **Filtros Booleanos (BooleanFilter)**

        Operadores: isTrue, isFalse, isNull, isNotNull
        Para validaciones de estado y existencia
#### Características técnicas destacadas:

Type Safety completo: Todas las interfaces están tipadas con TypeScript
Normalización inteligente: Convierte automáticamente strings a números/fechas cuando es necesario
Validación robusta: Detecta y reporta campos faltantes en los datos
Navegación de propiedades: Accede a propiedades anidadas de cualquier profundidad
Logging integrado: Proporciona warnings cuando encuentra datos incompletos
#### Caso de uso típico:
Ideal para implementar sistemas de búsqueda avanzada, filtros de tablas de datos, APIs con parámetros de query complejos, dashboards analíticos, y cualquier escenario donde necesites filtrar grandes volúmenes de datos estructurados con criterios múltiples y específicos.


<h2 id="t2">¿Como se usa?</h2>

### Importación
```typescript
import { filterData } from './filter.utils';
import type { Filter, EqualityFilter, ComparisonFilter, StringFilter, RangeFilter, BooleanFilter } from './filter';
```
### Uso básico
La función principal filterData() recibe dos parámetros:

**dataArray**: Array de objetos a filtrar

**filterRules**: Array de reglas de filtrado
```typescript
const data = [
  { name: "Alice", age: 25, city: "Madrid" },
  { name: "Bob", age: 30, city: "Barcelona" },
  { name: "Charlie", age: 20, city: "Valencia" }
];

const rules: Filter[] = [
  { type: "comparison", field: "age", operator: ">", value: 22 }
];

const result = filterData(data, rules);
// Resultado: [{ name: "Alice", age: 25, city: "Madrid" }, { name: "Bob", age: 30, city: "Barcelona" }]
```

### Ejemplos por tipo de filtro

1. Filtros de Igualdad
```typescript
// Filtrar por valor exacto
const equalityRules: EqualityFilter[] = [
  { type: "equality", field: "city", operator: "=", value: "Madrid" },
  { type: "equality", field: "age", operator: "!=", value: 25 }
];
```
2. Filtros de Comparación
```typescript
// Filtrar por rangos numéricos
const comparisonRules: ComparisonFilter[] = [
  { type: "comparison", field: "age", operator: ">=", value: 25 },
  { type: "comparison", field: "salary", operator: "<", value: 50000 }
];
```
3. Filtros de Texto
```typescript
// Búsquedas de texto avanzadas
const stringRules: StringFilter[] = [
  { type: "string", field: "name", operator: "starts_with", value: "A" },
  { type: "string", field: "email", operator: "contains", value: "@gmail", caseSensitive: false },
  { type: "string", field: "description", operator: "not_contains", value: "deprecated" }
];
```
4. Filtros de Rango
```typescript
// Filtros entre valores (fechas, números)
const rangeRules: RangeFilter[] = [
  { 
    type: "range", 
    field: "birthDate", 
    operator: "between", 
    minValue: "1990-01-01", 
    maxValue: "2000-12-31",
    inclusive: true 
  },
  { 
    type: "range", 
    field: "score", 
    operator: "not_between", 
    minValue: 0, 
    maxValue: 50,
    inclusive: false 
  }
];
```
5. Filtros Booleanos
```ts
// Validaciones de estado
const booleanRules: BooleanFilter[] = [
  { type: "boolean", field: "isActive", operator: "isTrue" },
  { type: "boolean", field: "deletedAt", operator: "isNull" },
  { type: "boolean", field: "email", operator: "isNotNull" }
];
```
### Navegación de propiedades anidadas
1. Usando dot notation (string)
```ts
const userData = [
  {user: {profile: {name: "Alice" }}},
  {user: {profile: {name: "Bob" }}}
];

const rules: Filter[] = [
  { 
    type: "equality", 
    field: "name", 
    path: "user.profile.name", 
    operator: "=", 
    value: "Alice" 
  }
];
```
2. Usando array
```ts
const userData = [
  {user: {profile: {name: "Alice" }}},
  {user: {profile: {name: "Bob" }}}
];

const rules: Filter[] = [
  { 
    type: "equality", 
    field: "name", 
    path: ["user", "profile", "name"], 
    operator: "=", 
    value: "Alice" 
  }
];
```
<h2 id="t3">Requisitos</h2>

### Dependencias del sistema

**TypeScript**
- Versión mínima recomendada: TypeScript 4.0+
- El módulo está completamente escrito en TypeScript y requiere un entorno que soporte tipado estático
- Todas las interfaces y tipos están definidos para garantizar type safety

### Entorno de ejecución

**JavaScript ES6+**
- El módulo utiliza características modernas de JavaScript como:
  - `Array.prototype.reduce()`
  - `Array.prototype.filter()`
  - `Array.prototype.every()`
  - `String.prototype.split()`
  - `String.prototype.includes()`
  - `String.prototype.startsWith()`
  - `String.prototype.endsWith()`
  - Destructuring y spread operators

<h2 id="t4">Alcance y limitaciones del módulo</h2>

### Alcance del módulo

**Funcionalidades soportadas:**

- **Type Safety completo**: Todas las operaciones están tipadas con TypeScript, proporcionando autocompletado y validación en tiempo de desarrollo
- **Navegación profunda de objetos**: Soporte completo para acceder a propiedades anidadas a cualquier nivel de profundidad
- **Múltiples estrategias de filtrado**: Cinco tipos especializados de filtros (igualdad, comparación, string, rango, boolean)
- **Validación automática de datos**: Detecta y reporta campos faltantes antes de aplicar filtros
- **Normalización inteligente**: Conversión automática de strings a números/fechas en filtros de rango
- **Logging integrado**: Warnings automáticos en consola para datos incompletos o inválidos
- **Soporte multi-tipo**: Maneja números, strings, fechas, booleanos y valores null/undefined
- **Filtrado combinado**: Aplicación simultánea de múltiples reglas con lógica AND

### Limitaciones del módulo

**Restricciones por tipo de filtro:**

- **Filtros de Comparación (`ComparisonFilter`)**: 
  - Solo funcionan con valores de tipo `number`
  - Si el valor no es numérico, el filtro retorna `false` automáticamente
  
- **Filtros de String (`StringFilter`)**: 
  - Solo funcionan con valores de tipo `string`
  - No realiza conversión automática de otros tipos a string

- **Filtros de Rango (`RangeFilter`)**: 
  - La normalización solo soporta `number`, `Date`, y strings que puedan convertirse
  - Valores que no se pueden normalizar resultan en `false`

**Comportamiento de validación:**

- **Exclusión completa por campos faltantes**: Si un objeto no tiene todos los campos requeridos por los filtros, se excluye completamente del resultado
- **No hay filtrado parcial**: No es posible aplicar solo algunos filtros si faltan campos

**Consideraciones de performance:**

- **Complejidad O(n×m)**: Donde `n` es el número de objetos y `m` el número de filtros
- **Validación en cada iteración**: Cada objeto se valida completamente antes del filtrado
- **Sin optimizaciones de índices**: No hay cacheo o indexación para datasets grandes

**Limitaciones lógicas:**

- **Solo lógica AND**: Todos los filtros deben cumplirse simultáneamente
- **No soporta lógica OR**: No es posible crear filtros con condiciones alternativas
- **No soporta agrupación de filtros**: No hay paréntesis o precedencia de operadores

### Casos de uso recomendados

**Ideal para:**
- Filtrado de datasets pequeños a medianos (< 10,000 registros)
- Aplicaciones con filtros predefinidos y estructuras de datos conocidas
- APIs que requieren filtrado server-side con reglas complejas
- Dashboards con filtros múltiples y validación estricta

**No recomendado para:**
- Datasets muy grandes que requieran alta performance
- Casos que necesiten lógica OR o filtros condicionales complejos
- Situaciones donde se requiera filtrado parcial con datos incompletos
- Aplicaciones que necesiten filtros dinámicos con tipos de datos variables.

<h2 id="t5">Notas importantes</h2>

### Consideraciones críticas de implementación
#### Orden de evaluación de filtros
* Todos los filtros se evalúan con lógica AND (deben cumplirse todos)
* El orden de los filtros en el array NO afecta el resultado final
* Por performance, es mejor colocar primero los filtros más selectivos (que eliminen más datos)

#### Manejo de valores null/undefined
* Los filtros BooleanFilter con operadores isNull/isNotNull manejan tanto null como undefined
* Para otros tipos de filtros, valores null o undefined generalmente resultan en false.
* La función getValueAtPath retorna undefined si no encuentra la ruta especificada.

#### Prioridad entre field y path
* `field` indica el nombre del campo al que se le aplica el filtro.
* `path` se usa cuando el campo del filtro tiene varios niveles de profundidad y se usa para indicar como llegar a dicho campo.
* Si un filtro tiene tanto field como path definidos, siempre se usa path
* El field se usa únicamente cuando path está ausente
* Esta lógica está implementada en: `getValueAtPath(item, rule.path ?? rule.field)`

#### Normalización en RangeFilter
* La normalización de fechas acepta formatos ISO y otros formatos reconocidos por new Date()
* Si cualquier valor (value, minValue, maxValue) no puede normalizarse, todo el filtro retorna false
* Los timestamps se comparan numericamente, las fechas por su valor getTime()

#### Logging y debugging
* Console warnings automáticos
* Se generan warnings cuando faltan campos requeridos por los filtros
* Formato: `"Missing field {campo} at the item at index {índice}"`
* Estos warnings NO detienen la ejecución, solo informan sobre datos incompletos

#### Performance y optimización
* Para arrays > 10,000 elementos, considera implementar paginación
* La validación de campos se ejecuta antes del filtrado - puede ser costosa
* Si todos tus datos tienen la misma estructura, podrías omitir la validación modificando el código

#### Filtros costosos
* RangeFilter es el más costoso debido a la normalización de valores
* StringFilter con caseSensitive: false realiza conversiones toLowerCase() en cada comparación
* ComparisonFilter es el más eficiente para datos numéricos

#### Extensibilidad
Para agregar nuevos tipos de filtro
1. Define el nuevo tipo en filter.d.ts
2. Agrega el case correspondiente en la función applyFilter
3. Implementa la función específica siguiendo el patrón apply{TipoFiltro}Filter

Para modificar comportamiento existente

* Para cambiar la lógica AND por OR, modifica el every() por some() en filterData
* Para logging personalizado, reemplaza console.warn en el filtro de validación
* Para navegación custom, modifica la función getValueAtPath