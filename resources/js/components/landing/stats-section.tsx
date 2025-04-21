export function StatsSection() {
    return (
        <section className="bg-muted/50 border-t border-b">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">1250+</h3>
                        <p className="text-muted-foreground text-sm">Siswa Aktif</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">95%</h3>
                        <p className="text-muted-foreground text-sm">Tingkat Kelulusan</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">85%</h3>
                        <p className="text-muted-foreground text-sm">Terserap Industri</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">50+</h3>
                        <p className="text-muted-foreground text-sm">Mitra Industri</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
