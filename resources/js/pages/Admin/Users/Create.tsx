'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'user',
        nama_ayah: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AppLayout>
            <Head title="Tambah Siswa Baru" />

            <div className="container py-8">
                <div className="mb-6">
                    <Link
                        href={route('admin.users.index')}
                        className="text-muted-foreground hover:text-primary mb-4 inline-flex items-center text-sm"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Kembali ke Daftar User
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Siswa Baru</h1>
                    <p className="text-muted-foreground mt-2">Buat akun siswa baru untuk mengakses sistem</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Siswa</CardTitle>
                        <CardDescription>Masukkan detail informasi untuk user baru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">NIK</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan NIK"
                                    />
                                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Ayah</Label>
                                    <Input
                                        id="nama_ayah"
                                        value={data.nama_ayah}
                                        onChange={(e) => setData('nama_ayah', e.target.value)}
                                        placeholder="Masukkan nama ayah"
                                    />
                                    {errors.nama_ayah && <p className="text-destructive text-sm">{errors.nama_ayah}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Simpan User
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
