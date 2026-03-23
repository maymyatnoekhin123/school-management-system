<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        "enrollment_id",
        "dates",
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }    
}
