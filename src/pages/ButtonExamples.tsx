/**
 * Button Examples
 * 
 * Este archivo contiene ejemplos completos de cómo usar los botones del Style System
 * con todas sus variaciones de tamaño, tipo y alineación.
 * 
 * CLASES DISPONIBLES:
 * - Tipo: .btn-pri (primario), .btn-sec (secundario)
 * - Tamaño: .btn-sm (pequeño), .btn-md (mediano), .btn-lg (grande)
 * - Alineación: .btn-left (izquierda), .btn-center (centro), .btn-right (derecha)
 */

import type { CSSProperties } from 'react';

const CheckIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
);

const PlusIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// =====================================================
// EJEMPLOS: BOTONES SIN ICONOS
// =====================================================
export const ButtonsWithoutIcons = () => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Botones sin Iconos - Solo Texto</h3>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Small Primario</div>
          <button className="btn-pri btn-sm btn-fit">
            <span>Pequeño</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium Primario</div>
          <button className="btn-pri btn-md btn-fit">
            <span>Mediano</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large Primario</div>
          <button className="btn-pri btn-lg btn-fit">
            <span>Grande</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Small Secundario</div>
          <button className="btn-sec btn-sm btn-fit">
            <span>Pequeño</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium Secundario</div>
          <button className="btn-sec btn-md btn-fit">
            <span>Mediano</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large Secundario</div>
          <button className="btn-sec btn-lg btn-fit">
            <span>Grande</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// EJEMPLOS: BOTONES CON ICONOS - ALINEACIÓN LEFT
// =====================================================
export const ButtonsWithIconsLeft = () => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Botones con Iconos - Alineación LEFT (Izquierda)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        El ícono aparece a la izquierda, el texto también está alineado a la izquierda.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Small - Left</div>
          <button className="btn-pri btn-sm btn-left btn-fit">
            <CheckIcon />
            <span>Enviar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium - Left</div>
          <button className="btn-pri btn-md btn-left btn-fit">
            <CheckIcon />
            <span>Confirmar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large - Left</div>
          <button className="btn-pri btn-lg btn-left btn-fit">
            <CheckIcon />
            <span>Aceptar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Small Sec - Left</div>
          <button className="btn-sec btn-sm btn-left btn-fit">
            <CloseIcon />
            <span>Cancelar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium Sec - Left</div>
          <button className="btn-sec btn-md btn-left btn-fit">
            <CloseIcon />
            <span>Rechazar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large Sec - Left</div>
          <button className="btn-sec btn-lg btn-left btn-fit">
            <CloseIcon />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// EJEMPLOS: BOTONES CON ICONOS - ALINEACIÓN CENTER
// =====================================================
export const ButtonsWithIconsCenter = () => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Botones con Iconos - Alineación CENTER (Centro - DEFAULT)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        El ícono aparece a la izquierda, el texto está centrado. Esta es la alineación por defecto.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Small - Center</div>
          <button className="btn-pri btn-sm btn-center btn-fit">
            <CheckIcon />
            <span>Enviar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium - Center</div>
          <button className="btn-pri btn-md btn-center btn-fit">
            <CheckIcon />
            <span>Confirmar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large - Center</div>
          <button className="btn-pri btn-lg btn-center btn-fit">
            <CheckIcon />
            <span>Aceptar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Small Sec - Center</div>
          <button className="btn-sec btn-sm btn-center btn-fit">
            <CloseIcon />
            <span>Cancelar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium Sec - Center</div>
          <button className="btn-sec btn-md btn-center btn-fit">
            <CloseIcon />
            <span>Rechazar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large Sec - Center</div>
          <button className="btn-sec btn-lg btn-center btn-fit">
            <CloseIcon />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// EJEMPLOS: BOTONES CON ICONOS - ALINEACIÓN RIGHT
