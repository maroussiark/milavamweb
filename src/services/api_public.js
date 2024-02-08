// services/api.js

import axios from 'axios';

const api_public = axios.create({
  baseURL: 'https://voiturecloudv3-production.up.railway.app/', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour chaque requête


export default api_public;
