// Central HTTP client for the Balaji Electricals Spring Boot API.
// - One place for the base URL, JSON handling, timeouts and error shape.
// - The admin JWT lives in sessionStorage (cleared when the tab closes) and is attached only to calls made
//   with { auth: true }. It is never put in a URL and never written to localStorage.

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '');

const TOKEN_KEY = 'balaji_admin_token';
const REQUEST_TIMEOUT_MS = 15000;

export const AUTH_EXPIRED_EVENT = 'balaji:auth-expired';

let memoryToken = null; // fallback when sessionStorage is unavailable (private mode, blocked storage)

export const tokenStore = {
  get() {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || memoryToken;
    } catch {
      return memoryToken;
    }
  },
  set(token) {
    memoryToken = token;
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* memory fallback is enough */
    }
  },
  clear() {
    memoryToken = null;
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  }
};

/** Normalised error for every failed call. `network` is true when the server could not be reached. */
export class ApiError extends Error {
  constructor({ status = 0, code = 'ERROR', message, violations = null, network = false }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.violations = violations;
    this.network = network;
  }
}

/** A short, human-readable message for toasts and inline errors. */
export function describeError(err) {
  if (!err) return 'Something went wrong. Please try again.';
  if (err.network) return err.message;
  if (err.violations && err.violations.length > 0) {
    return err.violations
      .slice(0, 3)
      .map((v) => `${v.field}: ${v.message}`)
      .join(' • ');
  }
  return err.message || 'Something went wrong. Please try again.';
}

function buildUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

/**
 * request('/api/products', { params, signal })
 * request('/api/orders', { method: 'POST', body })
 * request('/api/admin/orders', { auth: true })
 */
export async function request(path, { method = 'GET', body, params, auth = false, signal } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = tokenStore.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  // Combine the caller's AbortSignal with our own timeout.
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const onCallerAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener('abort', onCallerAbort, { once: true });
  }

  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });
  } catch (err) {
    if (signal && signal.aborted) throw err; // the caller cancelled: let them ignore it
    throw new ApiError({
      network: true,
      code: timedOut ? 'TIMEOUT' : 'NETWORK_ERROR',
      message: timedOut
        ? 'The server took too long to respond. Please try again.'
        : 'Cannot reach the Balaji Electricals server. Check your connection and try again.'
    });
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener('abort', onCallerAbort);
  }

  let data = null;
  if (response.status !== 204) {
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }
  }

  if (!response.ok) {
    const error = new ApiError({
      status: response.status,
      code: (data && data.code) || `HTTP_${response.status}`,
      message: (data && data.message) || `Request failed (${response.status})`,
      violations: (data && data.violations) || null
    });
    // An expired/invalid admin token: forget it and tell the app to ask for a login again.
    if (response.status === 401 && auth) {
      tokenStore.clear();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw error;
  }
  return data;
}
