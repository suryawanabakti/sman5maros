import { Toast, ToastDescription, ToastProvider, ToastTitle } from '@/components/ui/toast';
import { useToast, type Toast as ToastType } from '@/hooks/use-toast';

export function ToastContainer() {
    const { toasts, dismiss } = useToast();

    return (
        <ToastProvider>
            {toasts.map((toast: ToastType) => (
                <Toast key={toast.id} variant={toast.type === 'default' ? 'default' : toast.type} onClose={() => dismiss(toast.id)}>
                    {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                    {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
                </Toast>
            ))}
        </ToastProvider>
    );
}
