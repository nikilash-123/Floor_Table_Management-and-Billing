import React from 'react';
import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

export default function BillReceiptModal({ bill, onClose }) {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={20} style={{ color: 'var(--accent-emerald)' }} />
            <span>Bill & Payment Receipt</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Printable Receipt Container */}
          <div
            className="printable-bill"
            style={{
              background: '#0e1422',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                TABLEFLOW RESTAURANT
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Itemized Customer Invoice & Settlement Slip
              </div>
            </div>

            {/* Metadata Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '0.85rem',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px dashed var(--border-subtle)'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Receipt #: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{bill.receiptNumber}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{bill.orderId}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Date & Time: </span>
                <span style={{ color: 'var(--text-primary)' }}>{bill.timestamp}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--text-muted)' }}>Table: </span>
                <strong style={{ color: 'var(--accent-amber)' }}>
                  Table {bill.table ? bill.table.id : 'N/A'} (Capacity {bill.table ? bill.table.capacity : 'N/A'})
                </strong>
              </div>
            </div>

            {/* Itemized Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', marginBottom: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Item</th>
                  <th style={{ padding: '8px 4px', textAlign: 'center', color: 'var(--text-muted)' }}>Qty</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right', color: 'var(--text-muted)' }}>Unit (₹)</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right', color: 'var(--text-muted)' }}>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {bill.items &&
                  bill.items.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px 4px', fontWeight: 500 }}>{item.name}</td>
                      <td style={{ padding: '10px 4px', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '10px 4px', textAlign: 'right' }}>{item.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 600 }}>{item.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Totals & Settlement */}
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <span>₹{bill.subtotal ? bill.subtotal.toFixed(2) : '0.00'}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--accent-amber)',
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <span>Grand Total:</span>
                <span>₹{bill.total ? bill.total.toFixed(2) : '0.00'}</span>
              </div>
            </div>

            {/* Payment Status Box */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#34d399' }}>
                  Payment Method: {bill.paymentMethod}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <ShieldCheck size={14} />
                  <span>Status: <strong>{bill.paymentStatus}</strong> (Simulated Settlement)</span>
                </div>
              </div>
              <span className="badge badge-free">PAID</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Thank you for dining with us! Please retain this slip for your records.
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint} style={{ gap: 6 }}>
            <Printer size={16} />
            <span>Print Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
}
