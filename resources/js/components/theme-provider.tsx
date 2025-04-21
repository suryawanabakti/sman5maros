'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children, defaultTheme = 'light', ...props }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemesProvider defaultTheme={defaultTheme} {...props}>
            {children}
        </NextThemesProvider>
    );
}
