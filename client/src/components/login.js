// Login.js

import React, { useState } from 'react';
import { loginUser } from './apiService';

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginUser(userName, password);
      console.log('getting token on login: ',token)
      localStorage.setItem('quickbet_token', token);
      onLogin(token);
    } catch (error) {
      console.error('Login failed:', error.message);
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
    </div>
  );
};

export default Login;