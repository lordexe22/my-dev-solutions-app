import { Link } from 'react-router-dom';

const StyleSystemShowcase = () => {
  return (
    <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
      <h1>Style System Showcase</h1>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Sistema de diseño reutilizable con componentes CSS y React
      </p>

      {/* ENLACES A PÁGINAS DE EJEMPLOS */}
      <section style={{marginBottom: '3rem'}}>
        <h2>📚 Explora los Componentes</h2>
        <p style={{color: '#666', marginBottom: '1.5rem'}}>
          Haz clic en cualquier componente para ver ejemplos detallados, casos de uso y documentación:
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
          
          {/* Tarjeta de Botones */}
          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{margin: 0}}>🔘 Botones</h3>
            <p style={{margin: 0, color: '#666', fontSize: '0.875rem'}}>
              Explora todos los tipos de botones: primarios, secundarios, con iconos, diferentes tamaños y alineaciones.
            </p>
            <Link to="/button-examples" style={{textDecoration: 'none', marginTop: 'auto'}}>
              <button className="btn-pri btn-md btn-fit" style={{width: '100%'}}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span>Ver Ejemplos de Botones</span>
              </button>
            </Link>
          </div>

          {/* Tarjeta de Modales */}
          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{margin: 0}}>🪟 Modales</h3>
            <p style={{margin: 0, color: '#666', fontSize: '0.875rem'}}>
              Descubre ejemplos de modales: confirmaciones, formularios, información y más tamaños.
            </p>
            <Link to="/modal-examples" style={{textDecoration: 'none', marginTop: 'auto'}}>
              <button className="btn-pri btn-md btn-fit" style={{width: '100%'}}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span>Ver Ejemplos de Modales</span>
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* INFORMACIÓN DEL STYLE SYSTEM */}
      <section style={{
        padding: '2rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.75rem',
        marginTop: '3rem'
      }}>
        <h2>ℹ️ Acerca del Style System</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem'}}>
          <div>
            <h3>📐 Diseño Modular</h3>
            <p style={{color: '#666'}}>
              Componentes reutilizables basados en CSS personalizado y variables, listos para ser utilizados en cualquier proyecto React.
            </p>
          </div>
          <div>
            <h3>🎨 Fácil de Personalizar</h3>
            <p style={{color: '#666'}}>
              Todos los estilos se controlan desde el archivo <code style={{backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem'}}>_variables.css</code>. Cambia colores, tamaños y temas sin tocar el código.
            </p>
          </div>
          <div>
            <h3>⚡ Rendimiento</h3>
            <p style={{color: '#666'}}>
              CSS puro y optimizado sin dependencias innecesarias. Carga rápida y eficiente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleSystemShowcase;
