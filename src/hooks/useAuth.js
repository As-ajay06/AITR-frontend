import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for authentication management
 * Handles token storage, retrieval, and logout
 */
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get token from localStorage
  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  // Get role from localStorage
  const getRole = useCallback(() => {
    return localStorage.getItem('role');
  }, []);

  // Set token
  const setAuthToken = useCallback((newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }, []);

  // Set role
  const setAuthRole = useCallback((newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/login');
  }, [navigate]);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!getToken();
  }, [getToken]);

  // Initialize auth state on mount
  useEffect(() => {
    const storedToken = getToken();
    const storedRole = getRole();
    
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRole) {
      setRole(storedRole);
    }
    
    setLoading(false);
  }, [getToken, getRole]);

  return {
    token,
    role,
    loading,
    getToken,
    getRole,
    setAuthToken,
    setAuthRole,
    logout,
    isAuthenticated,
  };
};

