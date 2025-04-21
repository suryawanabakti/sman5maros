'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

interface Kuesioner {
    id: number;
    angkatan: string;
    user_id: number;
    kelas: string;
    kegiatan_setelah_lulus: 'menikah' | 'kuliah' | 'kerja' | 'dll';
    jalur_masuk?: 'SNMPTN' | 'SBMPTN' | 'MANDIRI';
    tipe_kampus?: 'ptn' | 'pts';
    nama_kampus?: string;
    fakultas?: string;
    prodi?: string;
    nama_perusahaan?: string;
    nama_kesatuan?: string;
    alamat?: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    nisn?: string;
    angkatan?: string;
    kuesioner?: Kuesioner;
}

interface AlumniShowProps {
    user: User;
}

export default function AlumniShow({ user }: AlumniShowProps) {
    const kuesioner = user.kuesioner;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Alumni', href: '/admin/alumni' },
                { title: user.name, href: `/alumni/${user.id}` },
            ]}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Alumni</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Nama</h3>
                                <p className="text-base">{user.name}</p>
                            </div>

                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">NIK</h3>
                                <p className="text-base">{user.email}</p>
                            </div>

                            {user.nisn && (
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">NISN</h3>
                                    <p className="text-base">{user.nisn}</p>
                                </div>
                            )}
                            {user.angkatan && (
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Angkatan</h3>
                                    <p className="text-base">{user.angkatan}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {kuesioner && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Kuesioner</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Angkatan</h3>
                                    <p className="text-base">{kuesioner.angkatan}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Kelas</h3>
                                    <p className="text-base">{kuesioner.kelas}</p>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Kegiatan Setelah Lulus</h3>
                                    <p className="text-base capitalize">{kuesioner.kegiatan_setelah_lulus}</p>
                                </div>
                            </div>

                            {kuesioner.kegiatan_setelah_lulus === 'kuliah' && (
                                <>
                                    <Separator className="my-4" />
                                    <h3 className="mb-3 text-lg font-semibold">Informasi Kuliah</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Jalur Masuk</h3>
                                            <p className="text-base">{kuesioner.jalur_masuk}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Tipe Kampus</h3>
                                            <p className="text-base uppercase">{kuesioner.tipe_kampus}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Nama Kampus</h3>
                                            <p className="text-base">{kuesioner.nama_kampus}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Fakultas</h3>
                                            <p className="text-base">{kuesioner.fakultas}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Program Studi</h3>
                                            <p className="text-base">{kuesioner.prodi}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {kuesioner.kegiatan_setelah_lulus === 'kerja' && (
                                <>
                                    <Separator className="my-4" />
                                    <h3 className="mb-3 text-lg font-semibold">Informasi Pekerjaan</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Nama Perusahaan</h3>
                                            <p className="text-base">{kuesioner.nama_perusahaan}</p>
                                        </div>
                                        {kuesioner.nama_kesatuan && (
                                            <div>
                                                <h3 className="text-muted-foreground text-sm font-medium">Nama Kesatuan</h3>
                                                <p className="text-base">{kuesioner.nama_kesatuan}</p>
                                            </div>
                                        )}
                                        <div className="col-span-1 md:col-span-2">
                                            <h3 className="text-muted-foreground text-sm font-medium">Alamat</h3>
                                            <p className="text-base">{kuesioner.alamat}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
