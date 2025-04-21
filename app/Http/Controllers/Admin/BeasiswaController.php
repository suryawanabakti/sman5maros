<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Beasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BeasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Beasiswa::query();

        // Apply filters if provided
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        // Get paginated results
        $beasiswa = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Beasiswa/Index', [
            'beasiswa' => $beasiswa,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', 'all'),
            ],
            'filterOptions' => [
                'status' => ['Dibuka', 'Ditutup', 'Segera Dibuka'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Beasiswa/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'deadline' => 'required|date',
            'persyaratan' => 'required|array',
            'persyaratan.*' => 'required|string',
            'status' => 'required|string|in:Dibuka,Ditutup,Segera Dibuka',
            'gambar' => 'nullable|image|max:2048',
        ]);

        // Convert persyaratan array to JSON
        $validated['persyaratan'] = json_encode($validated['persyaratan']);

        // Handle file upload if provided
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('beasiswa', 'public');
            $validated['gambar'] = $path;
        }

        Beasiswa::create($validated);

        return redirect()->route('admin.beasiswa.index')
            ->with('message', 'Beasiswa berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Beasiswa $beasiswa)
    {
        // Convert persyaratan JSON back to array
        $beasiswa->persyaratan = is_string($beasiswa->persyaratan) ? json_decode($beasiswa->persyaratan, true) : $beasiswa->persyaratan;

        return Inertia::render('Admin/Beasiswa/Show', [
            'beasiswa' => $beasiswa
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Beasiswa $beasiswa)
    {
        $beasiswa->persyaratan = is_string($beasiswa->persyaratan) ? json_decode($beasiswa->persyaratan, true) : $beasiswa->persyaratan;

        return Inertia::render('Admin/Beasiswa/Edit', [
            'beasiswa' => $beasiswa
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Beasiswa $beasiswa)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'deadline' => 'required|date',
            'persyaratan' => 'required|array',
            'persyaratan.*' => 'required|string',
            'status' => 'required|string|in:Dibuka,Ditutup,Segera Dibuka',
            'gambar' => 'nullable|image|max:2048',
        ]);

        // Convert persyaratan array to JSON
        $validated['persyaratan'] = json_encode($validated['persyaratan']);

        // Handle file upload if provided
        if ($request->hasFile('gambar')) {
            // Delete old image if exists
            if ($beasiswa->gambar) {
                Storage::disk('public')->delete($beasiswa->gambar);
            }

            $path = $request->file('gambar')->store('beasiswa', 'public');
            $validated['gambar'] = $path;
        }

        $beasiswa->update($validated);

        return redirect()->route('admin.beasiswa.index')
            ->with('message', 'Beasiswa berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Beasiswa $beasiswa)
    {
        // Delete image if exists
        if ($beasiswa->gambar) {
            Storage::disk('public')->delete($beasiswa->gambar);
        }

        $beasiswa->delete();

        return redirect()->route('admin.beasiswa.index')
            ->with('message', 'Beasiswa berhasil dihapus');
    }
}
