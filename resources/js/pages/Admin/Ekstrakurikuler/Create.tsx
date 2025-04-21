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

interface EkstrakurikulerCreateProps {
    availableUsers: any[]; // Keeping this prop for backward compatibility
}

export default function EkstrakurikulerCreate({ availableUsers }: EkstrakurikulerCreateProps) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        visi: '',
        misi: '',
        tujuan: '',
        kategori: '',
        // New user fields
        user_name: '',
        user_email: '',
        user_password: '',
        foto: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.ekstrakurikuler.store'), {
            onSuccess: () => {
                toast({
                    title: 'Ekstrakurikuler berhasil ditambahkan',
                    variant: 'success',
                });
                reset();
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
            <Head title="Tambah Ekstrakurikuler" />

            <div className="container py-8">
                <div className="mb-6">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight">Tambah Ekstrakurikuler</h1>
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
                                    <Label htmlFor="user_password">Password</Label>
                                    <Input
                                        id="user_password"
                                        type="password"
                                        value={data.user_password}
                                        onChange={(e) => setData('user_password', e.target.value)}
                                        className="mt-1"
                                    />
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
                                    <Label htmlFor="foto">Foto</Label>
                                    <Input id="foto" type="file" onChange={handleFileChange} className="mt-1" />
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
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
