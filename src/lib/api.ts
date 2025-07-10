import axios from 'axios';

// Use environment variable if available, otherwise fallback to default URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API baseURL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Log the request
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
    });

    // Lấy token trực tiếp từ localStorage
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        console.log('Token found in localStorage, adding to request headers');
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log('No token found in localStorage');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      } : 'No response',
      request: error.config ? {
        method: error.config.method?.toUpperCase(),
        url: error.config.url,
      } : 'No request config',
    });
    return Promise.reject(error);
  }
);

export default api; 