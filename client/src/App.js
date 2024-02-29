//App.js

import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('quickbet_token');
    if (storedToken) {
      setToken(storedToken);
      setIsNewUser(false);
    }
  }, []);

  const handleRegister = (token, userName) => {
    setToken(token);
    setUserName(userName);
    setIsNewUser(false); 
  };

  const handleLogin = (token, userName) => {
    setToken(token);
    setUserName(userName);
    setIsNewUser(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('quickbet_token');
    setToken('');
    setIsNewUser(false);
    setUserName('');
  };

  return (
    <div>
      {!token && isNewUser && (
        <div>
          <Register onRegister={handleRegister} />
          <p>Already registered? <span onClick={() => setIsNewUser(false)}>Login</span></p>
        </div>
      )}
      {!token && !isNewUser && (
        <div>
          <Login onLogin={handleLogin} />
          <p>Not registered? <span onClick={() => setIsNewUser(true)}>Register</span></p>
        </div>
      )}
      {token && !isNewUser && <Dashboard token={token} userName={userName} onLogout={handleLogout} />}
    </div>
  );
};

export default App;
