import { api } from '../../../lib/api';
import type { ApiResponse, AuthResponse } from '../../../types/api';
import type { User } from '../../../types';

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
    return data.data;
  },

  register: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', { email, password });
    return data.data;
  },

  getProfile: async () => {
    const { data } = await api.get<ApiResponse<User>>('/auth/profile');
    return data.data;
  },

  updateProfile: async (profileData: Partial<Pick<User, 'name' | 'phone'>>) => {
    const { data } = await api.patch<ApiResponse<User>>('/auth/profile', profileData);
    return data.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  requestPasswordReset: async (email: string) => {
    const { data } = await api.post('/auth/password-reset/request', { email });
    return data;
  },

  resetPassword: async (token: string, password: string) => {
    const { data } = await api.post('/auth/password-reset/confirm', { token, password });
    return data;
  },
};
