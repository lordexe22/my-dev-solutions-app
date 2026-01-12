/**
 * Toast Examples
 * 
 * Este archivo contiene ejemplos completos de cómo usar los toasts del Style System
 * con todas sus variaciones de tipo, duración, posicionamiento y animaciones.
 * 
 * CLASES DISPONIBLES:
 * - Tipo: .toast-success, .toast-error, .toast-warning, .toast-info
 * - Duración: .toast-3s, .toast-4s, .toast-5s, .toast-permanent
 * - Posicionamiento: .toast-top-right (default), .toast-top-left, .toast-bottom-right, .toast-bottom-left
 * - Animación: .toast-fade-in, .toast-slide-in
 */

import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';

const SuccessIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ErrorIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

const WarningIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
);

// =====================================================
// TYPES
// =====================================================
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type ToastDuration = '3s' | '4s' | '5s' | 'permanent';
type ToastAnimation = 'fade-in' | 'slide-in';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration: ToastDuration;
  position: ToastPosition;
  animation: ToastAnimation;
  showClose?: boolean;
}

// =====================================================
// SINGLE TOAST COMPONENT WITH INDIVIDUAL TIMER
// =====================================================
const SingleToast = ({ toast, removeToast }: { toast: Toast, removeToast: (id: string) => void }) => {
  useEffect(() => {
    // Toast permanente no tiene timer automático
    if (toast.duration === 'permanent') return;
    
    // Cada toast tiene su propio timer independiente
    const durationMs = parseInt(toast.duration.replace('s', '')) * 1000 + 300; // +300ms para la animación
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  const getIconByType = (type: ToastType) => {
    switch (type) {
      case 'success': return <SuccessIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      case 'info': return <InfoIcon />;
    }
  };

  return (
    <div
      className={`toast toast-${toast.type} toast-${toast.duration} toast-${toast.animation}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-icon">
        {getIconByType(toast.type)}
      </div>
      <div className="toast-message">
        <h4>{toast.title}</h4>
        <p>{toast.message}</p>
      </div>
      {toast.showClose && (
        <div className="toast-actions">
          <button
            className="btn-sec btn-sm"
            onClick={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

// =====================================================
// TOAST RENDERER COMPONENT
// =====================================================
const ToastRenderer = ({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) => {
  // Group toasts by position
  const positionGroups = {
    'top-right': toasts.filter(t => t.position === 'top-right'),
    'top-left': toasts.filter(t => t.position === 'top-left'),
    'bottom-right': toasts.filter(t => t.position === 'bottom-right'),
    'bottom-left': toasts.filter(t => t.position === 'bottom-left'),
  };

  const renderContainer = (position: ToastPosition, toastList: Toast[]) => {
    if (toastList.length === 0) return null;

    return (
      <div key={position} className={`toast-container toast-${position}`}>
        {toastList.map((toast) => (
          <SingleToast key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderContainer('top-right', positionGroups['top-right'])}
      {renderContainer('top-left', positionGroups['top-left'])}
      {renderContainer('bottom-right', positionGroups['bottom-right'])}
      {renderContainer('bottom-left', positionGroups['bottom-left'])}
    </>
  );
};

// =====================================================
// SECTION 1: TOAST TYPES AND BASIC USAGE
// =====================================================
export const BasicToastExamples = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, title: string, message: string) => {
    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      duration: '3s',
      position: 'top-right',
      animation: 'slide-in',
      showClose: false,
    };
    setToasts([...toasts, newToast]);
  };

  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
      <h3>Tipos de Toast (Success, Error, Warning, Info)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Cada tipo tiene una paleta de colores distintiva. Por defecto aparecen arriba a la derecha con duración de 3 segundos.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Toast Success</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToast('success', '¡Éxito!', 'La operación se completó correctamente')}
          >
            <SuccessIcon />
            <span>Mostrar Success</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Toast Error</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToast('error', 'Error', 'Ocurrió un problema al procesar tu solicitud')}
          >
            <ErrorIcon />
            <span>Mostrar Error</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Toast Warning</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToast('warning', 'Advertencia', 'Por favor, revisa esta información')}
          >
            <WarningIcon />
            <span>Mostrar Warning</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Toast Info</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToast('info', 'Información', 'Esta es una notificación informativa')}
          >
            <InfoIcon />
            <span>Mostrar Info</span>
          </button>
        </div>
      </div>

      <ToastRenderer toasts={toasts} removeToast={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </div>
  );
};

// =====================================================
// SECTION 2: TOAST DURATION
// =====================================================
export const ToastDurationExamples = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToastWithDuration = (duration: ToastDuration) => {
    const durationLabels: Record<ToastDuration, string> = {
      '3s': 'Esta notificación desaparecerá en 3 segundos',
      '4s': 'Esta notificación desaparecerá en 4 segundos',
      '5s': 'Esta notificación desaparecerá en 5 segundos',
      'permanent': 'Esta notificación es permanente (cierra manualmente)',
    };
    
    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'success',
      title: `Toast ${duration === 'permanent' ? 'Permanente' : `de ${duration}`}`,
      message: durationLabels[duration],
      duration,
      position: 'top-right',
      animation: 'slide-in',
      showClose: true,
    };
    setToasts([...toasts, newToast]);
  };

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
      <h3>Duración del Toast</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Los toasts pueden durar 3, 4 o 5 segundos antes de desaparecer automáticamente, o ser permanentes. Todos pueden cerrarse manualmente.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>3 Segundos</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastWithDuration('3s')}
          >
            <span>Toast 3s</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>4 Segundos</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastWithDuration('4s')}
          >
            <span>Toast 4s</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>5 Segundos</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastWithDuration('5s')}
          >
            <span>Toast 5s</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Permanente</div>
          <button 
            className="btn-sec btn-md btn-fit"
            onClick={() => addToastWithDuration('permanent')}
          >
            <span>Permanente</span>
          </button>
        </div>
      </div>

      <ToastRenderer toasts={toasts} removeToast={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </div>
  );
};

// =====================================================
// SECTION 3: TOAST POSITIONING
// =====================================================
export const ToastPositioningExamples = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToastAtPosition = (position: ToastPosition) => {
    const positionLabels: Record<ToastPosition, string> = {
      'top-right': 'Arriba a la Derecha',
      'top-left': 'Arriba a la Izquierda',
      'bottom-right': 'Abajo a la Derecha',
      'bottom-left': 'Abajo a la Izquierda',
    };

    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'info',
      title: 'Notificación',
      message: `Este toast aparece en ${positionLabels[position]}`,
      duration: '4s',
      position,
      animation: 'slide-in',
      showClose: true,
    };
    setToasts([...toasts, newToast]);
  };

  const gridContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    maxWidth: '600px',
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#666',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <h3>Posicionamiento del Toast</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Los toasts se pueden posicionar en cualquiera de las 4 esquinas. La posición por defecto es arriba a la derecha.
      </p>
      <div style={gridContainerStyle}>
        <div>
          <div style={labelStyle}>Top Left</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastAtPosition('top-left')}
          >
            <span>Arriba Izq</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Top Right (Default)</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastAtPosition('top-right')}
          >
            <span>Arriba Der</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Bottom Left</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastAtPosition('bottom-left')}
          >
            <span>Abajo Izq</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Bottom Right</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastAtPosition('bottom-right')}
          >
            <span>Abajo Der</span>
          </button>
        </div>
      </div>

      <ToastRenderer toasts={toasts} removeToast={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </div>
  );
};

// =====================================================
// SECTION 4: TOAST ANIMATIONS
// =====================================================
export const ToastAnimationExamples = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToastWithAnimation = (animation: ToastAnimation) => {
    const animationLabels: Record<ToastAnimation, string> = {
      'fade-in': 'Fade In (Desvanecimiento)',
      'slide-in': 'Slide In (Deslizamiento)',
    };

    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'warning',
      title: 'Prueba de Animación',
      message: `Este toast usa la animación: ${animationLabels[animation]}`,
      duration: '4s',
      position: 'top-right',
      animation,
      showClose: true,
    };
    setToasts([...toasts, newToast]);
  };

  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
      <h3>Animaciones de Toast</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Los toasts pueden entrar con animaciones diferentes: Fade In (suave) o Slide In (deslizante).
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>Fade In</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastWithAnimation('fade-in')}
          >
            <span>Fade In</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>Slide In</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addToastWithAnimation('slide-in')}
          >
            <span>Slide In</span>
          </button>
        </div>
      </div>

      <ToastRenderer toasts={toasts} removeToast={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </div>
  );
};

// =====================================================
// SECTION 5: STACKING TOASTS (Multiple Toasts)
// =====================================================
export const ToastStackingExample = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addMultipleToasts = (count: number) => {
    const types: ToastType[] = ['success', 'error', 'warning', 'info'];
    const messages = [
      { title: 'Éxito', msg: 'Primera notificación del stack' },
      { title: 'Información', msg: 'Segunda notificación del stack' },
      { title: 'Advertencia', msg: 'Tercera notificación del stack' },
      { title: 'Error', msg: 'Cuarta notificación del stack' },
    ];

    const newToasts: Toast[] = Array.from({ length: count }).map((_, i) => ({
      id: `toast-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      type: types[i % types.length],
      title: messages[i % messages.length].title,
      message: messages[i % messages.length].msg,
      duration: '5s',
      position: 'top-right',
      animation: 'slide-in',
      showClose: true,
    }));

    setToasts([...toasts, ...newToasts]);
  };

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
      <h3>Stack de Toasts (Apilamiento)</h3>
      <p style={{color: '#666', marginBottom: '1rem'}}>
        Cuando aparecen múltiples toasts, se apilan verticalmente. Los más antiguos se desplazan hacia abajo a medida que llegan nuevos.
      </p>
      <div style={containerStyle}>
        <div>
          <div style={labelStyle}>1 Toast</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addMultipleToasts(1)}
          >
            <span>Agregar 1</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>2 Toasts</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addMultipleToasts(2)}
          >
            <span>Agregar 2</span>
          </button>
        </div>
        <div>
          <div style={labelStyle}>4 Toasts</div>
          <button 
            className="btn-pri btn-md btn-fit"
            onClick={() => addMultipleToasts(4)}
          >
            <span>Agregar 4</span>
          </button>
        </div>
      </div>

      <ToastRenderer toasts={toasts} removeToast={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </div>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
const ToastExamples = () => {
  const sectionContainerStyle: CSSProperties = {
    marginBottom: '3rem',
    padding: '2rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
  };

  return (
    <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
      <h1>Toast Examples</h1>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Sistema de notificaciones Toast reutilizable del Style System. Explora todas las variaciones, configuraciones y casos de uso.
      </p>

      <div style={sectionContainerStyle}>
        <BasicToastExamples />
      </div>

      <div style={sectionContainerStyle}>
        <ToastDurationExamples />
      </div>

      <div style={sectionContainerStyle}>
        <ToastPositioningExamples />
      </div>

      <div style={sectionContainerStyle}>
        <ToastAnimationExamples />
      </div>

      <div style={sectionContainerStyle}>
        <ToastStackingExample />
      </div>

      {/* Documentation Section */}
      <div style={{
        padding: '2rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.75rem',
        marginTop: '3rem'
      }}>
        <h2>📖 Documentación del Toast</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem'}}>
          <div>
            <h3>Estructura HTML</h3>
            <p style={{color: '#666'}}>
              Los toasts utilizan una estructura semántica con roles ARIA para accesibilidad. Incluyen icono, mensaje y opcionalmente acciones.
            </p>
          </div>
          <div>
            <h3>Clases Disponibles</h3>
            <p style={{color: '#666'}}>
              <strong>Tipo:</strong> toast-success, toast-error, toast-warning, toast-info<br/>
              <strong>Duración:</strong> toast-3s, toast-4s, toast-5s<br/>
              <strong>Posición:</strong> toast-top-right, toast-top-left, toast-bottom-right, toast-bottom-left<br/>
              <strong>Animación:</strong> toast-fade-in, toast-slide-in
            </p>
          </div>
          <div>
            <h3>Personalización</h3>
            <p style={{color: '#666'}}>
              Todos los estilos se controlan desde <code style={{backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>_variables.css</code>. Modifica colores, tamaños, sombras y animaciones sin tocar el CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastExamples;
