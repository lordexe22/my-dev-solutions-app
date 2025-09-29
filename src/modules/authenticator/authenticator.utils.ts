// authenticator.utils.ts
import { GOOGLE_CLIENT_ID } from "./authenticator.config";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const REDIRECT_URI = window.location.origin; 
const SCOPE = "openid email profile";

export function buildGoogleLoginUrl(state?: string) {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: SCOPE,
    include_granted_scopes: "true",
    state: state || ""
    
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}
