<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ekstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'ekstrakurikuler';

    protected $fillable = [
        'nama',
        'ketua',
        'foto',
        'visi',
        'misi',
        'tujuan',
        'kategori',
        'user_id', // Add user_id to fillable
    ];

    /**
     * Get the user that is the ketua of this ekstrakurikuler.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the kegiatan for this ekstrakurikuler.
     */
    public function kegiatan(): HasMany
    {
        return $this->hasMany(DaftarKegiatan::class);
    }

    /**
     * Get the URL for the ekstrakurikuler's photo.
     *
     * @return string
     */
    public function getFotoUrlAttribute()
    {
        if ($this->foto) {
            return asset('storage/' . $this->foto);
        }

        return '/placeholder.svg?height=300&width=400';
    }
}
