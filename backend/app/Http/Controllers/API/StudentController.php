<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Student\StudentRegisterRequest;
use App\Http\Requests\Student\StudentUpdateRequest;
use App\Repositories\Student\StudentRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
// use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Support\Facades\Hash;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\DB;

class StudentController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $studentRepo;

    protected $userRepo;

    public function __construct(StudentRepositoryInterface $studentRepo, UserRepositoryInterface $userRepo)
    {
        $this->studentRepo = $studentRepo;
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        $students = $this->studentRepo->index();

        return $this->success($students, 'Students Retrived Successfully', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRegisterRequest $request)
    {
        $data = $request->validated();

        $userData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ];
        try {
            $path = null;

            if ($request->hasFile('image')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => config('cloudinary.cloud_name'),
                        'api_key' => config('cloudinary.api_key'),
                        'api_secret' => config('cloudinary.api_secret'),
                    ],
                ]);

                $upload = $cloudinary->uploadApi()->upload(
                    $request->file('image')->getRealPath(),
                    ['upload_preset' => 'students']
                );

                $path = $upload['secure_url'];
            }
        
       $student = DB::transaction(fn() => $this->studentRepo->store(
        $this->userRepo->register($userData),
        $data,$path
       ));

        return $this->success($student, 'Students Created successfully', 200);
        }

        catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $student = $this->studentRepo->show($id);

            return $this->success($student, 'Student retrived Successfully', 200);
        } catch (Exception $e) {
            return $this->error($e, 'error getting users', 422);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $updateStudent = DB::transaction(fn() => $this->studentRepo->update($data,$id));

        return $this->success($updateStudent, 'Student Update Successfully', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function totalStudents()
    {
        $count = $this->studentRepo->totalStudents();

        return $this->success($count,'Total Students Count retrived',200);
    }
}
