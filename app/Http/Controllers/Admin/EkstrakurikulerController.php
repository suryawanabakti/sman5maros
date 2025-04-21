<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakurikuler;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class EkstrakurikulerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Ekstrakurikuler::with('user');
        if ($request->user()->email !== "admin@gmail.com") {
            $query->where('user_id', $request->user()->id);
        }
        // Apply filters if provided
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('ketua', 'like', "%{$search}%");
            });
        }

        if ($request->has('kategori') && $request->input('kategori') !== 'all') {
            $query->where('kategori', $request->input('kategori'));
        }

        // Get paginated results
        $ekstrakurikuler = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get unique kategori for filters
        $kategori = Ekstrakurikuler::distinct()->pluck('kategori')->sort();

        return Inertia::render('Admin/Ekstrakurikuler/Index', [
            'ekstrakurikuler' => $ekstrakurikuler,
            'filters' => [
                'search' => $request->input('search', ''),
                'kategori' => $request->input('kategori', 'all'),
            ],
            'filterOptions' => [
                'kategori' => $kategori,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get users that don't have an ekstrakurikuler assigned
        $availableUsers = User::whereDoesntHave('ekstrakurikuler')->whereNot('email', 'admin@gmail.com')->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Ekstrakurikuler/Create', [
            'availableUsers' => $availableUsers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'tujuan' => 'required|string',
            'kategori' => 'required|string|in:Olahraga,Seni,Akademik,Keagamaan,Lainnya',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email|unique:users,email',
            'user_password' => ['required', Password::defaults()],
            'foto' => 'nullable|image|max:2048', // Max 2MB
        ]);

        // Use a database transaction to ensure data integrity
        DB::beginTransaction();

        try {
            // Create a new user
            $user = User::create([
                'name' => $validated['user_name'],
                'email' => $validated['user_email'],
                'password' => Hash::make($validated['user_password']),
                'role' => 'ketua', // Assign appropriate role
            ]);

            // Handle file upload if a photo was provided
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $fotoPath = $request->file('foto')->store('ekstrakurikuler', 'public');
            }

            // Create the ekstrakurikuler record
            Ekstrakurikuler::create([
                'nama' => $validated['nama'],
                'visi' => $validated['visi'],
                'misi' => $validated['misi'],
                'ketua' => $validated['user_name'],
                'tujuan' => $validated['tujuan'],
                'kategori' => $validated['kategori'],
                'user_id' => $user->id,
                'foto' => $fotoPath,
                'status' => 'aktif', // Default status
            ]);

            DB::commit();

            return redirect()->route('admin.ekstrakurikuler.index')
                ->with('message', 'Ekstrakurikuler berhasil ditambahkan');
        } catch (\Exception $e) {
            return $e;
            DB::rollBack();

            // If there was an uploaded file, delete it
            if (isset($fotoPath) && Storage::disk('public')->exists($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }

            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function show(Ekstrakurikuler $ekstrakurikuler)
    {

        // Load the kegiatan relationship and user relationship
        $ekstrakurikuler->load(['kegiatan', 'user']);

        return Inertia::render('Admin/Ekstrakurikuler/Show', [
            'ekstrakurikuler' => $ekstrakurikuler
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ekstrakurikuler $ekstrakurikuler)
    {
        // Get users that don't have an ekstrakurikuler assigned or are assigned to this one
        $availableUsers = User::where(function ($query) use ($ekstrakurikuler) {
            $query->whereDoesntHave('ekstrakurikuler')
                ->orWhere('id', $ekstrakurikuler->user_id);
        })->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Ekstrakurikuler/Edit', [
            'ekstrakurikuler' => $ekstrakurikuler->load('user'),
            'availableUsers' => $availableUsers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ekstrakurikuler $ekstrakurikuler)
    {
        // Get the current user if exists
        $currentUser = $ekstrakurikuler->user;

        // Validate the request data
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'tujuan' => 'required|string',
            'kategori' => 'required|string|in:Olahraga,Seni,Akademik,Keagamaan,Lainnya',
            'status' => 'required|string|in:aktif,nonaktif',
            'user_name' => 'required|string|max:255',
            'user_email' => [
                'required',
                'email',
            ],
            'user_password' => [
                'nullable',
                // Only apply password rules if a new password is provided
                $request->filled('user_password') ? Password::defaults() : '',
            ],
            'foto' => 'nullable|image|max:2048', // Max 2MB
        ]);

        // Use a database transaction to ensure data integrity
        DB::beginTransaction();

        try {
            // Handle user update or creation
            if ($currentUser) {
                // Update existing user
                $userData = [
                    'name' => $validated['user_name'],
                    'email' => $validated['user_email'],
                ];

                // Only update password if a new one is provided
                if (!empty($validated['user_password'])) {
                    $userData['password'] = Hash::make($validated['user_password']);
                }

                $currentUser->update($userData);
                $userId = $currentUser->id;
            } else {
                // Create a new user
                $user = User::create([
                    'name' => $validated['user_name'],
                    'email' => $validated['user_email'],
                    'password' => Hash::make($validated['user_password'] ?: str_random(10)), // Generate random password if none provided
                    'role' => 'ketua_ekstrakurikuler',
                ]);
                $userId = $user->id;
            }

            // Handle file upload if a new photo was provided
            $fotoPath = $ekstrakurikuler->foto; // Keep existing photo by default

            if ($request->hasFile('foto')) {
                // Delete old photo if exists
                if ($ekstrakurikuler->foto && Storage::disk('public')->exists($ekstrakurikuler->foto)) {
                    Storage::disk('public')->delete($ekstrakurikuler->foto);
                }

                // Store new photo
                $fotoPath = $request->file('foto')->store('ekstrakurikuler', 'public');
            }

            // Update the ekstrakurikuler record
            $ekstrakurikuler->update([
                'nama' => $validated['nama'],
                'visi' => $validated['visi'],
                'misi' => $validated['misi'],
                'tujuan' => $validated['tujuan'],
                'kategori' => $validated['kategori'],
                'status' => $validated['status'],
                'user_id' => $userId,
                'foto' => $fotoPath,
            ]);

            DB::commit();

            return redirect()->route('admin.ekstrakurikuler.index')
                ->with('message', 'Ekstrakurikuler berhasil diperbarui');
        } catch (\Exception $e) {
            DB::rollBack();

            // If there was a newly uploaded file, delete it
            if (isset($newFotoPath) && Storage::disk('public')->exists($newFotoPath)) {
                Storage::disk('public')->delete($newFotoPath);
            }

            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ekstrakurikuler $ekstrakurikuler)
    {
        // Delete image if exists
        if ($ekstrakurikuler->foto) {
            Storage::disk('public')->delete($ekstrakurikuler->foto);
        }

        // Related kegiatan will be deleted automatically due to onDelete('cascade')
        $ekstrakurikuler->delete();

        return redirect()->route('admin.ekstrakurikuler.index')
            ->with('message', 'Ekstrakurikuler berhasil dihapus');
    }
}
