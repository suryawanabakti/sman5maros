import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import type React from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
