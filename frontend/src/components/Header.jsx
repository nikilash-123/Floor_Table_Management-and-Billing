import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, PlusCircle } from 'lucide-react';

export default function Header({
  activeSectionTitle,
  onRefresh,
  isLoading,
  onOpenAddTable,
  onOpenNewOrder
}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="top-header">
      <div className="header-title-block">
        <h1>{activeSectionTitle}</h1>
      </div>

      <div className="header-actions">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <Clock size={15} style={{ color: 'var(--accent-amber)' }} />
          <span>{time}</span>
        </div>

        <button
          onClick={onRefresh}
          className="icon-btn"
          title="Refresh Data from Server"
          disabled={isLoading}
        >
          <RefreshCw size={17} className={isLoading ? 'spinner' : ''} />
        </button>

        <button
          onClick={onOpenNewOrder}
          className="btn btn-primary btn-sm"
          style={{ gap: 6 }}
        >
          <PlusCircle size={15} />
          <span>New Order</span>
        </button>
      </div>
    </header>
  );
}
