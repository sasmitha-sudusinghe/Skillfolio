import { createContext, useContext, useState, useEffect } from 'react';
import { signupRequest, loginRequest, getMeRequest } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, try to fetch the current user
  useEffect(() => {
    const token = localStorage.getItem('skillfolio_token');
    if (!token) {
      setLoading(false);
      return;
    }

    getMeRequest()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        // token invalid/expired - clear it
        localStorage.removeItem('skillfolio_token');
      })
      .finally(() => setLoading(false));
  }, []);

  const signup = async (formData) => {
    const res = await signupRequest(formData);
    localStorage.setItem('skillfolio_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const login = async (formData) => {
    const res = await loginRequest(formData);
    localStorage.setItem('skillfolio_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('skillfolio_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
