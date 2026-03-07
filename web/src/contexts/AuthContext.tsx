'use client';

import { useState, useEffect, ReactNode } from 'react';
import { authAPI, UserResponse } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { AuthContext, type AuthContextType } from './AuthContextType';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authAPI.login({ email, password });
      
      // Save user data
      authAPI.saveUser(userData);
      setUser(userData);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${userData.name}`,
      });

      // Redirect based on account status
      if (userData.accountStatus === 'PENDING') {
        toast({
          title: "Account Pending",
          description: "Your account is awaiting admin approval.",
          variant: "default",
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Please check your credentials and try again.";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authAPI.register({ name, email, password });
      
      // Save user data
      authAPI.saveUser(userData);
      setUser(userData);

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please wait for admin approval.",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Please try again.";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
