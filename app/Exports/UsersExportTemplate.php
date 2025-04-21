<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class UsersExportTemplate implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            'Data' => new DataSheet(),
            'Instructions' => new InstructionSheet(),
        ];
    }
}

class DataSheet implements FromArray, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    public function array(): array
    {
        return [
            ['John Doe', '1234567890', 'john'],
            ['Darius', '1234567892', 'rakan'],
        ];
    }

    public function headings(): array
    {
        return ['name', 'nisn', 'nama_ayah'];
    }

    public function title(): string
    {
        return 'Data';
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}

class InstructionSheet implements FromArray, WithTitle, ShouldAutoSize, WithStyles
{
    public function array(): array
    {
        return [
            ['Petunjuk Pengisian Template Import User'],
            [''],
            ['Kolom name: Wajib diisi dengan nama lengkap user'],
            ['Kolom email: Wajib diisi dengan email yang valid dan unik'],
            ['Kolom nisn: Opsional, dapat dikosongkan'],
            ['Kolom angkatan: Opsional, dapat dikosongkan'],
            ['Kolom role: Opsional, nilai default adalah "siswa". Nilai yang diperbolehkan: siswa, guru, admin'],
            ['Kolom password: Wajib diisi dengan password minimal 8 karakter'],
        ];
    }

    public function title(): string
    {
        return 'Instructions';
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 14]],
            3 => ['font' => ['bold' => true]],
            4 => ['font' => ['bold' => true]],
            5 => ['font' => ['bold' => true]],
            6 => ['font' => ['bold' => true]],
            7 => ['font' => ['bold' => true]],
            8 => ['font' => ['bold' => true]],
        ];
    }
}
