import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_ADMIN: AdminUser = {
  id: 'ADM-001',
  name: 'Pravin Patil (Director / Lead Admin)',
  email: 'admin@jayashreeagro.com',
  role: 'Super Admin',
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
  resetPassword: async () => ({ success: false, message: '' }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('jayashree_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial brief async check
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Default authorized account or flexible authorization for company management
    if (
      (cleanEmail === 'admin@jayashreeagro.com' && cleanPass === 'Agro@Parbhani2026') ||
      (cleanEmail === 'admin' && cleanPass === 'admin123') ||
      (cleanEmail.endsWith('@jayashreeagro.com') && cleanPass.length >= 6)
    ) {
      const loggedUser: AdminUser = {
        id: 'ADM-001',
        name: cleanEmail.includes('admin') ? 'Pravin Patil (Authorized Administrator)' : 'Operations Executive',
        email: cleanEmail,
        role: 'Super Admin',
      };
      setUser(loggedUser);
      localStorage.setItem('jayashree_auth_user', JSON.stringify(loggedUser));
      localStorage.setItem('jayashree_auth_token', `tok_${Date.now()}`);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid email or password. Authorized administrator credentials required.',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jayashree_auth_user');
    localStorage.removeItem('jayashree_auth_token');
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid registered email address.' };
    }
    return {
      success: true,
      message: `Password reset verification link has been dispatched to ${email}.`,
    };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
