<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithBatchInserts;

class UsersImport implements ToCollection, WithHeadingRow, WithChunkReading, WithBatchInserts
{
    use Importable;

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (!empty($row['nama']) || !empty($row['nik']) || !empty($row['nama_ayah'])) {
                $user = User::where('nisn', $row['nik'])->first();
                if (!$user) {
                    User::create([
                        'name' => (string) $row['nama'],
                        'email' => $row['nik'],
                        'nisn' => (string) $row['nik'] ?? null,
                        'nama_ayah' => (string) $row['nama_ayah'] ?? null,
                        'angkatan' => 2025,
                        'role' => 'siswa',
                        'password' => Hash::make($row['nama_ayah']),
                    ]);
                }
            }
        }
    }

    /**
     * @return array
     */


    /**
     * @return array
     */


    /**
     * @return int
     */
    public function chunkSize(): int
    {
        return 100;
    }

    /**
     * @return int
     */
    public function batchSize(): int
    {
        return 100;
    }
}
