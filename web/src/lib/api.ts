import axios, { AxiosInstance } from 'axios';

// API base URL from environment variables
// In production/Next.js, we use /api which gets proxied to the backend via next.config.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('wildkits_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear user data and redirect to login
      localStorage.removeItem('wildkits_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  studentId: string;
  department: string;
  yearLevel: string;
}

export interface AuthenticationResponse {
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  userId: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  yearLevel: string;
  accountStatus: string;
  createdAt: string;
}

export interface AdminResponse {
  adminId: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ProductData {
  title: string;
  description: string;
  price: number;
  type: 'SELL' | 'LEND';
  category: string;
  condition?: string;
  userId: string;
  imageUrl?: string;
}

export interface ProductResponse {
  productId: number;
  title: string;
  description: string;
  price: number;
  type: string;
  category: string;
  condition?: string;
  imageUrl?: string;
  status: string;
  userId: string;
  userName: string;
  createdAt: string;
}

// Authentication API
export const authAPI = {
  // Register new user with student ID image
  registerWithImage: async (
    name: string,
    email: string,
    password: string,
    studentId: string,
    department: string,
    yearLevel: string,
    studentIdImage: File
  ): Promise<AuthenticationResponse> => {
    try {
      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('studentId', studentId);
      formData.append('department', department);
      formData.append('yearLevel', yearLevel);
      formData.append('studentIdImage', studentIdImage);

      const response = await axios.post<AuthenticationResponse>(
        `${API_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 seconds for file upload
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string; message?: string } } };
        if (axiosError.response?.data?.error) {
          throw new Error(axiosError.response.data.error);
        }
        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Register new user (legacy - without image)
  register: async (userData: UserRegistrationData): Promise<UserResponse> => {
    try {
      const response = await apiClient.post<UserResponse>('/users/register', userData);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/users/login`);
      const response = await apiClient.post<UserResponse>('/users/login', credentials);
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Login error details:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string }; status?: number } };
        console.error('API response status:', axiosError.response?.status);
        console.error('API response data:', axiosError.response?.data);
        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): UserResponse | null => {
    const user = localStorage.getItem('wildkits_user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  // Save user to localStorage
  saveUser: (userData: UserResponse): void => {
    localStorage.setItem('wildkits_user', JSON.stringify(userData));
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('wildkits_user');
  },
};

// Admin API
export const adminAPI = {
  // Admin login
  login: async (credentials: LoginCredentials): Promise<AdminResponse> => {
    try {
      console.log('Attempting admin login to:', `${API_BASE_URL}/admins/login`);
      const response = await apiClient.post<AdminResponse>('/admins/login', credentials);
      console.log('Admin login successful:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Admin login error details:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string }; status?: number } };
        console.error('API response status:', axiosError.response?.status);
        console.error('API response data:', axiosError.response?.data);
        if (axiosError.response?.data?.message) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw new Error('Admin login failed. Please check your credentials.');
    }
  },

  // Get current admin from localStorage
  getCurrentAdmin: (): AdminResponse | null => {
    const admin = localStorage.getItem('wildkits_admin');
    if (admin) {
      try {
        return JSON.parse(admin);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        return null;
      }
    }
    return null;
  },

  // Save admin to localStorage
  saveAdmin: (adminData: AdminResponse): void => {
    localStorage.setItem('wildkits_admin', JSON.stringify(adminData));
  },

  // Logout admin
  logout: (): void => {
    localStorage.removeItem('wildkits_admin');
  },
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async (): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>('/products');
    return response.data;
  },

  // Get product by ID
  getById: async (id: number): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>(`/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (productData: ProductData): Promise<ProductResponse> => {
    const response = await apiClient.post<ProductResponse>('/products', productData);
    return response.data;
  },

  // Create new product with image upload
  createWithImage: async (productData: ProductData, image?: File): Promise<ProductResponse> => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', String(productData.price));
    formData.append('type', productData.type);
    formData.append('category', productData.category);
    if (productData.condition) {
      formData.append('condition', productData.condition);
    }
    formData.append('userId', productData.userId);
    if (image) {
      formData.append('image', image);
    }

    const response = await apiClient.post<ProductResponse>('/products/with-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  },

  // Search products
  search: async (params: {
    category?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>('/products/search', { params });
    return response.data;
  },

  // Get user's products
  getUserProducts: async (userId: string): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>(`/products/user/${userId}`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  // Get user by ID
  getById: async (id: number): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>(`/users/${id}`);
    return response.data;
  },

  // Update user
  update: async (id: number, userData: Partial<UserRegistrationData>): Promise<UserResponse> => {
    const response = await apiClient.put<UserResponse>(`/users/${id}`, userData);
    return response.data;
  },
};

export default apiClient;
