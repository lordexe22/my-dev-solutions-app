/**
 * Modal Examples
 * 
 * Este archivo contiene ejemplos completos de cómo usar los modales del Style System
 * con diferentes casos de uso y variaciones.
 */

import type { CSSProperties } from 'react';
import { useState } from 'react';

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

const InfoIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const WarningIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

// =====================================================
// EJEMPLO 1: MODAL DE CONFIRMACIÓN
// =====================================================
export const ConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3>Modal de Confirmación</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Modal simple con dos acciones: Cancelar y Confirmar
      </p>

      <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(true)}>
        <span>Abrir Modal de Confirmación</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-container modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-logo">
                <WarningIcon />
              </div>
              <h2>Confirmar Acción</h2>
              <button className="btn-sec btn-sm btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas realizar esta acción? Esta operación no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-sec btn-md btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
                <span>Cancelar</span>
              </button>
              <button className="btn-pri btn-md btn-fit" onClick={() => {
                alert('Acción confirmada');
                setIsOpen(false);
              }}>
                <CheckIcon />
                <span>Confirmar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// EJEMPLO 2: MODAL DE FORMULARIO
// =====================================================
export const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3>Modal con Formulario</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Modal de tamaño mediano con campos de formulario
      </p>

      <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(true)}>
        <span>Abrir Modal de Formulario</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-container modal--md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-logo">
                <InfoIcon />
              </div>
              <h2>Nuevo Usuario</h2>
              <button className="btn-sec btn-sm btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Ingresa tu nombre"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Email</label>
                  <input 
                    type="email" 
                    placeholder="ejemplo@correo.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>Rol</label>
                  <select 
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option>Usuario</option>
                    <option>Administrador</option>
                    <option>Editor</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn-sec btn-md btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
                <span>Cancelar</span>
              </button>
              <button className="btn-pri btn-md btn-fit" onClick={() => {
                alert('Usuario creado');
                setIsOpen(false);
              }}>
                <CheckIcon />
                <span>Crear Usuario</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// EJEMPLO 3: MODAL INFORMATIVO
// =====================================================
export const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3>Modal Informativo</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Modal simple solo con información y un botón de cierre
      </p>

      <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(true)}>
        <span>Abrir Modal Informativo</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-container modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-logo">
                <InfoIcon />
              </div>
              <h2>Información</h2>
              <button className="btn-sec btn-sm btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <p style={{marginBottom: '1rem'}}>
                Este es un modal informativo que muestra un mensaje importante al usuario.
              </p>
              <p>
                Los modales informativos generalmente solo requieren que el usuario los lea y los cierre.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(false)}>
                <CheckIcon />
                <span>Entendido</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// EJEMPLO 4: MODAL GRANDE CON CONTENIDO EXTENSO
// =====================================================
export const LargeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3>Modal Grande con Scroll</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Modal de tamaño grande con contenido extenso y scroll interno
      </p>

      <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(true)}>
        <span>Abrir Modal Grande</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-container modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-logo">
                <InfoIcon />
              </div>
              <h2>Términos y Condiciones</h2>
              <button className="btn-sec btn-sm btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <h3 style={{marginBottom: '1rem'}}>1. Aceptación de términos</h3>
              <p style={{marginBottom: '1rem'}}>
                Al acceder y utilizar este servicio, usted acepta estar sujeto a estos términos y condiciones de uso, 
                todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes 
                locales aplicables.
              </p>

              <h3 style={{marginBottom: '1rem'}}>2. Uso de licencia</h3>
              <p style={{marginBottom: '1rem'}}>
                Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) 
                en el sitio web para visualización transitoria personal y no comercial únicamente.
              </p>

              <h3 style={{marginBottom: '1rem'}}>3. Descargo de responsabilidad</h3>
              <p style={{marginBottom: '1rem'}}>
                Los materiales en el sitio web se proporcionan "tal cual". No ofrecemos garantías, expresas o implícitas, 
                y por la presente rechazamos y negamos todas las demás garantías.
              </p>

              <h3 style={{marginBottom: '1rem'}}>4. Limitaciones</h3>
              <p style={{marginBottom: '1rem'}}>
                En ningún caso seremos responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de 
                datos o beneficios, o debido a interrupción del negocio) que surjan del uso o la imposibilidad de usar 
                los materiales en nuestro sitio.
              </p>

              <h3 style={{marginBottom: '1rem'}}>5. Revisiones y errores</h3>
              <p>
                Los materiales que aparecen en nuestro sitio web pueden incluir errores técnicos, tipográficos o 
                fotográficos. No garantizamos que ninguno de los materiales en su sitio web sea preciso, completo o actual.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-sec btn-md btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
                <span>Rechazar</span>
              </button>
              <button className="btn-pri btn-md btn-fit" onClick={() => {
                alert('Términos aceptados');
                setIsOpen(false);
              }}>
                <CheckIcon />
                <span>Aceptar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// EJEMPLO 5: MODAL FIJO (SIN OVERLAY CLICKEABLE)
