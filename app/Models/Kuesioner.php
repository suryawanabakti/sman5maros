<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kuesioner extends Model
{
    use HasFactory;

    protected $fillable = [
        'kelas',
        'angkatan',
        'kegiatan_setelah_lulus',
        'jalur_masuk',
        'tipe_kampus',
        'nama_kampus',
        'fakultas',
        'prodi',
        'nama_perusahaan',
        'nama_kesatuan',
        'alamat',
        'user_id'
    ];

    protected $casts = [
        'kegiatan_setelah_lulus' => 'string',
        'jalur_masuk' => 'string',
        'tipe_kampus' => 'string',
        'angkatan' => 'integer',
    ];
}
