<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    /**
     * Display a listing of alumni.
     */
    public function index(Request $request)
    {
        $users = User::whereHas('kuesioner')->where('role', 'siswa')->with('kuesioner')->latest()->whereNot('email', 'admin@gmail.com')->paginate(10);

        return Inertia::render('Admin/Alumni/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new alumni.
     */
    public function create()
    {
        return Inertia::render('Admin/Alumni/Create');
    }

    /**
     * Store a newly created alumni in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nisn' => 'required|string|max:20|unique:alumni',
            'angkatan' => 'required|string|max:4',
            'jurusan' => 'required|string|max:255',
            'judul' => 'nullable|string|max:255',
            'pekerjaan' => 'nullable|string|max:255',
            // 'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        // Handle file upload if provided
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('alumni', 'public');
            $validated['foto'] = $path;
        }

        Alumni::create($validated);

        return redirect()->route('admin.alumni.index')
            ->with('message', 'Alumni berhasil ditambahkan');
    }

    /**
     * Display the specified alumni.
     */
    public function show(User $user)
    {
        return Inertia::render('Admin/Alumni/Show', [
            'user' => $user->load('kuesioner')
        ]);
    }

    /**
     * Show the form for editing the specified alumni.
     */
    public function edit($alumni)
    {
        $alumni = Alumni::find($alumni);
        return Inertia::render('Admin/Alumni/Edit', [
            'alumni' => $alumni
        ]);
    }

    /**
     * Update the specified alumni in storage.
     */
    public function update(Request $request, $alumni)
    {
        $alumni = Alumni::find($alumni);
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nisn' => 'required|string|max:20|unique:alumni,nisn,' . $alumni->id,
            'angkatan' => 'required|string|max:4',
            'jurusan' => 'required|string|max:255',
            'judul' => 'nullable|string|max:255',
            'pekerjaan' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        // Handle file upload if provided
        if ($request->hasFile('foto')) {
            // Delete old image if exists
            if ($alumni->foto) {
                \Storage::disk('public')->delete($alumni->foto);
            }

            $path = $request->file('foto')->store('alumni', 'public');
            $validated['foto'] = $path;
        }

        $alumni->update($validated);

        return redirect()->route('admin.alumni.index')
            ->with('message', 'Alumni berhasil diperbarui');
    }

    /**
     * Remove the specified alumni from storage.
     */
    public function destroy($alumni)
    {
        $alumni = Alumni::find($alumni);
        // Delete image if exists
        if ($alumni->foto) {
            \Storage::disk('public')->delete($alumni->foto);
        }

        $alumni->delete();

        return redirect()->route('admin.alumni.index')
            ->with('message', 'Alumni berhasil dihapus');
    }

    /**
     * Export alumni data to Excel/CSV.
     */
    public function export(Request $request)
    {
        // Implementation for exporting data
        // This would typically use Laravel Excel or a similar package

        return redirect()->route('admin.alumni.index')
            ->with('message', 'Data alumni berhasil diekspor');
    }
}
