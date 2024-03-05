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
  const [userAmount, setUserAmount] = useState(0);
  const [poolSize, setPoolSize] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('quickbet_token');
    const storedUserName = localStorage.getItem('quickbet_userName');
    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setIsNewUser(false);
    }
  }, []);

  const handleRegister = (token, userName) => {
    setToken(token);
    setUserName(userName);
    setIsNewUser(false); 
    localStorage.setItem('quickbet_token', token);
    localStorage.setItem('quickbet_userName', userName);
  };

  const handleLogin = (token, userName, balance, available_pool) => {
    setToken(token);
    setUserName(userName);
    setIsNewUser(false);
    setUserAmount(balance);
    setPoolSize(available_pool)
    localStorage.setItem('quickbet_token', token);
    localStorage.setItem('quickbet_userName', userName);
  };

  const handleLogout = () => {
    localStorage.removeItem('quickbet_token');
    localStorage.removeItem('quickbet_userName');
    setToken('');
    setIsNewUser(false);
    setUserName('');
  };

  return (
    <div style={{ color:"white"}}>
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
      {token && !isNewUser && <Dashboard token={token} userName={userName} balance={userAmount} poolSize={poolSize} onLogout={handleLogout} />}
    </div>
  );
};

export default App;
