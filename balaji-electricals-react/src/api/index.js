// One function per backend endpoint. Components never build URLs or headers themselves.
import { request, tokenStore } from './client';

export { describeError, ApiError, tokenStore, AUTH_EXPIRED_EVENT, API_BASE_URL } from './client';

// ---------------------------------------------------------------- public
export const getStoreStatus = (signal) => request('/api/store/status', { signal });

/** params: { category, brand, q, maxPrice, inStockOnly, sort } - all optional. */
export const getProducts = (params, signal) => request('/api/products', { params, signal });
export const getProduct = (id, signal) => request(`/api/products/${encodeURIComponent(id)}`, { signal });
export const getCategories = (signal) => request('/api/products/categories', { signal });
export const getBrands = (signal) => request('/api/products/brands', { signal });

/** items: [{ productId, qty }]. The server returns every price, discount and tax figure. */
export const quoteCart = ({ items, couponCode, buyerGstin }, signal) =>
  request('/api/orders/quote', {
    method: 'POST',
    body: { items, couponCode: couponCode || null, buyerGstin: buyerGstin || null },
    signal
  });

/** payload: { customer: {name, phone, address, gstin}, items, couponCode, fulfillment, clientRequestId } */
export const placeOrder = (payload) => request('/api/orders', { method: 'POST', body: payload });

// ------------------------------------------------------------------ auth
export async function login(username, password) {
  const result = await request('/api/auth/login', { method: 'POST', body: { username, password } });
  tokenStore.set(result.accessToken);
  return result;
}
export const getMe = () => request('/api/auth/me', { auth: true });
export const logout = () => tokenStore.clear();

// ----------------------------------------------------------------- admin
export const adminListProducts = () => request('/api/admin/products', { auth: true });
export const adminCreateProduct = (body) => request('/api/admin/products', { method: 'POST', body, auth: true });
export const adminUpdateProduct = (id, body) =>
  request(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PUT', body, auth: true });
/** body: { delta: -3 } or { stock: 40 } */
export const adminSetStock = (id, body) =>
  request(`/api/admin/products/${encodeURIComponent(id)}/stock`, { method: 'PATCH', body, auth: true });
export const adminDeactivateProduct = (id) =>
  request(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });

export const adminListOrders = (params, signal) => request('/api/admin/orders', { params, auth: true, signal });
export const adminGetOrder = (id) => request(`/api/admin/orders/${id}`, { auth: true });
/** body: { status?, paymentStatus? } */
export const adminUpdateOrder = (id, body) =>
  request(`/api/admin/orders/${id}`, { method: 'PATCH', body, auth: true });

// PUT /api/admin/products/{id} REPLACES all catalogue details, so an edit must send the whole product.
// Stock is not part of it: the server ignores it on update and changes it only through the stock endpoint.
const DETAIL_FIELDS = [
  'name', 'brand', 'category', 'price', 'mrp', 'bulkPrice', 'bulkMinQty', 'rating', 'reviews', 'badge',
  'isiCode', 'voltageGrade', 'warranty', 'specs', 'description', 'application', 'image', 'active'
];
export const productToUpdateBody = (product, overrides = {}) => {
  const body = {};
  DETAIL_FIELDS.forEach((key) => {
    body[key] = product[key] ?? null;
  });
  return { ...body, ...overrides };
};
