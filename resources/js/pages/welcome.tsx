'use client';

import { EkstrakurikulerSection } from '@/components/landing/ekstrakurikuler-section';
import { HeroSection } from '@/components/landing/hero-section';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';

interface LandingPageProps {
    alumniData: Array<{
        id: number;
        nama: string;
        nim: string;
        angkatan: string;
        judul: string;
    }>;
    beasiswaData: Array<{
        id: number;
        nama: string;
        deskripsi: string;
        kuota: number;
        gambar: string;
        status: string;
    }>;
    lowonganPekerjaanData: Array<{
        id: number;
        nama_perusahaan: string;
        industri: string;
        alamat: string;
        telepon: string;
        judul: string;
        deskripsi: string;
        tipe_pekerjaan: string;
        status: string;
    }>;
    ekstrakurikulerData: Array<{
        id: number;
        nama: string;
        ketua: string;
        foto: string;
        visi: string;
        misi: string;
        tujuan: string;
        daftarKegiatan: Array<{
            id: number;
            judul: string;
            deskripsi: string;
            gambar: string;
        }>;
    }>;
}

export default function LandingPage({ alumniData, beasiswaData, lowonganPekerjaanData, ekstrakurikulerData }: LandingPageProps) {
    return (
        <MainLayout title="Beranda">
            <Head title="Welcome" />
            <HeroSection />
            {/* <StatsSection /> */}
            {/* <AlumniSection alumniData={alumniData} /> */}
            {/* <BeasiswaSection beasiswaData={beasiswaData} />
            <LowonganSection lowonganPekerjaanData={lowonganPekerjaanData} /> */}
            <EkstrakurikulerSection ekstrakurikulerData={ekstrakurikulerData} />
            {/* <CTASection /> */}
        </MainLayout>
    );
}
