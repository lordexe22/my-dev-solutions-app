<h2 id="#1" style="margin-top: 80px">1. Introducción</h2> 
<h3>Propósito del componente</h3>

**AuthenticatorWithGoogle** es un componente de React que permite autenticar usuarios mediante Google OAuth 2.0 usando la librería @react-oauth/google.
Su función principal es obtener y decodificar el token JWT emitido por Google, y entregar la información del usuario autenticado a través del callback onAuth.

El componente está diseñado para ser utilizado tanto en flujos de inicio de sesión como de registro de nuevos usuarios.

<h3>Flujo general de autenticación</h3>

1. El usuario interactúa con el botón de Google o bien se activa Google One Tap.

2. Google devuelve una respuesta (CredentialResponse) con el token JWT en la variable **credential**.

3. El token se decodifica mediante el método **decodeGoogleToken**, obteniendo los datos del usuario (GoogleUser).

4. El resultado se envía al callback **onAuth**. Si ocurre un error o no existe token, se pasa **null** como respuesta.

<h3>¿Cuando usarlo? (login/singup)</h3>

El componente **AuthenticatorWithGoogle** siempre obtiene y decodifica el token de Google, y entrega el objeto GoogleUser al callback **onAuth**.

***Modo login o signup***: La prop **mode** solo modifica el texto del botón. No hay lógica interna distinta para iniciar sesión o registrar un usuario. La decisión de crear una cuenta o iniciar sesión debe manejarla la aplicación que usa el componente, a partir de los datos de GoogleUser.

***Google One Tap***: Si el usuario tiene sesión activa en Google y tu dominio está autorizado, se puede activar automáticamente un login o registro. En este caso se puede usar el callback opcional onAutoLogin, que recibe el mismo objeto GoogleUser.


<h2 id="#2" style="margin-top: 80px">2. Instalación y requisitos previos</h2> 

### Instalación de librerias
Para utilizar AuthenticatorWithGoogle, se requiere instalar la librería oficial de Google OAuth para React:

```
npm install @react-oauth/google
```
Además, si no la tenés instalada, asegurate de contar con React 18+ y TypeScript configurado en tu proyecto, ya que el componente está tipado.

### Configuración de las variables de entorno
El componente requiere un Client ID de Google OAuth. Para que funcione correctamente, se debe crear un archivo .env en la raíz de tu proyecto (o usá el que ya tengas) y luego definir la variable:

```
VITE_GOOGLE_CLIENT_ID=tu_client_id_de_google
```
Luego, el componente importa y utiliza automáticamente esta variable desde authenticatorWithGoogle.config.ts:
```ts
import { googleConfig } from "./authenticatorWithGoogle.config";

export const googleConfig: GoogleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};
```
Esto asegura que el componente tenga acceso a las credenciales necesarias para inicializar el flujo de autenticación y es un paso obligatorio para que el componente funcione. Más adelante se detalla como obtener el Client ID desde la consola de google.



<h2 id="#3" style="margin-top: 80px">3. Uso del componente</h2> 

### Importaciones necesarias
Para usar AuthenticatorWithGoogle en tu proyecto, importa el componente y sus tipos desde su módulo:
```ts
import { AuthenticatorWithGoogle } from './modules/authenticatorWithGoogle';
import type { GoogleUser } from './modules/authenticatorWithGoogle';
```

### Props
El componente recibe las siguientes props:

| Prop | Tipo | Descripción | Requerido |
|------|------|-------------|-----------|
|onAuth|(user: GoogleUser \| null) => void|Callback que recibe el usuario decodificado luego de un login exitoso. En caso de error, recibe null.|Sí|
|mode|"login"\|"singup"|Define el texto que google coloca en el botón. No cambia la lógica del componente.|Sí|

### Ejemplo de uso
En el siguiente ejemplo se hace uso del componente para capturar los datos de usuario de google. Posteriormente se hace uso de los mismos para mostrarlos en pantalla mediante el uso de las propiedades del estado **user**.

```ts
import { useState } from 'react';
import { AuthenticatorWithGoogle } from './modules/authenticatorWithGoogle';
import type { GoogleUser } from './modules/authenticatorWithGoogle';

const App = () => {
  // Se define un estado para guardar los datos del usuario
  const [user, setUser] = useState<GoogleUser | null>(null);

  return (
    <div className="app-container">

      <AuthenticatorWithGoogle onAuth={setUser} mode="login"/>
      
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
```

### Formato del objeto GoogleUser retornado
El callback `onAuth` recibe un objeto con la siguiente estructura cuando la autenticación es exitosa:
```ts
interface GoogleUser {
  iss: string;             // Issuer (iss): Emisor del token, generalmente "accounts.google.com" o "https://accounts.google.com"
  nbf: number;             // Not Before (nbf): fecha/hora a partir de la cual el token es válido (timestamp en segundos)
  aud: string;             // Audience (aud): Client ID de la app para la que se emitió el token
  azp: string;             // Authorized Party (azp): Client ID del cliente que autorizó el token
  sub: string;             // Subject (sub): ID único del usuario en Google
  email: string;           // Email (email): Correo electrónico del usuario
  email_verified: boolean; // Email Verified (email_verified): Indica si el email del usuario ha sido verificado por Google
  name: string;            // Name (name): Nombre completo del usuario
  picture: string;         // Picture (picture): URL de la foto de perfil del usuario
  given_name: string;      // Given Name (given_name): Primer nombre del usuario
  family_name: string;     // Family Name (family_name): Apellido del usuario
  iat: number;             // Issued At (iat): fecha/hora de emisión del token (timestamp en segundos)
  exp: number;             // Expiration (exp): fecha/hora de expiración del token (timestamp en segundos)
  jti: string;             // JWT ID (jti): identificador único del token
}
```
Si ocurre un error en la autenticación o no se recibe un token válido, se envía null.

___

<h2 id="#5">5. Crear un CLIENT ID de google</h2> 
___


<h2 id="#6">6. Google One Tap</h2> 

___

<h2 id="#7">7. Notas de seguridad</h2> 






Instalar SDK con

npm install @react-oauth/google

