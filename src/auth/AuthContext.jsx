import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    if (!localStorage.getItem('authToken')) return;
    authApi.me().then(setUser).catch(() => localStorage.removeItem('authToken')).finally(() => setLoading(false));
  }, []);

  const startSession = useCallback(({ token, user }) => {
    localStorage.setItem('authToken', token);
    setUser(user);
  }, []);

  const login = async (data) => startSession(await authApi.login(data));
  const register = async (data) => startSession(await authApi.register(data));
  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* sessiya allaqachon tugagan */ }
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
