'use client';

import { useState, useEffect, ReactNode } from 'react';
import { authAPI, adminAPI, UserResponse, AdminResponse } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { AuthContext, type AuthContextType } from './AuthContextType';

interface AuthProviderProps {
  children: ReactNode;
}

// Extended user type to support both users and admins
type AuthUser = UserResponse & { isAdmin?: boolean; role?: string };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    // Check for admin session first
    const currentAdmin = adminAPI.getCurrentAdmin();
    if (currentAdmin) {
      // Convert AdminResponse to AuthUser format
      const adminUser: AuthUser = {
        userId: currentAdmin.adminId.toString(),
        name: currentAdmin.name,
        email: currentAdmin.email,
        studentId: 'N/A',
        department: 'N/A',
        yearLevel: 'N/A',
        accountStatus: 'ACTIVE',
        createdAt: currentAdmin.createdAt,
        isAdmin: true,
        role: currentAdmin.role,
      };
      setUser(adminUser);
    } else {
      // Check for regular user session
      const currentUser = authAPI.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Try user login first
      try {
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
        return; // Successfully logged in as user
      } catch (userError) {
        // If user login fails, try admin login
        console.log('User login failed, trying admin login...');
        
        try {
          const adminData = await adminAPI.login({ email, password });
          
          // Convert AdminResponse to AuthUser format
          const adminUser: AuthUser = {
            userId: adminData.adminId.toString(),
            name: adminData.name,
            email: adminData.email,
            studentId: 'N/A',
            department: 'N/A',
            yearLevel: 'N/A',
            accountStatus: 'ACTIVE',
            createdAt: adminData.createdAt,
            isAdmin: true,
            role: adminData.role,
          };
          
          // Save admin data
          adminAPI.saveAdmin(adminData);
          setUser(adminUser);

          toast({
            title: "Welcome back, Admin!",
            description: `Logged in as ${adminData.name} (${adminData.role})`,
          });
          return; // Successfully logged in as admin
        } catch (adminError) {
          // Both user and admin login failed
          console.error('Both user and admin login failed');
          throw userError; // Throw the original user error
        }
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

  const register = async (name: string, email: string, password: string, studentId: string, department: string, yearLevel: string) => {
    try {
      setLoading(true);
      const userData = await authAPI.register({ name, email, password, studentId, department, yearLevel });
      
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

  const registerWithImage = async (
    name: string,
    email: string,
    password: string,
    studentId: string,
    department: string,
    yearLevel: string,
    studentIdImage: File
  ) => {
    try {
      setLoading(true);
      // Register user with image - returns authentication response
      await authAPI.registerWithImage(name, email, password, studentId, department, yearLevel, studentIdImage);
      
      // DO NOT auto-login - let the user login manually
      // This ensures they see the success message and go through proper login flow
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
    adminAPI.logout();
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
    registerWithImage,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