// =====================================================
export const ButtonsWithIconsRight = () => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Botones con Iconos - Alineación RIGHT (Derecha)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        El ícono aparece a la izquierda, el texto está alineado a la derecha.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Small - Right</div>
          <button className="btn-pri btn-sm btn-right btn-fit">
            <CheckIcon />
            <span>Enviar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium - Right</div>
          <button className="btn-pri btn-md btn-right btn-fit">
            <CheckIcon />
            <span>Confirmar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large - Right</div>
          <button className="btn-pri btn-lg btn-right btn-fit">
            <CheckIcon />
            <span>Aceptar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Small Sec - Right</div>
          <button className="btn-sec btn-sm btn-right btn-fit">
            <CloseIcon />
            <span>Cancelar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Medium Sec - Right</div>
          <button className="btn-sec btn-md btn-right btn-fit">
            <CloseIcon />
            <span>Rechazar</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Large Sec - Right</div>
          <button className="btn-sec btn-lg btn-right btn-fit">
            <CloseIcon />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// EJEMPLOS: BOTONES SOLO CON ICONOS (CENTRADOS)
// =====================================================
export const ButtonsIconOnly = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Botones Solo con Iconos - Icono Centrado Automáticamente</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Cuando un botón solo contiene un ícono (sin texto), el ícono se centra automáticamente.
      </p>
      
      <div style={labelStyle}>Botones Primarios</div>
      <div style={containerStyle}>
        <button className="btn-pri btn-sm btn-fit">
          <CheckIcon />
        </button>
        <button className="btn-pri btn-md btn-fit">
          <CheckIcon />
        </button>
        <button className="btn-pri btn-lg btn-fit">
          <CheckIcon />
        </button>
      </div>

      <div style={labelStyle}>Botones Secundarios</div>
      <div style={containerStyle}>
        <button className="btn-sec btn-sm btn-fit">
          <CloseIcon />
        </button>
        <button className="btn-sec btn-md btn-fit">
          <CloseIcon />
        </button>
        <button className="btn-sec btn-lg btn-fit">
          <CloseIcon />
        </button>
      </div>

      <div style={labelStyle}>Barra de Herramientas</div>
      <div style={containerStyle}>
        <button className="btn-sec btn-sm btn-fit">
          <CheckIcon />
        </button>
        <button className="btn-sec btn-sm btn-fit">
          <CloseIcon />
        </button>
        <button className="btn-sec btn-sm btn-fit">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

