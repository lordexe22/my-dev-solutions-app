# Toast Notifications

## Propósito

El componente Toast es un sistema de notificaciones **temporal y no intrusivo** diseñado para mostrar mensajes breves al usuario. Se utiliza para confirmaciones, advertencias, errores e información general.

## Principios Clave

1. **Temporal**: Los toasts desaparecen automáticamente después de un tiempo configurado
2. **No Bloqueante**: El usuario puede continuar interactuando con la aplicación
3. **Apilable**: Múltiples toasts pueden coexistir sin conflicto
4. **Flexible**: Se puede posicionar en cualquier esquina de la pantalla
5. **Accesible**: Soporte para lectores de pantalla y navegación por teclado

## Estructura de Elementos

### Estructura HTML Requerida

```html
<div class="toast-container toast-top-right">
  <div class="toast toast-success toast-3s toast-fade-in">
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <!-- Ícono SVG -->
      </svg>
    </div>
    <div class="toast-message">
      <h4>Título</h4>
      <p>Mensaje del toast</p>
    </div>
    <div class="toast-actions">
      <button class="btn-sec btn-sm">
        <!-- Botón de cerrar opcional -->
      </button>
    </div>
  </div>
</div>
```

## Clases Disponibles

### Contenedor: `.toast-container`

Define el contenedor principal para los toasts. **Obligatorio** para posicionamiento.

**Variantes de posicionamiento:**
- `.toast-top-right` (default): Esquina superior derecha
- `.toast-top-left`: Esquina superior izquierda
- `.toast-bottom-right`: Esquina inferior derecha
- `.toast-bottom-left`: Esquina inferior izquierda

```html
<div class="toast-container toast-top-right">
  <!-- Toasts aquí -->
</div>
```

### Toast: `.toast`

Elemento base del toast. Contiene icono, mensaje y opcionales acciones.

**Variantes de tipo** (define colores y estilos):
- `.toast-success`: Verde (confirmaciones exitosas)
- `.toast-error`: Rojo (errores)
- `.toast-warning`: Naranja/Amarillo (advertencias)
- `.toast-info`: Azul (información general)

**Variantes de duración** (auto-dismiss):
- `.toast-3s`: Desaparece en 3 segundos
- `.toast-4s`: Desaparece en 4 segundos
- `.toast-5s`: Desaparece en 5 segundos

**Variantes de animación** (entrada):
- `.toast-fade-in`: Desvanecimiento suave
- `.toast-slide-in`: Deslizamiento desde la derecha

```html
<div class="toast toast-success toast-3s toast-slide-in">
  <!-- Contenido -->
</div>
```

### Icono: `.toast-icon`

Contenedor para el ícono del toast. **Opcional**.

```html
<div class="toast-icon">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <!-- Ícono SVG -->
  </svg>
</div>
```

### Mensaje: `.toast-message`

Contenedor para el título y descripción del toast.

**Estructura interna:**
- `<h4>`: Título del toast (opcional)
- `<p>`: Mensaje/descripción (opcional)

```html
<div class="toast-message">
  <h4>Título</h4>
  <p>Mensaje detallado</p>
</div>
```

### Acciones: `.toast-actions`

Contenedor para botones de acción. **Opcional**.

Típicamente contiene:
- Botón de cerrar (`.btn-sec .btn-sm`)
- Botones de acción adicionales

```html
<div class="toast-actions">
  <button class="btn-sec btn-sm">Cerrar</button>
</div>
```

## Características

### Tipos de Toast

Cada tipo tiene una paleta de colores distintiva:

| Tipo | Color | Uso |
|------|-------|-----|
| **Success** | Verde | Confirmaciones, operaciones exitosas |
| **Error** | Rojo | Errores, operaciones fallidas |
| **Warning** | Naranja/Amarillo | Advertencias, acciones críticas |
| **Info** | Azul | Información general, estado |

### Duración Automática

Los toasts desaparecen automáticamente tras el tiempo especificado:
- **3 segundos**: Mensajes simples y directos
- **4 segundos**: Mensajes con un poco más de contenido
- **5 segundos**: Mensajes largos o críticos

### Posicionamiento

Se puede colocar en cualquiera de las 4 esquinas:
- Superior derecha (default)
- Superior izquierda
- Inferior derecha
- Inferior izquierda

