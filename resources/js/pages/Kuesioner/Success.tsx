import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function KuesionerSuccess() {
    return (
        <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="from-primary/5 to-background bg-gradient-to-b py-12 md:py-16">
                    <div className="container max-w-md">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl">Terima Kasih!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Kuesioner Anda telah berhasil dikirim. Informasi yang Anda berikan sangat berharga bagi kami untuk meningkatkan
                                    kualitas pendidikan.
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button asChild>
                                    <Link href="/">Kembali ke Beranda</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
