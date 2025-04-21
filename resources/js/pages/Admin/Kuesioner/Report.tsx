'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { useRef } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import * as XLSX from 'xlsx';

interface ChartData {
    name: string;
    value: number;
}

interface ReportProps {
    years: number[];
    selectedAngkatan: string;
    kegiatanData: { kegiatan_setelah_lulus: string; total: number }[];
    kampusData: { tipe_kampus: string; total: number }[];
    jalurMasukData: { jalur_masuk: string; total: number }[];
    universitiesData: { nama_kampus: string; total: number }[];
    companiesData: { nama_perusahaan: string; total: number }[];
}

// Custom colors for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Format labels for better display
const formatKegiatanLabel = (label: string) => {
    const labels: Record<string, string> = {
        kuliah: 'Kuliah',
        kerja: 'Kerja',
        menikah: 'Menikah',
        dll: 'Lainnya',
    };
    return labels[label] || label;
};

const formatKampusLabel = (label: string) => {
    const labels: Record<string, string> = {
        ptn: 'PTN',
        pts: 'PTS',
    };
    return labels[label] || label;
};

const formatJalurMasukLabel = (label: string) => {
    return label || 'Tidak Diketahui';
};

export default function KuesionerReport({
    years,
    selectedAngkatan,
    kegiatanData,
    kampusData,
    jalurMasukData,
    universitiesData,
    companiesData,
}: ReportProps) {
    const reportRef = useRef<HTMLDivElement>(null);

    // Transform data for charts
    const kegiatanChartData = kegiatanData.map((item) => ({
        name: formatKegiatanLabel(item.kegiatan_setelah_lulus),
        value: item.total,
    }));

    const kampusChartData = kampusData.map((item) => ({
        name: formatKampusLabel(item.tipe_kampus),
        value: item.total,
    }));

    const jalurMasukChartData = jalurMasukData.map((item) => ({
        name: formatJalurMasukLabel(item.jalur_masuk),
        value: item.total,
    }));

    const universitiesChartData = universitiesData.map((item) => ({
        name: item.nama_kampus,
        value: item.total,
    }));

    const companiesChartData = companiesData.map((item) => ({
        name: item.nama_perusahaan,
        value: item.total,
    }));

    const handleAngkatanChange = (value: string) => {
        router.get(
            '/admin/kuesioner/report',
            { angkatan: value },
            {
                preserveState: true,
                only: ['kegiatanData', 'kampusData', 'jalurMasukData', 'universitiesData', 'companiesData', 'selectedAngkatan'],
            },
        );
    };

    // Function to export data to Excel
    const exportToExcel = () => {
        // Prepare data for Excel export
        const workbook = XLSX.utils.book_new();

        // Sheet 1: Kegiatan Setelah Lulus
        const kegiatanWorksheet = XLSX.utils.json_to_sheet(
            kegiatanData.map((item) => ({
                'Kegiatan Setelah Lulus': formatKegiatanLabel(item.kegiatan_setelah_lulus),
                'Jumlah Alumni': item.total,
            })),
        );
        XLSX.utils.book_append_sheet(workbook, kegiatanWorksheet, 'Kegiatan Setelah Lulus');

        // Sheet 2: Tipe Kampus
        const kampusWorksheet = XLSX.utils.json_to_sheet(
            kampusData.map((item) => ({
                'Tipe Kampus': formatKampusLabel(item.tipe_kampus),
                'Jumlah Alumni': item.total,
            })),
        );
        XLSX.utils.book_append_sheet(workbook, kampusWorksheet, 'Tipe Kampus');

        // Sheet 3: Jalur Masuk
        const jalurMasukWorksheet = XLSX.utils.json_to_sheet(
            jalurMasukData.map((item) => ({
                'Jalur Masuk': formatJalurMasukLabel(item.jalur_masuk),
                'Jumlah Alumni': item.total,
            })),
        );
        XLSX.utils.book_append_sheet(workbook, jalurMasukWorksheet, 'Jalur Masuk');

        // Sheet 4: Universitas Terpopuler
        const universitiesWorksheet = XLSX.utils.json_to_sheet(
            universitiesData.map((item) => ({
                'Nama Universitas': item.nama_kampus,
                'Jumlah Alumni': item.total,
            })),
        );
        XLSX.utils.book_append_sheet(workbook, universitiesWorksheet, 'Universitas Terpopuler');

        // Sheet 5: Perusahaan Terpopuler
        const companiesWorksheet = XLSX.utils.json_to_sheet(
            companiesData.map((item) => ({
                'Nama Perusahaan': item.nama_perusahaan,
                'Jumlah Alumni': item.total,
            })),
        );
        XLSX.utils.book_append_sheet(workbook, companiesWorksheet, 'Perusahaan Terpopuler');

        // Generate Excel file
        const fileName = `Laporan_Kuesioner_Alumni_${selectedAngkatan !== 'all' ? selectedAngkatan : 'Semua_Angkatan'}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    // Function to export data to PDF
    const exportToPDF = async () => {
        if (!reportRef.current) return;

        const reportTitle = `Laporan Kuesioner Alumni ${selectedAngkatan !== 'all' ? selectedAngkatan : 'Semua Angkatan'}`;

        try {
            // Create a new PDF document
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.setFont('helvetica');
            pdf.setFontSize(16);
            pdf.text(reportTitle, 20, 20);

            // Create a temporary clone of the report to modify for export
            const reportClone = reportRef.current.cloneNode(true) as HTMLElement;

            // Apply a style to force standard colors instead of oklch
            const styleElement = document.createElement('style');
            styleElement.textContent = `
            * {
                color: black !important;
                background-color: white !important;
                border-color: #ccc !important;
                --tw-ring-color: rgba(0, 0, 0, 0.1) !important;
                --tw-shadow: none !important;
            }
            .tab-content:not(.active) {
                display: none !important;
            }
            .recharts-wrapper, .recharts-surface {
                overflow: visible !important;
            }
        `;
            reportClone.appendChild(styleElement);

            // Make the clone invisible and add it to the document temporarily
            reportClone.style.position = 'absolute';
            reportClone.style.left = '-9999px';
            reportClone.style.top = '-9999px';
            document.body.appendChild(reportClone);

            // Get all tab contents
            const tabsContent = reportClone.querySelectorAll('.tab-content');

            // Make sure only the active tab is visible for the first capture
            tabsContent.forEach((tab, index) => {
                if (index === 0) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Process each tab separately
            for (let i = 0; i < tabsContent.length; i++) {
                // Show only the current tab
                tabsContent.forEach((tab, index) => {
                    if (index === i) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });

                // Add a new page for tabs after the first one
                if (i > 0) {
                    pdf.addPage();
                }

                // Add tab title
                const tabTitle = i === 0 ? 'Ikhtisar' : i === 1 ? 'Pendidikan' : 'Pekerjaan';
                pdf.setFontSize(14);
                pdf.text(tabTitle, 20, 30);

                try {
                    // Convert the current tab to canvas with simplified options
                    const canvas = await html2canvas(tabsContent[i] as HTMLElement, {
                        scale: 1.5,
                        useCORS: true,
                        logging: false,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                        ignoreElements: (element) => {
                            // Ignore elements that might cause problems
                            return (
                                element.classList.contains('recharts-tooltip') || element.tagName === 'SELECT' || element.classList.contains('hidden')
                            );
                        },
                    });

                    // Add the canvas to the PDF
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 170;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);
                } catch (err) {
                    console.error(`Error capturing tab ${i}:`, err);
                    // Add error message to PDF instead
                    pdf.setFontSize(12);
                    pdf.setTextColor(255, 0, 0);
                    pdf.text(`Error rendering chart: ${err.message}`, 20, 50);
                    pdf.setTextColor(0, 0, 0);
                }
            }

            // Clean up the temporary clone
            document.body.removeChild(reportClone);

            // Save the PDF
            pdf.save(`${reportTitle}.pdf`);
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi atau gunakan ekspor Excel.');
        }
    };

    // Add a fallback export method that doesn't rely on html2canvas
    // Add this function after the exportToPDF function
    const exportToSimplePDF = () => {
        try {
            // Create a new PDF document
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            const contentWidth = pageWidth - margin * 2;

            // Add title
            const reportTitle = `Laporan Kuesioner Alumni ${selectedAngkatan !== 'all' ? selectedAngkatan : 'Semua Angkatan'}`;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(16);
            pdf.text(reportTitle, margin, margin);

            let yPosition = margin + 10;

            // Helper function to add section title
            const addSectionTitle = (title) => {
                yPosition += 10;
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(14);
                pdf.text(title, margin, yPosition);
                yPosition += 8;
            };

            // Helper function to add table
            const addTable = (headers, data) => {
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(10);

                // Calculate column widths
                const colWidths = [];
                const totalWidth = contentWidth;
                const colCount = headers.length;

                for (let i = 0; i < colCount; i++) {
                    colWidths.push(totalWidth / colCount);
                }

                // Draw headers
                pdf.setFont('helvetica', 'bold');
                let xPosition = margin;
                for (let i = 0; i < headers.length; i++) {
                    pdf.text(headers[i], xPosition, yPosition);
                    xPosition += colWidths[i];
                }
                yPosition += 7;

                // Draw horizontal line
                pdf.line(margin, yPosition - 3, margin + contentWidth, yPosition - 3);

                // Draw data rows
                pdf.setFont('helvetica', 'normal');
                for (let row = 0; row < data.length; row++) {
                    // Check if we need a new page
                    if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
                        pdf.addPage();
                        yPosition = margin;
                    }

                    xPosition = margin;
                    for (let col = 0; col < data[row].length; col++) {
                        pdf.text(String(data[row][col]), xPosition, yPosition);
                        xPosition += colWidths[col];
                    }
                    yPosition += 7;
                }

                yPosition += 10;
            };

            // Section 1: Kegiatan Setelah Lulus
            addSectionTitle('Distribusi Kegiatan Setelah Lulus');
            const kegiatanHeaders = ['Kegiatan', 'Jumlah Alumni'];
            const kegiatanDataRows = kegiatanData.map((item) => [formatKegiatanLabel(item.kegiatan_setelah_lulus), item.total]);
            addTable(kegiatanHeaders, kegiatanDataRows);

            // Section 2: Tipe Kampus
            if (kampusData.length > 0) {
                addSectionTitle('Distribusi Tipe Kampus');
                const kampusHeaders = ['Tipe Kampus', 'Jumlah Alumni'];
                const kampusDataRows = kampusData.map((item) => [formatKampusLabel(item.tipe_kampus), item.total]);
                addTable(kampusHeaders, kampusDataRows);
            }

            // Section 3: Jalur Masuk
            if (jalurMasukData.length > 0) {
                addSectionTitle('Distribusi Jalur Masuk');
                const jalurHeaders = ['Jalur Masuk', 'Jumlah Alumni'];
                const jalurDataRows = jalurMasukData.map((item) => [formatJalurMasukLabel(item.jalur_masuk), item.total]);
                addTable(jalurHeaders, jalurDataRows);
            }

            // Add a new page for universities and companies
            pdf.addPage();
            yPosition = margin;

            // Section 4: Universitas Terpopuler
            if (universitiesData.length > 0) {
                addSectionTitle('Universitas Terpopuler');
                const uniHeaders = ['Nama Universitas', 'Jumlah Alumni'];
                const uniDataRows = universitiesData.map((item) => [item.nama_kampus, item.total]);
                addTable(uniHeaders, uniDataRows);
            }

            // Section 5: Perusahaan Terpopuler
            if (companiesData.length > 0) {
                addSectionTitle('Perusahaan Terpopuler');
                const companyHeaders = ['Nama Perusahaan', 'Jumlah Alumni'];
                const companyDataRows = companiesData.map((item) => [item.nama_perusahaan, item.total]);
                addTable(companyHeaders, companyDataRows);
            }

            // Save the PDF
            pdf.save(`${reportTitle}_Tabel.pdf`);
        } catch (error) {
            console.error('Simple PDF generation error:', error);
            alert('Terjadi kesalahan saat membuat PDF. Silakan gunakan ekspor Excel.');
        }
    };

    return (
        <AppLayout>
            <div className="container py-6" ref={reportRef}>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Laporan Kuesioner Alumni</h1>
                        <p className="text-muted-foreground mt-2">Visualisasi data kuesioner alumni berdasarkan berbagai kategori</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select value={selectedAngkatan} onValueChange={handleAngkatanChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih Angkatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Angkatan</SelectItem>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={exportToExcel}>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Excel
                            </Button>
                            <div className="relative">
                                <Button variant="outline" onClick={exportToSimplePDF}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="pdf-tabs w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                        <TabsTrigger value="education">Pendidikan</TabsTrigger>
                        <TabsTrigger value="employment">Pekerjaan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="tab-content space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Distribusi Kegiatan Setelah Lulus</CardTitle>
                                <CardDescription>Persentase alumni berdasarkan kegiatan setelah lulus</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={kegiatanChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={150}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {kegiatanChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value} alumni`, 'Jumlah']} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="education" className="tab-content space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Tipe Kampus</CardTitle>
                                    <CardDescription>Perbandingan jumlah alumni yang kuliah di PTN vs PTS</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={kampusChartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={true}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {kampusChartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [`${value} alumni`, 'Jumlah']} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Jalur Masuk</CardTitle>
                                    <CardDescription>Perbandingan jalur masuk perguruan tinggi yang ditempuh alumni</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={jalurMasukChartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={true}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {jalurMasukChartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [`${value} alumni`, 'Jumlah']} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Universitas Terpopuler</CardTitle>
                                    <CardDescription>5 universitas dengan jumlah alumni terbanyak</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={universitiesChartData}
                                                margin={{
                                                    top: 20,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 60,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                                <YAxis />
                                                <Tooltip formatter={(value) => [`${value} alumni`, 'Jumlah']} />
                                                <Legend />
                                                <Bar dataKey="value" name="Jumlah Alumni" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="employment" className="tab-content space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Perusahaan Terpopuler</CardTitle>
                                <CardDescription>5 perusahaan dengan jumlah alumni terbanyak</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={companiesChartData}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 60,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`${value} alumni`, 'Jumlah']} />
                                            <Legend />
                                            <Bar dataKey="value" name="Jumlah Alumni" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
