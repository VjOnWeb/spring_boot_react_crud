// src/utils/axiosWithAuth.js
import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('jwtToken');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
