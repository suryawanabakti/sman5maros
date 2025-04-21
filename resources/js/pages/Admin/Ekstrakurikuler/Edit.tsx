'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Ekstrakurikuler {
    id: number;
    nama: string;
    visi: string;
    misi: string;
    tujuan: string;
    kategori: string;
    foto: string | null;
    status: string;
    user: User | null;
}

interface EkstrakurikulerEditProps {
    ekstrakurikuler: Ekstrakurikuler;
}

export default function EkstrakurikulerEdit({ ekstrakurikuler }: EkstrakurikulerEditProps) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        nama: ekstrakurikuler.nama || '',
        visi: ekstrakurikuler.visi || '',
        misi: ekstrakurikuler.misi || '',
        tujuan: ekstrakurikuler.tujuan || '',
        kategori: ekstrakurikuler.kategori || '',
        status: ekstrakurikuler.status || 'aktif',
        // User fields - pre-populated if user exists
        user_name: ekstrakurikuler.user?.name || '',
        user_email: ekstrakurikuler.user?.email || '',
        user_password: '', // Empty by default, will only be updated if filled
        foto: null as File | null,
        _method: 'PUT', // For method spoofing
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.ekstrakurikuler.update', ekstrakurikuler.id), {
            onSuccess: () => {
                toast({
                    title: 'Ekstrakurikuler berhasil diperbarui',
                    variant: 'success',
                });
            },
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('foto', e.target.files[0]);
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Ekstrakurikuler" />

            <div className="container py-8">
                <div className="mb-6">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight">Edit Ekstrakurikuler</h1>
                </div>

                <div className="bg-card rounded-lg border p-6 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nama">Nama Ekstrakurikuler</Label>
                                    <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="mt-1" />
                                    {errors.nama && <p className="text-destructive mt-1 text-sm">{errors.nama}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="user_name">Nama Ketua</Label>
                                    <Input
                                        id="user_name"
                                        value={data.user_name}
                                        onChange={(e) => setData('user_name', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.user_name && <p className="text-destructive mt-1 text-sm">{errors.user_name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="user_email">Email Ketua</Label>
                                    <Input
                                        id="user_email"
                                        type="email"
                                        value={data.user_email}
                                        onChange={(e) => setData('user_email', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.user_email && <p className="text-destructive mt-1 text-sm">{errors.user_email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="user_password">Password Baru (kosongkan jika tidak ingin mengubah)</Label>
                                    <Input
                                        id="user_password"
                                        type="password"
                                        value={data.user_password}
                                        onChange={(e) => setData('user_password', e.target.value)}
                                        className="mt-1"
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">Biarkan kosong jika tidak ingin mengubah password</p>
                                    {errors.user_password && <p className="text-destructive mt-1 text-sm">{errors.user_password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="kategori">Kategori</Label>
                                    <Select value={data.kategori} onValueChange={(value) => setData('kategori', value)}>
                                        <SelectTrigger id="kategori" className="mt-1">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Olahraga">Olahraga</SelectItem>
                                            <SelectItem value="Seni">Seni</SelectItem>
                                            <SelectItem value="Akademik">Akademik</SelectItem>
                                            <SelectItem value="Keagamaan">Keagamaan</SelectItem>
                                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.kategori && <p className="text-destructive mt-1 text-sm">{errors.kategori}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger id="status" className="mt-1">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="aktif">Aktif</SelectItem>
                                            <SelectItem value="nonaktif">Non-Aktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-destructive mt-1 text-sm">{errors.status}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="foto">Foto</Label>
                                    {ekstrakurikuler.foto && (
                                        <div className="mb-2">
                                            <img
                                                src={`/storage/${ekstrakurikuler.foto}`}
                                                alt={ekstrakurikuler.nama}
                                                className="h-32 w-auto rounded-md object-cover"
                                            />
                                            <p className="text-muted-foreground mt-1 text-xs">Foto saat ini</p>
                                        </div>
                                    )}
                                    <Input id="foto" type="file" onChange={handleFileChange} className="mt-1" />
                                    <p className="text-muted-foreground mt-1 text-xs">Biarkan kosong jika tidak ingin mengubah foto</p>
                                    {errors.foto && <p className="text-destructive mt-1 text-sm">{errors.foto}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="visi">Visi</Label>
                                    <Textarea
                                        id="visi"
                                        value={data.visi}
                                        onChange={(e) => setData('visi', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                    />
                                    {errors.visi && <p className="text-destructive mt-1 text-sm">{errors.visi}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="misi">Misi</Label>
                                    <Textarea
                                        id="misi"
                                        value={data.misi}
                                        onChange={(e) => setData('misi', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                    />
                                    {errors.misi && <p className="text-destructive mt-1 text-sm">{errors.misi}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="tujuan">Tujuan</Label>
                                    <Textarea
                                        id="tujuan"
                                        value={data.tujuan}
                                        onChange={(e) => setData('tujuan', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                    />
                                    {errors.tujuan && <p className="text-destructive mt-1 text-sm">{errors.tujuan}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Link href={route('admin.ekstrakurikuler.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
