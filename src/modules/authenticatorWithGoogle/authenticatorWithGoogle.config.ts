// authenticatorWithGoogle.config.ts

interface GoogleConfig {
  clientId: string;
}

export const googleConfig: GoogleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
};
