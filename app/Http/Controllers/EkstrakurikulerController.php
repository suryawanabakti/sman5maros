<?php

namespace App\Http\Controllers;

use App\Models\Ekstrakurikuler;
use App\Models\DaftarKegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EkstrakurikulerController extends Controller
{
    /**
     * Display a listing of the ekstrakurikuler.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $kategori = $request->query('kategori');

        $query = Ekstrakurikuler::query()->with('user');

        if ($kategori && $kategori !== 'semua') {
            $query->where('kategori', $kategori);
        }

        $ekstrakurikuler = $query->latest()->get();

        // Get all unique categories
        $categories = Ekstrakurikuler::select('kategori')->distinct()->pluck('kategori');

        return Inertia::render('Ekstrakurikuler/Index', [
            'ekstrakurikuler' => $ekstrakurikuler,
            'kategori' => $kategori,
            'categories' => $categories
        ]);
    }

    /**
     * Display the specified ekstrakurikuler.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $ekstrakurikuler = Ekstrakurikuler::with(['user', 'kegiatan'])->findOrFail($id);

        // Get related ekstrakurikuler (same category)
        $relatedEkstrakurikuler = Ekstrakurikuler::where('kategori', $ekstrakurikuler->kategori)
            ->where('id', '!=', $id)
            ->take(3)
            ->get();

        return Inertia::render('Ekstrakurikuler/Show', [
            'ekstrakurikuler' => $ekstrakurikuler,
            'relatedEkstrakurikuler' => $relatedEkstrakurikuler,
        ]);
    }
}
