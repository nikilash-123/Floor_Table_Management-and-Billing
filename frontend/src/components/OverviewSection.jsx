import React from 'react';
import {
  UtensilsCrossed,
  CheckCircle2,
  Users,
  BookOpen,
  ShoppingBag,
  IndianRupee,
  ArrowRight,
  Receipt,
  Eye
} from 'lucide-react';

export default function OverviewSection({
  stats,
  recentOrders,
  onNavigate,
  onViewReceipt,
  isLoading
}) {
  return (
    <div>
      <div className="page-intro">
        <h2>Dashboard Overview</h2>
        <p>Real-time dining floor metrics, menu statistics, and session order activity.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="stats-grid">
        {/* Total Tables */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Tables</span>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <UtensilsCrossed size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.totalTables}</div>
          <div className="stat-subtext">Configured floor tables</div>
        </div>

        {/* Available Tables */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Available Tables</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#34d399' }}>{stats.availableTables}</div>
          <div className="stat-subtext">Ready for guests (Free)</div>
        </div>

        {/* Occupied Tables */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Occupied Tables</span>
            <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#fb7185' }}>{stats.occupiedTables}</div>
          <div className="stat-subtext">Currently dining (Occupy)</div>
        </div>

        {/* Menu Items */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Menu Items</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' }}>
              <BookOpen size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.totalMenuItems}</div>
          <div className="stat-subtext">Dishes in Menu Card</div>
        </div>

        {/* Session Orders */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Session Orders</span>
            <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="stat-value">{stats.sessionOrderCount}</div>
          <div className="stat-subtext">Settled this session</div>
        </div>

        {/* Session Revenue */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Session Revenue</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>
            ₹{stats.sessionRevenue ? stats.sessionRevenue.toFixed(2) : '0.00'}
          </div>
          <div className="stat-subtext">Simulated settlement total</div>
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}
      >
        <div
          className="panel"
          style={{
            cursor: 'pointer',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(217, 119, 6, 0.02))',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            marginBottom: 0
          }}
          onClick={() => onNavigate('order')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                Place Order & Bill
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Select a table, add menu items, and process payment.
              </p>
            </div>
            <div className="icon-btn" style={{ background: 'var(--accent-amber)', color: '#111' }}>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>

        <div
          className="panel"
          style={{
            cursor: 'pointer',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(79, 70, 229, 0.02))',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            marginBottom: 0
          }}
          onClick={() => onNavigate('tables')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                Manage Dining Tables
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                View seating capacity, add or delete tables, or toggle occupancy.
              </p>
            </div>
            <div className="icon-btn" style={{ background: 'var(--accent-indigo)', color: '#fff' }}>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            <Receipt size={18} style={{ color: 'var(--accent-amber)' }} />
            <span>Recent Orders & Settlements (This Session)</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('history')}>
            View All ({recentOrders.length})
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <ShoppingBag size={24} />
            </div>
            <div className="empty-title">No orders placed yet</div>
            <div className="empty-desc">
              Orders placed and settled in this application session will appear here in real time.
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('order')}>
              Create First Order
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Receipt #</th>
                  <th>Table</th>
                  <th>Items Ordered</th>
                  <th>Total (₹)</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.orderId}>
                    <td style={{ fontWeight: 600, color: 'var(--accent-amber)' }}>{order.orderId}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>{order.receiptNumber}</td>
                    <td>
                      <span className="badge badge-warning">
                        Table {order.table ? order.table.id : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>
                        {order.items ? order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ') : 'N/A'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{order.total.toFixed(2)}</td>
                    <td>
                      <span className="badge badge-info">{order.paymentMethod}</span>
                    </td>
                    <td>
                      <span className="badge badge-free">{order.paymentStatus}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', gap: 4 }}
                        onClick={() => onViewReceipt(order)}
                        title="View itemized receipt"
                      >
                        <Eye size={14} />
                        <span>View Bill</span>
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
