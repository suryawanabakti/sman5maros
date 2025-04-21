import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
            <div className="container">
                <div className="flex flex-col items-center text-center">
                    <h2 className="max-w-3xl text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Siap Menjadi Bagian dari SMAN 5 Maros?</h2>
                    <p className="mt-4 max-w-2xl md:text-lg">
                        Bergabunglah dengan kami dan raih masa depan cerah dengan pendidikan berkualitas dan fasilitas modern.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" variant="secondary">
                            Daftar Sekarang
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent">
                            Hubungi Kami
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
