// src/axiosWithAuth.js
import axios from 'axios';

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosWithAuth;
