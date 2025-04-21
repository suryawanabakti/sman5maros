import { Briefcase, ChevronRight, MapPin, Phone, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LowonganData {
    id: number;
    nama_perusahaan: string;
    industri: string;
    alamat: string;
    telepon: string;
    judul: string;
    deskripsi: string;
    tipe_pekerjaan: string;
    status: string;
}

interface LowonganSectionProps {
    lowonganPekerjaanData: LowonganData[];
}

export function LowonganSection({ lowonganPekerjaanData }: LowonganSectionProps) {
    return (
        <section id="lowongan" className="bg-muted/30 px-6 py-16 md:py-24">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-4">
                        Karir
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lowongan Pekerjaan</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl md:text-lg">
                        Temukan peluang karir terbaik dari perusahaan mitra SMAN 5 Maros.
                    </p>
                </div>

                <div className="mb-8 flex flex-col gap-6 md:flex-row">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input placeholder="Cari lowongan..." className="pl-10" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            Full Time
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            Remote
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            Freelance
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {lowonganPekerjaanData.map((job) => (
                        <Card key={job.id} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{job.judul}</CardTitle>
                                        <CardDescription className="mt-1">{job.nama_perusahaan}</CardDescription>
                                    </div>
                                    <Badge>{job.tipe_pekerjaan}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">{job.industri}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">{job.alamat}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">{job.telepon}</span>
                                </div>
                                <p className="mt-4 text-sm">{job.deskripsi}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Lamar Sekarang</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <Button variant="outline">
                        Lihat Semua Lowongan
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
