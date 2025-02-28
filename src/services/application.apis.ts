import axios from 'axios';
import type { FormData } from '../context/FormContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createApplication = async (formData: FormData) => {
  const response = await apiClient.post('/application/create', formData);
  return response.data;
};

export const fetchApplications = async () => {
  const response = await apiClient.get('/application/all');
  return response.data;
};
