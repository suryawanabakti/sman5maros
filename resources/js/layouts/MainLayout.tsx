import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import type React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
    // Set document title
    if (typeof document !== 'undefined') {
        document.title = title ? `${title} - SMAN 5 Maros` : 'SMAN 5 Maros';
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
