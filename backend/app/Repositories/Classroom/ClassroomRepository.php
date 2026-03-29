<?php 

namespace App\Repositories\Classroom;

use App\Models\Classroom;
use App\Repositories\Classroom\ClassroomRepositoryInterface;

class ClassroomRepository implements ClassroomRepositoryInterface
{
     public function index()
     {
          $classrooms = Classroom::with("students","academic_years")->get();

          return $classrooms;
     }

     public function create($name)
     {
          $classroom = Classroom::create($name);

          return $classroom;
     }

     public function show($id)
     {
          return Classroom::with("students","academic_years")->find($id);
     }

     public function update($data,$id)
     {
          $classroom = Classroom::find($id);
          $classroom->update($data);
          $classroom->load("students");
          return $classroom;
     }

     public function delete($id)
     {
          $classroom = Classroom::find($id);
          return $classroom->delete();
     }
}