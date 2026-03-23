<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        "name"
    ];
    
    public function classrooms()
    {
        return $this->belongsToMany(Classroom::class,"classroom_subject")
        ->withPivot("passing_mark")
        ->withTimestamps();
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class,"subject_teacher","subject_id","teacher_id");
    }
}
