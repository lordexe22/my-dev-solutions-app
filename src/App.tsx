// src\App.tsx
import Authenticator from "./modules/authenticator/authenticator";

const App = () => {
  return (
    <div>
      <h1>Mi App con Auth0 y Google</h1>
      <Authenticator />
    </div>
  );
};

export default App;
