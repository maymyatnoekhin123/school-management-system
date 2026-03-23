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
}