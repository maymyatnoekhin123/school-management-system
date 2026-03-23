<?php 

namespace App\Repositories\Academic_Year;

interface Academic_Year_RepositoryInterface
{
     public function index();
     public function currentYear();
     public function totalAcademicYear();
}