### Animaciones de Entrada

Dos opciones de animación:
- **Fade In**: Desvanecimiento suave (más sutil)
- **Slide In**: Deslizamiento desde la derecha (más visible)

### Apilamiento

Cuando hay múltiples toasts:
- Se apilan verticalmente
- Cada nuevo toast aparece en el mismo punto
- Los antiguos se desplazan automáticamente
- Máximo espaciado configurable en `_variables.css`

### Accesibilidad

- Atributos `role="alert"` para lectores de pantalla
- `aria-live="polite"` para anuncio de cambios
- Contraste de colores accesible (WCAG AA)
- Navegación por teclado en botones

## Variables de Configuración

Todas las variables se encuentran en `_variables.css`:

```css
/* Posicionamiento */
--toast-z-index: 2000;
--toast-container-padding: 1rem;
--toast-container-padding-mobile: 0.75rem;
--toast-gap: 0.75rem;

/* Tamaños */
--toast-max-width: 380px;
--toast-font-size: 0.95rem;
--toast-padding: 1rem;
--toast-border-radius: 0.5rem;
--toast-icon-size: 1.25rem;
--toast-icon-gap: 0.75rem;

/* Sombras */
--toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Animación */
--toast-animation-duration: 0.25s;

/* Colores Success */
--toast-success-bgcolor: #dcfce7;
--toast-success-color: #166534;
--toast-success-border-color: #86efac;

/* Colores Error */
--toast-error-bgcolor: #fee2e2;
--toast-error-color: #991b1b;
--toast-error-border-color: #fca5a5;

/* Colores Warning */
--toast-warning-bgcolor: #fef3c7;
--toast-warning-color: #92400e;
--toast-warning-border-color: #fcd34d;

/* Colores Info */
--toast-info-bgcolor: #dbeafe;
--toast-info-color: #0c4a6e;
--toast-info-border-color: #93c5fd;
```

## Ejemplos de Uso

### Toast Success Básico

```html
<div class="toast-container toast-top-right">
  <div class="toast toast-success toast-3s toast-slide-in">
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </div>
    <div class="toast-message">
      <h4>¡Éxito!</h4>
      <p>La operación se completó correctamente</p>
    </div>
  </div>
</div>
```

### Toast Error con Botón de Cerrar

```html
<div class="toast-container toast-top-right">
  <div class="toast toast-error toast-5s toast-fade-in">
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    </div>
    <div class="toast-message">
      <h4>Error</h4>
      <p>Ocurrió un problema al procesar tu solicitud</p>
    </div>
    <div class="toast-actions">
      <button class="btn-sec btn-sm">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
      </button>
    </div>
  </div>
</div>
```

### Toast Warning en Esquina Inferior Izquierda

```html
<div class="toast-container toast-bottom-left">
  <div class="toast toast-warning toast-4s toast-slide-in">
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
    </div>
    <div class="toast-message">
      <h4>Advertencia</h4>
      <p>Esta acción no se puede deshacer</p>
    </div>
  </div>
</div>
```

## Responsividad

El componente es **100% responsive**:
- En móvil: Se adapta al ancho disponible (92%)
- Padding y espaciado se reducen en pantallas pequeñas
- Funciona correctamente en todas las orientaciones

## Consideraciones de Diseño

1. **No abusarUsar**: Los toasts son para mensajes breves y temporales
2. **Claridad**: Mantener mensajes concisos y directos
3. **Contexto**: Usar el tipo apropiado para cada situación
4. **Duración**: Toasts más importantes pueden tener mayor duración
5. **Acciones**: Mantener máximo 1-2 botones por toast
6. **Posición**: La posición superior derecha es la más común por defecto

## Estados

Cada toast tiene estos estados:
- **Inicial**: Aparece con animación
- **Activo**: Visible al usuario
- **Salida**: Desaparece con animación (fade-out)
- **Removido**: Eliminado del DOM

## Reutilización con Otros Componentes

Los toasts pueden reutilizar botones del Style System:
- `.btn-pri`: Para acciones primarias
- `.btn-sec`: Para acciones secundarias o cerrar
- `.btn-sm`, `.btn-md`: Para diferentes tamaños
