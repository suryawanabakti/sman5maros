<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lowongan extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lowongan';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nama_perusahaan',
        'industri',
        'alamat',
        'telepon',
        'judul',
        'deskripsi',
        'tipe_pekerjaan',
        'tanggal_posting',
        'deadline',
        'gaji',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */

    protected $casts = [
        'tanggal_posting' => 'date',
        'deadline' => 'date',
    ];
    protected function deadline(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::createFromDate($value)->format('Y-m-d'),
        );
    }
}
