<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DaftarKegiatan;
use App\Models\Ekstrakurikuler;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DaftarKegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DaftarKegiatan::with('ekstrakurikuler');

        // Apply filters if provided
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        if ($request->has('ekstrakurikuler_id') && $request->input('ekstrakurikuler_id') !== 'all') {
            $query->where('ekstrakurikuler_id', $request->input('ekstrakurikuler_id'));
        }

        // Get paginated results
        $kegiatan = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all ekstrakurikuler for filter dropdown
        $ekstrakurikulerList = Ekstrakurikuler::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Admin/DaftarKegiatan/Index', [
            'kegiatan' => $kegiatan,
            'filters' => [
                'search' => $request->input('search', ''),
                'ekstrakurikuler_id' => $request->input('ekstrakurikuler_id', 'all'),
            ],
            'ekstrakurikulerList' => $ekstrakurikulerList,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ekstrakurikulerList = Ekstrakurikuler::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Admin/DaftarKegiatan/Create', [
            'ekstrakurikulerList' => $ekstrakurikulerList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ekstrakurikuler_id' => 'required|exists:ekstrakurikuler,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|max:2048',
        ]);

        // Handle file upload if provided
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('kegiatan', 'public');
            $validated['gambar'] = $path;
        }

        DaftarKegiatan::create($validated);

        return redirect()->route('admin.ekstrakurikuler.show', $request->ekstrakurikuler_id)
            ->with('message', 'Kegiatan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(DaftarKegiatan $kegiatan)
    {
        // Load the ekstrakurikuler relationship
        $kegiatan->load('ekstrakurikuler');

        return Inertia::render('Admin/DaftarKegiatan/Show', [
            'kegiatan' => $kegiatan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DaftarKegiatan $kegiatan)
    {
        $ekstrakurikulerList = Ekstrakurikuler::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Admin/DaftarKegiatan/Edit', [
            'kegiatan' => $kegiatan,
            'ekstrakurikulerList' => $ekstrakurikulerList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DaftarKegiatan $kegiatan)
    {
        $validated = $request->validate([
            'ekstrakurikuler_id' => 'required|exists:ekstrakurikuler,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|max:2048',
        ]);

        // Handle file upload if provided
        if ($request->hasFile('gambar')) {
            // Delete old image if exists
            if ($kegiatan->gambar) {
                Storage::disk('public')->delete($kegiatan->gambar);
            }

            $path = $request->file('gambar')->store('kegiatan', 'public');
            $validated['gambar'] = $path;
        }

        $kegiatan->update($validated);

        return redirect()->route('admin.kegiatan.index')
            ->with('message', 'Kegiatan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DaftarKegiatan $kegiatan)
    {
        // Delete image if exists
        if ($kegiatan->gambar) {
            Storage::disk('public')->delete($kegiatan->gambar);
        }

        $kegiatan->delete();

        return redirect()->route('admin.kegiatan.index')
            ->with('message', 'Kegiatan berhasil dihapus');
    }
}
