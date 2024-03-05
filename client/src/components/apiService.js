// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const loginUser = async (userName, password ) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { userName, password });
    const token = response.data.token;
    const balanceResponse = await axios.get(`${BASE_URL}/auth/balance?userName=${userName}`);
    const balance = balanceResponse.data.balance;
    const currentTime = new Date();
    const starttime = currentTime.getHours();
    const poolSizeResponse = await axios.get(`${BASE_URL}/pool_sizes/getCurrentPoolSize?starttime=${starttime}`);
    const poolSize = poolSizeResponse.data.poolSize.availableSize; 
    return { token, balance, poolSize };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (userName, password) => { 
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, { userName, password }); 
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
