<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakurikuler;
use App\Models\Kuesioner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = User::with('kuesioner')->where('role', 'siswa')->latest()->whereNot('email', 'admin@gmail.com')->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
        ]);

        $user = User::create([
            'name' => $request->name,
            'nama_ayah' => $request->nama_ayah,
            'email' => $request->email,
            'password' => Hash::make($request->nama_ayah),
            'role' => 'siswa',
        ]);

        return redirect()->route('admin.users.index')->with('message', 'User berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'nama_ayah' => 'required',
            'email' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'nama_ayah' => $request->nama_ayah,
        ];

        $data['password'] = Hash::make($request->nama_ayah);


        $user->update($data);

        return redirect()->route('admin.users.index')->with('message', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if (auth()->id() === $user->id) {
            return redirect()->route('admin.users.index')->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        Kuesioner::where('user_id', $user->id)->delete();
        Ekstrakurikuler::where('user_id', $user->id)->delete();

        $user->delete();

        return redirect()->route('admin.users.index')->with('message', 'User berhasil dihapus.');
    }
}
