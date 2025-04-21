<?php

namespace App\Http\Controllers;

use App\Models\Kuesioner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KuesionerController extends Controller
{
    public function index()
    {
        // Get current year for the angkatan dropdown
        $currentYear = date('Y');
        $years = range($currentYear, $currentYear - 5);

        return Inertia::render('Kuesioner/Index', [
            'years' => $years
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas' => 'required|string|max:255',
            'angkatan' => 'required|integer|min:2000|max:' . date('Y'),
            'kegiatan_setelah_lulus' => 'required|in:menikah,kuliah,kerja,dll',
            'jalur_masuk' => 'nullable|required_if:kegiatan_setelah_lulus,kuliah|in:SNMPTN,SBMPTN,MANDIRI',
            'tipe_kampus' => 'nullable|required_if:kegiatan_setelah_lulus,kuliah|in:ptn,pts',
            'nama_kampus' => 'nullable|required_if:kegiatan_setelah_lulus,kuliah|string|max:255',
            'fakultas' => 'nullable|required_if:kegiatan_setelah_lulus,kuliah|string|max:255',
            'prodi' => 'nullable|required_if:kegiatan_setelah_lulus,kuliah|string|max:255',
            'nama_perusahaan' => 'nullable|required_if:kegiatan_setelah_lulus,kerja|string|max:255',
            'nama_kesatuan' => 'nullable|required_if:kegiatan_setelah_lulus,kerja|string|max:255',
            'alamat' => 'nullable|required_if:kegiatan_setelah_lulus,kerja|string',
        ]);

        $validated['user_id'] = auth()->id();
        Kuesioner::create($validated);

        return redirect()->route('kuesioner.success');
    }

    public function success()
    {
        return Inertia::render('Kuesioner/Success');
    }
}
