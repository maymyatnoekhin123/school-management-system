<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Academic_Year extends Model
{
    protected $fillable = [
        "name",
        "is_current"
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function exam_terms()
    {
        return $this->hasMany(Exam_Term::class);
    }
}
