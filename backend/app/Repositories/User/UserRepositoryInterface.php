<?php 

namespace App\Repositories\User;

interface UserRepositoryInterface
{
     public function index();
     public function register($data);
     public function update($id,$data);
     public function find($id);
     public function destroy($id);
}