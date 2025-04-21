import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-4">
                        Testimonial
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Apa Kata Mereka?</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl md:text-lg">
                        Dengarkan pengalaman langsung dari siswa, alumni, dan orang tua tentang SMAN 5 Maros.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="/placeholder.svg?height=64&width=64&text=R" />
                                    <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm italic">
                                        "SMAN 5 Maros memberikan saya bekal keterampilan yang sangat relevan dengan kebutuhan industri. Berkat
                                        pendidikan di sini, saya langsung mendapatkan pekerjaan setelah lulus."
                                    </p>
                                    <h4 className="mt-4 font-medium">Rudi Hermawan</h4>
                                    <p className="text-muted-foreground text-sm">Alumni 2020</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="/placeholder.svg?height=64&width=64&text=S" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm italic">
                                        "Sebagai orang tua, saya sangat puas dengan perkembangan anak saya di SMAN 5 Maros. Guru-gurunya kompeten dan
                                        fasilitas praktikumnya lengkap."
                                    </p>
                                    <h4 className="mt-4 font-medium">Siti Rahayu</h4>
                                    <p className="text-muted-foreground text-sm">Orang Tua Siswa</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="/placeholder.svg?height=64&width=64&text=D" />
                                    <AvatarFallback>D</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm italic">
                                        "Belajar di SMAN 5 Maros sangat menyenangkan. Selain mendapatkan ilmu, saya juga bisa mengembangkan minat
                                        melalui kegiatan ekstrakurikuler yang beragam."
                                    </p>
                                    <h4 className="mt-4 font-medium">Dian Pratiwi</h4>
                                    <p className="text-muted-foreground text-sm">Siswa Kelas XII</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
