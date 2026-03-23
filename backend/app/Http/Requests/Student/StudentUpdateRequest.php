<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class StudentUpdateRequest extends FormRequest
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
            "student_id" => "numeric|required",
            "dob" => "date|required",
            "gender" => "string|required",
            "image" => "nullable|image|file|min:100|max:5120",
            "father_name" => "string|required",
            "mother_name" => "string|required",
            "address" => "string|required",
            "phone" => "string|required",
            "father_occupation" => "nullable|string",
            "current_education" => "required|string",
            "other_qualification" => "nullable|string",
            "reason_of_join" => "required|string",
            "classroom_ids" => "required|array|min:1",
            "classroom_ids.*" => "integer|exists:classrooms,id"
        ];
    }
}
