import React, { useState } from 'react';
import { History, Search, Eye, ShoppingBag, Receipt, Printer } from 'lucide-react';

export default function OrderHistorySection({ orders, onViewReceipt, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      o.orderId.toLowerCase().includes(term) ||
      o.receiptNumber.toLowerCase().includes(term) ||
      (o.table && o.table.id.toString().includes(term)) ||
      o.paymentMethod.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="page-intro">
        <h2>Session Billing & Payment History</h2>
        <p>Comprehensive audit record of all orders and payments settled during the current session.</p>
      </div>

      {/* Search Bar */}
      <div
        className="panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Order ID, Table #, Receipt #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Total Session Orders: <strong>{orders.length}</strong>
        </div>
      </div>

      {/* Orders Table */}
      <div className="panel">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <History size={24} />
            </div>
            <div className="empty-title">No orders found</div>
            <div className="empty-desc">
              {orders.length === 0
                ? 'No orders have been placed in this session yet. Orders settled through Order & Pay will be archived here.'
                : 'No orders match your search criteria.'}
            </div>
            {orders.length === 0 && (
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate('order')}>
                Go to Order Terminal
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Receipt #</th>
                  <th>Timestamp</th>
                  <th>Table</th>
                  <th>Items Breakdown</th>
                  <th>Grand Total</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td style={{ fontWeight: 600, color: 'var(--accent-amber)' }}>{order.orderId}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>{order.receiptNumber}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.timestamp}</td>
                    <td>
                      <span className="badge badge-warning">
                        Table {order.table ? order.table.id : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.825rem', maxWidth: '280px' }}>
                        {order.items &&
                          order.items.map((i, idx) => (
                            <span key={idx} style={{ display: 'inline-block', marginRight: '6px' }}>
                              {i.name} (x{i.quantity}){idx < order.items.length - 1 ? ',' : ''}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      ₹{order.total ? order.total.toFixed(2) : '0.00'}
                    </td>
                    <td>
                      <span className="badge badge-info">{order.paymentMethod}</span>
                    </td>
                    <td>
                      <span className="badge badge-free">{order.paymentStatus}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 12px', gap: 6 }}
                        onClick={() => onViewReceipt(order)}
                        title="View & Print itemized invoice"
                      >
                        <Printer size={14} />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
