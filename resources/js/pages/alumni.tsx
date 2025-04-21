import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { BookOpen, Briefcase, ChevronLeft, ChevronRight, Filter, GraduationCap, Search } from 'lucide-react';

// Updated data to use NISN instead of NIM

export default function AlumniPage({ alumniData }: any) {
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
                                    Alumni Kebanggaan
                                </h1>
                                <p className="text-muted-foreground mt-2 md:text-lg">
                                    Para alumni SMK Nusantara telah berhasil meraih prestasi dan berkontribusi di berbagai bidang.
                                </p>
                            </div>
                        </div>

                        <div className="mb-8 flex flex-col gap-6 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input placeholder="Cari alumni..." className="pl-10" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Angkatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Angkatan</SelectItem>
                                        <SelectItem value="2018">Angkatan 2018</SelectItem>
                                        <SelectItem value="2019">Angkatan 2019</SelectItem>
                                        <SelectItem value="2020">Angkatan 2020</SelectItem>
                                        <SelectItem value="2021">Angkatan 2021</SelectItem>
                                        <SelectItem value="2022">Angkatan 2022</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Jurusan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Jurusan</SelectItem>
                                        <SelectItem value="tkj">Teknik Komputer & Jaringan</SelectItem>
                                        <SelectItem value="rpl">Rekayasa Perangkat Lunak</SelectItem>
                                        <SelectItem value="mm">Multimedia</SelectItem>
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

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {alumniData.map((alumni) => (
                                <Card
                                    key={alumni.id}
                                    className="group hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="border-primary/20 group-hover:border-primary border-2 transition-colors duration-300">
                                                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${alumni.nama.charAt(0)}`} />
                                                <AvatarFallback className="bg-primary/10 text-primary">{alumni.nama.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="group-hover:text-primary text-lg transition-colors">{alumni.nama}</CardTitle>
                                                <CardDescription>
                                                    Angkatan {alumni.angkatan} - {alumni.jurusan}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <GraduationCap className="text-primary mt-1 h-4 w-4" />
                                                <p className="text-sm">NISN: {alumni.nisn}</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <BookOpen className="text-primary mt-1 h-4 w-4" />
                                                <p className="text-sm">Judul: {alumni.judul}</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Briefcase className="text-primary mt-1 h-4 w-4" />
                                                <p className="text-sm">{alumni.pekerjaan}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 w-full">
                                            Lihat Profil
                                        </Button>
                                    </CardFooter>
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
