'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Alumni } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import type React from 'react';

interface AlumniEditProps {
    alumni: Alumni;
}

export default function AlumniEdit({ alumni }: AlumniEditProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT', // For method spoofing
        nama: alumni.nama,
        nisn: alumni.nisn,
        angkatan: alumni.angkatan,
        jurusan: alumni.jurusan,
        judul: alumni.judul || '',
        pekerjaan: alumni.pekerjaan || '',
        email: alumni.email || '',
        telepon: alumni.telepon || '',
        alamat: alumni.alamat || '',
        foto: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.alumni.update', alumni.id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('foto', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Edit Alumni</h1>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Alumni</CardTitle>
                        <CardDescription>Perbarui data alumni dalam sistem.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nama">
                                        Nama Lengkap <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nama"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                    {errors.nama && <p className="text-destructive text-sm">{errors.nama}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nisn">
                                        NISN <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nisn"
                                        value={data.nisn}
                                        onChange={(e) => setData('nisn', e.target.value)}
                                        placeholder="Masukkan NISN"
                                        required
                                    />
                                    {errors.nisn && <p className="text-destructive text-sm">{errors.nisn}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="angkatan">
                                        Angkatan <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="angkatan"
                                        value={data.angkatan}
                                        onChange={(e) => setData('angkatan', e.target.value)}
                                        placeholder="Contoh: 2020"
                                        required
                                    />
                                    {errors.angkatan && <p className="text-destructive text-sm">{errors.angkatan}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jurusan">
                                        Jurusan <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={data.jurusan} onValueChange={(value) => setData('jurusan', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jurusan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Teknik Komputer & Jaringan">Teknik Komputer & Jaringan</SelectItem>
                                            <SelectItem value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</SelectItem>
                                            <SelectItem value="Multimedia">Multimedia</SelectItem>
                                            <SelectItem value="Akuntansi">Akuntansi</SelectItem>
                                            <SelectItem value="Administrasi Perkantoran">Administrasi Perkantoran</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jurusan && <p className="text-destructive text-sm">{errors.jurusan}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="judul">Judul Karya Tulis/Proyek</Label>
                                    <Input
                                        id="judul"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        placeholder="Masukkan judul karya tulis/proyek"
                                    />
                                    {errors.judul && <p className="text-destructive text-sm">{errors.judul}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pekerjaan">Pekerjaan Saat Ini</Label>
                                    <Input
                                        id="pekerjaan"
                                        value={data.pekerjaan}
                                        onChange={(e) => setData('pekerjaan', e.target.value)}
                                        placeholder="Contoh: Software Engineer di PT XYZ"
                                    />
                                    {errors.pekerjaan && <p className="text-destructive text-sm">{errors.pekerjaan}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan alamat email"
                                    />
                                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telepon">Nomor Telepon</Label>
                                    <Input
                                        id="telepon"
                                        value={data.telepon}
                                        onChange={(e) => setData('telepon', e.target.value)}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    {errors.telepon && <p className="text-destructive text-sm">{errors.telepon}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Textarea
                                        id="alamat"
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        placeholder="Masukkan alamat lengkap"
                                        rows={3}
                                    />
                                    {errors.alamat && <p className="text-destructive text-sm">{errors.alamat}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="foto">Foto</Label>
                                    {alumni.foto_url && (
                                        <div className="mb-2">
                                            <img
                                                src={alumni.foto_url || '/placeholder.svg'}
                                                alt={alumni.nama}
                                                className="h-32 w-32 rounded-md border object-cover"
                                            />
                                        </div>
                                    )}
                                    <Input id="foto" type="file" onChange={handleFileChange} accept="image/*" />
                                    <p className="text-muted-foreground text-sm">
                                        Upload foto baru untuk mengganti foto yang ada. Biarkan kosong jika tidak ingin mengubah foto.
                                    </p>
                                    {errors.foto && <p className="text-destructive text-sm">{errors.foto}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" /> Simpan
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
