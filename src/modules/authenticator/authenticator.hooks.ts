// authenticator/authenticator.hooks.ts
// #section Imports
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
// #end-section

// #hook useAuthenticator
export const useAuthenticator = () => {
  // #hook useAuth0
  const { 
    logout, 
    loginWithPopup,
    getAccessTokenSilently,
    user, 
    isAuthenticated, 
    isLoading,
  } = useAuth0();
  // #end-hook

  // #event autoLogin
  useEffect(() => {
    const checkSession = async () => {
      try {
        await getAccessTokenSilently();
      } catch (err) {
        // Si no hay sesión activa en Auth0, no pasa nada
        console.debug("No active session:", err);
      }
    };
    checkSession();
  }, [getAccessTokenSilently]);
  // #end-event

  // #function login
  const login = async () => {
    // Para login con Google, Auth0 ya detecta el proveedor si lo configuraste en el Dashboard
    await loginWithPopup();
  };
  // #end-function

  // #function logoutUser
  const logoutUser = () => {
    // En la versión moderna, se usa "logout" con "logoutParams"
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  // #end-function

  // #section return
  return {
    login,
    logoutUser,
    user,
    isAuthenticated,
    isLoading,
  };
  // #end-section
};
// #end-hook