import './styles.css';
import { useState } from 'react';
import { AuthenticatorWithGoogle } from './modules/authenticatorWithGoogle';
import type { GoogleUser } from './modules/authenticatorWithGoogle';

const App = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);

  return (
    <div className="app-container">
      <AuthenticatorWithGoogle 
        onAuth={setUser}
        mode="login" // o "signup" según el flujo deseado
      />

      {user && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Usuario autenticado</h3>
          <img
            src={user.picture}
            alt={user.name}
            width={80}
            height={80}
            style={{ borderRadius: '50%' }}
          />
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default App;
