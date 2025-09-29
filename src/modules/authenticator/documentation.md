### 1. Generar un Client ID desde la API de google


NOTA: Se deberia configurar una ID de proyecto diferente para cada aplicación que quiera usar este módulo, estos pasos serán documentados para dejar registro de como hacerlo.

1. Ir a la consola de google: https://console.cloud.google.com/
2. Crear un nuevo proyecto (o usar uno existente).
3. En el menu de navegación (arriba a la izquierda), seleccionar APIs y servicios > Credenciales
4. Crea una credencial de tipo OAuth Client ID (se te enviará a un formulario de configuración de proyectos).
5. Configurar los campos Información de la app, Público, Información de contacto, Finalizar.
6. Se te va a redirigir a Google Auth Plataform, en descripción general. Ahi se puede "Crear cliente de OAuth", ahi se establece el Tipo de aplicación > "Aplicación Web", el nombre del cliente con el que aparecerá en la lista de IDs, los origenes autorizados de Javascript por ejemplo "http://localhost:5173", URIs de redireccionamiento autorizados.
7. Al aceptar el paso anterior, se proporcionara un ID de cliente y un secreto, hay que guardarlos, se usarán en la configuración del módulo.

    Ejemplo:
      
        ID: 79473940445-jnmnb1k90487g26m7brj8dnto93f5k92.apps.googleusercontent.com

        Secret: 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

8. Guardar los datos en las variables de entorno del proyecto. Debe ser un archivo .env en la raiz del proyecto (a la misma altura que el package.json)

