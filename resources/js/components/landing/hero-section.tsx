import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

export function HeroSection() {
    return (
        <section id="beranda" className="relative">
            <div className="from-primary/20 to-primary/5 absolute inset-0 z-10 bg-gradient-to-r" />
            <div className="relative h-[600px] w-full"></div>
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="container p-5">
                    <div className="max-w-2xl space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Siap Mencetak Generasi Unggul dan Terampil</h1>
                        <p className="text-muted-foreground text-lg md:text-xl">
                            SMAN 5 Maros menyediakan pendidikan berkualitas dengan fasilitas modern dan kurikulum yang relevan dengan kebutuhan
                            industri.
                        </p>
                        <div className="z-50 flex flex-col gap-3 pt-4 sm:flex-row">
                            <Button size="lg" className="z-20" onClick={() => router.visit('/kuesioner')}>
                                Kuesioner
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
