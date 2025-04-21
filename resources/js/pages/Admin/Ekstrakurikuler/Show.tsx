import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Ekstrakurikuler } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, PlusIcon } from 'lucide-react';

interface EkstrakurikulerShowProps {
    ekstrakurikuler: Ekstrakurikuler;
}

export default function EkstrakurikulerShow({ ekstrakurikuler }: EkstrakurikulerShowProps) {
    const { auth } = usePage().props as any;

    const user = auth?.user;

    return (
        <AppLayout>
            <Head title={`Detail Ekstrakurikuler - ${ekstrakurikuler.nama}`} />

            <div className="container py-8">
                <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={route('dashboard')}>Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={route('admin.ekstrakurikuler.index')}>Ekstrakurikuler</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Detail Ekstrakurikuler</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="mt-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold tracking-tight">{ekstrakurikuler.nama}</h1>
                        {user.email === 'admin@gmail.com' && (
                            <div className="flex space-x-2">
                                <Link href={route('admin.ekstrakurikuler.index')}>
                                    <Button variant="outline">
                                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                        Kembali
                                    </Button>
                                </Link>
                                <Link href={route('admin.ekstrakurikuler.edit', ekstrakurikuler.id)}>
                                    <Button>
                                        <EditIcon className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="bg-card rounded-lg border p-4 shadow-sm">
                            {ekstrakurikuler.foto ? (
                                <img
                                    src={`/storage/${ekstrakurikuler.foto}`}
                                    alt={ekstrakurikuler.nama}
                                    className="mx-auto h-64 w-full rounded-md object-cover"
                                />
                            ) : (
                                <div className="bg-muted flex h-64 w-full items-center justify-center rounded-md">
                                    <p className="text-muted-foreground">Tidak ada foto</p>
                                </div>
                            )}

                            <div className="mt-4 space-y-3">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Nama Ekstrakurikuler</h3>
                                    <p className="text-lg font-semibold">{ekstrakurikuler.nama}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Ketua</h3>
                                    <p>{ekstrakurikuler.ketua || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Kategori</h3>
                                    <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-1 text-xs font-medium">
                                        {ekstrakurikuler.kategori}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 md:col-span-2">
                        <div className="bg-card rounded-lg border p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold">Informasi Ekstrakurikuler</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-base font-medium">Visi</h3>
                                    <p className="text-muted-foreground mt-1 whitespace-pre-line">{ekstrakurikuler.visi || '-'}</p>
                                </div>

                                <div>
                                    <h3 className="text-base font-medium">Misi</h3>
                                    <p className="text-muted-foreground mt-1 whitespace-pre-line">{ekstrakurikuler.misi || '-'}</p>
                                </div>

                                <div>
                                    <h3 className="text-base font-medium">Tujuan</h3>
                                    <p className="text-muted-foreground mt-1 whitespace-pre-line">{ekstrakurikuler.tujuan || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg border p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Daftar Kegiatan</h2>
                                <Link href={route('admin.kegiatan.create', { ekstrakurikuler_id: ekstrakurikuler.id })}>
                                    <Button size="sm">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Kegiatan
                                    </Button>
                                </Link>
                            </div>

                            {ekstrakurikuler.kegiatan && ekstrakurikuler.kegiatan.length > 0 ? (
                                <div className="space-y-4">
                                    {ekstrakurikuler.kegiatan.map((kegiatan) => (
                                        <div key={kegiatan.id} className="flex items-start space-x-4 rounded-lg border p-4">
                                            {kegiatan.gambar ? (
                                                <img
                                                    src={`/storage/${kegiatan.gambar}`}
                                                    alt={kegiatan.judul}
                                                    className="h-20 w-20 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-md">
                                                    <p className="text-muted-foreground text-xs">No Image</p>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h3 className="font-medium">{kegiatan.judul}</h3>
                                                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{kegiatan.deskripsi}</p>
                                                <div className="mt-2">
                                                    <Link href={route('admin.kegiatan.show', kegiatan.id)}>
                                                        <Button variant="link" className="h-auto p-0 text-sm">
                                                            Lihat Detail
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Belum ada kegiatan yang ditambahkan.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
