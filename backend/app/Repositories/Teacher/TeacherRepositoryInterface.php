<?php 

namespace App\Repositories\Teacher;

interface TeacherRepositoryInterface
{
     public function totalTeachers();
     public function store($user,$data,$path);
     public function update($userId,$data);
}