// import './styles/global.css';
import './style_system/button.css'
import './style_system/modal.css'
import './style_system/toast.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthenticatorButtonWithGoogleExample from './modules/AuthenticatorButtonWithGoogle/AuthenticatorButtonWithGoogle.example';
import StyleSystemShowcase from './pages/StyleSystemShowcase';
import ButtonExamples from './pages/ButtonExamples';
import ModalExamples from './pages/ModalExamples';
import ToastExamples from './pages/ToastExamples';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '20px', background: '#f4f4f4', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
          <Link to="/style-system" style={{ marginRight: '20px' }}>Style System</Link>
          <Link to="/example/AuthenticatorButtonWithGoogle">Google Auth Example</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/style-system" element={<StyleSystemShowcase />} />
          <Route path="/button-examples" element={<ButtonExamples />} />
          <Route path="/modal-examples" element={<ModalExamples />} />
          <Route path="/toast-examples" element={<ToastExamples />} />
          <Route path="/example/AuthenticatorButtonWithGoogle" element={<AuthenticatorButtonWithGoogleExample />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
