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
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Building, Calendar, Edit, Globe, Mail, MapPin, Phone, Trash } from 'lucide-react';

interface Lowongan {
    id: number;
    judul: string;
    nama_perusahaan: string;
    industri: string;
    alamat: string;
    telepon: string;
    email: string | null;
    website: string | null;
    deskripsi: string;
    tipe_pekerjaan: string;
    deadline: string;
    gaji: string | null;
    tanggal_posting: string;
    created_at: string;
    updated_at: string;
}

interface LowonganShowProps {
    lowongan: Lowongan;
}

export default function LowonganShow({ lowongan }: LowonganShowProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('admin.lowongan.destroy', lowongan.id));
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
                    <h1 className="text-3xl font-bold tracking-tight">Detail Lowongan Pekerjaan</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={route('admin.lowongan.edit', lowongan.id)}>
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
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Informasi Perusahaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Nama Perusahaan</h3>
                                <div className="mt-1 flex items-center">
                                    <Building className="text-primary mr-2 h-4 w-4" />
                                    <p className="text-base font-medium">{lowongan.nama_perusahaan}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Industri</h3>
                                <p className="mt-1 text-base">{lowongan.industri}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Lokasi</h3>
                                <div className="mt-1 flex items-center">
                                    <MapPin className="text-primary mr-2 h-4 w-4" />
                                    <p className="text-base">{lowongan.alamat}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Telepon</h3>
                                <div className="mt-1 flex items-center">
                                    <Phone className="text-primary mr-2 h-4 w-4" />
                                    <p className="text-base">{lowongan.telepon}</p>
                                </div>
                            </div>
                            {lowongan.email && (
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Email</h3>
                                    <div className="mt-1 flex items-center">
                                        <Mail className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base">{lowongan.email}</p>
                                    </div>
                                </div>
                            )}
                            {lowongan.website && (
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Website</h3>
                                    <div className="mt-1 flex items-center">
                                        <Globe className="text-primary mr-2 h-4 w-4" />
                                        <a
                                            href={lowongan.website.startsWith('http') ? lowongan.website : `https://${lowongan.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-base hover:underline"
                                        >
                                            {lowongan.website}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{lowongan.judul}</CardTitle>
                                    <CardDescription>Detail informasi lowongan pekerjaan</CardDescription>
                                </div>
                                {getTipePekerjaanBadge(lowongan.tipe_pekerjaan)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Tanggal Posting</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base">{lowongan.tanggal_posting}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Deadline</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base">{lowongan.deadline}</p>
                                    </div>
                                </div>
                                {lowongan.gaji && (
                                    <div>
                                        <h3 className="text-muted-foreground text-sm font-medium">Gaji</h3>
                                        <div className="mt-1 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary mr-2"
                                            >
                                                <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                                                <line x1="2" x2="22" y1="20" y2="20" />
                                            </svg>
                                            <p className="text-base">{lowongan.gaji}</p>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Tipe Pekerjaan</h3>
                                    <div className="mt-1 flex items-center">
                                        <Briefcase className="text-primary mr-2 h-4 w-4" />
                                        <p className="text-base">{lowongan.tipe_pekerjaan}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="mb-4 text-lg font-medium">Deskripsi Pekerjaan</h3>
                                <div className="prose max-w-none">
                                    <p className="whitespace-pre-line">{lowongan.deskripsi}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
