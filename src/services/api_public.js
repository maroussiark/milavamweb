// services/api.js

import axios from 'axios';

const api_public = axios.create({
  baseURL: 'http://localhost:8080/', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour chaque requête


export default api_public;
