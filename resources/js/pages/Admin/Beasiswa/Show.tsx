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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, FileText, Trash, Users } from 'lucide-react';

interface Beasiswa {
    id: number;
    nama: string;
    deskripsi: string;
    kuota: number;
    deadline: string;
    status: string;
    gambar: string | null;
    gambar_url: string;
    persyaratan: string[];
    created_at: string;
    updated_at: string;
}

interface BeasiswaShowProps {
    beasiswa: Beasiswa;
}

export default function BeasiswaShow({ beasiswa }: BeasiswaShowProps) {
    const { delete: destroy, processing } = useForm();
    const { url } = usePage().props;

    const handleDelete = () => {
        destroy(route('admin.beasiswa.destroy', beasiswa.id));
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
                    <h1 className="text-3xl font-bold tracking-tight">Detail Beasiswa</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={route('admin.beasiswa.edit', beasiswa.id)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </a>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash className="mr-2 h-4 w-4" /> Hapus
                                </Button>
                            </AlertDialogTrigger>
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
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Gambar Beasiswa</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <div className="relative aspect-video w-full max-w-[300px] overflow-hidden rounded-md border">
                                <img
                                    src={beasiswa.gambar_url || '/placeholder.svg?height=200&width=300'}
                                    alt={beasiswa.nama}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{beasiswa.nama}</CardTitle>
                                    <CardDescription>Detail informasi beasiswa</CardDescription>
                                </div>
                                {getStatusBadge(beasiswa.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Kuota</h3>
                                    <div className="mt-1 flex items-center">
                                        <Users className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base font-medium">{beasiswa.kuota} siswa</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Deadline</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base font-medium">{beasiswa.deadline}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-muted-foreground text-sm font-medium">Deskripsi</h3>
                                    <p className="mt-1 text-base">{beasiswa.deskripsi}</p>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="mb-4 flex items-center text-lg font-medium">
                                    <FileText className="text-primary mr-2 h-5 w-5" />
                                    Persyaratan
                                </h3>
                                <ul className="list-disc space-y-2 pl-6">
                                    {beasiswa.persyaratan.map((syarat, index) => (
                                        <li key={index} className="text-base">
                                            {syarat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
