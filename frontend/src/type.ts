// Shared types for the e-commerce frontend

export interface Variant {
  id: number;
  color: string;
  size: string;
  inventory: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  variants: Variant[];
  selectedVariant?: Variant;
}

export interface OrderItem {
  Product: {
    image: string;
    title: string;
  };
  Variant: {
    color: string;
    size: string;
  };
  quantity: number;
  subtotal: number;
}

export interface Order {
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: OrderItem[];
}

export interface PendingOrderBody {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  productId: string | null;
  variantId: string | null;
  quantity: number;
} 