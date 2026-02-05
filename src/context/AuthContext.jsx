import { createContext, useState, useEffect } from 'react';
import { getToken, setToken, getUser, setUser, clearAuth } from '../utils/localStorage';
import * as authService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const { user } = await authService.getMe();
      setUserState(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const { token, user } = await authService.login({ email, password });
    setToken(token);
    setUser(user);
    setUserState(user);
    setIsAuthenticated(true);
    return user;
  };

  const signup = async (userData) => {
    const { token, user } = await authService.signup(userData);
    setToken(token);
    setUser(user);
    setUserState(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    clearAuth();
    setUserState(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
