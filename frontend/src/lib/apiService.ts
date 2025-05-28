const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getProducts({ search = '', page = 1, limit = 8 }) {
  const url = `${BASE_URL}/api/products?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductVariant(productId: string, variantId: string) {
  const url = `${BASE_URL}/api/products/${productId}/variant/${variantId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch product variant');
  return res.json();
}

export interface OrderRequest {
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
  paymentStatus: string;
}

export async function createOrder(order: OrderRequest) {
  const url = `${BASE_URL}/api/orders`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function getOrder(orderId: string) {
  const url = `${BASE_URL}/api/orders/${orderId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
} 