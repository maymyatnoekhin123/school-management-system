<?php 

namespace App\Repositories\Classroom;

interface ClassroomRepositoryInterface 
{
     public function index();
     public function create($name);
     public function show($id);
     public function update($data,$id);
     public function delete($id);
}