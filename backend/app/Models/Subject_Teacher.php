<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Subject_Teacher extends Pivot
{
    protected $fillable = [
        "teacher_id",
        "subject_id",
        "assigned_at"
    ];
}
