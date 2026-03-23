<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Classroom\ClassroomRepositoryInterface;
use Illuminate\Http\Request;

class ClassroomController extends BaseController
{
    protected $classroomRepo;

    public function __construct(ClassroomRepositoryInterface $classroomRepo)
    {
        $this->classroomRepo = $classroomRepo;
    }

    public function index()
    {
        $classrooms = $this->classroomRepo->index();

        return $this->success($classrooms,"Classrooms retrived successfully",200);
    }
}
