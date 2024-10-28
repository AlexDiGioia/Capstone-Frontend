import config from '../config';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Verifica se l'endpoint è un URL completo. Se no, aggiungi la base URL
  const url = endpoint.startsWith('http') ? endpoint : `${config.apiBaseUrl}${endpoint}`;

  // Evita di impostare il Content-Type se il body è FormData
  const isFormData = options.body instanceof FormData;

  const response = await fetch(url, {
    ...options,
    headers: isFormData ? headers : { 'Content-Type': 'application/json', ...headers },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Errore nella richiesta');
  }

  return response.json();
};
