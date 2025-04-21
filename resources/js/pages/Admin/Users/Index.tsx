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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';

import { Head, Link, router } from '@inertiajs/react';
import { Edit, FileSpreadsheet, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UserType {
    id: number;
    nama_ayah: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: {
        data: UserType[];
        links: any[];
        from: number;
        to: number;
        total: number;
    };
    flash: {
        message?: string;
        error?: string;
    };
}

export default function Index({ users, flash }: Props) {
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { toast } = useToast();
    const handleDelete = () => {
        if (deleteUserId) {
            router.delete(route('admin.users.destroy', deleteUserId), {
                onSuccess: () => {
                    toast({
                        title: 'User berhasil dihapus',
                        description: 'Data user telah dihapus dari sistem',
                    });
                    setIsDeleteDialogOpen(false);
                },
            });
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteUserId(id);
        setIsDeleteDialogOpen(true);
    };

    useEffect(() => {
        // Safely check if flash exists and has message property
        if (flash?.message) {
            toast({
                title: 'Sukses',
                description: flash.message,
            });
        }

        if (flash?.error) {
            toast({
                title: 'Error',
                description: flash.error,
                variant: 'destructive',
            });
        }
    }, [flash]);

    return (
        <AppLayout>
            <Head title="Manajemen Siswa" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen siswa</h1>
                        <p className="text-muted-foreground mt-2">Kelola semua siswa yang terdaftar dalam sistem</p>
                    </div>
                    <Link href={route('admin.users.import')}>
                        <Button variant="outline">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Import User
                        </Button>
                    </Link>
                    <Link href={route('admin.users.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah User
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIK</TableHead>
                                <TableHead>Nama ayah</TableHead>
                                <TableHead>Tanggal Dibuat</TableHead>
                                <TableHead className="w-[100px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Tidak ada data user
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.nama_ayah}</TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Buka menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.users.edit', user.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => confirmDelete(user.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Menampilkan {users.from} - {users.to} dari {users.total} user
                    </p>
                    <div className="flex gap-2">
                        {users.links.map((link, i) => {
                            if (link.url === null) {
                                return (
                                    <Button key={i} variant="outline" disabled>
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </Button>
                                );
                            }
                            return (
                                <Link key={i} href={link.url}>
                                    <Button variant={link.active ? 'default' : 'outline'}>
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data user ini akan dihapus secara permanen dari server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-white">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
