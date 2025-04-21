import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { DaftarKegiatan } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon } from 'lucide-react';

interface DaftarKegiatanShowProps {
    kegiatan: DaftarKegiatan;
}

export default function DaftarKegiatanShow({ kegiatan }: DaftarKegiatanShowProps) {
    return (
        <AppLayout>
            <Head title={`Detail Kegiatan - ${kegiatan.judul}`} />

            <div className="container py-8">
                <div className="mb-6">
                    <div className="mt-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">{kegiatan.judul}</h1>
                        <div className="flex space-x-2">
                            <Link href={route('admin.kegiatan.index')}>
                                <Button variant="outline">
                                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>
                            <Link href={route('admin.kegiatan.edit', kegiatan.id)}>
                                <Button>
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="bg-card rounded-lg border p-4 shadow-sm">
                            {kegiatan.gambar ? (
                                <img
                                    src={`/storage/${kegiatan.gambar}`}
                                    alt={kegiatan.judul}
                                    className="mx-auto h-64 w-full rounded-md object-cover"
                                />
                            ) : (
                                <div className="bg-muted flex h-64 w-full items-center justify-center rounded-md">
                                    <p className="text-muted-foreground">Tidak ada gambar</p>
                                </div>
                            )}

                            <div className="mt-4 space-y-3">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Judul Kegiatan</h3>
                                    <p className="text-lg font-semibold">{kegiatan.judul}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Ekstrakurikuler</h3>
                                    <p>{kegiatan.ekstrakurikuler?.nama || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Tanggal Dibuat</h3>
                                    <p>
                                        {new Date(kegiatan.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 md:col-span-2">
                        <div className="bg-card rounded-lg border p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold">Deskripsi Kegiatan</h2>
                            <p className="text-muted-foreground whitespace-pre-line">{kegiatan.deskripsi}</p>
                        </div>

                        <div className="bg-card rounded-lg border p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold">Informasi Ekstrakurikuler</h2>

                            {kegiatan.ekstrakurikuler ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        {kegiatan.ekstrakurikuler.foto ? (
                                            <img
                                                src={`/storage/${kegiatan.ekstrakurikuler.foto}`}
                                                alt={kegiatan.ekstrakurikuler.nama}
                                                className="h-16 w-16 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-md">
                                                <p className="text-muted-foreground text-xs">No Image</p>
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium">{kegiatan.ekstrakurikuler.nama}</h3>
                                            <p className="text-muted-foreground text-sm">Ketua: {kegiatan.ekstrakurikuler.ketua}</p>
                                            <p className="text-sm">
                                                <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-0.5 text-xs font-medium">
                                                    {kegiatan.ekstrakurikuler.kategori}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <Link href={route('admin.ekstrakurikuler.show', kegiatan.ekstrakurikuler.id)}>
                                            <Button variant="outline" size="sm">
                                                Lihat Detail Ekstrakurikuler
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Informasi ekstrakurikuler tidak tersedia.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
