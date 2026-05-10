import axios from 'axios';
import apiClient from '@/lib/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  studentId: string;
  department: string;
  yearLevel: string;
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

export interface AuthenticationResponse {
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
  token: string;
}

export const authAPI = {
  registerWithImage: async (
    name: string,
    email: string,
    password: string,
    studentId: string,
    department: string,
    yearLevel: string,
    studentIdImage: File
  ): Promise<AuthenticationResponse> => {
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
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 30000 }
    );
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/users/login', credentials);
    return response.data;
  },

  getCurrentUser: (): UserResponse | null => {
    const user = localStorage.getItem('wildkits_user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
    return null;
  },

  saveUser: (userData: UserResponse): void => {
    localStorage.setItem('wildkits_user', JSON.stringify(userData));
  },

  logout: (): void => {
    localStorage.removeItem('wildkits_user');
  },
};