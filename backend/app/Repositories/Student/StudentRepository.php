<?php 

namespace App\Repositories\Student;

use App\Models\Student;
use App\Repositories\Enrollment\EnrollmentRepositoryInterface;
use App\Repositories\Student\StudentRepositoryInterface;

use function PHPUnit\Framework\isArray;

class StudentRepository implements StudentRepositoryInterface 
{
     protected $enrollmentRepo;

     public function __construct(EnrollmentRepositoryInterface $enrollmentRepo)
     {
          $this->enrollmentRepo = $enrollmentRepo;
     }
     public function index()
     {
          $students = Student::with("user")->get();
          return $students;
     }

     public function store($user,$data,$path = null)
     {    

          $user->assignRole("student");
          
          $student = $user->student()->create([
            "student_id" => $data["student_id"],
            "dob" => $data["dob"],
            "gender" => $data["gender"],
            "father_name" => $data["father_name"],
            "mother_name" => $data["mother_name"],
            "address" => $data["address"],
            "phone" => $data["phone"],
            "father_occupation" => $data["father_occupation"],
            "current_education" => $data["current_education"],
            "other_qualification" => $data["other_qualification"],
            "reason_of_join" => $data["reason_of_join"],
        ]);

        if($path){
          $user->photo()->create(["path" => $path]);      
          }

          if(isset($data["classroom_ids"]) && isArray($data["classroom_ids"])){

               foreach($data["classroom_ids"] as $classroom_id){
                    $this->enrollmentRepo->store($user->id,$classroom_id);
               }
          }else{
               $this->enrollmentRepo->store($user->id,$data["classroom_ids"]);
          }

          $student->load(["user","photo"]);
                   // return Student::create($data);
          return $student;
     }


     public function show($userId)
     {
          $student = Student::with("user","photo","classrooms")->where("user_id",$userId)->firstOrFail();

          return $student;
     }

     public function update($data,$userId)
     {
          $student = Student::where("user_id",$userId)->firstOrFail();
          
          if(isset($data["classroom_ids"]) and is_array($data["classroom_ids"])){
               $this->enrollmentRepo->update($userId,$data["classroom_ids"]);
          }
           $student->update($data);
           
           $student->load("user");

           return $student;
     }


     public function totalStudents()
     {
          return Student::count();

     }
}