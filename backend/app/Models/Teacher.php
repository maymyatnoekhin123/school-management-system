<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        "teacher_id",
        "honor_title",
        "nrc",
        "dob",
        "qualification",          
        "school_qualification",   
        "other_skills",
        "phone",
        "address",
        "experience_years",
        "joining_date",
        "user_id"                 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photo()
    {
        return $this->hasOneThrough(
            Photo::class,
            User::class,
            "id",
            "user_id",
            "user_id",
            "id"
        );
    }

    public function classrooms()
    {
        // return $this->hasManyThrough(Classroom::class,User::class);
    }
}