// =====================================================
// EJEMPLO: CASOS DE USO COMUNES
// =====================================================
export const CommonUseCases = () => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const caseStyle: CSSProperties = {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    backgroundColor: '#f9fafb'
  };

  const titleStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#1f2937'
  };

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  };

  return (
    <div>
      <h3>Casos de Uso Comunes</h3>
      <div style={containerStyle}>
        
        {/* Caso 1: Formulario de Login */}
        <div style={caseStyle}>
          <div style={titleStyle}>🔐 Formulario de Login</div>
          <div style={buttonContainerStyle}>
            <button className="btn-pri btn-lg btn-center" style={{flex: 1}}>
              <CheckIcon />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </div>

        {/* Caso 2: Acciones en Modal */}
        <div style={caseStyle}>
          <div style={titleStyle}>📋 Acciones en Modal</div>
          <div style={buttonContainerStyle}>
            <button className="btn-sec btn-md btn-left btn-fit">
              <CloseIcon />
              <span>Cancelar</span>
            </button>
            <button className="btn-pri btn-md btn-left btn-fit">
              <CheckIcon />
              <span>Guardar</span>
            </button>
          </div>
        </div>

        {/* Caso 3: Barra de Herramientas */}
        <div style={caseStyle}>
          <div style={titleStyle}>🛠️ Barra de Herramientas</div>
          <div style={buttonContainerStyle}>
            <button className="btn-sec btn-sm btn-fit">
              <CheckIcon />
            </button>
            <button className="btn-sec btn-sm btn-fit">
              <CloseIcon />
            </button>
            <button className="btn-sec btn-sm btn-fit">
              <PlusIcon />
            </button>
          </div>
        </div>

        {/* Caso 4: Botones de Acción Principal */}
        <div style={caseStyle}>
          <div style={titleStyle}>⭐ Acción Principal</div>
          <div style={buttonContainerStyle}>
            <button className="btn-pri btn-lg btn-center btn-fit">
              <PlusIcon />
              <span>Crear Nuevo</span>
            </button>
          </div>
        </div>

        {/* Caso 5: Panel de Control */}
        <div style={caseStyle}>
          <div style={titleStyle}>🎛️ Panel de Control</div>
          <div style={buttonContainerStyle}>
            <button className="btn-pri btn-md btn-left btn-fit">
              <CheckIcon />
              <span>Procesar</span>
            </button>
            <button className="btn-sec btn-md btn-right btn-fit">
              <CloseIcon />
              <span>Cancelar</span>
            </button>
          </div>
        </div>

        {/* Caso 6: Formulario Compacto */}
        <div style={caseStyle}>
          <div style={titleStyle}>📝 Formulario Compacto</div>
          <div style={buttonContainerStyle}>
            <button className="btn-pri btn-sm btn-center btn-fit">
              <CheckIcon />
              <span>Enviar</span>
            </button>
            <button className="btn-sec btn-sm btn-center btn-fit">
              <CloseIcon />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// =====================================================
// TABLA DE REFERENCIA RÁPIDA
// =====================================================
export const QuickReferenceTable = () => {
  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  };

  const thStyle: CSSProperties = {
    backgroundColor: '#f3f4f6',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '2px solid #d1d5db',
    fontWeight: 600
  };

  const tdStyle: CSSProperties = {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb'
  };

  const codeStyle: CSSProperties = {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontFamily: 'monospace',
    fontSize: '0.9em'
  };

  return (
    <div>
      <h3>Tabla de Referencia Rápida</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tipo</th>
            <th style={thStyle}>Tamaño</th>
            <th style={thStyle}>Alineación</th>
            <th style={thStyle}>Ejemplo de Clase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle} rowSpan={9}>Primario<br/><code style={codeStyle}>.btn-pri</code></td>
            <td style={tdStyle} rowSpan={3}>Pequeño<br/><code style={codeStyle}>.btn-sm</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-pri btn-sm btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-pri btn-sm btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-pri btn-sm btn-right</td>
          </tr>
          <tr>
            <td style={tdStyle} rowSpan={3}>Mediano<br/><code style={codeStyle}>.btn-md</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-pri btn-md btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-pri btn-md btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-pri btn-md btn-right</td>
          </tr>
          <tr>
            <td style={tdStyle} rowSpan={3}>Grande<br/><code style={codeStyle}>.btn-lg</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-pri btn-lg btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-pri btn-lg btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-pri btn-lg btn-right</td>
          </tr>
          <tr>
            <td style={tdStyle} rowSpan={9}>Secundario<br/><code style={codeStyle}>.btn-sec</code></td>
            <td style={tdStyle} rowSpan={3}>Pequeño<br/><code style={codeStyle}>.btn-sm</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-sec btn-sm btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-sec btn-sm btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-sec btn-sm btn-right</td>
          </tr>
          <tr>
            <td style={tdStyle} rowSpan={3}>Mediano<br/><code style={codeStyle}>.btn-md</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-sec btn-md btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-sec btn-md btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-sec btn-md btn-right</td>
          </tr>
          <tr>
            <td style={tdStyle} rowSpan={3}>Grande<br/><code style={codeStyle}>.btn-lg</code></td>
            <td style={tdStyle}><code style={codeStyle}>.btn-left</code></td>
            <td style={tdStyle}>btn-sec btn-lg btn-left</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-center</code></td>
            <td style={tdStyle}>btn-sec btn-lg btn-center</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={codeStyle}>.btn-right</code></td>
            <td style={tdStyle}>btn-sec btn-lg btn-right</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// =====================================================
// COMPONENTE PRINCIPAL DE EJEMPLOS
// =====================================================
export const ButtonExamples = () => {
  const wrapperStyle: CSSProperties = {
    padding: '2rem',
    backgroundColor: '#ffffff'
  };

  return (
    <div style={wrapperStyle}>
      <h2>📚 Ejemplos Completos de Botones</h2>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Todos los ejemplos posibles de botones con sus variaciones de tamaño, tipo y alineación.
      </p>

      <ButtonsWithoutIcons />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <ButtonsIconOnly />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <ButtonsWithIconsLeft />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <ButtonsWithIconsCenter />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <ButtonsWithIconsRight />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <CommonUseCases />
      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <QuickReferenceTable />
    </div>
  );
};

export default ButtonExamples;
