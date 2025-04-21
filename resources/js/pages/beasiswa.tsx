import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronLeft, ChevronRight, FileText, Search, Users } from 'lucide-react';

import { Link } from '@inertiajs/react';

export default function BeasiswaPage({ beasiswaData }: any) {
    return (
        <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="from-primary/5 to-background bg-gradient-to-b px-6 py-12 md:py-16">
                    <div className="container">
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <Link href="/" className="text-muted-foreground hover:text-primary mb-4 inline-flex items-center text-sm">
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Kembali ke Beranda
                                </Link>
                                <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl">
                                    Program Beasiswa
                                </h1>
                                <p className="text-muted-foreground mt-2 md:text-lg">
                                    SMAN 5 Maros menyediakan berbagai program beasiswa untuk mendukung siswa berprestasi dan dari keluarga kurang
                                    mampu.
                                </p>
                            </div>
                        </div>

                        <div className="mb-8 flex flex-col gap-6 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input placeholder="Cari beasiswa..." className="pl-10" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary whitespace-nowrap hover:text-white"
                                >
                                    Semua
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary whitespace-nowrap hover:text-white"
                                >
                                    Prestasi Akademik
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary whitespace-nowrap hover:text-white"
                                >
                                    Olahraga
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary whitespace-nowrap hover:text-white"
                                >
                                    Seni & Budaya
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {beasiswaData.map((beasiswa) => (
                                <Card
                                    key={beasiswa.id}
                                    className="group hover:border-primary/50 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg md:flex-row"
                                >
                                    <div className="relative h-48 overflow-hidden md:h-auto md:w-1/3">
                                        <img
                                            src={beasiswa.gambar || '/placeholder.svg'}
                                            alt={beasiswa.nama}
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="from-primary/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <Badge
                                            className={`absolute top-2 right-2 ${beasiswa.status === 'Dibuka' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                                        >
                                            {beasiswa.status}
                                        </Badge>
                                    </div>
                                    <div className="flex-1 p-6">
                                        <CardTitle className="group-hover:text-primary mb-2 transition-colors">{beasiswa.nama}</CardTitle>
                                        <CardDescription className="mb-4">{beasiswa.deskripsi}</CardDescription>
                                        <div className="mb-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="text-primary h-4 w-4" />
                                                <span>Kuota: {beasiswa.kuota} siswa</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="text-primary h-4 w-4" />
                                                <span>Deadline: {beasiswa.deadline}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-sm">
                                                <FileText className="text-primary mt-1 h-4 w-4" />
                                                <div>
                                                    <span className="font-medium">Persyaratan:</span>
                                                    {beasiswa.persyaratan.length > 0 && (
                                                        <ul className="text-muted-foreground mt-1 list-disc pl-4">
                                                            {beasiswa.persyaratan?.map((syarat, index) => <li key={index}>{syarat}</li>)}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <Button className="bg-primary hover:bg-primary/90" size="sm">
                                            Daftar Sekarang
                                        </Button> */}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="bg-primary hover:bg-primary/90 text-white">
                                    1
                                </Button>
                                <Button variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white">
                                    2
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
