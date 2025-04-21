<?php

use App\Http\Controllers\Admin\AlumniController;
use App\Http\Controllers\Admin\BeasiswaController;
use App\Http\Controllers\Admin\DaftarKegiatanController;
use App\Http\Controllers\Admin\EkstrakurikulerController;
use App\Http\Controllers\Admin\KuesionerController as AdminKuesionerController;
use App\Http\Controllers\Admin\LowonganController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\EkstrakurikulerController as ControllersEkstrakurikulerController;
use App\Http\Controllers\KuesionerController;
use App\Models\Alumni;
use App\Models\Beasiswa;
use App\Models\Ekstrakurikuler;
use App\Models\Kuesioner;
use App\Models\Lowongan;
use App\Models\PerguruanTinggi;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $alumniData = Alumni::latest()->take(6)->get();

    $beasiswaData = Beasiswa::where('status', 'active')
        ->latest()
        ->take(4)
        ->get();

    $lowonganPekerjaanData = Lowongan::where('status', 'active')
        ->latest()
        ->take(4)
        ->get();

    $ekstrakurikulerData = Ekstrakurikuler::with('kegiatan')
        ->latest()
        ->take(6)
        ->get();


    return Inertia::render('welcome', [
        'alumniData' => $alumniData,
        'beasiswaData' => $beasiswaData,

        'lowonganPekerjaanData' => $lowonganPekerjaanData,
        'ekstrakurikulerData' => $ekstrakurikulerData,
    ]);
})->name('home');

Route::get('/alumni', function () {
    $alumniData = Alumni::all();
    return Inertia::render('alumni', ["alumniData" => $alumniData]);
})->name('alumni');


Route::get('/beasiswa', function () {
    $beasiswaData = Beasiswa::all()->map(function ($data) {
        $data['persyaratan'] = is_string($data->persyaratan) ? json_decode($data->persyaratan, true) : $data->persyaratan;
        return $data;
    });

    return Inertia::render('beasiswa', ["beasiswaData" => $beasiswaData]);
})->name('beasiswa');


Route::get('/lowongan', function () {
    $lowonganPekerjaanData = Lowongan::all();
    return Inertia::render('lowongan', ["lowonganPekerjaanData" => $lowonganPekerjaanData]);
})->name('lowongan');


// Ekstrakurikuler Routes
Route::get('/ekstrakurikuler', [ControllersEkstrakurikulerController::class, 'index'])->name('ekstrakurikuler.index');
Route::get('/ekstrakurikuler/{id}', [ControllersEkstrakurikulerController::class, 'show'])->name('ekstrakurikuler.show');

Route::get('/get-ekstrakurikuler', function () {
    return Ekstrakurikuler::all();
});
// Kuesioner routes
Route::middleware('auth')->group(function () {
    Route::get('/kuesioner', [KuesionerController::class, 'index'])->name('kuesioner.index');
    Route::post('/kuesioner', [KuesionerController::class, 'store'])->name('kuesioner.store');
    Route::get('/kuesioner/success', [KuesionerController::class, 'success'])->name('kuesioner.success');
});

Route::get('dashboard', function () {
    if (request()->user()->role === 'siswa') {
        return redirect('/');
    }

    if (auth()->user()->role === 'ketua') {
        $ekstrakurikuler = Ekstrakurikuler::where('user_id', auth()->id())->first();
        if (!empty($ekstrakurikuler)) {

            return redirect('/admin/ekstrakurikuler/' . $ekstrakurikuler->id);
        }
        return redirect('/');
    }

    // Data alumni berdasarkan tahun kelulusan
    $alumniData = User::whereHas('kuesioner')
        ->join('kuesioners', 'users.id', '=', 'kuesioners.user_id') // Sesuaikan nama FK
        ->select('kuesioners.angkatan', \DB::raw('COUNT(DISTINCT users.id) as count')) // Hitung user unik
        ->groupBy('kuesioners.angkatan')
        ->orderBy('kuesioners.angkatan', 'asc')
        ->get()
        ->map(function ($item) {
            return [
                'name' => (string) $item->angkatan,
                'count' => $item->count,
            ];
        });

    $totalAlumni = User::whereHas('kuesioner')->count();
    $totalBeasiswa = Beasiswa::count();
    $totalLowongan = Lowongan::count();
    $totalUsers = User::count();
    return Inertia::render('dashboard', [
        "alumniData" => $alumniData,
        "totalAlumni" => $totalAlumni,
        "totalBeasiswa" => $totalBeasiswa,
        "totalLowongan" => $totalLowongan,
        "totalUsers" => $totalUsers,
    ]);
})->name('dashboard')->middleware('auth');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    // Alumni management
    // Users - New CRUD

    // Add these new routes:
    Route::get('/users/import', [App\Http\Controllers\Admin\UserImportController::class, 'index'])->name('users.import');
    Route::post('/users/import', [App\Http\Controllers\Admin\UserImportController::class, 'store'])->name('users.import.store');
    Route::get('/users/import/template', [App\Http\Controllers\Admin\UserImportController::class, 'template'])->name('users.import.template');
    Route::resource('users', UserController::class);


    Route::get('/alumni/export', [AlumniController::class, 'export'])->name('alumni.export');
    Route::get('/alumni', [AlumniController::class, 'index'])->name('alumni.index');
    Route::get('/alumni/{user}', [AlumniController::class, 'show'])->name('alumni.show');
    // Beasiswa management
    Route::resource('beasiswa', BeasiswaController::class);

    // Lowongan management
    Route::resource('lowongan', LowonganController::class);

    // Ekstrakurikuler management
    Route::resource('ekstrakurikuler', EkstrakurikulerController::class);
    Route::resource('kegiatan', DaftarKegiatanController::class);

    Route::get('kuesioner', [AdminKuesionerController::class, 'index'])->name('admin.kuesioner.index');
    Route::get('kuesioner/report', [AdminKuesionerController::class, 'report'])->name('admin.kuesioner.report');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
