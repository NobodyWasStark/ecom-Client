// API response type wrappers matching the backend response format

/** Standard API success response */
export interface ApiResponse<T> {
  message?: string;
  data: T;
}

/** Paginated response from list endpoints */
export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Auth response with user and token */
export interface AuthResponse {
  user: import('./index').User;
  token: string;
}

/** API error response */
export interface ApiError {
  error: string;
  statusCode?: number;
}
