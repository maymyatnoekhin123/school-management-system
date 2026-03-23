<?php 

namespace App\Repositories\Enrollment;

use App\Models\Academic_Year;
use App\Models\Enrollment;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;
use App\Repositories\Enrollment\EnrollmentRepositoryInterface;
use App\Models\User;
class EnrollmentRepository implements EnrollmentRepositoryInterface
{

     public function index()
     {
          $enrollments = Enrollment::with(["student","classroom","academic_year"])->get();

          return $enrollments;
     }


     public function store($studentId,$classroomId)
     {
          $acdemic_year = Academic_Year::where("is_current",true)->first();

          return Enrollment::create([
               "student_id" => $studentId,
               "classroom_id" => $classroomId,
               "academic_year_id" => $acdemic_year->id
          ]);
     }

     public function update($userId,Array $classroomIds)
     {
          $user = User::find($userId);
          $academic_year = Academic_Year::where("is_current",true)->first();

          if(!$user or !$academic_year){
               return false;
          }

               return $user->classrooms()->syncWithPivotValues($classroomIds,[
                    "academic_year_id" => $academic_year->id
               ]);
          
     }
}