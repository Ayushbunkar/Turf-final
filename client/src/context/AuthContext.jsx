import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api'; // kept for any incidental direct calls
import { loginRequest, registerRequest, meRequest } from '../services/authService';
import toast from 'react-hot-toast';

// Create context
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set up axios defaults when token changes
  // Authorization header handled in api interceptor
  useEffect(() => {}, [token]);

  // Fetch user data with the token
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const u = await meRequest();
        setUser(u);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        if (err.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const { token: tk, user: u } = await loginRequest(email, password);
      localStorage.setItem('token', tk);
      setToken(tk);
      setUser(u);
      toast.success(`Welcome back, ${u.name}!`);
      return u;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const data = await registerRequest(userData);
      toast.success('Registration successful! Please log in.');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};