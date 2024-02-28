// Register.js

import React, { useState } from 'react';
import { registerUser } from './apiService';

const Register = ({ onRegister }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const token = await registerUser(userName, password);
      localStorage.setItem('quickbet_token', token);
      onRegister(token);
    } catch (error) {
      setErrorMessage(`Registration failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      {errorMessage && (
        <div className="error-popup" style={{ color: 'red', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>    
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Register;

