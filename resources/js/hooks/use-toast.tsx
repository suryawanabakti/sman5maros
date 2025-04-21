'use client';

import { useCallback, useState } from 'react';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    title?: string;
    description?: string;
    type: ToastType;
    duration?: number;
}

interface ToastOptions {
    title?: string;
    description?: string;
    type?: ToastType;
    duration?: number;
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(({ title, description, type = 'default', duration = 5000 }: ToastOptions) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = {
            id,
            title,
            description,
            type,
            duration,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        if (duration !== Number.POSITIVE_INFINITY) {
            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const dismiss = useCallback((toastId?: string) => {
        setToasts((prevToasts) => (toastId ? prevToasts.filter((toast) => toast.id !== toastId) : []));
    }, []);

    return {
        toast,
        dismiss,
        toasts,
    };
}

export type { Toast, ToastType };
