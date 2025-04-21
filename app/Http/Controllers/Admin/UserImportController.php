<?php

namespace App\Http\Controllers\Admin;

use App\Exports\UsersExportTemplate;
use App\Http\Controllers\Controller;
use App\Imports\UsersImport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use League\Csv\Reader;
use League\Csv\Statement;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;
use PhpOffice\PhpSpreadsheet\IOFactory;

class UserImportController extends Controller
{
    public function index()
    {
        // Generate template if it doesn't exist
        // $this->generateTemplate();

        return Inertia::render('Admin/Users/import', [
            'templateUrl' => route('admin.users.import.template'),
        ]);
    }

    public function template()
    {
        return Excel::download(new UsersExportTemplate(), 'user_import_template.xlsx');
    }

    // private function generateTemplate()
    // {
    //     if (!Storage::exists('templates/user_import_template.xlsx')) {
    //         $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
    //         $sheet = $spreadsheet->getActiveSheet();

    //         // Set headers
    //         $headers = ['name', 'email', 'nisn', 'angkatan', 'role', 'password'];
    //         foreach ($headers as $index => $header) {
    //             $sheet->setCellValueByColumnAndRow($index + 1, 1, $header);
    //         }

    //         // Add example data
    //         $exampleData = [
    //             ['John Doe', 'john@example.com', '1234567890', '2023', 'siswa', 'password123'],
    //             ['Jane Smith', 'jane@example.com', '0987654321', '2023', 'siswa', 'password456'],
    //         ];

    //         $row = 2;
    //         foreach ($exampleData as $data) {
    //             foreach ($data as $index => $value) {
    //                 $sheet->setCellValueByColumnAndRow($index + 1, $row, $value);
    //             }
    //             $row++;
    //         }

    //         // Add instructions in another sheet
    //         $instructionSheet = $spreadsheet->createSheet();
    //         $instructionSheet->setTitle('Instructions');
    //         $instructionSheet->setCellValue('A1', 'Petunjuk Pengisian Template Import User');
    //         $instructionSheet->setCellValue('A3', 'Kolom name: Wajib diisi dengan nama lengkap user');
    //         $instructionSheet->setCellValue('A4', 'Kolom email: Wajib diisi dengan email yang valid dan unik');
    //         $instructionSheet->setCellValue('A5', 'Kolom nisn: Opsional, dapat dikosongkan');
    //         $instructionSheet->setCellValue('A6', 'Kolom angkatan: Opsional, dapat dikosongkan');
    //         $instructionSheet->setCellValue('A7', 'Kolom role: Opsional, nilai default adalah "siswa". Nilai yang diperbolehkan: siswa, guru, admin');
    //         $instructionSheet->setCellValue('A8', 'Kolom password: Wajib diisi dengan password minimal 8 karakter');

    //         // Auto-size columns
    //         foreach (range('A', 'F') as $col) {
    //             $instructionSheet->getColumnDimension($col)->setAutoSize(true);
    //             $sheet->getColumnDimension($col)->setAutoSize(true);
    //         }

    //         // Save the template
    //         Storage::makeDirectory('templates');
    //         $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    //         $writer->save(storage_path('app/templates/user_import_template.xlsx'));
    //     }
    // }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx,xls|max:10240', // Max 10MB
        ]);

        $import = new UsersImport();
        Excel::import($import, $request->file('file'));

        return redirect()->route('admin.users.index')
            ->with('message', 'Berhasil mengimpor user.');
    }

    // private function processCsv($path)
    // {
    //     $csv = Reader::createFromPath($path, 'r');
    //     $csv->setHeaderOffset(0);

    //     $stmt = Statement::create();
    //     $records = $stmt->process($csv);

    //     $rows = [];
    //     foreach ($records as $record) {
    //         $rows[] = $record;
    //     }

    //     return $rows;
    // }

    // private function processExcel($path)
    // {
    //     $spreadsheet = IOFactory::load($path);
    //     $worksheet = $spreadsheet->getActiveSheet();
    //     $rows = [];

    //     $headerRow = $worksheet->getRowIterator(1, 1)->current();
    //     $cellIterator = $headerRow->getCellIterator();
    //     $cellIterator->setIterateOnlyExistingCells(false);

    //     $headers = [];
    //     foreach ($cellIterator as $cell) {
    //         $headers[] = $cell->getValue();
    //     }

    //     foreach ($worksheet->getRowIterator(2) as $row) {
    //         $rowData = [];
    //         $cellIterator = $row->getCellIterator();
    //         $cellIterator->setIterateOnlyExistingCells(false);

    //         $i = 0;
    //         foreach ($cellIterator as $cell) {
    //             if (isset($headers[$i])) {
    //                 $rowData[$headers[$i]] = $cell->getValue();
    //             }
    //             $i++;
    //         }

    //         $rows[] = $rowData;
    //     }

    //     return $rows;
    // }
}
