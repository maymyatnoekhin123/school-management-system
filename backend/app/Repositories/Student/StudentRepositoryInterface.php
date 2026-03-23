<?php 

namespace App\Repositories\Student;

Interface StudentRepositoryInterface 
{
     public function index();
     public function store($user,$data,$path);
     public function show($id);
     public function update($userId,$data);
     public function totalStudents();
}