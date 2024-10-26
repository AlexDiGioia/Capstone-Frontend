import config from '../config';

export const fetchWithAuth = async (endpoint, options = {}) => {
  // Recupera il token dal localStorage
  const token = localStorage.getItem('token');
  
  // Aggiunge l'header Authorization se il token è presente
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${config.apiBaseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Problemi col token! Per favore effettua di nuovo il login!');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Errore nella richiesta');
    }
  }

  return response.json();
};
