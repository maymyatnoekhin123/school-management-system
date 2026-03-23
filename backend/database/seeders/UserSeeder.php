<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make("password");
        $admin = [
            "id" => 1,
            "name" => "admin",
            "password" => $password,
            "email" => "admin@mail.co",
        ];

        $user1 = User::create($admin);
        $user1->roles()->attach(1);

        for($i = 0 ; $i < 50 ; $i++) {
$students = 
            User::create(["name" => fake()->name(),"email" => fake()->safeEmail(),"password" => $password]);

            $students->assignRole("student");

            $students->student()->create([
                'student_id'      => fake()->unique()->numberBetween(10000, 99999),
        'dob'             => fake()->date('Y-m-d', '2012-12-31'),
        'gender'          => fake()->randomElement(['male', 'female']),
        'father_name'     => 'U ' . fake()->name('male'),
        'mother_name'     => 'Daw ' . fake()->name('female'),
        'address'         => fake()->address(),
        'phone'           => fake()->phoneNumber(),
        'father_occupation' => fake()->jobTitle(),
        "current_education" => fake()->randomElement(["Grade 9","Grade 10","High School Passed","Bachelor of Arts","Undergraduate"]),
        'other_qualification' => fake()->optional()->sentence(3),
        "reason_of_join" => fake()->paragraph(1),

            ]);
        }

        for($i = 0; $i < 35 ; $i++){
            $teachers = 
            User::create(["name" => fake()->name(),"email" => fake()->safeEmail(),"password" => $password]);

            $teachers->assignRole("teacher");
            $teachers->teacher()->create([
                'teacher_id'   => fake()->unique()->numberBetween(100, 999),
                "honor_title" => fake()->randomElement(["Maulana","Ustaz","Hafiz","Mufti","Sheikh"]),
                "nrc" => fake()->numerify("##/??*(နိုင်)######"),
                "dob" => fake()->date("Y-m-d", "1995-01-01"),
        'qualification' => fake()->randomElement(['Aalim Graduate', 'Hifz-ul-Quran', "Qari degree"]),
        'school_qualification' => fake()->randomElement(['B.A (Computer Science)', 'B.Sc', 'Matriculation Passed']),
        'other_skills' => fake()->randomElement(['Computer Basic', 'English Language',"LCCI Level 3"]),
        "phone" => fake()->phoneNumber(),
        'address' => fake()->address(),
        'experience_years' => (string) fake()->numberBetween(1, 10),
        'joining_date'  => fake()->date('Y-m-d', 'now'),
            ]);
        }
        
            
    }
}
