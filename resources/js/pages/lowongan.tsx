import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { Building, Calendar, ChevronLeft, ChevronRight, Filter, MapPin, Phone, Search } from 'lucide-react';

export default function LowonganPage({ lowonganPekerjaanData }: any) {
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
                                    Lowongan Pekerjaan
                                </h1>
                                <p className="text-muted-foreground mt-2 md:text-lg">
                                    Temukan peluang karir terbaik dari perusahaan mitra SMAN 5 Maros.
                                </p>
                            </div>
                        </div>

                        <div className="mb-8 flex flex-col gap-6 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input placeholder="Cari lowongan..." className="pl-10" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Tipe Pekerjaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Tipe</SelectItem>
                                        <SelectItem value="full-time">Full Time</SelectItem>
                                        <SelectItem value="part-time">Part Time</SelectItem>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="freelance">Freelance</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white"
                                >
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {lowonganPekerjaanData.map((job) => (
                                <Card
                                    key={job.id}
                                    className="group hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="group-hover:text-primary transition-colors">{job.judul}</CardTitle>
                                                <CardDescription className="mt-1">{job.nama_perusahaan}</CardDescription>
                                            </div>
                                            <Badge
                                                className={` ${
                                                    job.tipe_pekerjaan === 'Full Time'
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : job.tipe_pekerjaan === 'Remote'
                                                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                                          : job.tipe_pekerjaan === 'Part Time'
                                                            ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                                            : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                                                } `}
                                            >
                                                {job.tipe_pekerjaan}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Building className="text-primary h-4 w-4" />
                                            <span className="text-sm">{job.industri}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="text-primary h-4 w-4" />
                                            <span className="text-sm">{job.alamat}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="text-primary h-4 w-4" />
                                            <span className="text-sm">{job.telepon}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="text-primary h-4 w-4" />
                                            <span className="text-sm">Deadline: {job.deadline}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                                                <line x1="2" x2="22" y1="20" y2="20" />
                                            </svg>
                                            <span className="text-sm">Gaji: {job.gaji}</span>
                                        </div>
                                        <p className="mt-4 text-sm">{job.deskripsi}</p>
                                    </CardContent>
                                    <CardFooter>{/* <Button className="bg-primary hover:bg-primary/90 w-full">Lamar Sekarang</Button> */}</CardFooter>
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
                                <Button variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white">
                                    3
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
