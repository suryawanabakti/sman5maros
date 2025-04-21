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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { DaftarKegiatan } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EditIcon, EyeIcon, SearchIcon, TrashIcon } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface DaftarKegiatanIndexProps {
    kegiatan: {
        data: DaftarKegiatan[];
        links: any[];
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search: string;
        ekstrakurikuler_id: string;
    };
    ekstrakurikulerList: {
        id: number;
        nama: string;
    }[];
}

export default function DaftarKegiatanIndex({ kegiatan, filters, ekstrakurikulerList }: DaftarKegiatanIndexProps) {
    const { toast } = useToast();
    const [search, setSearch] = useState(filters.search);
    const [ekstrakurikulerId, setEkstrakurikulerId] = useState(filters.ekstrakurikuler_id);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [kegiatanToDelete, setKegiatanToDelete] = useState<DaftarKegiatan | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        router.get(
            route('admin.kegiatan.index'),
            {
                search,
                ekstrakurikuler_id: ekstrakurikulerId,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (kegiatan: DaftarKegiatan) => {
        setKegiatanToDelete(kegiatan);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (kegiatanToDelete) {
            router.delete(route('admin.kegiatan.destroy', kegiatanToDelete.id), {
                onSuccess: () => {
                    toast({
                        title: 'Kegiatan berhasil dihapus',
                        variant: 'success',
                    });
                    setDeleteDialogOpen(false);
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Daftar Kegiatan" />

            <div className="container py-8">
                <div className="bg-card rounded-lg border shadow-sm">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <SearchIcon className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Cari kegiatan..."
                                        className="pl-8"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-64">
                                <Select
                                    value={ekstrakurikulerId}
                                    onValueChange={(value) => {
                                        setEkstrakurikulerId(value);
                                        setTimeout(() => applyFilters(), 100);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter Ekstrakurikuler" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Ekstrakurikuler</SelectItem>
                                        {ekstrakurikulerList.map((ekskul) => (
                                            <SelectItem key={ekskul.id} value={ekskul.id.toString()}>
                                                {ekskul.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="md:w-auto">
                                Filter
                            </Button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50 border-b text-left text-sm font-medium">
                                    <th className="px-4 py-3">Judul</th>
                                    <th className="px-4 py-3">Ekstrakurikuler</th>
                                    <th className="px-4 py-3">Gambar</th>
                                    <th className="px-4 py-3">Tanggal Dibuat</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kegiatan.data.length > 0 ? (
                                    kegiatan.data.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium">{item.judul}</p>
                                                    <p className="text-muted-foreground line-clamp-1 text-sm">{item.deskripsi}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{item.ekstrakurikuler?.nama || '-'}</td>
                                            <td className="px-4 py-3">
                                                {item.gambar ? (
                                                    <img
                                                        src={`/storage/${item.gambar}`}
                                                        alt={item.judul}
                                                        className="h-10 w-10 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                                                        <p className="text-muted-foreground text-xs">No Image</p>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={route('admin.kegiatan.show', item.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.kegiatan.edit', item.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <EditIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" size="sm" onClick={() => handleDelete(item)}>
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center">
                                            <p className="text-muted-foreground">Tidak ada data kegiatan</p>
                                            <Link href={route('admin.kegiatan.create')}>
                                                <Button variant="link" className="mt-2">
                                                    Tambah Kegiatan Baru
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {kegiatan.data.length > 0 && (
                        <div className="p-4">
                            <Pagination from={kegiatan.from} to={kegiatan.to} total={kegiatan.total} links={kegiatan.links} />
                        </div>
                    )}
                </div>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus kegiatan "{kegiatanToDelete?.judul}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
