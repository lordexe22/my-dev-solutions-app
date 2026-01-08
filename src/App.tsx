// import './styles/global.css';
import './styles/button.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthenticatorButtonWithGoogleExample from './modules/AuthenticatorButtonWithGoogle/AuthenticatorButtonWithGoogle.example';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '20px', background: '#f4f4f4', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
          <Link to="/example/AuthenticatorButtonWithGoogle">Google Auth Example</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/example/AuthenticatorButtonWithGoogle" element={<AuthenticatorButtonWithGoogleExample />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
