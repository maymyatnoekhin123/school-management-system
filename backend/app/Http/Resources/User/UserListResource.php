<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_active' => $this->is_active,
            'roles' => $this->roles->pluck('name'),
            "photo" => $this->photo ? $this->photo->path : null,
        ];

        if ($this->hasRole('student') && $this->student) {
            $data = [
                ...$data,
                'student_id' => $this->student->student_id,
                'dob' => $this->student->dob,
                'gender' => $this->student->gender,
                'father_name' => $this->student->father_name,
                'mother_name' => $this->student->mother_name,
                'address' => $this->student->address,
                'phone' => $this->student->phone,
                "father_occupation" => $this->student->father_occupation,
                "current_education" => $this->student->current_education,
                "other_qualification" => $this->student->other_qualification,
                "reason_of_join" => $this->student->reason_of_join,
            ];
        }

        if($this->hasRole("teacher") && $this->teacher){
            $data = [
                ...$data,
                "teacher_id" => $this->teacher->employee_id,
                "honor_title" => $this->teacher->honor_title,
                "nrc" => $this->teacher->nrc,
                "dob" => $this->teacher->dob,
                "qualification" => $this->teacher->qualification,
                "school_qualification" => $this->teacher->school_qualification,
                "other_skills" => $this->teacher->other_skills,

                "phone" => $this->teacher->phone,
                "address" => $this->teacher->address,
                "experience_years" => $this->teacher->experience_years,
                "joining_date" => $this->teacher->joining_date,
            ];
        }

        return $data;
    }
}
