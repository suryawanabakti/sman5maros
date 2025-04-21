'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return <div className="fixed top-0 right-0 z-[100] flex w-full max-w-[420px] flex-col gap-2 p-4">{children}</div>;
};

const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
    {
        variants: {
            variant: {
                default: 'border bg-background text-foreground',
                success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50',
                error: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-50',
                warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50',
                info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
    onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, variant, onClose, ...props }, ref) => {
    return (
        <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
            <div className="flex-1">{props.children}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-foreground/50 hover:text-foreground absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:outline-none"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            )}
        </div>
    );
});
Toast.displayName = 'Toast';

const ToastTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastDescription, ToastProvider, ToastTitle };
