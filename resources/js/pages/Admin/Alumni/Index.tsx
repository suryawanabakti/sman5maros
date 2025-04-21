'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';

import { Head, Link, router } from '@inertiajs/react';
import { Download, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

// Import xlsx at the top of the file
import * as XLSX from 'xlsx';

interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    kuesioner: {
        angkatan: string;
        kelas: string;
        kegiatan_setelah_lulus: string;
    };
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

    const handleExportExcel = () => {
        // Show toast notification
        toast({
            title: 'Mengunduh Excel',
            description: 'File Excel sedang diproses',
        });

        try {
            // Prepare data for Excel export
            const excelData = users.data.map((user) => ({
                Nama: user.name,
                Email: user.email,
                Angkatan: user.kuesioner.angkatan,
                Kelas: user.kuesioner.kelas,
                'Status Setelah Lulus': user.kuesioner.kegiatan_setelah_lulus,
            }));

            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(excelData);

            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Alumni');

            // Generate Excel file and trigger download
            XLSX.writeFile(workbook, 'data-alumni.xlsx');

            toast({
                title: 'Sukses',
                description: 'File Excel berhasil diunduh',
            });
        } catch (error) {
            console.error('Error exporting Excel:', error);
            toast({
                title: 'Error',
                description: 'Gagal mengunduh file Excel',
                variant: 'destructive',
            });
        }
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
            <Head title="Alumni" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Alumni</h1>
                        <p className="text-muted-foreground mt-2">Siswa yang telah mengisi kuesioner alumni</p>
                    </div>
                    <Button onClick={handleExportExcel} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export Excel
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Angkatan</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Status</TableHead>
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
                                        <TableCell className="font-medium">
                                            {user.name} <br />
                                            {user.email}
                                        </TableCell>

                                        <TableCell>{user.kuesioner.angkatan}</TableCell>
                                        <TableCell>{user.kuesioner.kelas}</TableCell>
                                        <TableCell>{user.kuesioner.kegiatan_setelah_lulus}</TableCell>
                                        <TableCell>
                                            <Link href={route('admin.alumni.show', user.id)} className="flex">
                                                <Eye className="mr-2 h-4 w-4" />
                                            </Link>
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
        </AppLayout>
    );
}
