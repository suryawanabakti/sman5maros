'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import type React from 'react';

export default function BeasiswaCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        deskripsi: '',
        kuota: '',
        deadline: '',
        status: '',
        gambar: null as File | null,
        persyaratan: [''] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.beasiswa.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
        }
    };

    const addPersyaratan = () => {
        setData('persyaratan', [...data.persyaratan, '']);
    };

    const removePersyaratan = (index: number) => {
        const updatedPersyaratan = [...data.persyaratan];
        updatedPersyaratan.splice(index, 1);
        setData('persyaratan', updatedPersyaratan);
    };

    const updatePersyaratan = (index: number, value: string) => {
        const updatedPersyaratan = [...data.persyaratan];
        updatedPersyaratan[index] = value;
        setData('persyaratan', updatedPersyaratan);
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Tambah Beasiswa</h1>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Beasiswa</CardTitle>
                        <CardDescription>Tambahkan data beasiswa baru ke dalam sistem.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nama">
                                        Nama Beasiswa <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nama"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        placeholder="Masukkan nama beasiswa"
                                        required
                                    />
                                    {errors.nama && <p className="text-destructive text-sm">{errors.nama}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kuota">
                                        Kuota <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="kuota"
                                        type="number"
                                        value={data.kuota}
                                        onChange={(e) => setData('kuota', e.target.value)}
                                        placeholder="Masukkan jumlah kuota"
                                        required
                                    />
                                    {errors.kuota && <p className="text-destructive text-sm">{errors.kuota}</p>}
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
                                    <Label htmlFor="status">
                                        Status <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dibuka">Dibuka</SelectItem>
                                            <SelectItem value="Ditutup">Ditutup</SelectItem>
                                            <SelectItem value="Segera Dibuka">Segera Dibuka</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-destructive text-sm">{errors.status}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="deskripsi">
                                        Deskripsi <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        placeholder="Masukkan deskripsi beasiswa"
                                        rows={3}
                                        required
                                    />
                                    {errors.deskripsi && <p className="text-destructive text-sm">{errors.deskripsi}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="gambar">Gambar</Label>
                                    <Input id="gambar" type="file" onChange={handleFileChange} accept="image/*" />
                                    <p className="text-muted-foreground text-sm">
                                        Upload gambar dengan ukuran maksimal 2MB. Format yang didukung: JPG, PNG, GIF.
                                    </p>
                                    {errors.gambar && <p className="text-destructive text-sm">{errors.gambar}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Persyaratan</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addPersyaratan}>
                                            <Plus className="mr-1 h-4 w-4" /> Tambah Persyaratan
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {data.persyaratan.map((syarat, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={syarat}
                                                    onChange={(e) => updatePersyaratan(index, e.target.value)}
                                                    placeholder={`Persyaratan ${index + 1}`}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removePersyaratan(index)}
                                                    className="text-destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.persyaratan && <p className="text-destructive text-sm">{errors.persyaratan}</p>}
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
