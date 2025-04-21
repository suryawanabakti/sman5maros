import { Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

interface BeasiswaData {
    id: number;
    nama: string;
    deskripsi: string;
    kuota: number;
    gambar: string;
    status: string;
}

interface BeasiswaSectionProps {
    beasiswaData: BeasiswaData[];
}

export function BeasiswaSection({ beasiswaData }: BeasiswaSectionProps) {
    return (
        <section id="beasiswa" className="bg-muted/30 px-6 py-16 md:py-24">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-4">
                        Beasiswa
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Program Beasiswa</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl md:text-lg">
                        SMAN 5 Maros menyediakan berbagai program beasiswa untuk mendukung siswa berprestasi dan dari keluarga kurang mampu.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {beasiswaData.map((beasiswa) => (
                        <Card key={beasiswa.id} className="flex flex-col overflow-hidden md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3">
                                <img
                                    src={beasiswa.gambar ? `/storage/${beasiswa.gambar}` : '/placeholder.svg?height=200&width=300'}
                                    alt={beasiswa.nama}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 p-6">
                                <CardTitle className="mb-2">{beasiswa.nama}</CardTitle>
                                <CardDescription className="mb-4">{beasiswa.deskripsi}</CardDescription>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <span>Kuota: {beasiswa.kuota} siswa</span>
                                </div>
                                <Button className="mt-4" size="sm">
                                    Daftar Sekarang
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
