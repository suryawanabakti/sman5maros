<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use  HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nama_ayah',
        'role',
        'email',
        'password',
    ];

    public function kuesioner()
    {
        return $this->hasOne(Kuesioner::class)->latest();
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the ekstrakurikuler that this user is ketua of.
     */
    public function ekstrakurikuler(): HasOne
    {
        return $this->hasOne(Ekstrakurikuler::class);
    }

    /**
     * Check if user is a ketua ekstrakurikuler
     */
    public function isKetuaEkstrakurikuler(): bool
    {
        return $this->ekstrakurikuler()->exists();
    }
}
