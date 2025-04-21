'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { DaftarKegiatan } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type React from 'react';

interface DaftarKegiatanEditProps {
    kegiatan: DaftarKegiatan;
    ekstrakurikulerList: {
        id: number;
        nama: string;
    }[];
}

export default function DaftarKegiatanEdit({ kegiatan, ekstrakurikulerList }: DaftarKegiatanEditProps) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        ekstrakurikuler_id: kegiatan.ekstrakurikuler_id.toString(),
        judul: kegiatan.judul,
        deskripsi: kegiatan.deskripsi,
        gambar: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.kegiatan.update', kegiatan.id), {
            onSuccess: () => {
                toast({
                    title: 'Kegiatan berhasil diperbarui',
                    variant: 'success',
                });
            },
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Kegiatan" />

            <div className="container py-8">
                <div className="mb-6">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight">Edit Kegiatan</h1>
                </div>

                <div className="bg-card rounded-lg border p-6 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="ekstrakurikuler_id">Ekstrakurikuler</Label>
                                <Select value={data.ekstrakurikuler_id} onValueChange={(value) => setData('ekstrakurikuler_id', value)}>
                                    <SelectTrigger id="ekstrakurikuler_id" className="mt-1">
                                        <SelectValue placeholder="Pilih ekstrakurikuler" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ekstrakurikulerList.map((ekskul) => (
                                            <SelectItem key={ekskul.id} value={ekskul.id.toString()}>
                                                {ekskul.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.ekstrakurikuler_id && <p className="text-destructive mt-1 text-sm">{errors.ekstrakurikuler_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="judul">Judul Kegiatan</Label>
                                <Input id="judul" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="mt-1" />
                                {errors.judul && <p className="text-destructive mt-1 text-sm">{errors.judul}</p>}
                            </div>

                            <div>
                                <Label htmlFor="deskripsi">Deskripsi</Label>
                                <Textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    className="mt-1"
                                    rows={5}
                                />
                                {errors.deskripsi && <p className="text-destructive mt-1 text-sm">{errors.deskripsi}</p>}
                            </div>

                            <div>
                                <Label htmlFor="gambar">Gambar</Label>
                                {kegiatan.gambar && (
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${kegiatan.gambar}`}
                                            alt={kegiatan.judul}
                                            className="mt-1 h-32 w-32 rounded-md object-cover"
                                        />
                                        <p className="text-muted-foreground mt-1 text-sm">Unggah gambar baru untuk mengganti gambar saat ini</p>
                                    </div>
                                )}
                                <Input id="gambar" type="file" onChange={handleFileChange} className="mt-1" />
                                {errors.gambar && <p className="text-destructive mt-1 text-sm">{errors.gambar}</p>}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Link href={route('admin.kegiatan.index')}>
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
