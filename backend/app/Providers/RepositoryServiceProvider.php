<?php

namespace App\Providers;

use App\Repositories\Academic_Year\Academic_Year_Repository;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;
use App\Repositories\Classroom\ClassroomRepository;
use App\Repositories\Classroom\ClassroomRepositoryInterface;
use App\Repositories\Enrollment\EnrollmentRepository;
use App\Repositories\Enrollment\EnrollmentRepositoryInterface;
use App\Repositories\Photo\PhotoRepository;
use App\Repositories\Photo\PhotoRepositoryInterface;
use App\Repositories\Student\StudentRepository;
use App\Repositories\Student\StudentRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Teacher\TeacherRepositoryInterface;
use App\Repositories\Teacher\TeacherRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->singleton(UserRepositoryInterface::class,UserRepository::class);

        $this->app->singleton(StudentRepositoryInterface::class,StudentRepository::class);
        $this->app->singleton(TeacherRepositoryInterface::class,TeacherRepository::class);

        $this->app->singleton(Academic_Year_RepositoryInterface::class,Academic_Year_Repository::class);

        $this->app->singleton(PhotoRepositoryInterface::class,PhotoRepository::class);

        $this->app->singleton(EnrollmentRepositoryInterface::class,EnrollmentRepository::class);

        $this->app->singleton(ClassroomRepositoryInterface::class,ClassroomRepository::class);
    }


    
}
