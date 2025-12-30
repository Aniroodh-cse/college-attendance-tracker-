import api from './axios';


export const markAttendance = (payload) => api.post('/attendance/mark', payload);


export const byDate = (date) => api.get(`/attendance/by-date?date=${date}`);