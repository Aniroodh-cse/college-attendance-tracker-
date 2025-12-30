import api from './axios';

export const listStudents = (params) => api.get('/api/students', { params });
export const getStudent = (id) => api.get(`/api/students/${id}`);
export const createStudent = (payload) => api.post('/api/students', payload);
export const updateStudent = (id, payload) => api.put(`/api/students/${id}`, payload);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);