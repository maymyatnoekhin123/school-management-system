<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam_Term extends Model
{
    protected $fillable = [
        "academic_year_id"
    ];
    public function academic_year()
    {
        return $this->belongsTo(Academic_Year::class);
    }
}
