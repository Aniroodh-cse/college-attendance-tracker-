import api from './axios';

// ✅ Signup API helper
export const signup = (payload) => api.post('/api/auth/signup', payload);

// ✅ Login API helper
export const login = (payload) => api.post('/api/auth/login', payload);