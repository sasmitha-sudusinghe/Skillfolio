import api from './client';

export const getProjectsRequest = () => api.get('/projects');

export const createProjectRequest = (data) => api.post('/projects', data);

export const updateProjectRequest = (id, data) => api.put(`/projects/${id}`, data);

export const deleteProjectRequest = (id) => api.delete(`/projects/${id}`);
