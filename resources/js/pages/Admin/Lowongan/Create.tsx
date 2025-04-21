'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import type React from 'react';

export default function LowonganCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        nama_perusahaan: '',
        industri: '',
        alamat: '',
        telepon: '',
        email: '',
        website: '',
        deskripsi: '',
        tipe_pekerjaan: '',
        deadline: '',
        gaji: '',
        tanggal_posting: new Date().toISOString().split('T')[0], // Today's date
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.lowongan.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Tambah Lowongan Pekerjaan</h1>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Lowongan</CardTitle>
                        <CardDescription>Tambahkan data lowongan pekerjaan baru ke dalam sistem.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="judul">
                                        Judul Pekerjaan <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="judul"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        placeholder="Masukkan judul pekerjaan"
                                        required
                                    />
                                    {errors.judul && <p className="text-destructive text-sm">{errors.judul}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama_perusahaan">
                                        Nama Perusahaan <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nama_perusahaan"
                                        value={data.nama_perusahaan}
                                        onChange={(e) => setData('nama_perusahaan', e.target.value)}
                                        placeholder="Masukkan nama perusahaan"
                                        required
                                    />
                                    {errors.nama_perusahaan && <p className="text-destructive text-sm">{errors.nama_perusahaan}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="industri">
                                        Industri <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="industri"
                                        value={data.industri}
                                        onChange={(e) => setData('industri', e.target.value)}
                                        placeholder="Contoh: Teknologi Informasi"
                                        required
                                    />
                                    {errors.industri && <p className="text-destructive text-sm">{errors.industri}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="alamat">
                                        Lokasi <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="alamat"
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        placeholder="Contoh: Jakarta Selatan"
                                        required
                                    />
                                    {errors.alamat && <p className="text-destructive text-sm">{errors.alamat}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telepon">
                                        Telepon <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="telepon"
                                        value={data.telepon}
                                        onChange={(e) => setData('telepon', e.target.value)}
                                        placeholder="Masukkan nomor telepon"
                                        required
                                    />
                                    {errors.telepon && <p className="text-destructive text-sm">{errors.telepon}</p>}
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
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="Masukkan alamat website"
                                    />
                                    {errors.website && <p className="text-destructive text-sm">{errors.website}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipe_pekerjaan">
                                        Tipe Pekerjaan <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={data.tipe_pekerjaan} onValueChange={(value) => setData('tipe_pekerjaan', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tipe pekerjaan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full Time">Full Time</SelectItem>
                                            <SelectItem value="Part Time">Part Time</SelectItem>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.tipe_pekerjaan && <p className="text-destructive text-sm">{errors.tipe_pekerjaan}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deadline">
                                        Deadline <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={data.deadline}
                                        onChange={(e) => setData('deadline', e.target.value)}
                                        required
                                    />
                                    {errors.deadline && <p className="text-destructive text-sm">{errors.deadline}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gaji">Gaji</Label>
                                    <Input
                                        id="gaji"
                                        value={data.gaji}
                                        onChange={(e) => setData('gaji', e.target.value)}
                                        placeholder="Contoh: Rp 8.000.000 - Rp 12.000.000"
                                    />
                                    {errors.gaji && <p className="text-destructive text-sm">{errors.gaji}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_posting">
                                        Tanggal Posting <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="tanggal_posting"
                                        type="date"
                                        value={data.tanggal_posting}
                                        onChange={(e) => setData('tanggal_posting', e.target.value)}
                                        required
                                    />
                                    {errors.tanggal_posting && <p className="text-destructive text-sm">{errors.tanggal_posting}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="deskripsi">
                                        Deskripsi <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        placeholder="Masukkan deskripsi pekerjaan"
                                        rows={5}
                                        required
                                    />
                                    {errors.deskripsi && <p className="text-destructive text-sm">{errors.deskripsi}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => reset()} disabled={processing}>
                                Reset
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
