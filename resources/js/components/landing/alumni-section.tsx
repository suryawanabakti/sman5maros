import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AlumniData {
    id: number;
    nama: string;
    nim: string;
    angkatan: string;
    judul: string;
}

interface AlumniSectionProps {
    alumniData: AlumniData[];
}

export function AlumniSection({ alumniData }: AlumniSectionProps) {
    return (
        <section id="alumni" className="relative px-6 py-16 md:py-24">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-4">
                        Alumni
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Alumni Kebanggaan Kami</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl md:text-lg">
                        Para alumni SMAN 5 Maros telah berhasil meraih prestasi dan berkontribusi di berbagai bidang.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {alumniData.map((alumni) => (
                        <Card key={alumni.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${alumni.nama.charAt(0)}`} />
                                        <AvatarFallback>{alumni.nama.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{alumni.nama}</CardTitle>
                                        <CardDescription>Angkatan {alumni.angkatan}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <GraduationCap className="text-muted-foreground mt-1 h-4 w-4" />
                                        <p className="text-sm">NIM: {alumni.nim}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BookOpen className="text-muted-foreground mt-1 h-4 w-4" />
                                        <p className="text-sm">Judul: {alumni.judul}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" size="sm" className="w-full">
                                    Lihat Profil
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <Button variant="outline">
                        Lihat Semua Alumni
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
