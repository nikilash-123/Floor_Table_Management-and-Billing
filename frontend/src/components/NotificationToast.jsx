import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ notifications, onDismiss }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {notifications.map((n) => {
        const isSuccess = n.type === 'success';
        const isError = n.type === 'error';
        const toastClass = isSuccess ? 'toast-success' : isError ? 'toast-error' : 'toast-info';

        return (
          <div key={n.id} className={`toast ${toastClass}`} role="alert">
            {isSuccess && <CheckCircle2 size={20} className="text-emerald-400" />}
            {isError && <AlertCircle size={20} className="text-rose-400" />}
            {!isSuccess && !isError && <Info size={20} className="text-indigo-400" />}

            <div style={{ flex: 1, minWidth: 0 }}>
              {n.title && <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{n.title}</div>}
              <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>{n.message}</div>
            </div>

            <button
              onClick={() => onDismiss(n.id)}
              className="icon-btn"
              style={{ width: 24, height: 24, background: 'transparent', border: 'none' }}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
