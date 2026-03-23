<?php

use Illuminate\Support\Facades\Artisan;

use App\Http\Controllers\API\Academic_Year_Controller;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClassroomController;
use App\Http\Controllers\API\StudentController;

// use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\PermissionController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::post('/auth/register', [AuthController::class, 'register'])->middleware('guest');
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('guest')->name('login');
Route::apiResource('/permissions', PermissionController::class);
Route::post('/addPermission', [User::class, 'addPermission']);
Route::get('/years/active', [Academic_Year_Controller::class, 'getCurrentYear']);
Route::get("/classrooms",[ClassroomController::class,"index"]);

// Route::apiResource("/permissions",PermissionController::class);
// Route::get("/",[PermissionController::class,"index"]);
Route::group(['middleware' => 'auth:api'], function () {

    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/students/total', [StudentController::class, 'totalStudents']);
        Route::get('/teachers/total', [TeacherController::class, 'totalTeachers']);
        Route::get('/users/{id}', [UserController::class, 'find']);
        Route::post("/students/register",[StudentController::class,"store"]);
        Route::post("/teachers/register",[TeacherController::class,"store"]);
        Route::delete("/users/{id}",[UserController::class,"destroy"]);
        // Route::patch("/users/{id}",[])
        Route::patch("/students/{id}",[StudentController::class,"update"]);
        Route::patch("/teachers/{id}",[TeacherController::class,"update"]);
    });

    Route::get('/auth/verify', [AuthController::class, 'verify'])->name('verify');

    Route::get('/auth/logout', [AuthController::class, 'logout'])->name('logout');
});

// routes/api.php ထဲမှာ ထည့်ရန်

Route::get('/init-db', function() {
    try {
        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);
        return response()->json([
            'message' => 'Database Migration and Seeding Successful!',
            'output' => Artisan::output()
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
