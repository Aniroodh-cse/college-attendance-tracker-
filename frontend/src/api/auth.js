import api from './axios';

// ✅ Signup API helper
export const signup = (payload) => api.post('/auth/signup', payload);

// ✅ Login API helper
export const login = (payload) => api.post('/auth/login', payload);