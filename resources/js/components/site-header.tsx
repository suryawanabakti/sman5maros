'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SiteHeader() {
    const { auth } = usePage().props as any;
    const isAuthenticated = auth && auth.user;
    const isStudent = isAuthenticated && auth.user.role === 'siswa';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Sample categories for ekstrakurikuler dropdown
    const [ekstrakurikuler, setEkstrakurikuler] = useState([]);

    const getEkstrakurikuler = async () => {
        const res = await axios.get('/get-ekstrakurikuler');
        setEkstrakurikuler(res.data);
    };

    const ekstrakurikulerCategories = ekstrakurikuler;

    const navItems = [
        { name: 'Beranda', href: '/' },
        {
            name: 'Ekstrakurikuler',
            href: '/ekstrakurikuler?kategori=semua',
            dropdown: ekstrakurikulerCategories,
        },
        { name: 'Beasiswa', href: '/beasiswa' },
        { name: 'Lowongan', href: '/lowongan' },
        // { name: 'Alumni', href: '/alumni' },
    ];

    if (isAuthenticated) {
        navItems.push({ name: 'Kuesioner', href: '/kuesioner' });
    }
    useEffect(() => {
        getEkstrakurikuler();
    }, []);
    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="inline-block font-bold">SMAN 5 Maros</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:gap-6">
                    {navItems.map((item) =>
                        !item.dropdown ? (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-muted-foreground hover:text-foreground flex items-center text-sm font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <DropdownMenu key={item.name}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="text-muted-foreground hover:text-foreground flex h-auto items-center gap-1 p-0 text-sm font-medium transition-colors"
                                    >
                                        {item.name}
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {item.dropdown.map((subItem) => (
                                        <DropdownMenuItem key={subItem.nama} asChild>
                                            <Link href={`/ekstrakurikuler/${subItem.id}`}>{subItem.nama}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ),
                    )}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <ModeToggle />

                    {/* User menu (desktop) */}
                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-1">
                                        Hi, {auth.user.name}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {!isStudent && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Admin Dashboard</Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem asChild>
                                        <Link href="/logout" method="post" as="button" className="w-full text-left">
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b py-4">
                                    <span className="font-bold">Menu</span>
                                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </div>

                                {/* Mobile Navigation */}
                                <nav className="flex flex-col gap-1 py-4">
                                    {navItems.map((item) =>
                                        !item.dropdown ? (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="hover:bg-muted flex rounded-md px-3 py-2 text-sm font-medium"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <div key={item.name} className="flex flex-col">
                                                <div className="flex px-3 py-2 text-sm font-medium">{item.name}</div>
                                                <div className="ml-4 flex flex-col gap-1 border-l pl-2">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="hover:bg-muted flex rounded-md px-3 py-2 text-sm"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </nav>

                                {/* Mobile user actions */}
                                <div className="mt-auto border-t py-4">
                                    {isAuthenticated ? (
                                        <div className="flex flex-col gap-2 px-3">
                                            <div className="text-sm font-medium">Hi, {auth.user.name}</div>
                                            {!isStudent && (
                                                <Link
                                                    href="/dashboard"
                                                    className="hover:bg-muted flex rounded-md py-2 text-sm"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="hover:bg-muted flex rounded-md py-2 text-left text-sm"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="px-3">
                                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                <Button className="w-full">Login</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