// =====================================================
export const FixedModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3>Modal Fijo (No Cerrable por Overlay)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Modal que no se puede cerrar haciendo clic en el overlay
      </p>

      <button className="btn-pri btn-md btn-fit" onClick={() => setIsOpen(true)}>
        <span>Abrir Modal Fijo</span>
      </button>

      {isOpen && (
        <div className="modal-overlay modal--fixed">
          <div className="modal-container modal--sm">
            <div className="modal-header">
              <div className="modal-logo">
                <WarningIcon />
              </div>
              <h2>Acción Requerida</h2>
            </div>
            <div className="modal-body">
              <p>
                Este modal requiere que tomes una decisión explícita. No puedes cerrarlo haciendo clic fuera de él.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-sec btn-md btn-fit" onClick={() => setIsOpen(false)}>
                <CloseIcon />
                <span>Cancelar</span>
              </button>
              <button className="btn-pri btn-md btn-fit" onClick={() => {
                alert('Acción completada');
                setIsOpen(false);
              }}>
                <CheckIcon />
                <span>Continuar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// COMPONENTE PRINCIPAL DE EJEMPLOS
// =====================================================
export const ModalExamples = () => {
  const wrapperStyle: CSSProperties = {
    padding: '2rem',
    backgroundColor: '#ffffff'
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  };

  const cardStyle: CSSProperties = {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    backgroundColor: '#f9fafb'
  };

  return (
    <div style={wrapperStyle}>
      <h2>🪟 Ejemplos Completos de Modales</h2>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Diferentes casos de uso para modales con el Style System.
      </p>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <ConfirmationModal />
        </div>

        <div style={cardStyle}>
          <InfoModal />
        </div>

        <div style={cardStyle}>
          <FixedModal />
        </div>

        <div style={cardStyle}>
          <FormModal />
        </div>

        <div style={cardStyle}>
          <LargeModal />
        </div>
      </div>

      <hr style={{margin: '3rem 0', borderColor: '#e5e7eb'}} />

      <h3>📋 Guía de Uso</h3>
      <div style={{color: '#374151', lineHeight: 1.8}}>
        <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Tamaños de Modal:</h4>
        <ul style={{marginLeft: '1.5rem'}}>
          <li><code style={{backgroundColor: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>.modal--sm</code> - Pequeño (confirmaciones, alertas)</li>
          <li><code style={{backgroundColor: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>.modal--md</code> - Mediano (formularios, contenido moderado)</li>
          <li><code style={{backgroundColor: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>.modal--lg</code> - Grande (contenido extenso, documentos)</li>
        </ul>

        <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Variantes:</h4>
        <ul style={{marginLeft: '1.5rem'}}>
          <li><code style={{backgroundColor: '#e5e7eb', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>.modal--fixed</code> - No se cierra al hacer clic en el overlay</li>
        </ul>

        <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Estructura HTML:</h4>
        <pre style={{
          backgroundColor: '#1f2937',
          color: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`<div className="modal-overlay">
  <div className="modal-container modal--md">
    <div className="modal-header">
      <div className="modal-logo">{/* Icon */}</div>
      <h2>Título</h2>
      <button>{/* Close button */}</button>
    </div>
    <div className="modal-body">
      {/* Contenido */}
    </div>
    <div className="modal-footer">
      {/* Botones de acción */}
    </div>
  </div>
</div>`}
        </pre>
      </div>
    </div>
  );
};

export default ModalExamples;
