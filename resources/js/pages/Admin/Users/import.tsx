'use client';

import type React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Download, Upload } from 'lucide-react';
import { useState } from 'react';

interface ImportUserProps {
    errors: Record<string, string>;
    flash: {
        message?: string;
        error?: string;
    };
    templateUrl: string;
}

export default function ImportUser({ errors, flash, templateUrl }: ImportUserProps) {
    const [filePreview, setFilePreview] = useState<{
        headers: string[];
        rows: string[][];
    } | null>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { data, setData, post, processing, reset } = useForm({
        file: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('file', file);

        if (
            file &&
            (file.type === 'text/csv' ||
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel')
        ) {
            // Preview CSV file
            if (file.type === 'text/csv') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const text = event.target?.result as string;
                    const lines = text.split('\n').filter((line) => line.trim() !== '');
                    const headers = lines[0].split(',').map((header) => header.trim());

                    const rows = lines.slice(1).map((line) => line.split(',').map((cell) => cell.trim()));

                    setFilePreview({ headers, rows: rows.slice(0, 5) }); // Show only first 5 rows
                };
                reader.readAsText(file);
            } else {
                // For Excel files, we can't preview easily in the browser
                // Just show that the file is selected
                setFilePreview(null);
            }
        } else {
            setFilePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadProgress(0);

        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return prev;
                }
                return prev + 5;
            });
        }, 300);

        router.post(route('admin.users.import.store'), data, {
            onSuccess: () => {
                clearInterval(progressInterval);
                setUploadProgress(100);
                setTimeout(() => {
                    setIsUploading(false);
                    reset();
                    setFilePreview(null);
                }, 500);
            },
            onError: () => {
                clearInterval(progressInterval);
                setIsUploading(false);
                setUploadProgress(0);
            },
            onProgress: (event) => {
                setUploadProgress(Math.round((event.loaded / event.total) * 100));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Import User" />

            <div className="container py-8">
                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <Link href={route('admin.users.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Import User</h1>
                    <p className="text-muted-foreground mt-2">Import data user secara massal menggunakan file CSV atau Excel</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Petunjuk Import</CardTitle>
                            <CardDescription>Ikuti langkah-langkah berikut untuk mengimpor data user</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-medium">1. Download Template</h3>
                                <p className="text-muted-foreground text-sm">
                                    Gunakan template yang sudah disediakan untuk memastikan format data sesuai
                                </p>
                                <Button variant="outline" asChild>
                                    <a href={'/user-template.xlsx'} download>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Template
                                    </a>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">2. Isi Data</h3>
                                <p className="text-muted-foreground text-sm">
                                    Isi template dengan data user yang ingin diimpor. Pastikan format data sesuai dengan ketentuan:
                                </p>
                                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                                    <li>Kolom nama: Wajib diisi</li>
                                    <li>Kolom nik: Wajib diisi</li>
                                    <li>Kolom nama_ayah: Wajib diisi</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">3. Upload File</h3>
                                <p className="text-muted-foreground text-sm">Upload file yang sudah diisi data user</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Upload File</CardTitle>
                            <CardDescription>Upload file CSV atau Excel yang berisi data user</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="file">File Import</Label>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Input
                                                id="file"
                                                type="file"
                                                accept=".csv,.xlsx,.xls"
                                                onChange={handleFileChange}
                                                disabled={processing || isUploading}
                                            />
                                            <p className="text-muted-foreground text-xs">Format yang didukung: CSV, Excel (.xlsx, .xls)</p>
                                        </div>

                                        {errors.file && (
                                            <Alert variant="destructive" className="mt-2">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>{errors.file}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>

                                    {isUploading && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label>Uploading...</Label>
                                                <span className="text-muted-foreground text-xs">{uploadProgress}%</span>
                                            </div>
                                            <Progress value={uploadProgress} className="h-2" />
                                        </div>
                                    )}

                                    {filePreview && (
                                        <div className="mt-4 space-y-2">
                                            <h3 className="font-medium">Preview Data</h3>
                                            <div className="max-h-[300px] overflow-auto rounded-md border">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            {filePreview.headers.map((header, index) => (
                                                                <TableHead key={index}>{header}</TableHead>
                                                            ))}
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {filePreview.rows.map((row, rowIndex) => (
                                                            <TableRow key={rowIndex}>
                                                                {row.map((cell, cellIndex) => (
                                                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                                                ))}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <p className="text-muted-foreground text-xs">Menampilkan 5 baris pertama dari file</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button type="submit" disabled={!data.file || processing || isUploading} className="flex items-center">
                                        {isUploading ? (
                                            <>Mengupload...</>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Import Data
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
