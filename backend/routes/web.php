<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get("/home",function(){

    return view("abcd");
});

// routes/web.php
use Illuminate\Support\Facades\Artisan;

Route::get('/init-db', function() {
    try {
        // Migration အသစ်ပြန်လုပ်ပြီး Seed ပါ တစ်ခါတည်း သွင်းမယ်
        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);
        return "Database Migration and Seeding Successful!";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});