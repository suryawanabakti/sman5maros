'use client';

import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, School } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const ekstrakurikulerCategories = [
        { name: 'Semua Ekstrakurikuler', href: '/ekstrakurikuler?kategori=semua' },
        { name: 'Olahraga', href: '/ekstrakurikuler?kategori=olahraga' },
        { name: 'Seni', href: '/ekstrakurikuler?kategori=seni' },
        { name: 'Akademik', href: '/ekstrakurikuler?kategori=akademik' },
        { name: 'Keagamaan', href: '/ekstrakurikuler?kategori=keagamaan' },
        { name: 'Sosial', href: '/ekstrakurikuler?kategori=sosial' },
    ];

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <School className="h-6 w-6" />
                    <span className="text-xl font-bold">SMK Nusantara</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="#beranda" className="hover:text-primary text-sm font-medium">
                        Beranda
                    </Link>
                    <Link href="#alumni" className="hover:text-primary text-sm font-medium">
                        Alumni
                    </Link>
                    <Link href="#beasiswa" className="hover:text-primary text-sm font-medium">
                        Beasiswa
                    </Link>
                    <Link href="#perguruan-tinggi" className="hover:text-primary text-sm font-medium">
                        Perguruan Tinggi
                    </Link>
                    <Link href="#lowongan" className="hover:text-primary text-sm font-medium">
                        Lowongan
                    </Link>

                    {/* Ekstrakurikuler Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:text-primary flex items-center gap-1 text-sm font-medium">
                            Ekstrakurikuler <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            {ekstrakurikulerCategories.map((category) => (
                                <DropdownMenuItem key={category.name} asChild>
                                    <Link href={category.href}>{category.name}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                        Masuk
                    </Button>
                    <Button size="sm" className="hidden md:flex">
                        Daftar
                    </Button>

                    {/* Mobile Menu Trigger */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="mt-8 flex flex-col gap-4">
                                <Link
                                    href="#beranda"
                                    className="hover:text-primary flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="#alumni"
                                    className="hover:text-primary flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Alumni
                                </Link>
                                <Link
                                    href="#beasiswa"
                                    className="hover:text-primary flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Beasiswa
                                </Link>
                                <Link
                                    href="#perguruan-tinggi"
                                    className="hover:text-primary flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Perguruan Tinggi
                                </Link>
                                <Link
                                    href="#lowongan"
                                    className="hover:text-primary flex items-center gap-2 text-sm font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Lowongan
                                </Link>

                                {/* Mobile Ekstrakurikuler Submenu */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-medium">Ekstrakurikuler</span>
                                    <div className="flex flex-col gap-2 pl-4">
                                        {ekstrakurikulerCategories.map((category) => (
                                            <Link
                                                key={category.name}
                                                href={category.href}
                                                className="text-muted-foreground hover:text-primary text-sm"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    <Button variant="outline" size="sm">
                                        Masuk
                                    </Button>
                                    <Button size="sm">Daftar</Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
