import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, ChevronRight } from 'lucide-react';
import { adminListOrders, adminGetOrder, adminUpdateOrder, describeError } from '../api';
import { fmt, formatInvoiceDate, formatDateTime } from '../utils/format';

const STATUS_STYLES = {
  PLACED: 'bg-amber-50 text-amber-800',
  CONFIRMED: 'bg-sky-50 text-sky-800',
  DELIVERED: 'bg-emerald-50 text-emerald-700',
  CANCELLED: 'bg-rose-50 text-rose-700'
};

const FILTERS = ['', 'PLACED', 'CONFIRMED', 'DELIVERED', 'CANCELLED'];
const PAGE_SIZE = 15;

/**
 * Store-manager order desk. Confirming an order is what deducts stock on the server; cancelling a confirmed
 * order returns it. The browser only asks - the backend decides whether the change is allowed.
 */
export default function AdminOrdersPanel({ addToast, onInventoryChanged }) {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const requestCounter = useRef(0);

  const load = useCallback(async () => {
    const requestNo = ++requestCounter.current;
    setLoading(true);
    try {
      const result = await adminListOrders({ status: statusFilter || undefined, page, size: PAGE_SIZE });
      if (requestNo !== requestCounter.current) return; // a newer request superseded this one
      setData(result);
      setError('');
    } catch (err) {
      if (requestNo !== requestCounter.current) return;
      if (err.status !== 401) setError(describeError(err));
    } finally {
      if (requestNo === requestCounter.current) setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleDetail = async (order) => {
    if (expandedId === order.id) {
      setExpandedId(null);
      setDetail(null);
      return;
    }
    setExpandedId(order.id);
    setDetail(null);
    try {
      setDetail(await adminGetOrder(order.id));
    } catch (err) {
      if (err.status !== 401) addToast(describeError(err), 'error');
    }
  };

  const applyUpdate = async (order, body, successMessage) => {
    setBusyId(order.id);
    try {
      await adminUpdateOrder(order.id, body);
      addToast(successMessage);
      await load();
      if (expandedId === order.id) setDetail(await adminGetOrder(order.id));
      // confirming deducts stock and cancelling a confirmed order returns it
      if (body.status === 'CONFIRMED' || body.status === 'CANCELLED') onInventoryChanged();
    } catch (err) {
      if (err.status !== 401) addToast(describeError(err), 'error');
    } finally {
      setBusyId(null);
    }
  };

  const cancelOrder = (order) => {
    const paid = order.paymentStatus === 'PAID';
    const message = paid
      ? `Order ${order.invoiceNumber} is marked PAID. Cancelling will reset its payment to PENDING (record the refund separately). Continue?`
      : `Cancel order ${order.invoiceNumber}?`;
    if (!window.confirm(message)) return;
    applyUpdate(
      order,
      paid ? { status: 'CANCELLED', paymentStatus: 'PENDING' } : { status: 'CANCELLED' },
      `Order ${order.invoiceNumber} cancelled`
    );
  };

  const orders = data ? data.content : [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-black text-slate-900">
          Customer Orders {data ? `(${data.totalElements})` : ''}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f || 'ALL'}
              onClick={() => {
                setStatusFilter(f);
                setPage(0);
                setExpandedId(null);
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
                statusFilter === f
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-red-600'
              }`}
            >
              {f || 'ALL'}
            </button>
          ))}
          <button
            onClick={load}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200"
            aria-label="Refresh orders"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between gap-3">
          <span>{error}</span>
          <button onClick={load} className="underline font-bold">Retry</button>
        </div>
      )}

      {!data && loading ? (
        <p className="text-xs text-slate-500 py-6 text-center">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center">No orders found.</p>
      ) : (
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase">
              <th className="pb-2.5">Invoice</th>
              <th className="pb-2.5">Customer</th>
              <th className="pb-2.5">Total ₹</th>
              <th className="pb-2.5">Status</th>
              <th className="pb-2.5">Payment</th>
              <th className="pb-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => {
              const busy = busyId === order.id;
              const open = expandedId === order.id;
              return (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 pr-2">
                      <button onClick={() => toggleDetail(order)} className="flex items-center gap-1 font-mono font-bold text-slate-900 hover:text-red-600">
                        <ChevronRight className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`} />
                        {order.invoiceNumber}
                      </button>
                      <div className="text-[10px] text-slate-400 pl-4">{formatDateTime(order.createdAt)}</div>
                    </td>
                    <td className="py-3 pr-2">
                      <div className="font-semibold text-slate-800">{order.buyerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{order.buyerPhone}</div>
                    </td>
                    <td className="py-3 font-black text-slate-900">₹{fmt(order.grandTotal)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLES[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-1 whitespace-nowrap">
                      {order.status === 'PLACED' && (
                        <button
                          disabled={busy}
                          onClick={() => applyUpdate(order, { status: 'CONFIRMED' }, `Order ${order.invoiceNumber} confirmed — stock deducted`)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded font-bold text-[10px]"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status === 'CONFIRMED' && (
                        <button
                          disabled={busy}
                          onClick={() => applyUpdate(order, { status: 'DELIVERED' }, `Order ${order.invoiceNumber} delivered`)}
                          className="px-2 py-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded font-bold text-[10px]"
                        >
                          Delivered
                        </button>
                      )}
                      {order.status !== 'CANCELLED' && (
                        <button
                          disabled={busy}
                          onClick={() =>
                            applyUpdate(
                              order,
                              { paymentStatus: order.paymentStatus === 'PAID' ? 'PENDING' : 'PAID' },
                              order.paymentStatus === 'PAID' ? 'Payment reset to pending' : 'Marked as paid'
                            )
                          }
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded font-bold text-[10px]"
                        >
                          {order.paymentStatus === 'PAID' ? 'Mark Unpaid' : 'Mark Paid'}
                        </button>
                      )}
                      {(order.status === 'PLACED' || order.status === 'CONFIRMED') && (
                        <button
                          disabled={busy}
                          onClick={() => cancelOrder(order)}
                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-50 rounded font-bold text-[10px]"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>

                  {open && (
                    <tr className="bg-slate-50">
                      <td colSpan={6} className="px-4 py-3">
                        {!detail ? (
                          <span className="text-slate-500">Loading invoice…</span>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                            <div className="space-y-1">
                              <div><strong>Invoice date:</strong> {formatInvoiceDate(detail.invoiceDate)}</div>
                              <div><strong>Address:</strong> {detail.buyer.address}</div>
                              <div><strong>Buyer GSTIN:</strong> <span className="font-mono">{detail.buyer.gstin || 'Unregistered'}</span></div>
                              <div><strong>Fulfilment:</strong> {detail.fulfillment || '—'}</div>
                              <div className="pt-1 font-mono text-slate-600">
                                Taxable ₹{fmt(detail.pricing.taxableValue)} •{' '}
                                {Number(detail.pricing.igst) > 0
                                  ? `IGST ₹${fmt(detail.pricing.igst)}`
                                  : `CGST ₹${fmt(detail.pricing.cgst)} • SGST ₹${fmt(detail.pricing.sgst)}`}
                                {Number(detail.pricing.couponDiscount) > 0 &&
                                  ` • Coupon ${detail.pricing.couponCode} −₹${fmt(detail.pricing.couponDiscount)}`}
                              </div>
                            </div>
                            <table className="w-full text-left">
                              <thead>
                                <tr className="text-slate-400 uppercase text-[10px]">
                                  <th className="pb-1">Item</th>
                                  <th className="pb-1 text-center">Qty</th>
                                  <th className="pb-1 text-right">Rate</th>
                                  <th className="pb-1 text-right">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detail.pricing.lines.map((line) => (
                                  <tr key={line.productId}>
                                    <td className="py-0.5 pr-2">
                                      {line.name} <span className="text-slate-400 font-mono">{line.productId}</span>
                                    </td>
                                    <td className="py-0.5 text-center font-mono">{line.qty}</td>
                                    <td className="py-0.5 text-right font-mono">₹{fmt(line.unitPrice)}</td>
                                    <td className="py-0.5 text-right font-mono font-bold">₹{fmt(line.lineTotal)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 text-xs">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-bold"
          >
            Previous
          </button>
          <span className="text-slate-500">
            Page {data.page + 1} of {data.totalPages}
          </span>
          <button
            disabled={page + 1 >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-bold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
