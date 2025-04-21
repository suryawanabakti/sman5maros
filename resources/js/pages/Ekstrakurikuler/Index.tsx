import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';

import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DaftarKegiatan {
    id: number;
    ekstrakurikuler_id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Ekstrakurikuler {
    id: number;
    nama: string;
    ketua: string;
    foto: string;
    kategori: string;
    visi: string;
    misi: string;
    tujuan: string;
    created_at: string;
    updated_at: string;
    user?: User;
    daftarKegiatan?: DaftarKegiatan[];
}

interface Props {
    ekstrakurikuler: Ekstrakurikuler[];
    kategori?: string;
    categories: string[];
}

export default function Index({ ekstrakurikuler, kategori = 'semua', categories }: Props) {
    // Make sure we have all categories including "semua"
    const allCategories = ['semua', ...categories.filter((cat) => cat !== 'semua')];

    // Function to get kegiatan list from misi text (fallback if daftarKegiatan is empty)
    const getKegiatanFromMisi = (misi: string): string[] => {
        // Split by line breaks or commas and clean up
        return misi
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
            .slice(0, 4); // Limit to 4 items
    };

    return (
        <MainLayout>
            <Head title="Ekstrakurikuler" />

            <main className="flex-1">
                <section className="from-primary/5 to-background bg-gradient-to-b p-6 py-12 md:py-16">
                    <div className="container">
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <Link href="/" className="text-muted-foreground hover:text-primary mb-4 inline-flex items-center text-sm">
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Kembali ke Beranda
                                </Link>
                                <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl">
                                    Ekstrakurikuler
                                </h1>
                                <p className="text-muted-foreground mt-2 md:text-lg">
                                    Kembangkan bakat dan minat Anda melalui berbagai kegiatan ekstrakurikuler yang kami sediakan.
                                </p>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90">Daftar Ekstrakurikuler</Button>
                        </div>

                        <Tabs defaultValue={kategori} className="w-full">
                            <div className="mb-8 flex justify-center">
                                <TabsList className="bg-primary/10">
                                    {allCategories.map((cat) => (
                                        <TabsTrigger
                                            key={cat}
                                            value={cat}
                                            className="data-[state=active]:bg-primary data-[state=active]:text-white"
                                            onClick={() => {
                                                if (cat !== kategori) {
                                                    window.location.href = `/ekstrakurikuler?kategori=${cat}`;
                                                }
                                            }}
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {allCategories.map((cat) => (
                                <TabsContent key={cat} value={cat} className="mt-0">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {ekstrakurikuler
                                            .filter((ekskul) => cat === 'semua' || ekskul.kategori === cat)
                                            .map((ekskul) => {
                                                // Get kegiatan list - either from daftarKegiatan or parse from misi
                                                const kegiatanList =
                                                    ekskul.daftarKegiatan && ekskul.daftarKegiatan.length > 0
                                                        ? ekskul.daftarKegiatan.map((k) => k.judul).slice(0, 4)
                                                        : getKegiatanFromMisi(ekskul.misi);

                                                return (
                                                    <Card
                                                        key={ekskul.id}
                                                        className="group hover:border-primary/50 h-full transition-all duration-300 hover:shadow-lg"
                                                    >
                                                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                                                            <img
                                                                src={ekskul.foto || '/placeholder.svg?height=300&width=400'}
                                                                alt={ekskul.nama}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="from-primary/60 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                        </div>
                                                        <CardHeader>
                                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                                {ekskul.nama}
                                                            </CardTitle>
                                                            <p className="text-muted-foreground text-sm">
                                                                Ketua: {ekskul.user?.name || ekskul.ketua}
                                                            </p>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <h4 className="text-primary mb-1 font-medium">Visi</h4>
                                                                    <p className="text-muted-foreground text-sm">{ekskul.visi}</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-primary mb-1 font-medium">Misi</h4>
                                                                    <p className="text-muted-foreground text-sm">
                                                                        {ekskul.misi.substring(0, 100)}...
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-primary mb-1 font-medium">Kegiatan</h4>
                                                                    <ul className="text-muted-foreground space-y-1 text-sm">
                                                                        {kegiatanList.map((kegiatan, index) => (
                                                                            <li key={index} className="flex items-center gap-2">
                                                                                <ChevronRight className="text-primary h-3 w-3" />
                                                                                {kegiatan}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="group-hover:bg-primary w-full transition-colors group-hover:text-white"
                                                                asChild
                                                            >
                                                                <Link href={`/ekstrakurikuler/${ekskul.id}`}>Lihat Detail</Link>
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                );
                                            })}
                                    </div>

                                    {ekstrakurikuler.filter((ekskul) => cat === 'semua' || ekskul.kategori === cat).length === 0 && (
                                        <div className="py-12 text-center">
                                            <h3 className="text-lg font-medium">Tidak ada ekstrakurikuler dalam kategori ini</h3>
                                            <p className="text-muted-foreground mt-2">Silakan pilih kategori lain atau lihat semua ekstrakurikuler</p>
                                        </div>
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
