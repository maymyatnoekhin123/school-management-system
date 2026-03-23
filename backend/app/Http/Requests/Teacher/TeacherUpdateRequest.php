<?php

namespace App\Http\Requests\Teacher;

use Illuminate\Foundation\Http\FormRequest;

class TeacherUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image" => "nullable|image|file|min:100|max:5120",
            "teacher_id" => "numeric|required",
            "honor_title" => "string|nullable",
            "nrc" => "string|required",
            "dob" => "date|required",
            "qualification" => "string|required",
            "school_qualification" => "string|required",
            "other_skills" => "string|nullable",
            "phone" => "string|required",
            "address" => "string|required",
            "experience_years" => "string|nullable",
            "joining_date" => "date|required",
            ];
    }
}
