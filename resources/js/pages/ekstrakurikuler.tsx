import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Link } from '@inertiajs/react';

export default function EkstrakurikulerPage({ ekstrakurikulerData }: any) {
    return (
        <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="from-primary/5 to-background bg-gradient-to-b py-12 md:py-16">
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

                        <Tabs defaultValue="semua" className="w-full">
                            <div className="mb-8 flex justify-center">
                                <TabsList className="bg-primary/10">
                                    <TabsTrigger value="semua" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Semua
                                    </TabsTrigger>
                                    <TabsTrigger value="olahraga" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Olahraga
                                    </TabsTrigger>
                                    <TabsTrigger value="seni" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Seni
                                    </TabsTrigger>
                                    <TabsTrigger value="akademik" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Akademik
                                    </TabsTrigger>
                                    <TabsTrigger value="teknologi" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                                        Teknologi
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="semua" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {ekstrakurikulerData.map((ekskul) => (
                                        <Card
                                            key={ekskul.id}
                                            className="group hover:border-primary/50 h-full transition-all duration-300 hover:shadow-lg"
                                        >
                                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                                <img
                                                    src={ekskul.foto || '/placeholder.svg'}
                                                    alt={ekskul.nama}
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="from-primary/60 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            </div>
                                            <CardHeader>
                                                <CardTitle className="group-hover:text-primary transition-colors">{ekskul.nama}</CardTitle>
                                                <p className="text-muted-foreground text-sm">Ketua: {ekskul.ketua}</p>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-primary mb-1 font-medium">Visi</h4>
                                                        <p className="text-muted-foreground text-sm">{ekskul.visi}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-primary mb-1 font-medium">Misi</h4>
                                                        <p className="text-muted-foreground text-sm">{ekskul.misi}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-primary mb-1 font-medium">Kegiatan</h4>
                                                        <ul className="text-muted-foreground space-y-1 text-sm">
                                                            {ekskul.daftar_kegiatan.map((kegiatan, index) => (
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
                                                >
                                                    Bergabung
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            {['olahraga', 'seni', 'akademik', 'teknologi'].map((kategori) => (
                                <TabsContent key={kategori} value={kategori} className="mt-0">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {ekstrakurikulerData
                                            .filter((ekskul) => ekskul.kategori === kategori)
                                            .map((ekskul) => (
                                                <Card
                                                    key={ekskul.id}
                                                    className="group hover:border-primary/50 h-full transition-all duration-300 hover:shadow-lg"
                                                >
                                                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                                                        <img
                                                            src={ekskul.foto || '/placeholder.svg'}
                                                            alt={ekskul.nama}
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="from-primary/60 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                    </div>
                                                    <CardHeader>
                                                        <CardTitle className="group-hover:text-primary transition-colors">{ekskul.nama}</CardTitle>
                                                        <p className="text-muted-foreground text-sm">Ketua: {ekskul.ketua}</p>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="text-primary mb-1 font-medium">Visi</h4>
                                                                <p className="text-muted-foreground text-sm">{ekskul.visi}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-primary mb-1 font-medium">Misi</h4>
                                                                <p className="text-muted-foreground text-sm">{ekskul.misi}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-primary mb-1 font-medium">Kegiatan</h4>
                                                                <ul className="text-muted-foreground space-y-1 text-sm">
                                                                    {ekskul.daftar_kegiatan.map((kegiatan, index) => (
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
                                                        >
                                                            Bergabung
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
