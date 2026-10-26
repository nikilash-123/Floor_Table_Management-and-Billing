import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';

export default function OrderManagementSection({
  tables,
  menuItems,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  onProcessOrder,
  isProcessing
}) {
  const [selectedTableId, setSelectedTableId] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate Running Total
  const runningTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const paymentOptions = [
    { id: 'Cash', label: 'Cash', icon: Banknote, desc: 'Simulated counter cash settlement' },
    { id: 'Card', label: 'Card', icon: CreditCard, desc: 'Simulated POS debit/credit card swipe' },
    { id: 'UPI', label: 'UPI', icon: Smartphone, desc: 'Simulated QR / VPA instant transfer' },
  ];

  // Submit Order & Pay
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedTableId) {
      setErrorMessage('Please select a dining table for this order.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Cart is empty. Please add at least one menu item before ordering.');
      return;
    }

    const payload = {
      tableId: parseInt(selectedTableId, 10),
      items: cartItems.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity
      })),
      paymentMethod: selectedPaymentMethod
    };

    try {
      await onProcessOrder(payload);
    } catch (err) {
      setErrorMessage(err.message || 'Payment processing failed. Please check table status or inputs.');
    }
  };

  return (
    <div>
      <div className="page-intro">
        <h2>Order & Billing Terminal</h2>
        <p>Compose customer orders, select dining tables, review subtotals, and execute payments.</p>
      </div>

      {errorMessage && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <ShieldAlert size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 1fr)',
          gap: '28px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Table Selection + Menu Picker */}
        <div>
          {/* Step 1: Select Table */}
          <div className="panel" style={{ marginBottom: '24px' }}>
            <div className="panel-header">
              <div className="panel-title">
                <UtensilsCrossed size={18} style={{ color: 'var(--accent-amber)' }} />
                <span>1. Select Dining Table</span>
              </div>
              {selectedTableId && (
                <span className="badge badge-warning">
                  Selected: Table {selectedTableId}
                </span>
              )}
            </div>
            <div className="panel-body">
              {tables.length === 0 ? (
                <div style={{ color: 'var(--accent-rose)', fontSize: '0.9rem' }}>
                  No dining tables found. Please configure a table in Table Management before ordering.
                </div>
              ) : (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="order-table-select">Dining Table</label>
                  <select
                    id="order-table-select"
                    className="form-control"
                    value={selectedTableId}
                    onChange={(e) => {
                      setSelectedTableId(e.target.value);
                      setErrorMessage('');
                    }}
                  >
                    <option value="">-- Choose an existing table --</option>
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        Table #{t.id} (Capacity: {t.capacity} seats | Status: {t.occupied ? 'Occupied' : 'Free'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Choose from Menu Card */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <span>2. Select Dishes from Verified Menu</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {menuItems.length} items available
              </span>
            </div>
            <div className="panel-body" style={{ padding: '16px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '12px'
                }}
              >
                {menuItems.map((item) => {
                  const inCart = cartItems.find((c) => c.id === item.id);
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: inCart
                          ? '1px solid rgba(245, 158, 11, 0.4)'
                          : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '10px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{item.id}</span>
                          {inCart && (
                            <span
                              style={{
                                fontSize: '0.7rem',
                                background: 'var(--accent-amber)',
                                color: '#000',
                                padding: '1px 6px',
                                borderRadius: 4,
                                fontWeight: 700
                              }}
                            >
                              x{inCart.quantity}
                            </span>
                          )}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: 4 }}>{item.name}</div>
                        <div style={{ color: 'var(--accent-amber)', fontWeight: 700, marginTop: 2 }}>
                          ₹{item.price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', gap: 4 }}
                        onClick={() => onAddToCart(item)}
                      >
                        <Plus size={14} />
                        <span>Add Item</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Cart & Payment Settlement */}
        <div>
          <div className="panel" style={{ position: 'sticky', top: '92px' }}>
            <div className="panel-header">
              <div className="panel-title">
                <ShoppingCart size={18} style={{ color: 'var(--accent-amber)' }} />
                <span>3. Order Cart & Settlement</span>
              </div>
              {cartItems.length > 0 && (
                <button
                  className="btn btn-sm"
                  style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', padding: 0 }}
                  onClick={onClearCart}
                  title="Clear Cart"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="panel-body">
              {cartItems.length === 0 ? (
                <div className="empty-state" style={{ padding: '32px 16px' }}>
                  <div className="empty-icon" style={{ width: 44, height: 44 }}>
                    <ShoppingCart size={20} />
                  </div>
                  <div className="empty-title" style={{ fontSize: '1rem' }}>Order Cart is Empty</div>
                  <div className="empty-desc" style={{ fontSize: '0.8rem' }}>
                    Select a table and click "Add Item" on dishes to assemble an order.
                  </div>
                </div>
              ) : (
                <div>
                  {/* Cart Items List */}
                  <div
                    style={{
                      maxHeight: '260px',
                      overflowY: 'auto',
                      marginBottom: '16px',
                      paddingRight: '4px'
                    }}
                  >
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 0',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          gap: '10px'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                            ₹{item.price.toFixed(2)} each
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            className="icon-btn"
                            style={{ width: 26, height: 26, borderRadius: 4 }}
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center', fontSize: '0.875rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            className="icon-btn"
                            style={{ width: 26, height: 26, borderRadius: 4 }}
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div style={{ textAlign: 'right', minWidth: '70px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          className="icon-btn"
                          style={{ width: 26, height: 26, background: 'transparent', border: 'none', color: '#fb7185' }}
                          onClick={() => onRemoveFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal & Total Display */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '20px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>Items Count:</span>
                      <span>{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--accent-amber)',
                        marginTop: 8,
                        paddingTop: 8,
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <span>Running Total:</span>
                      <span>₹{runningTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Step 4: Choose Payment Method */}
                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                      Select Payment Method
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {paymentOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedPaymentMethod === opt.id;
                        return (
                          <div
                            key={opt.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 14px',
                              borderRadius: 'var(--radius-md)',
                              border: isSelected
                                ? '1px solid var(--accent-amber)'
                                : '1px solid var(--border-subtle)',
                              background: isSelected
                                ? 'rgba(245, 158, 11, 0.1)'
                                : 'rgba(255, 255, 255, 0.02)',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onClick={() => setSelectedPaymentMethod(opt.id)}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Icon size={18} style={{ color: isSelected ? 'var(--accent-amber)' : 'var(--text-muted)' }} />
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                                  {opt.label}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {opt.desc}
                                </div>
                              </div>
                            </div>
                            {isSelected && <CheckCircle2 size={16} style={{ color: 'var(--accent-amber)' }} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Simulated Payment Notice */}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '16px',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    Note: Transactions are processed via application-level simulation using existing backend domain classes.
                  </div>

                  {/* Submit Order & Pay Button */}
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', gap: 8 }}
                    onClick={handleSubmit}
                    disabled={isProcessing || !selectedTableId || cartItems.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner" style={{ width: 18, height: 18 }}></span>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Settle ₹{runningTotal.toFixed(2)}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
