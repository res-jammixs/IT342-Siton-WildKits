import axios from 'axios';

// API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear user data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      // Return userId as user_id for frontend compatibility
      return {
        user_id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        accountStatus: response.data.accountStatus,
        createdAt: response.data.createdAt,
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle network errors
      if (!error.response) {
        throw 'Cannot connect to server. Please make sure the backend is running on http://localhost:8080';
      }
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.map(err => err.message || err).join(', ');
        throw errorMessages;
      }
      
      // Handle generic error message
      throw error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', {
        email: credentials.email,
        password: credentials.password,
      });
      // Return userId as user_id for frontend compatibility
      return {
        user_id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        accountStatus: response.data.accountStatus,
        createdAt: response.data.createdAt,
      };
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle network errors
      if (!error.response) {
        throw 'Cannot connect to server. Please make sure the backend is running on http://localhost:8080';
      }
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.map(err => err.message || err).join(', ');
        throw errorMessages;
      }
      
      // Handle generic error message
      throw error.response?.data?.message || error.response?.data?.error || 'Login failed. Please check your credentials.';
    }
  },

  // Logout user
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Save user to localStorage
  saveUser: (userData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  },
};

export default api;
