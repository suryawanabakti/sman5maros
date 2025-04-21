<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kuesioner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class KuesionerController extends Controller
{
    public function index()
    {
        $kuesioners = Kuesioner::latest()->paginate(10);

        return Inertia::render('Admin/Kuesioner/Index', [
            'kuesioners' => $kuesioners
        ]);
    }

    public function report(Request $request)
    {
        // Get all available angkatan years for filter
        $years = Kuesioner::select('angkatan')
            ->distinct()
            ->orderBy('angkatan', 'desc')
            ->pluck('angkatan');

        // Get selected angkatan from request or use all
        $selectedAngkatan = $request->input('angkatan', 'all');

        // Base query
        $query = Kuesioner::query();

        // Apply filter if specific angkatan is selected
        if ($selectedAngkatan !== 'all') {
            $query->where('angkatan', $selectedAngkatan);
        }

        // Get kegiatan_setelah_lulus distribution
        $kegiatanData = $query->clone()
            ->select('kegiatan_setelah_lulus', DB::raw('count(*) as total'))
            ->groupBy('kegiatan_setelah_lulus')
            ->get();

        // Get tipe_kampus distribution (only for kuliah)
        $kampusData = $query->clone()
            ->where('kegiatan_setelah_lulus', 'kuliah')
            ->select('tipe_kampus', DB::raw('count(*) as total'))
            ->groupBy('tipe_kampus')
            ->get();

        // Get jalur_masuk distribution (only for kuliah)
        $jalurMasukData = $query->clone()
            ->where('kegiatan_setelah_lulus', 'kuliah')
            ->select('jalur_masuk', DB::raw('count(*) as total'))
            ->groupBy('jalur_masuk')
            ->get();

        // Get top 5 universities
        $universitiesData = $query->clone()
            ->where('kegiatan_setelah_lulus', 'kuliah')
            ->select('nama_kampus', DB::raw('count(*) as total'))
            ->groupBy('nama_kampus')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        // Get top 5 companies
        $companiesData = $query->clone()
            ->where('kegiatan_setelah_lulus', 'kerja')
            ->select('nama_perusahaan', DB::raw('count(*) as total'))
            ->groupBy('nama_perusahaan')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Kuesioner/Report', [
            'years' => $years,
            'selectedAngkatan' => $selectedAngkatan,
            'kegiatanData' => $kegiatanData,
            'kampusData' => $kampusData,
            'jalurMasukData' => $jalurMasukData,
            'universitiesData' => $universitiesData,
            'companiesData' => $companiesData,
        ]);
    }
}
