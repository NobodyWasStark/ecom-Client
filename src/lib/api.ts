import axios from 'axios';
import { env } from '../config/env';

// Base API Configuration
export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
