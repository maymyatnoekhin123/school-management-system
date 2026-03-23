<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Photo extends Model
{
    protected $fillable = [
        "path",
        "user_id",
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
