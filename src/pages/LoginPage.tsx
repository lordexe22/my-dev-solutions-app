/* #info - Login page with Google OAuth integration */

// #section Imports
import { useState } from 'react';
import AuthenticatorButtonWithGoogle from '../modules/AuthenticatorButtonWithGoogle/AuthenticatorButtonWithGoogle';
import { decodeGoogleToken, normalizeGoogleUser } from '../modules/AuthenticatorButtonWithGoogle/AuthenticatorButtonWithGoogle.utils';
import type { AuthSuccessResponse, ErrorData } from '../modules/AuthenticatorButtonWithGoogle/AuthenticatorButtonWithGoogle.types';
import './LoginPage.css';
// #end-section

// #section Types
interface LoginState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: AuthSuccessResponse | null;
  serverResponse: ServerAuthResponse | null;
}

interface ServerAuthResponse {
  success: boolean;
  user?: {
    googleId: string;
    email: string;
    name: string;
    picture: string;
  };
  error?: string;
  code?: string;
  message?: string;
}
// #end-section

// #component LoginPage
const LoginPage = () => {
  // #section State Management
  const [loginState, setLoginState] = useState<LoginState>({
    loading: false,
    success: false,
    error: null,
    user: null,
    serverResponse: null,
  });

  const [logs, setLogs] = useState<string[]>([]);
  // #end-section

  // #section Utility Functions
  /**
   * Adds a log entry with timestamp
   */
  const addLog = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    console.log(`%c${logEntry}`, `color: ${getLogColor(type)}`);
    setLogs(prev => [...prev, logEntry]);
  };

  /**
   * Get color for log based on type
   */
  const getLogColor = (type: string): string => {
    switch (type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f97316';
      default: return '#3b82f6';
    }
  };

  /**
   * Clear all logs
   */
  const clearLogs = () => {
    setLogs([]);
    addLog('Logs cleared', 'info');
  };

  /**
   * Resets login state
   */
  const resetLogin = () => {
    setLoginState({
      loading: false,
      success: false,
      error: null,
      user: null,
      serverResponse: null,
    });
    setLogs([]);
    addLog('Login state reset', 'info');
  };
  // #end-section

  // #section Handlers
  /**
   * Handle successful Google authentication
   */
  const handleGoogleSuccess = async (response: { credential: string }) => {
    addLog('🔵 Google authentication button clicked', 'info');
    
    setLoginState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // #step 1 - Decode Google token
      addLog('📦 Decoding Google ID token...', 'info');
      const googleUser = decodeGoogleToken(response.credential);
      addLog(`✅ Token decoded - Email: ${googleUser.email}`, 'success');
      
      // Debug: Show token audience
      if (googleUser.aud) {
        addLog(`🔍 Token Audience (aud): ${googleUser.aud}`, 'warning');
      }
      // #end-step

      // #step 2 - Normalize user data
      addLog('🔄 Normalizing user data...', 'info');
      const normalizedData = normalizeGoogleUser(googleUser, response.credential);
      addLog(`✅ Data normalized - Name: ${normalizedData.firstName} ${normalizedData.lastName}`, 'success');
      // #end-step

      // #step 3 - Send to server for validation
      addLog('🚀 Sending token to server (POST /auth/google)...', 'info');
      
      const serverUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`;
      addLog(`📍 Server URL: ${serverUrl}`, 'warning');

      const response_server = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
          email: googleUser.email,
          googleId: googleUser.sub,
          name: googleUser.name,
        }),
        credentials: 'include',
      });

      const serverData: ServerAuthResponse = await response_server.json();

      // #step 4 - Validate server response
      if (serverData.success && serverData.user) {
        addLog('✅ Server validation successful!', 'success');
        addLog(`👤 User: ${serverData.user.name} (${serverData.user.email})`, 'success');
        addLog(`🔑 Google ID: ${serverData.user.googleId}`, 'info');
        addLog(`✨ Message: ${serverData.message}`, 'success');

        // Store user data (in real app, you'd use context or state management)
        localStorage.setItem('user', JSON.stringify(serverData.user));
        localStorage.setItem('googleToken', response.credential);

        setLoginState({
          loading: false,
          success: true,
          error: null,
          user: normalizedData,
          serverResponse: serverData,
        });

        addLog('💾 User data stored in localStorage', 'info');
      } else {
        // #step 5 - Handle server validation error
        addLog(`❌ Server validation failed: ${serverData.error}`, 'error');
        addLog(`Code: ${serverData.code}`, 'warning');

        setLoginState({
          loading: false,
          success: false,
          error: serverData.error || 'Server validation failed',
          user: null,
          serverResponse: serverData,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`❌ Error during authentication: ${errorMessage}`, 'error');

      setLoginState({
        loading: false,
        success: false,
        error: errorMessage,
        user: null,
        serverResponse: null,
      });
    }
  };

  /**
   * Handle Google authentication error
   */
  const handleGoogleError = (error: ErrorData) => {
    addLog(`❌ Google authentication error: ${error.message}`, 'error');
    addLog(`Code: ${error.code}`, 'warning');

    setLoginState({
      loading: false,
      success: false,
      error: error.message,
      user: null,
      serverResponse: null,
    });
  };

  /**
   * Logout handler
   */
  const handleLogout = () => {
    addLog('🚪 Logging out...', 'info');
    localStorage.removeItem('user');
    localStorage.removeItem('googleToken');
    resetLogin();
    addLog('✅ Logged out successfully', 'success');
  };
  // #end-section

  // #section Render
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header */}
        <header className="login-header">
          <h1>🔐 Secure Login</h1>
          <p>Google OAuth 2.0 with Server Validation</p>
        </header>

        {/* Main Content */}
        <main className="login-main">
          {/* Success State */}
          {loginState.success ? (
            <div className="login-success">
              <div className="success-icon">✨</div>
              <h2>Welcome, {loginState.user?.firstName} {loginState.user?.lastName}!</h2>
              <p>Successfully authenticated</p>

              <div className="user-info">
                <p><strong>Email:</strong> {loginState.user?.email}</p>
                <p><strong>Google ID:</strong> {loginState.user?.googleId}</p>
                <img 
                  src={loginState.user?.profilePicture} 
                  alt="Profile" 
                  className="profile-picture"
                />
              </div>

              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            /* Login State */
            <div className="login-form">
              <div className="form-content">
                <p className="form-description">
                  Click the button below to authenticate with your Google account
                </p>

                <div className="auth-button-wrapper">
                  <AuthenticatorButtonWithGoogle
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    theme="filled_blue"
                  />
                </div>

                {loginState.loading && (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Authenticating with server...</p>
                  </div>
                )}

                {loginState.error && (
                  <div className="error-state">
                    <p className="error-title">❌ Authentication Failed</p>
                    <p className="error-message">{loginState.error}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Logs Section */}
        <aside className="login-logs">
          <div className="logs-header">
            <h3>📋 Verification Logs</h3>
            <button onClick={clearLogs} className="clear-logs-btn" title="Clear logs">
              Clear
            </button>
          </div>

          <div className="logs-container">
            {logs.length === 0 ? (
              <p className="no-logs">No logs yet. Start authentication to see logs.</p>
            ) : (
              <ul className="logs-list">
                {logs.map((log, index) => (
                  <li key={index} className="log-entry">
                    {log}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loginState.serverResponse && (
            <div className="server-response">
              <h4>Server Response:</h4>
              <pre>{JSON.stringify(loginState.serverResponse, null, 2)}</pre>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default LoginPage;
// #end-component
