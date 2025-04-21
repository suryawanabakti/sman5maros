import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
export interface BreadcrumbItem {
    label: string
    href?: string
  }
  
  export interface BreadcrumbItem {
    label: string
    href?: string
  }
  
  export interface Alumni {
    id: number
    nama: string
    nisn: string
    angkatan: string
    jurusan: string
    judul: string | null
    pekerjaan: string | null
    email: string | null
    telepon: string | null
    alamat: string | null
    foto: string | null
    foto_url: string
    created_at: string
    updated_at: string
  }
  
  export interface Beasiswa {
    id: number
    nama: string
    deskripsi: string
    kuota: number
    gambar: string | null
    gambar_url: string
    deadline: string
    persyaratan: string[] | string
    status: string
    created_at: string
    updated_at: string
  }

  export interface DaftarKegiatan {
    id: number
    ekstrakurikuler_id: number
    judul: string
    deskripsi: string
    gambar: string | null
    gambar_url: string
    created_at: string
    updated_at: string
    ekstrakurikuler?: Ekstrakurikuler
  }
  
  
  
  export interface Lowongan {
    id: number
    nama_perusahaan: string
    industri: string
    alamat: string
    telepon: string
    judul: string
    deskripsi: string
    tipe_pekerjaan: string
    tanggal_posting: string
    deadline: string
    gaji: string | null
    created_at: string
    updated_at: string
  }
  
  export interface Ekstrakurikuler {
    id: number
    nama: string
    ketua: string
    foto: string | null
    foto_url: string
    visi: string
    misi: string
    tujuan: string
    daftar_kegiatan: string[] | string
    kategori: string
    created_at: string
    updated_at: string
  }
  
  
  
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
