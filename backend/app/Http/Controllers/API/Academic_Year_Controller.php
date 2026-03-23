<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;
use Illuminate\Http\Request;

class Academic_Year_Controller extends BaseController
{
    protected $academic_year_repo;

    public function __construct(Academic_Year_RepositoryInterface $academic_year_repo)
    {
        $this->academic_year_repo = $academic_year_repo;
    }

    public function index()
    {
        $academic_years = $this->academic_year_repo->index();

        return $this->success($academic_years,"Academic Years Retrived",200);
    }

    public function getCurrentYear()
    {
        $currenYear = $this->academic_year_repo->currentYear();

        return $this->success($currenYear,"Current Year Retrived Successfully",200);
    }

    public function academicYearCount()
    {
        $total = $this->academic_year_repo->totalAcademicYear();

        return $this->success($total,"Total Academic Year Retrived",200);
    }
}
