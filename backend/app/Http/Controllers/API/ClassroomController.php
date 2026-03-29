<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Classroom\ClassroomRequest;
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

    public function create(ClassroomRequest $request)
    {
        $name = $request->validated();
        $classroom = $this->classroomRepo->create($name);
        return $this->success($classroom,"Classroom retrived successfully",200);
    }

    public function show($id) 
    {
        $classroom = $this->classroomRepo->show($id);

        return $this->success($classroom,"Classroom retrived successfully",200);
    }

    public function update(ClassroomRequest $request,$id)
    {
         $name = $request->validated();

         $classroom = $this->classroomRepo->update($name,$id);

         return $this->success($classroom,"Classroom update successfully",200);
    }

    public function delete($id)
    {
        return $this->classroomRepo->delete($id);
    }
}
