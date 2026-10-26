import React, { useState } from 'react';
import { Search, IndianRupee, Utensils, Plus, Tag } from 'lucide-react';

export default function MenuViewSection({ menuItems, onStartOrderWithItem }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ID');

  const filteredItems = menuItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      item.id.toString().includes(searchTerm.trim())
    )
    .sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'NAME') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  return (
    <div>
      <div className="page-intro">
        <h2>Restaurant Menu Card</h2>
        <p>Verified menu offerings retrieved directly from the backend domain MenuCard.</p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
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
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: 'auto', padding: '9px 12px' }}
          >
            <option value="ID">Item # (Default)</option>
            <option value="PRICE_LOW">Price: Low to High</option>
            <option value="PRICE_HIGH">Price: High to Low</option>
            <option value="NAME">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <div className="empty-icon">
              <Utensils size={24} />
            </div>
            <div className="empty-title">No menu items found</div>
            <div className="empty-desc">No dishes match "{searchTerm}".</div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="panel"
              style={{
                marginBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div className="panel-body" style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: 'var(--accent-amber)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}
                  >
                    #{item.id}
                  </span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <Utensils size={18} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}
                >
                  {item.name}
                </h3>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Freshly prepared specialty dish from the restaurant kitchen.
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
                    <strong style={{ fontSize: '1.3rem', color: '#fff' }}>
                      ₹{item.price.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ gap: 4 }}
                    onClick={() => onStartOrderWithItem(item)}
                  >
                    <Plus size={15} />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
