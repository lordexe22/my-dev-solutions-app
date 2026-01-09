# Style System

## Propósito

El Style System es una carpeta centralizada que contiene **componentes CSS reutilizables** diseñados para ser el único punto de definición de estilos en toda la aplicación. Esta estructura garantiza:

### Principios Clave

1. **No Reedición (Write-Once)**: Los estilos definidos en esta carpeta no deben editarse nuevamente, excepto el archivo `_variables.css`
2. **Reutilización**: Cada componente está diseñado para ser usado en múltiples contextos sin necesidad de modificaciones
3. **Mantenibilidad**: Centralizar los estilos en un único lugar facilita actualizaciones consistentes en toda la aplicación
4. **Documentación Clara**: Cada archivo CSS contiene estructura de elementos requerida y secciones comentadas

## Estructura de Archivos

### `_variables.css`
**Archivo de configuración única y editable**

Contiene todas las variables CSS (colores, tamaños, breakpoints, etc.) que se reutilizan en los componentes. Este es el **único archivo que debe editarse durante el desarrollo** para ajustar apariencia y comportamiento visual.

**Secciones actuales:**
- Breakpoints (móvil, tablet, desktop)
- Variables de botones (colores, tamaños, sombras, iconos)
- Variables de modales (colores, dimensiones, animaciones)

### `button.css`
**Estilos definitivos para botones**

Define dos variantes de botones:
- `.btn-pri`: Botón primario (azul)
- `.btn-sec`: Botón secundario (gris claro)

Con tres tamaños:
- `.btn-sm`: Small (0.875rem)
- `.btn-md`: Medium (1rem)
- `.btn-lg`: Large (1.125rem)

Con opciones de alineación de texto:
- `.btn-left`: Alinea el texto a la izquierda
- `.btn-center`: Alinea el texto al centro (default)
- `.btn-right`: Alinea el texto a la derecha

**Estructura HTML requerida:**
```html
<button class="btn-pri btn-md btn-center">
  <svg class="btn-icon" viewBox="0 0 24 24">
    <!-- Ícono SVG -->
  </svg>
  <span>Texto del botón</span>
</button>
```

**Características:**
- **Iconos siempre a la izquierda**: El ícono usa `order: -1` para posicionarse siempre a la izquierda
- **Texto alineable**: Combina con `.btn-left`, `.btn-center` o `.btn-right` para controlar la alineación
- Estados: hover, active, focus, disabled
- Soporte para iconos SVG con tamaños proporcionados
- Sombras dinámicas según estado
- Transiciones suaves (0.3s ease)
- Diseño flexbox para máxima flexibilidad

### `modal.css`
**Estilos definitivos para ventanas modales**

Define una ventana modal completa con estructura fija:
- `.modal-overlay`: Fondo oscuro con desenfoque (backdrop)
- `.modal-container`: Contenedor principal
- `.modal-header`: Encabezado con opción de botón cerrar
- `.modal-logo`: Sección para imagen/logo (opcional)
- `.modal-body`: Contenido principal con scroll
- `.modal-footer`: Pie con botones de acción
- `.modal--fixed`: Variante para altura fija

**Estructura HTML requerida:**
```html
<div class="modal-overlay">
  <div class="modal-container">
    <div class="modal-header">
      <h2>Título</h2>
      <button class="btn-close">×</button>
    </div>
    <div class="modal-logo">
      <img src="..." alt="logo" />
    </div>
    <div class="modal-body">
      <!-- Contenido -->
    </div>
    <div class="modal-footer">
      <button class="btn-sec btn-md">Cancelar</button>
      <button class="btn-pri btn-md">Confirmar</button>
    </div>
  </div>
</div>
```

**Características:**
- Overlay centrado con animaciones (fadeIn, slideUp)
- Scroll automático en body si contenido excede altura
- Diseño responsive (92% ancho máximo)
- Sombras y bordes configurables
- Footer con gradiente opcional

### `main.css`
**Estilos globales y reset**

Contiene estilos generales y reset de la aplicación.

### `_reset.css`
**Reset CSS base**

Normalización de estilos por defecto del navegador.

## Uso en Componentes React

Para usar los estilos en tus componentes React:

```tsx
import 'ruta/al/style_system/button.css'
import 'ruta/al/style_system/modal.css'

export const MiComponente = () => {
  return (
    <>
      {/* Botón con ícono centrado */}
      <button className="btn-pri btn-lg btn-center">
        <svg className="btn-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
        <span>Click aquí</span>
      </button>

      {/* Botón con ícono alineado a la izquierda */}
      <button className="btn-sec btn-md btn-left">
        <svg className="btn-icon" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
        <span>Cancelar</span>
      </button>

      {/* Botón sin ícono */}
      <button className="btn-pri btn-lg">
        <span>Enviar</span>
      </button>
    </>
  )
}
```

**Clases disponibles:**

| Tipo | Opciones |
|------|----------|
| Variante | `.btn-pri`, `.btn-sec` |
| Tamaño | `.btn-sm`, `.btn-md`, `.btn-lg` |
| Alineación | `.btn-left`, `.btn-center`, `.btn-right` |

## Flujo de Cambios Visuales

**Para cambios visuales**, edita únicamente `_variables.css`:

```css
/* Ejemplo: cambiar color primario del botón */
--btn-pri-bgcolor: #3b82f6; /* Nuevo azul más claro */
```

Los cambios se aplicarán automáticamente a todos los componentes que usen esa variable.

## Próximas Adiciones al Style System

Se pueden agregar nuevos componentes CSS siguiendo estos principios:
- Definir todas las variables necesarias en `_variables.css`
- Crear archivo separado (ej: `card.css`, `input.css`, `badge.css`)
- Documentar estructura HTML requerida en comentarios
- Usar secciones `#section` y `#end-section` para claridad
- No depender de componentes fuera del Style System

## Referencia de Variables

Ver `_variables.css` para el listado completo de variables disponibles y sus valores.
