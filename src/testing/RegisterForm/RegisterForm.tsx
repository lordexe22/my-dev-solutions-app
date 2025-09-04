import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (res.status !== 200) {
        throw new Error("Error en el registro");
      }

      console.log("Registro exitoso");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const testProtected = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/protected", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error en la ruta protegida");

      const data = await res.json();
      console.log("Respuesta de /api/protected:", data);
    } catch (err) {
      console.error("Error:", (err as Error).message);
    }
  };

  const clearCookie = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/clear", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al borrar la cookie");

      console.log("Cookie borrada correctamente");
    } catch (err) {
      console.error("Error:", (err as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Registrarse</button>
      </form>

      <button onClick={testProtected} style={{ marginTop: "1rem" }}>
        Probar ruta protegida
      </button>

      <button onClick={clearCookie} style={{ marginTop: "1rem" }}>
        Borrar cookie
      </button>
    </>
  );
};

export default RegisterForm;
