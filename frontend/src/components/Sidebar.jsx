import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  BookOpen,
  Receipt,
  History,
  Layers,
  ChefHat
} from 'lucide-react';

export default function Sidebar({ activeSection, onSelectSection, isBackendOnline, tableCount }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tables', label: 'Table Management', icon: UtensilsCrossed, badge: tableCount },
    { id: 'menu', label: 'Menu View', icon: BookOpen },
    { id: 'order', label: 'Order & Pay', icon: Receipt },
    { id: 'history', label: 'Billing History', icon: History },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon-wrapper">
          <ChefHat size={24} />
        </div>
        <div className="brand-title">
          <span>TableFlow</span>
          <span className="brand-subtitle">Restaurant Pro</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSection(item.id)}
            >
              <Icon size={19} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '2px 7px',
                    borderRadius: 9999,
                    color: isActive ? 'var(--accent-amber)' : 'var(--text-muted)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="status-badge-inline">
          <span className={`pulse-dot ${isBackendOnline ? '' : 'error'}`}></span>
          <span style={{ color: isBackendOnline ? 'var(--text-secondary)' : 'var(--accent-rose)' }}>
            {isBackendOnline ? 'API Connected' : 'Offline / Error'}
          </span>
        </div>
        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>v1.0.0</span>
      </div>
    </aside>
  );
}
