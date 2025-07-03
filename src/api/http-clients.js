import axios from 'axios';
import config from '../config';
// import Cookies from 'js-cookie';

const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// httpClient.interceptors.request.use(
//   async (config) => {
//     const storedAuthData = Cookies.get('auth_data');
//     if (storedAuthData) {
//       config.headers['Authorization'] = `Bearer ${authData.token}`;
//     }
//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
