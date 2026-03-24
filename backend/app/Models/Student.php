<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'student_id',
        'dob',
        'gender',
        "arabic_name",
        'father_name',
        "father_arabic_name",
        'mother_name',
        "mother_arabic_name",
        "relationship",
        'address',
        'phone',
        "current_education",
        "previous_school",
        "previous_class",
        "old_student",
        'user_id',
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photo()
    {

        return $this->hasOneThrough(
            Photo::class,
            User::class,
            "id", // User id from student table which is connected with user_id
            "user_id", // user_id from photo table
            "user_id", // user_id from student table
            "id" // local key of User table
        );
    }

    public function classrooms()
{
    return $this->hasManyThrough(
        Classroom::class,    // Target model
        Enrollment::class,   // Intermediate model (Pivot)
        'student_id',        // Foreign key on Enrollment table (pointing to User ID)
        'id',                // Foreign key on Classroom table
        'user_id',           // Local key on Student table
        'classroom_id'       // Local key on Enrollment table
    );
}
}
