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
            
    }
}
