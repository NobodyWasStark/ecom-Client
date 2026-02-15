import { api } from '../api';
import type { ApiResponse } from '../../types/api';
import type { User, Order } from '../../types';

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
}

export const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const { data } = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard');
    return data.data;
  },

  // Users
  getAllUsers: async (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    const { data } = await api.get<ApiResponse<{ users: User[]; total: number }>>(`/admin/users${query ? `?${query}` : ''}`);
    return data.data;
  },

  updateUserRole: async (userId: string, role: 'USER' | 'ADMIN') => {
    const { data } = await api.patch<ApiResponse<User>>(`/admin/users/${userId}/role`, { role });
    return data.data;
  },

  // Orders
  getAllOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    const { data } = await api.get<ApiResponse<{ orders: Order[]; total: number }>>(`/admin/orders${query ? `?${query}` : ''}`);
    return data.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const { data } = await api.patch<ApiResponse<Order>>(`/admin/orders/${orderId}/status`, { status });
    return data.data;
  },

  // Products (use productService for CRUD, these are admin-specific endpoints)
  getProductStats: async () => {
    const { data } = await api.get<ApiResponse<{ totalProducts: number; outOfStock: number; lowStock: number }>>('/admin/products/stats');
    return data.data;
  },
};
