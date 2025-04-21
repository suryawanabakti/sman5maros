<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lowongan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LowonganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Lowongan::query();

        // Apply filters if provided
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('nama_perusahaan', 'like', "%{$search}%")
                    ->orWhere('industri', 'like', "%{$search}%");
            });
        }

        if ($request->has('tipe_pekerjaan') && $request->input('tipe_pekerjaan') !== 'all') {
            $query->where('tipe_pekerjaan', $request->input('tipe_pekerjaan'));
        }

        if ($request->has('industri') && $request->input('industri') !== 'all') {
            $query->where('industri', $request->input('industri'));
        }

        // Get paginated results
        $lowongan = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get unique tipe_pekerjaan and industri for filters
        $tipe_pekerjaan = Lowongan::distinct()->pluck('tipe_pekerjaan')->sort();
        $industri = Lowongan::distinct()->pluck('industri')->sort();

        return Inertia::render('Admin/Lowongan/Index', [
            'lowongan' => $lowongan,
            'filters' => [
                'search' => $request->input('search', ''),
                'tipe_pekerjaan' => $request->input('tipe_pekerjaan', 'all'),
                'industri' => $request->input('industri', 'all'),
            ],
            'filterOptions' => [
                'tipe_pekerjaan' => $tipe_pekerjaan,
                'industri' => $industri,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Lowongan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_perusahaan' => 'required|string|max:255',
            'industri' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:20',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tipe_pekerjaan' => 'required|string|max:50',
            'tanggal_posting' => 'required|date',
            'deadline' => 'required|date|after_or_equal:tanggal_posting',
            'gaji' => 'nullable|string|max:255',
        ]);

        Lowongan::create($validated);

        return redirect()->route('admin.lowongan.index')
            ->with('message', 'Lowongan pekerjaan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lowongan $lowongan)
    {
        return Inertia::render('Admin/Lowongan/Show', [
            'lowongan' => $lowongan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lowongan $lowongan)
    {
        return Inertia::render('Admin/Lowongan/Edit', [
            'lowongan' => $lowongan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lowongan $lowongan)
    {
        $validated = $request->validate([
            'nama_perusahaan' => 'required|string|max:255',
            'industri' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:20',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tipe_pekerjaan' => 'required|string|max:50',
            'tanggal_posting' => 'required|date',
            'deadline' => 'required|date|after_or_equal:tanggal_posting',
            'gaji' => 'nullable|string|max:255',
        ]);

        $lowongan->update($validated);

        return redirect()->route('admin.lowongan.index')
            ->with('message', 'Lowongan pekerjaan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lowongan $lowongan)
    {
        $lowongan->delete();

        return redirect()->route('admin.lowongan.index')
            ->with('message', 'Lowongan pekerjaan berhasil dihapus');
    }
}
