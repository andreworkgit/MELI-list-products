export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Seller {
  name: string;
  rating: number;
  location: string;
  contact: string;
  totalSales?: number;
  memberSince?: string;
}

export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: number;
  cost?: number;
  methods?: string[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  basePrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
  currency: string;
  paymentMethods: string[];
  seller: Seller;
  specifications: Record<string, string>;
  reviews: Review[];
  stockQuantity: number;
  shippingInfo: ShippingInfo;
  category?: string;
  condition?: 'new' | 'used' | 'refurbished';
  warranty?: string;
  tags?: string[];
}

export interface DiscountConditions {
  category?: string;
  validUntil?: string;
  validFrom?: string;
  maxUsage?: number;
  currentUsage?: number;
}

export interface DiscountRule {
  id: string;
  type: 'percentage' | 'fixed' | 'conditional';
  value: number;
  conditions?: DiscountConditions;
  isActive: boolean;
  name?: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProductUpdateData {
  title?: string;
  description?: string;
  basePrice?: number;
  stockQuantity?: number;
  specifications?: Record<string, string>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'date';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}

export interface DiscountCalculation {
  originalPrice: number
  discountedPrice: number
  discountAmount: number
  discountPercentage: number
  appliedDiscounts: DiscountRule[]
}