<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'student_id',
        'classroom_id',
        'academic_year_id',
        'roll_number'
    ];

    public function student()
    {
        return $this->belongsTo(User::class,"student_id",'id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function academic_year()
    {
        return $this->belongsTo(Academic_Year::class);
    }

    public function marks()
    {
        return $this->hasMany(Mark::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class,"enrollment_id");
    }
}
