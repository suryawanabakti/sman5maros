import { ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { router } from '@inertiajs/react';

interface DaftarKegiatanData {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
}

interface EkstrakurikulerData {
    id: number;
    nama: string;
    ketua: string;
    foto: string;
    visi: string;
    misi: string;
    tujuan: string;
    daftarKegiatan: DaftarKegiatanData[];
}

interface EkstrakurikulerSectionProps {
    ekstrakurikulerData: EkstrakurikulerData[];
}

export function EkstrakurikulerSection({ ekstrakurikulerData }: EkstrakurikulerSectionProps) {
    return (
        <section id="ekstrakurikuler" className="px-6 py-16 md:py-24">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-4">
                        Ekstrakurikuler
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kegiatan Ekstrakurikuler</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl md:text-lg">
                        Kembangkan bakat dan minat Anda melalui berbagai kegiatan ekstrakurikuler yang kami sediakan.
                    </p>
                </div>

                <Carousel className="w-full">
                    <CarouselContent>
                        {ekstrakurikulerData.map((ekskul) => (
                            <CarouselItem key={ekskul.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={ekskul.foto ? `/storage/${ekskul.foto}` : '/placeholder.svg?height=300&width=400'}
                                            alt={ekskul.nama}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <CardHeader>
                                        <CardTitle>{ekskul.nama}</CardTitle>
                                        <CardDescription>Ketua: {ekskul.ketua}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="mb-1 font-medium">Visi</h4>
                                                <p className="text-muted-foreground text-sm">{ekskul.visi}</p>
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-medium">Misi</h4>
                                                <p className="text-muted-foreground text-sm">{ekskul.misi}</p>
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-medium">Kegiatan</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm">
                                                    {ekskul.kegiatan.slice(0, 2).map((kegiatan) => (
                                                        <li key={kegiatan.id} className="flex items-center gap-2">
                                                            <ChevronRight className="h-3 w-3" />
                                                            {kegiatan.judul}
                                                        </li>
                                                    ))}
                                                    {ekskul.kegiatan.length > 2 && (
                                                        <li className="text-primary cursor-pointer hover:underline">
                                                            +{ekskul.kegiatan.length - 2} kegiatan lainnya
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={() => router.visit('/ekstrakurikuler/' + ekskul.id)}
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Detail
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="mt-8 flex justify-center gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
