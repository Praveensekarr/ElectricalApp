// Display-only helpers. These format numbers that the server calculated; they never calculate prices.

/** 1850 -> "1,850", 1567.8 -> "1,567.80" (Indian digit grouping). */
export const fmt = (value) => {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return '0';
  return Number.isInteger(n)
    ? n.toLocaleString('en-IN')
    : n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/** "2026-11-05" -> "05/11/2026" */
export const formatInvoiceDate = (isoDate) => {
  if (!isoDate) return new Date().toLocaleDateString('en-IN');
  const [y, m, d] = String(isoDate).split('-');
  return y && m && d ? `${d}/${m}/${y}` : String(isoDate);
};

export const formatDateTime = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

/** A fresh id per checkout attempt, so a retry or double-click cannot create two orders. */
export const newRequestId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};
