// Mentor service for mentor-related API calls
import apiClient from './api';
import { ApiResponse } from '@/types/api';

export interface MentorService {
  getAllMentors(): Promise<ApiResponse>;
  getMentorById(id: string): Promise<ApiResponse>;
  createMentor(data: unknown): Promise<ApiResponse>;
  updateMentor(id: string, data: unknown): Promise<ApiResponse>;
  deleteMentor(id: string): Promise<ApiResponse>;
}

export const mentorService: MentorService = {
  async getAllMentors() {
    const response = await apiClient.get('/mentors');
    return response.data;
  },

  async getMentorById(id: string) {
    const response = await apiClient.get(`/mentors/${id}`);
    return response.data;
  },

  async createMentor(data: unknown) {
    const response = await apiClient.post('/mentors', data);
    return response.data;
  },

  async updateMentor(id: string, data: unknown) {
    const response = await apiClient.put(`/mentors/${id}`, data);
    return response.data;
  },

  async deleteMentor(id: string) {
    const response = await apiClient.delete(`/mentors/${id}`);
    return response.data;
  },
};
