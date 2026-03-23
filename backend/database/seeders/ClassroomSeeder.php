<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = [
            ["name" => "hifz - al - quran"],
            ["name" => "tajweed-al-quran"],
            ["name" => "aalim regular program"],
            ["name" => "aalim graduate program"],
            ["name" => "ilm - e- deen course for woman"],
            ["name" => "hifz - al - quran (evening class)"],
            ["name" => "ilm - e - deen course for graduate (men)"],
            ["name" => "ilm - e - deen course for graduate (women)"],
        ];

        foreach($classrooms as $classroom)
            {
                Classroom::create($classroom);
            }
    }
}
