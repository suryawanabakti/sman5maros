<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kuesioners', function (Blueprint $table) {
            $table->id();
            $table->string('angkatan')->default(2025);
            $table->foreignId('user_id')->default(1)->constrained('users');
            $table->string('kelas');
            $table->enum('kegiatan_setelah_lulus', ["menikah", "kuliah", "kerja", "dll"]);
            $table->timestamps();
            // Di bawah ini harus di isi jika kegiatan_setelah_lulus = kuliah
            $table->enum('jalur_masuk', ["SNMPTN", "SBMPTN", "MANDIRI"])->nullable();
            $table->enum('tipe_kampus', ["ptn", "pts"])->nullable();
            $table->string('nama_kampus')->nullable();
            $table->string('fakultas')->nullable();
            $table->string('prodi')->nullable();

            // Dibawah ini harus di isi jika kegiatan_setelah_lulus = kerja
            $table->string('nama_perusahaan')->nullable();
            $table->string('nama_kesatuan')->nullable();
            $table->text('alamat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kuesioners');
    }
};
