<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        "is_active",
        "id",
    ];

    protected $guard_name = "api";

    public function photo()
    {
        return $this->hasOne(Photo::class);
    }

    

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class,"user_id");
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class,"subject_teacher","teacher_id","subject_id");
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class,"student_id",'id');
    }

    public function classrooms()
    {
        return $this->belongsToMany
        (Classroom::class,
        "enrollments",
        "student_id",
        "classroom_id",
        )
        ->withPivot("roll_number","academic_year_id")
        ->withTimestamps();
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }


    public function getJWTCustomClaims()
    {
        return [
            'roles' => $this->getRoleNames(), // This puts the roles in the token
            'permissions' => $this->getAllPermissions()->pluck('name'),
        ];
    }
    /**
     * Get the user's initials
     */
    public function initials(): string
    {
        return Str::of($this->name)
            ->explode(' ')
            ->take(2)
            ->map(fn ($word) => Str::substr($word, 0, 1))
            ->implode('');
    }
}
