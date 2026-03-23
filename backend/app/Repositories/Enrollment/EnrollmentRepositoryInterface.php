<?php 

namespace App\Repositories\Enrollment;

interface EnrollmentRepositoryInterface
{
     public function index();
     public function store($userId,$classroomId);
     public function update($userId,Array $classroomIds);
}