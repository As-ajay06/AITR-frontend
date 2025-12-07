/**
 * Token utility functions
 * Centralized token management
 */

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getRole = () => {
  return localStorage.getItem('role');
};

export const setRole = (role) => {
  localStorage.setItem('role', role);
};

export const removeRole = () => {
  localStorage.removeItem('role');
};

export const clearAuth = () => {
  removeToken();
  removeRole();
};

