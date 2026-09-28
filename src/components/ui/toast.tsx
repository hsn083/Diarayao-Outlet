'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message, duration) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, type, message, duration }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

interface ToastProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />
  };

  const bgColors = {
    success: 'border-green-500/30 bg-black/90',
    error: 'border-red-500/30 bg-black/90',
    info: 'border-blue-500/30 bg-black/90'
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${bgColors[toast.type]} shadow-lg animate-in slide-in-from-right-full`}>
      {icons[toast.type]}
      <p className="text-sm text-white flex-1">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const { addToast } = useToastStore();

  const success = (message: string, duration?: number) => addToast('success', message, duration);
  const error = (message: string, duration?: number) => addToast('error', message, duration);
  const info = (message: string, duration?: number) => addToast('info', message, duration);

  return { success, error, info };
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
