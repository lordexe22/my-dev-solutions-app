// authenticator/authenticator.tsx
// #section Imports
import { useAuthenticator } from "./authenticator.hooks";
import styles from "./authenticator.module.css";
// #end-section

// #component Authenticator
const Authenticator= () => {
  // #hook useAuthenticator
  const { login, logoutUser, user, isAuthenticated, isLoading } = useAuthenticator();
  // #end-hook

  // #state isLoading - for handle if the page is loading info
  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if(isAuthenticated) console.log({user})

  // #section return
  return (
    <div className={styles.container}>   
      {!isAuthenticated ? (
        <button className={styles.button} onClick={login}>
          Iniciar sesión con Google
        </button>
      ) : (
        <div className={styles.userInfo}>
          <p>Bienvenido, {user?.name}</p>
          <p>Email: {user?.email}</p>
          {user?.picture && <img src={user.picture} alt="Avatar" className={styles.avatar} />}
          <button className={styles.button} onClick={logoutUser}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
  // #end-section
};
export default Authenticator;
// #end-component