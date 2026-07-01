import { useState, useCallback, useMemo } from 'react';
import { authService } from '../services/authService';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const adminUser = await authService.adminLogin(email, password);
      setUser(adminUser);
      return adminUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authService.signup(data);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const registerForEvent = useCallback((eventId) => {
    setUser((prev) => {
      if (!prev) return prev;
      const already = prev.registeredEvents?.includes(eventId);
      if (already) return prev;
      return {
        ...prev,
        registeredEvents: [...(prev.registeredEvents || []), eventId],
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      adminLogin,
      signup,
      logout,
      registerForEvent,
      setError,
    }),
    [user, loading, error, login, adminLogin, signup, logout, registerForEvent]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};