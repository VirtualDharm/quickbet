// Register.js

import React, { useState } from 'react';
import { registerUser } from './apiService';

const Register = ({ onRegister }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const token = await registerUser(userName, password);
      console.log('getting token on register: ',token)
      localStorage.setItem('quickbet_token', token);
      onRegister(token);
    } catch (error) {
      console.error('Registration failed:', error.message);
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
    </div>
  );
};

export default Register;

