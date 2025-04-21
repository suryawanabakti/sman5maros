import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone, School } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-muted border-t py-12">
            <div className="container">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <School className="h-6 w-6" />
                            <span className="text-xl font-bold">SMAN 5 Maros</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Mencetak generasi unggul yang siap bersaing di era global dengan keterampilan yang relevan.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-facebook"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-instagram"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-twitter"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-youtube"
                                >
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                    <path d="m10 15 5-3-5-3z" />
                                </svg>
                                <span className="sr-only">YouTube</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-medium">Tautan Cepat</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Program Keahlian
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Fasilitas
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Berita & Acara
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Galeri
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-medium">Program Keahlian</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Teknik Komputer & Jaringan
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Rekayasa Perangkat Lunak
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Multimedia
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Akuntansi
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                                    Administrasi Perkantoran
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-medium">Kontak Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                                <span className="text-muted-foreground text-sm">Jl. Pendidikan No. 123, Kota Nusantara, 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-muted-foreground h-5 w-5" />
                                <span className="text-muted-foreground text-sm">(021) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-muted-foreground h-5 w-5" />
                                <span className="text-muted-foreground text-sm">info@smknusantara.sch.id</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="text-muted-foreground h-5 w-5" />
                                <span className="text-muted-foreground text-sm">Senin - Jumat: 07:00 - 16:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
                    <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} SMK Nusantara. Hak Cipta Dilindungi.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                            Kebijakan Privasi
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                            Syarat & Ketentuan
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
