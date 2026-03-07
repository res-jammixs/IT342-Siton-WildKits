import { createContext } from 'react';
import { UserResponse } from '@/lib/api';

export interface AuthContextType {
  user: UserResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, studentId: string, department: string, yearLevel: string) => Promise<void>;
  registerWithImage: (name: string, email: string, password: string, studentId: string, department: string, yearLevel: string, studentIdImage: File) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
