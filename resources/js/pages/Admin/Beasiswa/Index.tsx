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
import { Calendar, Download, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface Beasiswa {
    id: number;
    nama: string;
    deskripsi: string;
    kuota: number;
    deadline: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface BeasiswaIndexProps {
    beasiswa: {
        data: Beasiswa[];
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
        status: string;
    };
    filterOptions: {
        status: string[];
    };
    flash?: {
        message?: string;
    };
}

export default function BeasiswaIndex({ beasiswa, filters, filterOptions, flash }: BeasiswaIndexProps) {
    const { toast } = useToast();
    const [selectedBeasiswa, setSelectedBeasiswa] = useState<Beasiswa | null>(null);
    const {
        data,
        setData,
        get,
        delete: destroy,
        processing,
    } = useForm({
        search: filters.search || '',
        status: filters.status || 'all',
    });

    // Check for flash messages
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
        get(route('admin.beasiswa.index'), {
            preserveState: true,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setData(key, value);
        get(route('admin.beasiswa.index'), {
            data: { ...data, [key]: value },
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (selectedBeasiswa) {
            destroy(route('admin.beasiswa.destroy', selectedBeasiswa.id), {
                onSuccess: () => {
                    toast({
                        title: 'Sukses',
                        description: 'Data beasiswa berhasil dihapus',
                        type: 'success',
                    });
                    setSelectedBeasiswa(null);
                },
            });
        }
    };

    const handleExport = () => {
        window.location.href = route('admin.beasiswa.export', data);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Dibuka':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
            case 'Ditutup':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
            case 'Segera Dibuka':
                return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Data Beasiswa</h1>
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                        <Link href={route('admin.beasiswa.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Beasiswa
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder="Cari beasiswa..."
                            className="pl-10"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                        />
                    </form>

                    <div className="flex w-full gap-2 md:w-auto">
                        <Select value={data.status} onValueChange={(value) => handleFilterChange('status', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                {filterOptions.status.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
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
                                <TableHead>Nama Beasiswa</TableHead>
                                <TableHead>Kuota</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[100px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {beasiswa.data.length > 0 ? (
                                beasiswa.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.nama}</TableCell>
                                        <TableCell>{item.kuota} siswa</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Calendar className="text-primary mr-2 h-4 w-4" />
                                                {item.deadline}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.beasiswa.show', item.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Detail</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.beasiswa.edit', item.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => setSelectedBeasiswa(item)}
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
                                    <TableCell colSpan={5} className="text-muted-foreground py-6 text-center">
                                        Tidak ada data beasiswa yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {beasiswa.last_page > 1 && (
                    <Pagination>
                        <PaginationContent>
                            {beasiswa.current_page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={beasiswa.links[0].url || '#'} />
                                </PaginationItem>
                            )}

                            {beasiswa.links.slice(1, -1).map((link, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink href={link.url || '#'} isActive={link.active}>
                                        {link.label.replace('&laquo; ', '').replace(' &raquo;', '')}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {beasiswa.current_page < beasiswa.last_page && (
                                <PaginationItem>
                                    <PaginationNext href={beasiswa.links[beasiswa.links.length - 1].url || '#'} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!selectedBeasiswa} onOpenChange={(open) => !open && setSelectedBeasiswa(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus data beasiswa ini? Tindakan ini tidak dapat dibatalkan.
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
