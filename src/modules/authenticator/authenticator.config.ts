/* authenticator/authenticator.config.ts */

// #variable auth0Config - Auth0 platform config data 
export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
};
// #end-variable
