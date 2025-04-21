'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { Ekstrakurikuler, PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EditIcon, EyeIcon, PlusIcon, SearchIcon, Trash2Icon, UserIcon } from 'lucide-react';
import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface EkstrakurikulerIndexProps extends PageProps {
    ekstrakurikuler: {
        data: (Ekstrakurikuler & { user?: User })[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search: string;
        kategori: string;
    };
}

export default function EkstrakurikulerIndex({ ekstrakurikuler, filters, flash }: EkstrakurikulerIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [kategori, setKategori] = useState(filters.kategori || '');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { toast } = useToast();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.ekstrakurikuler.index'), { search, kategori }, { preserveState: true });
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('admin.ekstrakurikuler.destroy', deleteId), {
                onSuccess: () => {
                    toast({
                        title: 'Ekstrakurikuler berhasil dihapus',
                        variant: 'success',
                    });
                    setDeleteId(null);
                },
            });
        }
    };

    React.useEffect(() => {
        if (flash && flash.message) {
            toast({
                title: flash.message,
                variant: 'success',
            });
        }
    }, [flash]);

    return (
        <AppLayout>
            <Head title="Daftar Ekstrakurikuler" />

            <div className="container py-8">
                <div className="mb-6">
                    <div className="mt-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">Daftar Ekstrakurikuler</h1>
                        <Link href={route('admin.ekstrakurikuler.create')}>
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah Ekstrakurikuler
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-card mb-6 rounded-lg border p-4 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                        <div className="flex flex-1 items-center space-x-2">
                            <SearchIcon className="text-muted-foreground h-5 w-5" />
                            <Input
                                placeholder="Cari ekstrakurikuler..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select value={kategori} onValueChange={(value) => setKategori(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    <SelectItem value="Olahraga">Olahraga</SelectItem>
                                    <SelectItem value="Seni">Seni</SelectItem>
                                    <SelectItem value="Akademik">Akademik</SelectItem>
                                    <SelectItem value="Keagamaan">Keagamaan</SelectItem>
                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit">Filter</Button>
                        </div>
                    </form>
                </div>

                <div className="bg-card rounded-lg border shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Nama</th>
                                    <th className="px-4 py-3 text-left font-medium">Ketua</th>
                                    <th className="px-4 py-3 text-left font-medium">Kategori</th>
                                    <th className="px-4 py-3 text-left font-medium">Akun Ketua</th>
                                    <th className="px-4 py-3 text-center font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ekstrakurikuler.data.length > 0 ? (
                                    ekstrakurikuler.data.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {item.foto && (
                                                        <img
                                                            src={`/storage/${item.foto}`}
                                                            alt={item.nama}
                                                            className="h-10 w-10 rounded-md object-cover"
                                                        />
                                                    )}
                                                    <span className="font-medium">{item.nama}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{item.ketua}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.user ? (
                                                    <div className="flex items-center gap-2">
                                                        <UserIcon className="text-primary h-4 w-4" />
                                                        <span>{item.user.name}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <Link href={route('admin.ekstrakurikuler.show', item.id)}>
                                                        <Button size="sm" variant="ghost">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.ekstrakurikuler.edit', item.id)}>
                                                        <Button size="sm" variant="ghost">
                                                            <EditIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="text-destructive"
                                                                onClick={() => setDeleteId(item.id)}
                                                            >
                                                                <Trash2Icon className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus ekstrakurikuler ini? Tindakan ini tidak dapat
                                                                    dibatalkan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel onClick={() => setDeleteId(null)}>Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={handleDelete}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-muted-foreground px-4 py-8 text-center">
                                            Tidak ada data ekstrakurikuler yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {ekstrakurikuler.last_page > 1 && (
                        <div className="border-t p-4">
                            <Pagination
                                currentPage={ekstrakurikuler.current_page}
                                lastPage={ekstrakurikuler.last_page}
                                total={ekstrakurikuler.total}
                                from={ekstrakurikuler.from}
                                to={ekstrakurikuler.to}
                                onPageChange={(page) =>
                                    router.get(route('admin.ekstrakurikuler.index', { page, search, kategori }), {}, { preserveState: true })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
