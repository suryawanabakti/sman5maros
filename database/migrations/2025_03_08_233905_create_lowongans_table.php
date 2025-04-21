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
        Schema::create('lowongan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusahaan');
            $table->string('industri');
            $table->string('alamat');
            $table->string('telepon', 20);
            $table->string('judul');
            $table->text('deskripsi');
            $table->string('tipe_pekerjaan');
            $table->date('tanggal_posting');
            $table->date('deadline');
            $table->string('gaji')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lowongan');
    }
};
