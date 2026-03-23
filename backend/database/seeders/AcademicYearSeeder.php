<?php

namespace Database\Seeders;

use App\Models\Academic_Year;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $academic_years = [
            ["name" => "2025-2026","is_current" => false],
            ["name" => "2026-2027","is_current" => true],
            ["name" => "2028-2029","is_current" => false],
            ["name" => "2029-2030","is_current" => false],
            ["name" => "2030-2031","is_current" => false],
            ["name" => "2031-2032","is_current" => false],
            ["name" => "2032-2033","is_current" => false],
            ["name" => "2033-2034","is_current" => false],
            ["name" => "2034-2035","is_current" => false],
            ["name" => "2035-2036","is_current" => false],
        ];

        foreach($academic_years as $academicYear)
        {
            Academic_Year::create($academicYear);
        }
    }
}
