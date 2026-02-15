// Types aligned with backend Prisma schema (snake_case field names)

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: 'USER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string | null;
  description: string;
  price: number;
  original_price: number | null;
  currency: string;
  stock: number;
  is_preorder: boolean;
  image_url: string | null;
  category_id: string | null;
  category?: Category;
  images?: ProductImage[];
  reviews?: Review[];
  created_at: string;
  updated_at: string;
  // Computed fields from backend
  averageRating?: number | null;
  reviewCount?: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  order: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  parent?: Category;
  children?: Category[];
  products?: Product[];
  created_at: string;
  updated_at: string;
  _count?: { products: number };
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address_id: string | null;
  shipping_address?: Address;
  shipping_cost: number;
  tracking_number: string | null;
  estimated_delivery: string | null;
  items: OrderItem[];
  payment?: Payment;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  provider: string;
  transaction_id: string | null;
  status: PaymentStatus;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  product?: Product;
  user_id: string;
  user?: Pick<User, 'id' | 'name' | 'email'>;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}
