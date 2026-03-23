<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $fillable = [
            "name",
            "created_at",
            "updated_at"
        ];

    public function subjects()
    {
        return $this->belongsToMany(Subject::class,"classroom_subject")
        ->withPivot("passing_mark")
        ->withTimestamps();
    }

    public function enrollments()
    {
        
        return $this->hasMany(Enrollment::class);
    }

    public function students()
    {
        return $this->hasManyThrough(
            User::class,
            Enrollment::class,
            "classroom_id",
            "id",
            "id",
            "student_id"
        );
    }

    public function academic_years()
    {
        return $this->hasManyThrough(
            Academic_Year::class,
            Enrollment::class,
            "classroom_id",
            "id",
            "id",
            "academic_year_id"
        );
    }
}
