import { useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { C } from '../types';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let counter = 0;

const TYPE_STYLES: Record<ToastType, { bg: string; border: string; color: string; icon: React.ReactNode }> = {
  success: { bg: '#F0FDF4', border: '#86EFAC', color: '#166534', icon: <CheckCircle size={18} color="#16a34a" /> },
  warning: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400e', icon: <AlertTriangle size={18} color="#d97706" /> },
  error:   { bg: '#FEF2F2', border: '#FCA5A5', color: '#991b1b', icon: <AlertTriangle size={18} color="#dc2626" /> },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', color: '#1e40af', icon: <Info size={18} color="#2563eb" /> },
};

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  const s = TYPE_STYLES[item.type];
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), 4000);
    return () => clearTimeout(t);
  }, [item.id, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10,
        padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        maxWidth: 380, width: '100%', animation: 'slideIn 0.2s ease',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <span style={{ fontSize: 13, color: s.color, flex: 1, lineHeight: 1.5 }}>{item.message}</span>
      <button
        aria-label="Cerrar notificación"
        onClick={() => onDismiss(item.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: s.color, padding: 2, flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, dismiss }: { toasts: ToastItem[]; dismiss: (id: number) => void }) {
  if (toasts.length === 0) return null;
  return (
    <>
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => <ToastItem key={t.id} item={t} onDismiss={dismiss} />)}
      </div>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toast, toasts, dismiss };
}
