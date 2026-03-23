<?php 

namespace App\Repositories\Photo;

interface PhotoRepositoryInterface 
{
     public function update($path,$userId);
}