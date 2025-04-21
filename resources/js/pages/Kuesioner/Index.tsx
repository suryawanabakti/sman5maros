'use client';

import type React from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface KuesionerIndexProps {
    years: number[];
}

export default function KuesionerIndex({ years }: KuesionerIndexProps) {
    const [formData, setFormData] = useState({
        kelas: '',
        angkatan: '',
        kegiatan_setelah_lulus: '',
        // Kuliah fields
        jalur_masuk: '',
        tipe_kampus: '',
        nama_kampus: '',
        fakultas: '',
        prodi: '',
        // Kerja fields
        nama_perusahaan: '',
        nama_kesatuan: '',
        alamat: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user changes it
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user changes it
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user changes it
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Required fields validation
        if (!formData.kelas) {
            newErrors.kelas = 'Kelas harus diisi';
        }

        if (!formData.angkatan) {
            newErrors.angkatan = 'Angkatan harus dipilih';
        }

        if (!formData.kegiatan_setelah_lulus) {
            newErrors.kegiatan_setelah_lulus = 'Kegiatan setelah lulus harus dipilih';
        }

        // Conditional validation based on kegiatan_setelah_lulus
        if (formData.kegiatan_setelah_lulus === 'kuliah') {
            if (!formData.jalur_masuk) {
                newErrors.jalur_masuk = 'Jalur masuk harus dipilih';
            }
            if (!formData.tipe_kampus) {
                newErrors.tipe_kampus = 'Tipe kampus harus dipilih';
            }
            if (!formData.nama_kampus) {
                newErrors.nama_kampus = 'Nama kampus harus diisi';
            }
            if (!formData.fakultas) {
                newErrors.fakultas = 'Fakultas harus diisi';
            }
            if (!formData.prodi) {
                newErrors.prodi = 'Program studi harus diisi';
            }
        }

        if (formData.kegiatan_setelah_lulus === 'kerja') {
            if (!formData.nama_perusahaan) {
                newErrors.nama_perusahaan = 'Nama perusahaan harus diisi';
            }
            if (!formData.alamat) {
                newErrors.alamat = 'Alamat harus diisi';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        router.post('/kuesioner', formData, {
            onSuccess: () => {
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="from-primary/5 to-background bg-gradient-to-b px-6 py-12 md:py-16">
                    <div className="container max-w-3xl">
                        <div className="mb-8">
                            <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl">
                                Kuesioner Alumni
                            </h1>
                            <p className="text-muted-foreground mt-2 md:text-lg">
                                Bantu kami meningkatkan kualitas pendidikan dengan mengisi kuesioner ini.
                            </p>
                        </div>

                        <Card className="dark:border-muted/30 dark:bg-muted/20">
                            <CardHeader>
                                <CardTitle>Form Kuesioner</CardTitle>
                                <CardDescription>Silakan isi data diri dan kegiatan Anda setelah lulus dari SMAN 5 Maros.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="kelas">Kelas</Label>
                                            <Input
                                                id="kelas"
                                                name="kelas"
                                                placeholder="Contoh: XII RPL 1"
                                                value={formData.kelas}
                                                onChange={handleChange}
                                                className={errors.kelas ? 'border-red-500' : ''}
                                            />
                                            {errors.kelas && <p className="mt-1 text-sm text-red-500">{errors.kelas}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="angkatan">Angkatan</Label>
                                            <Select value={formData.angkatan} onValueChange={(value) => handleSelectChange('angkatan', value)}>
                                                <SelectTrigger className={errors.angkatan ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Pilih tahun angkatan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {years.map((year) => (
                                                        <SelectItem key={year} value={year.toString()}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.angkatan && <p className="mt-1 text-sm text-red-500">{errors.angkatan}</p>}
                                        </div>

                                        <div>
                                            <Label>Kegiatan Setelah Lulus</Label>
                                            <RadioGroup
                                                value={formData.kegiatan_setelah_lulus}
                                                onValueChange={(value) => handleRadioChange('kegiatan_setelah_lulus', value)}
                                                className="mt-2"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="menikah" id="menikah" />
                                                    <Label htmlFor="menikah" className="cursor-pointer">
                                                        Menikah
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="kuliah" id="kuliah" />
                                                    <Label htmlFor="kuliah" className="cursor-pointer">
                                                        Kuliah
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="kerja" id="kerja" />
                                                    <Label htmlFor="kerja" className="cursor-pointer">
                                                        Kerja
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="dll" id="dll" />
                                                    <Label htmlFor="dll" className="cursor-pointer">
                                                        Lainnya
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                            {errors.kegiatan_setelah_lulus && (
                                                <p className="mt-1 text-sm text-red-500">{errors.kegiatan_setelah_lulus}</p>
                                            )}
                                        </div>

                                        {formData.kegiatan_setelah_lulus === 'kuliah' && (
                                            <div className="border-primary/50 mt-4 space-y-4 border-l-2 pl-4">
                                                <h3 className="text-lg font-medium">Informasi Kuliah</h3>

                                                <div>
                                                    <Label htmlFor="jalur_masuk">Jalur Masuk</Label>
                                                    <Select
                                                        value={formData.jalur_masuk}
                                                        onValueChange={(value) => handleSelectChange('jalur_masuk', value)}
                                                    >
                                                        <SelectTrigger className={errors.jalur_masuk ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Pilih jalur masuk" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="SNMPTN">SNMPTN</SelectItem>
                                                            <SelectItem value="SBMPTN">SBMPTN</SelectItem>
                                                            <SelectItem value="MANDIRI">MANDIRI</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.jalur_masuk && <p className="mt-1 text-sm text-red-500">{errors.jalur_masuk}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="tipe_kampus">Tipe Kampus</Label>
                                                    <Select
                                                        value={formData.tipe_kampus}
                                                        onValueChange={(value) => handleSelectChange('tipe_kampus', value)}
                                                    >
                                                        <SelectTrigger className={errors.tipe_kampus ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Pilih tipe kampus" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ptn">Perguruan Tinggi Negeri (PTN)</SelectItem>
                                                            <SelectItem value="pts">Perguruan Tinggi Swasta (PTS)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.tipe_kampus && <p className="mt-1 text-sm text-red-500">{errors.tipe_kampus}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="nama_kampus">Nama Kampus</Label>
                                                    <Input
                                                        id="nama_kampus"
                                                        name="nama_kampus"
                                                        placeholder="Contoh: Universitas Indonesia"
                                                        value={formData.nama_kampus}
                                                        onChange={handleChange}
                                                        className={errors.nama_kampus ? 'border-red-500' : ''}
                                                    />
                                                    {errors.nama_kampus && <p className="mt-1 text-sm text-red-500">{errors.nama_kampus}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="fakultas">Fakultas</Label>
                                                    <Input
                                                        id="fakultas"
                                                        name="fakultas"
                                                        placeholder="Contoh: Fakultas Ilmu Komputer"
                                                        value={formData.fakultas}
                                                        onChange={handleChange}
                                                        className={errors.fakultas ? 'border-red-500' : ''}
                                                    />
                                                    {errors.fakultas && <p className="mt-1 text-sm text-red-500">{errors.fakultas}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="prodi">Program Studi</Label>
                                                    <Input
                                                        id="prodi"
                                                        name="prodi"
                                                        placeholder="Contoh: Teknik Informatika"
                                                        value={formData.prodi}
                                                        onChange={handleChange}
                                                        className={errors.prodi ? 'border-red-500' : ''}
                                                    />
                                                    {errors.prodi && <p className="mt-1 text-sm text-red-500">{errors.prodi}</p>}
                                                </div>
                                            </div>
                                        )}

                                        {formData.kegiatan_setelah_lulus === 'kerja' && (
                                            <div className="border-primary/50 mt-4 space-y-4 border-l-2 pl-4">
                                                <h3 className="text-lg font-medium">Informasi Pekerjaan</h3>

                                                <div>
                                                    <Label htmlFor="nama_perusahaan">Nama Perusahaan</Label>
                                                    <Input
                                                        id="nama_perusahaan"
                                                        name="nama_perusahaan"
                                                        placeholder="Contoh: PT Teknologi Indonesia"
                                                        value={formData.nama_perusahaan}
                                                        onChange={handleChange}
                                                        className={errors.nama_perusahaan ? 'border-red-500' : ''}
                                                    />
                                                    {errors.nama_perusahaan && <p className="mt-1 text-sm text-red-500">{errors.nama_perusahaan}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="nama_kesatuan">Nama Kesatuan/Divisi (Opsional)</Label>
                                                    <Input
                                                        id="nama_kesatuan"
                                                        name="nama_kesatuan"
                                                        placeholder="Contoh: Divisi IT"
                                                        value={formData.nama_kesatuan}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="alamat">Alamat</Label>
                                                    <Textarea
                                                        id="alamat"
                                                        name="alamat"
                                                        placeholder="Alamat lengkap perusahaan"
                                                        value={formData.alamat}
                                                        onChange={handleChange}
                                                        className={errors.alamat ? 'border-red-500' : ''}
                                                    />
                                                    {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Mengirim...' : 'Kirim Kuesioner'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
