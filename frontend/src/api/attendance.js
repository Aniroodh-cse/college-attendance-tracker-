import api from './axios';


export const markAttendance = (payload) => api.post('/api/attendance/mark', payload);


export const byDate = (date) => api.get(`/api/attendance/by-date?date=${date}`);