import api from './client';

export const signupRequest = (data) => api.post('/auth/signup', data);

export const loginRequest = (data) => api.post('/auth/login', data);

export const getMeRequest = () => api.get('/auth/me');
