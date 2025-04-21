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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { Calendar, Download, Edit, Eye, Filter, MapPin, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface Lowongan {
    id: number;
    judul: string;
    nama_perusahaan: string;
    industri: string;
    alamat: string;
    tipe_pekerjaan: string;
    deadline: string;
    created_at: string;
    updated_at: string;
}

interface LowonganIndexProps {
    lowongan: {
        data: Lowongan[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search: string;
        tipe_pekerjaan: string;
        industri: string;
    };
    filterOptions: {
        tipe_pekerjaan: string[];
        industri: string[];
    };
    flash?: {
        message?: string;
    };
}

export default function LowonganIndex({ lowongan, filters, filterOptions, flash }: LowonganIndexProps) {
    const { toast } = useToast();
    const [selectedLowongan, setSelectedLowongan] = useState<Lowongan | null>(null);
    const {
        data,
        setData,
        get,
        delete: destroy,
        processing,
    } = useForm({
        search: filters.search || '',
        tipe_pekerjaan: filters.tipe_pekerjaan || 'all',
        industri: filters.industri || 'all',
    });

    useEffect(() => {
        if (flash?.message) {
            toast({
                title: 'Sukses',
                description: flash.message,
                type: 'success',
            });
        }
    }, [flash]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('admin.lowongan.index'), {
            preserveState: true,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setData(key, value);
        get(route('admin.lowongan.index'), {
            data: { ...data, [key]: value },
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (selectedLowongan) {
            destroy(route('admin.lowongan.destroy', selectedLowongan.id), {
                onSuccess: () => {
                    toast({
                        title: 'Sukses',
                        description: 'Data lowongan berhasil dihapus',
                        type: 'success',
                    });
                    setSelectedLowongan(null);
                },
            });
        }
    };

    const handleExport = () => {
        window.location.href = route('admin.lowongan.export', data);
    };

    const getTipePekerjaanBadge = (tipe: string) => {
        switch (tipe) {
            case 'Full Time':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{tipe}</Badge>;
            case 'Part Time':
                return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{tipe}</Badge>;
            case 'Remote':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{tipe}</Badge>;
            case 'Freelance':
                return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{tipe}</Badge>;
            default:
                return <Badge>{tipe}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Data Lowongan Pekerjaan</h1>
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                        <Link href={route('admin.lowongan.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Lowongan
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder="Cari lowongan..."
                            className="pl-10"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                        />
                    </form>

                    <div className="flex w-full gap-2 md:w-auto">
                        <Select value={data.tipe_pekerjaan} onValueChange={(value) => handleFilterChange('tipe_pekerjaan', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tipe Pekerjaan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Tipe</SelectItem>
                                {filterOptions.tipe_pekerjaan.map((tipe) => (
                                    <SelectItem key={tipe} value={tipe}>
                                        {tipe}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={data.industri} onValueChange={(value) => handleFilterChange('industri', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Industri" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Industri</SelectItem>
                                {filterOptions.industri.map((industri) => (
                                    <SelectItem key={industri} value={industri}>
                                        {industri}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button variant="outline" size="icon" onClick={() => handleFilterChange('search', '')}>
                            <Filter className="h-4 w-4" />
                        </Button>

                        <Button variant="outline" size="icon" onClick={handleExport}>
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Perusahaan</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="w-[100px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowongan.data.length > 0 ? (
                                lowongan.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.judul}</TableCell>
                                        <TableCell>{item.nama_perusahaan}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <MapPin className="text-primary mr-2 h-4 w-4" />
                                                {item.alamat}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getTipePekerjaanBadge(item.tipe_pekerjaan)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Calendar className="text-primary mr-2 h-4 w-4" />
                                                {item.deadline}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.lowongan.show', item.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Detail</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.lowongan.edit', item.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => setSelectedLowongan(item)}
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        <span>Hapus</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-muted-foreground py-6 text-center">
                                        Tidak ada data lowongan yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {lowongan.last_page > 1 && (
                    <Pagination>
                        <PaginationContent>
                            {lowongan.current_page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={lowongan.links[0].url || '#'} />
                                </PaginationItem>
                            )}

                            {lowongan.links.slice(1, -1).map((link, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink href={link.url || '#'} isActive={link.active}>
                                        {link.label.replace('&laquo; ', '').replace(' &raquo;', '')}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {lowongan.current_page < lowongan.last_page && (
                                <PaginationItem>
                                    <PaginationNext href={lowongan.links[lowongan.links.length - 1].url || '#'} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!selectedLowongan} onOpenChange={(open) => !open && setSelectedLowongan(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus data lowongan ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={processing}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
