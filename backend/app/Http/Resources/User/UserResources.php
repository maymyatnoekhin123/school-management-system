<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "roles" => $this->roles->pluck("name"),
            "is_active" => $this->is_active,
            "photo" => $this->photo ? $this->photo->path : null,
            // "gender" => $this->gender,
            // "roles" => $this->roles,
            "student_info" => $this->when($this->hasRole("student"),function (){
                return $this->student;
            }),

            "teacher_info" => $this->when($this->hasRole("teacher"),function() {
                return $this->teacher;
            }),
        ];
    }
}
