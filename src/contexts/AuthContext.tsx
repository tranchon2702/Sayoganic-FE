import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: token changed', token ? 'exists' : 'none');
    
    const loadUser = async () => {
      if (token) {
        console.log('AuthContext: attempting to load user with token');
        try {
          // The interceptor in api.ts already adds the token to the header
          const response = await api.get('/auth/me');
          console.log('AuthContext: user loaded successfully', response.data);
          setUser(response.data);
        } catch (error: unknown) {
          console.error('AuthContext: Failed to load user', error);
          // Don't clear token on network errors, only on auth errors
          const axiosError = error as { response?: { status: number } };
          if (axiosError?.response?.status === 401) {
            console.log('AuthContext: 401 error, clearing token and user');
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      } else {
        console.log('AuthContext: no token found, user is null');
        setUser(null);
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  const login = (newToken: string, userData: User) => {
    console.log('AuthContext: login called with token and user', userData);
    // Lưu token vào localStorage trực tiếp để đảm bảo nó được lưu ngay lập tức
    try {
      localStorage.setItem('token', newToken);
      console.log('Token saved to localStorage:', localStorage.getItem('token'));
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
    
    setToken(newToken);
    setUser(userData);
    console.log('AuthContext: login complete, token and user set');
  };

  const logout = () => {
    console.log('AuthContext: logout called');
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('token');
      console.log('Token removed from localStorage');
      // Không xóa giỏ hàng khi đăng xuất - giỏ hàng vẫn được lưu trong localStorage
      // Khi đăng xuất, người dùng sẽ quay lại sử dụng giỏ hàng localStorage
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
    console.log('AuthContext: logout complete, token and user cleared');
  };

  // Debug current auth state
  useEffect(() => {
    console.log('AuthContext: current state', {
      isAuthenticated: !!user,
      user,
      token: token ? 'exists' : 'none',
      isLoading
    });
  }, [user, token, isLoading]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 