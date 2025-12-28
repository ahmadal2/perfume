
export type Gender = 'men' | 'women' | 'unisex';
export type FragranceFamily = 'Oriental' | 'Western' | 'French' | 'Floral' | 'Woody' | 'Fresh' | 'Citrus';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type UserRole = 'customer' | 'admin' | 'owner';
export type DiscountType = 'percentage' | 'fixed';

export interface Variant {
  id: string;
  size: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Sale {
  id: string;
  name: string;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  isPermanent: boolean;
  appliesTo: 'all' | 'specific_products' | 'specific_categories';
  targetIds?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  fragranceType: FragranceFamily;
  gender: Gender;
  images: string[];
  variants: Variant[];
  isActive: boolean;
  isFeatured?: boolean;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  originalPrice?: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  lowStockItems: number;
  revenueTrend: string;
  orderTrend: string;
}
