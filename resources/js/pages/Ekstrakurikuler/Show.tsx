import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Award, Calendar, ChevronLeft, Mail, MapPin, Users } from 'lucide-react';

interface kegiatan {
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
    kegiatan: kegiatan[];
}

interface Props {
    ekstrakurikuler: Ekstrakurikuler;
    relatedEkstrakurikuler: Ekstrakurikuler[];
}

export default function Show({ ekstrakurikuler, relatedEkstrakurikuler }: Props) {
    // Function to get kegiatan list from misi text (fallback if kegiatan is empty)
    const getKegiatanFromMisi = (misi: string): string[] => {
        // Split by line breaks or commas and clean up
        return misi
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
    };

    // Get kegiatan list - either from kegiatan or parse from misi
    const kegiatanList =
        ekstrakurikuler.kegiatan && ekstrakurikuler.kegiatan.length > 0
            ? ekstrakurikuler.kegiatan
            : getKegiatanFromMisi(ekstrakurikuler.misi).map((title, index) => ({
                  id: index,
                  ekstrakurikuler_id: ekstrakurikuler.id,
                  judul: title,
                  deskripsi: '',
                  gambar: '',
                  created_at: ekstrakurikuler.created_at,
                  updated_at: ekstrakurikuler.updated_at,
              }));

    return (
        <MainLayout>
            <Head title={ekstrakurikuler.nama} />

            <main className="flex-1">
                <section className="py-12">
                    <div className="container">
                        <Link href="/ekstrakurikuler" className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center text-sm">
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Kembali ke Daftar Ekstrakurikuler
                        </Link>

                        {/* Hero Section */}
                        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
                            <img src={`/storage/${ekstrakurikuler.foto}`} alt={ekstrakurikuler.nama} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                                <div className="bg-primary/10 text-primary ring-primary/20 mb-2 inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                                    {ekstrakurikuler.kategori}
                                </div>
                                <h1 className="text-2xl font-bold text-white md:text-4xl">{ekstrakurikuler.nama}</h1>
                                <p className="mt-2 text-white/80">Dipimpin oleh: {ekstrakurikuler.user?.name || ekstrakurikuler.ketua}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 px-6 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <Tabs defaultValue="tentang">
                                    <TabsList className="mb-6">
                                        <TabsTrigger value="tentang">Tentang</TabsTrigger>
                                        <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
                                        <TabsTrigger value="galeri">Galeri</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="tentang">
                                        <div className="space-y-6 px-3">
                                            <div>
                                                <h2 className="mb-3 text-xl font-semibold">Visi</h2>
                                                <p className="text-muted-foreground">{ekstrakurikuler.visi}</p>
                                            </div>

                                            <div>
                                                <h2 className="mb-3 text-xl font-semibold">Misi</h2>
                                                <div
                                                    className="text-muted-foreground"
                                                    dangerouslySetInnerHTML={{ __html: ekstrakurikuler.misi.replace(/\n/g, '<br/>') }}
                                                />
                                            </div>

                                            <div>
                                                <h2 className="mb-3 text-xl font-semibold">Tujuan</h2>
                                                <div
                                                    className="text-muted-foreground"
                                                    dangerouslySetInnerHTML={{ __html: ekstrakurikuler.tujuan.replace(/\n/g, '<br/>') }}
                                                />
                                            </div>

                                            <div className="pt-4"></div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="kegiatan">
                                        <div className="space-y-6">
                                            <h2 className="mb-3 text-xl font-semibold">Daftar Kegiatan</h2>

                                            {kegiatanList.length > 0 ? (
                                                <div className="space-y-6">
                                                    {kegiatanList.map((kegiatan) => (
                                                        <Card key={kegiatan.id} className="overflow-hidden">
                                                            <div className="md:flex">
                                                                {kegiatan.gambar && (
                                                                    <div className="h-48 md:w-1/3">
                                                                        <img
                                                                            src={`/storage/${kegiatan.gambar}`}
                                                                            alt={kegiatan.judul}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div className={kegiatan.gambar ? 'p-6 md:w-2/3' : 'p-6'}>
                                                                    <CardTitle className="mb-2">{kegiatan.judul}</CardTitle>
                                                                    {kegiatan.deskripsi && (
                                                                        <p className="text-muted-foreground mb-4">
                                                                            {kegiatan.deskripsi.length > 200
                                                                                ? `${kegiatan.deskripsi.substring(0, 200)}...`
                                                                                : kegiatan.deskripsi}
                                                                        </p>
                                                                    )}
                                                                    <div className="text-muted-foreground flex items-center text-sm">
                                                                        <Calendar className="mr-1 h-4 w-4" />
                                                                        {format(new Date(kegiatan.created_at), 'dd MMMM yyyy', { locale: id })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-12 text-center">
                                                    <h3 className="text-lg font-medium">Belum ada kegiatan</h3>
                                                    <p className="text-muted-foreground mt-2">Kegiatan akan ditampilkan di sini saat tersedia</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="galeri">
                                        <div className="space-y-6">
                                            <h2 className="mb-3 text-xl font-semibold">Galeri Foto</h2>

                                            {ekstrakurikuler.kegiatan && ekstrakurikuler.kegiatan.filter((k) => k.gambar).length > 0 ? (
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                    {/* Add main photo to gallery */}
                                                    <div className="aspect-square overflow-hidden rounded-md">
                                                        <img
                                                            src={`/storage/${ekstrakurikuler.foto}`}
                                                            alt={ekstrakurikuler.nama}
                                                            className="h-full w-full object-cover transition-all hover:scale-105"
                                                        />
                                                    </div>

                                                    {ekstrakurikuler.kegiatan
                                                        .filter((kegiatan) => kegiatan.gambar)
                                                        .map((kegiatan) => (
                                                            <div key={kegiatan.id} className="aspect-square overflow-hidden rounded-md">
                                                                <img
                                                                    src={`/storage/${kegiatan.gambar}`}
                                                                    alt={kegiatan.judul}
                                                                    className="h-full w-full object-cover transition-all hover:scale-105"
                                                                />
                                                            </div>
                                                        ))}
                                                </div>
                                            ) : (
                                                <div className="py-12 text-center">
                                                    <h3 className="text-lg font-medium">Belum ada foto</h3>
                                                    <p className="text-muted-foreground mt-2">Foto kegiatan akan ditampilkan di sini saat tersedia</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Contact Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informasi Kontak</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-start">
                                            <Users className="text-muted-foreground mt-0.5 mr-2 h-5 w-5" />
                                            <div>
                                                <p className="font-medium">Ketua</p>
                                                <p className="text-muted-foreground text-sm">{ekstrakurikuler.user?.name || ekstrakurikuler.ketua}</p>
                                            </div>
                                        </div>

                                        {ekstrakurikuler.user?.email && (
                                            <div className="flex items-start">
                                                <Mail className="text-muted-foreground mt-0.5 mr-2 h-5 w-5" />
                                                <div>
                                                    <p className="font-medium">Email</p>
                                                    <p className="text-muted-foreground text-sm">{ekstrakurikuler.user.email}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start">
                                            <MapPin className="text-muted-foreground mt-0.5 mr-2 h-5 w-5" />
                                            <div>
                                                <p className="font-medium">Lokasi</p>
                                                <p className="text-muted-foreground text-sm">SMAN 5 Maros</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <Award className="text-muted-foreground mt-0.5 mr-2 h-5 w-5" />
                                            <div>
                                                <p className="font-medium">Kategori</p>
                                                <p className="text-muted-foreground text-sm">{ekstrakurikuler.kategori}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Related Ekstrakurikuler */}
                                {relatedEkstrakurikuler && relatedEkstrakurikuler.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Ekstrakurikuler Terkait</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {relatedEkstrakurikuler.map((ekskul) => (
                                                <div key={ekskul.id} className="flex items-start gap-3">
                                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                                        <img
                                                            src={ekskul.foto || '/placeholder.svg?height=50&width=50'}
                                                            alt={ekskul.nama}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/ekstrakurikuler/${ekskul.id}`}
                                                            className="hover:text-primary line-clamp-1 font-medium"
                                                        >
                                                            {ekskul.nama}
                                                        </Link>
                                                        <p className="text-muted-foreground mt-1 text-xs">{ekskul.kategori}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
