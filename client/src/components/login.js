// Login.js

import React, { useState } from 'react';
import { loginUser } from './apiService';

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginUser(userName, password);
      localStorage.setItem('quickbet_token', token);
      onLogin(token);
    } catch (error) {
      setErrorMessage(`Login failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && (
        <div className="error-popup" style={{ color: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>    
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Login;