import axios from 'axios';
import {Job} from '../types/Job';
import {API_BASE_URL} from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobsApi = {
  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  },

  // Get a single job by ID
  getJobById: async (id: number): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  // Update job (e.g., mark as applying)
  updateJob: async (id: number, data: Partial<Job>): Promise<Job> => {
    const response = await api.put<Job>(`/jobs/${id}`, data);
    return response.data;
  },

  // Manually trigger job sync
  syncJobs: async (): Promise<{message: string; added: number; skipped: number}> => {
    const response = await api.post('/jobs/sync');
    return response.data;
  },
};

export default api;
