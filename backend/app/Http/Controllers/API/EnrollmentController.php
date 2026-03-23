<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Enrollment\EnrollmentRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class EnrollmentController extends BaseController
{
    protected $enrollmentRepo;

    public function __construct(EnrollmentRepositoryInterface $enrollmentRepo)
    {
        $this->enrollmentRepo = $enrollmentRepo;
    }
    public function index()
    {
        try {
            $enrollments = $this->enrollmentRepo->index();

            return $this->success($enrollments,"Enrollments retrived successfully",201);
        }

        catch (Exception $error) {

           return $this->error($error,null,422);
        }
    }
}
