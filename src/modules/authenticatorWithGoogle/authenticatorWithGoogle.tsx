// authenticatorWithGoogle.tsx
// #section Imports
import { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleConfig } from "./authenticatorWithGoogle.config";
import type { AuthenticatorWithGoogleProps } from "./authenticatorWithGoogle.types";
import { handleGoogleSuccess, handleGoogleError } from "./authenticatorWithGoogle.utils";
import type { CredentialResponse } from "@react-oauth/google";
import { decodeGoogleToken } from "./authenticatorWithGoogle.utils";
// #end-section

interface GoogleAccountsId {
  initialize: (options: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
  }) => void;
  prompt: () => void;
}

interface GoogleWindow extends Window {
  google?: {
    accounts?: {
      id?: GoogleAccountsId;
    };
  };
}



// #component AuthenticatorWithGoogle
const AuthenticatorWithGoogle = (
  {
    onAuth,
    onAutoLogin,
    mode = 'login'
  }: AuthenticatorWithGoogleProps
) => {

  useEffect(() => {
    console.log("useEffect de autoLogin ejecutado"); // verifica que se monta

    if (!onAutoLogin) {
      console.log("No hay callback de onAutoLogin definido");
      return;
    }

    const googleObj = (window as GoogleWindow).google;
    if (!googleObj?.accounts?.id) {
      console.log("Google One Tap no está disponible en window.google");
      return;
    }

    console.log("Inicializando Google One Tap");
    googleObj.accounts.id.initialize({
      client_id: googleConfig.clientId,
      callback: (response: CredentialResponse) => {
        console.log("Callback de One Tap ejecutado", response);
        if (!response.credential) {
          console.log("No se recibió credential en la respuesta");
          return;
        }
        const decoded = decodeGoogleToken(response.credential);
        console.log("Usuario decodificado desde One Tap:", decoded);
        onAutoLogin(decoded);
      },
    });

    console.log("Mostrando prompt de One Tap");
    googleObj.accounts.id.prompt();
  }, [onAutoLogin]);



  return (
    <GoogleOAuthProvider clientId={googleConfig.clientId}>
      <GoogleLogin
        onSuccess={(response) => handleGoogleSuccess(response, onAuth)}
        onError={() => handleGoogleError(onAuth)}
        text={mode === "login" ? "signin_with" : "signup_with"}
        useOneTap={true}
        type="standard"
        theme="outline"
      />
    </GoogleOAuthProvider>
  );
}
export default AuthenticatorWithGoogle;
// #end-component