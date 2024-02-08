// services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour chaque requête
api.interceptors.request.use(
  
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    console.log('errr',error);
    return Promise.reject(error);
  }
);



export default api;
