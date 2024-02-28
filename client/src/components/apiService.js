// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const loginUser = async (userName, password ) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { userName, password  });
    return response.data.token;
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
