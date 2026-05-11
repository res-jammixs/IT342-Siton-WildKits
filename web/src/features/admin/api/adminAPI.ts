import apiClient from '@/lib/apiClient';

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminResponse {
  adminId: number | string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const adminAPI = {
  login: async (credentials: AdminLoginCredentials): Promise<AdminResponse> => {
    const response = await apiClient.post<AdminResponse>('/admins/login', credentials);
    return response.data;
  },

  getCurrentAdmin: (): AdminResponse | null => {
    const admin = localStorage.getItem('wildkits_admin');
    if (admin) {
      try {
        return JSON.parse(admin);
      } catch {
        return null;
      }
    }
    return null;
  },

  saveAdmin: (adminData: AdminResponse): void => {
    localStorage.setItem('wildkits_admin', JSON.stringify(adminData));
  },

  logout: (): void => {
    localStorage.removeItem('wildkits_admin');
  },
};
