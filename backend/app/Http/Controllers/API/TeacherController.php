<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Teacher\TeacherRequest;
use App\Http\Requests\Teacher\TeacherUpdateRequest;
use App\Repositories\Teacher\TeacherRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherController extends BaseController
{
    protected $teacherRepo;

    public function __construct(TeacherRepositoryInterface $teacherRepo)
    {
        $this->teacherRepo = $teacherRepo;
    }

    public function totalTeachers()
    {
        $count = $this->teacherRepo->totalTeachers();

        return $this->success($count, 'Total Teachers Count Successfully', 200);
    }

    public function store(TeacherRequest $request, UserRepositoryInterface $userRepo)
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
                    ['upload_preset' => 'teachers']
                );

                $path = $upload['secure_url'];
            }
       
            $teacher = DB::transaction(fn () => $this->teacherRepo->store($userRepo->register($userData), $data, $path));

            return $this->success($teacher, 'Teacher Created Successfully', 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }

    }

    public function update(TeacherUpdateRequest $request, $id)
    {
        $data = $request->validated();

        $teacher = $this->teacherRepo->update($data, $id);

        return $this->success($teacher, 'Teacher Updated Successfully', 200);
    }
}
