import { api } from '../api';
import type { ApiResponse } from '../../types/api';
import type { Address } from '../../types';

export interface CreateAddressData {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  is_default?: boolean;
}

export const addressService = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Address[]>>('/addresses');
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Address>>(`/addresses/${id}`);
    return data.data;
  },

  create: async (addressData: CreateAddressData) => {
    const { data } = await api.post<ApiResponse<Address>>('/addresses', addressData);
    return data.data;
  },

  update: async (id: string, addressData: Partial<CreateAddressData>) => {
    const { data } = await api.patch<ApiResponse<Address>>(`/addresses/${id}`, addressData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/addresses/${id}`);
    return data;
  },
};
