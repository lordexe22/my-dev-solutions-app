// authenticator.config.ts
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Google Client ID is missing. Check your .env file.");
}
