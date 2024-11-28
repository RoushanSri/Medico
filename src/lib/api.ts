import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (userId: string, password: string) => {
    const response = await api.post('/auth/login', { userId, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const patients = {
  getProfile: async () => {
    const response = await api.get('/patients/profile');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/patients/profile', data);
    return response.data;
  },
};

export const medications = {
  getAll: async () => {
    const response = await api.get('/medications');
    return response.data;
  },
  add: async (data: any) => {
    const response = await api.post('/medications', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/medications/${id}`, data);
    return response.data;
  },
};

export const reports = {
  getAll: async () => {
    const response = await api.get('/reports');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },
};