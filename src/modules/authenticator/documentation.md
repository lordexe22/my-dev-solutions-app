# README - Módulo de Autenticación con Auth0

## 1. Introducción
- Qué es Auth0 y por qué se usa.  
- Flujo general de autenticación.  
- Ejemplo usando Google como proveedor.  

## 2. Generar un Client ID desde la API de Google
- Crear proyecto en Google Cloud Console.  
- Configurar OAuth Client ID.  
- Obtener Client ID y Client Secret.  
- Nota: estos valores se usan en Auth0, no en el frontend.  

## 3. Configurar la cuenta de Auth0
- Crear cuenta en Auth0 y nueva aplicación.  
- Copiar Domain, Client ID y Client Secret.  
- Configurar Allowed Callback URLs, Logout URLs y Web Origins.  
- Instalar SDK `@auth0/auth0-react`.  
- Envolver la aplicación con `Auth0Provider`.  
- Configurar conexión social con Google (Client ID y Client Secret).

## 4. Uso en la aplicación (Frontend)
- Cómo usar el hook `useAuthenticator`.  
- Ejemplo de login y logout.  
- Acceso a `user`, `isAuthenticated`, `isLoading`.  
- Recuperar tokens con `getAccessTokenSilently`.  

## 5. Variables de entorno
- Variables necesarias: `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`.  
- Recordatorio: **el Client Secret nunca va en el frontend**.  

## 6. Extender a otros proveedores
- Cómo agregar conexiones adicionales (Facebook, GitHub, X).  
- Flujo genérico para todos los proveedores.  

## 7. Consideraciones de seguridad
- Uso seguro de tokens (ID Token y Access Token).  
- Buenas prácticas para almacenar y manejar sesiones.  

## 8. Problemas comunes y debugging
- Errores típicos y sus causas (Callback URL, Web Origins, etc.).  
- Cómo usar la consola de Auth0 para ver logs y depurar.  

## 9. Referencias
- Enlaces a documentación oficial de Auth0 y Google OAuth.  
- Recursos adicionales sobre integración con React.



## Introducción
Este módulo integra **Auth0** en la aplicación para manejar la autenticación e identidad de los usuarios.  
Auth0 actúa como un **intermediario centralizado**: en lugar de implementar manualmente cada inicio de sesión (Google, Facebook, GitHub, etc.), la aplicación delega todo el proceso en Auth0.  


### Funcionamiento del flujo de información
1. El usuario hace clic en un botón de **registro** o **inicio de sesión** en la aplicación.  
2. La aplicación redirige al usuario a Auth0. Allí se muestra un formulario con todas las opciones de autenticación disponibles (Google, Facebook, GitHub, etc.), según las conexiones configuradas previamente en Auth0.  
3. Supongamos que el usuario elige autenticarse con **Google**. En ese caso, Auth0 lo redirige al panel de acceso de Google. El usuario selecciona su cuenta y concede los permisos necesarios para compartir sus datos.  
4. Google envía esos datos a Auth0. Luego, Auth0 crea un perfil interno del usuario y devuelve la información a la aplicación de origen. A partir de este momento, la aplicación recibe datos básicos como el correo, el nombre y, sobre todo, un **identificador único** que permite reconocer de manera inequívoca al usuario.  


⚠️ **Nota importante**: Para que este flujo funcione, es necesario:  
- Configurar Auth0 para aceptar una conexión con la plataforma de Google.  
- Configurar la API de Google para autorizar a tu cuenta de Auth0 a solicitar y recibir la información del usuario.  
- Este proceso se debe repetir para cada plataforma adicional a Google que se quiera incluir como método de registro con Auth0.


Estos pasos se detallarán en la siguiente sección.

## Generar un Client ID desde la API de google

⚠️ **Nota:** Se recomienda configurar un **ID de proyecto diferente para cada aplicación** que vaya a usar este módulo. Estos pasos sirven como registro para documentar cómo hacerlo.

1. Ingresar a la **Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/).  
2. Crear un nuevo **proyecto** (o seleccionar uno existente).  
3. En el menú de navegación (arriba a la izquierda), ir a **APIs y servicios > Credenciales**.  
4. Crear una nueva credencial de tipo **OAuth Client ID** (esto redirige a un formulario de configuración del proyecto).  
5. Completar los campos requeridos:  
   - Información de la aplicación  
   - Público objetivo  
   - Información de contacto  
   - Finalizar  
6. Al finalizar, se redirige a **Google Cloud Platform**, en la sección “Descripción general”. Allí seleccionar **Crear cliente de OAuth**.  
   - Tipo de aplicación → `Aplicación Web`  
   - Nombre del cliente → el que quieras que aparezca en la lista de IDs  
   - Orígenes autorizados de JavaScript → por ejemplo: `http://localhost:5173`  
   - URIs de redireccionamiento autorizados → por ejemplo: `http://localhost:5173`  
7. Al guardar, Google generará un **Client ID** y un **Client Secret**. Estos valores se necesitarán para configurar la conexión en Auth0.  

    Ejemplo:
      
        ID: 79473940445-jnmnb1k90487g26m7brj8dnto93f5k92.apps.googleusercontent.com

        Secret: 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


8. Guardar estos valores de manera segura.  
   - Nunca deben ser expuestos en el frontend.  
   - Estos datos sirven para configurar el **Dashboard de Auth0** para crear la conexión entre Auth0 y Google.  

### 2. Configurar la cuenta de Auth0 para usar el servicio de autenticación

1. Ir a [Auth0](https://auth0.com/) y crear una cuenta.  
2. En el Dashboard, ir a **Applications > Create Application** y crear una nueva aplicación.  
3. En la sección **Settings** de la aplicación creada, copiar los siguientes valores:  
   - `Domain`  
   - `Client ID`  
   - `Client Secret`  

    Estos valores deben guardarse entre las variables de entorno para configurar Auth0 y hacer que ande dentro de nuestra aplicación.

4. En la sección de Settings, configurar los siguientes campos provisionales para testear localmente:  

        Allowed Callback URLs: http://localhost:5173
        Allowed Logout URLs: http://localhost:5173
        Allowed Web Origins: http://localhost:5173

    NOTA:

        Callback URL → URL a la que vuelve el usuario después de iniciar sesión.  
        Logout URL → URL a la que vuelve el usuario después de cerrar sesión.  
        Web Origins → Páginas que pueden comunicarse con Auth0 desde el navegador.  

5. Instalar el SDK en el proyecto

        npm install @auth0/auth0-react
        
6. Hay que envolver la aplicación en el proveedor de Auth0 y establecer sus propiedades:

    ```ts
    // main.tsx o index.tsx
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App";
    import { Auth0Provider } from "@auth0/auth0-react";
    import { authConfig } from "./authenticator/authenticator.config";

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider
            domain={authConfig.domain}
            clientId={authConfig.clientId}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
        <App />
        </Auth0Provider>
    </React.StrictMode>
    );

    ```

    donde sus props se obtienen desde la plataforma de Auth0 y pueden guardarse en variables de entorno .env.

    ```ts
    export const auth0Config = {
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID
    };
    ```

7. En el Dashboard de Auth0, ir a **Authentication > Social**, seleccionar Google-oauth2 y proporcionar el Client ID y Client Secret obtenidos del proyecto de Google.
8. En la sección **Authentication > Social**, seleccionando google, también se pueden editar los datos que quieras que Auth0 le solicite a Google.