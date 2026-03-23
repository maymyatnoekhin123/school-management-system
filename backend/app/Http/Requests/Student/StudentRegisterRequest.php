<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class StudentRegisterRequest extends FormRequest
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
        $minDate = now()->subYear(18)->format("Y-m-d");
        $maxDate = now()->subYear(5)->format("Y-m-d");
        return [
            "name" => "required|string",
            "email" => "required|string",
            "password" => "required|string",
            "student_id" => "required|numeric",
            "dob" => "required|date|after_or_equal:$minDate|before_or_equal:$maxDate",
            "gender" => "required|string",
            "image" => "nullable|image|file|min:100|max:5120",
            "father_name" => "required|string",
            "mother_name" => "required|string",
            "address" => "required|string",
            "phone" => "required|string",
            "father_occupation" => "nullable|string",
            "current_education" => "required|string",
            "other_qualification" => "nullable|string",
            "reason_of_join" => "required|string", 
            "classroom_ids" => "required|array|min:1",
            "classroom_ids.*" => "integer|exists:classrooms,id",
        ];
    }
}
