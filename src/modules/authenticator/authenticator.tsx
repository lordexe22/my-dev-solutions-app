// authenticator.tsx
import { buildGoogleLoginUrl } from "./authenticator.utils";

export default function Authenticator() {
  const handleLogin = () => {
    const url = buildGoogleLoginUrl();
    window.open(url, "googleLogin", "width=500,height=600");
  };

  return (
    <div>
      <h1>Authenticator</h1>
      <button onClick={handleLogin}>
        Ingresar con Google
      </button>
    </div>
  );
}
