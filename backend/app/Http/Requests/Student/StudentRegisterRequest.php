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
        return [
            "name" => "required|string",
            "arabic_name" => "required|string",
            "email" => "required|string",
            "password" => "required|string",
            "student_id" => "required|numeric",
            "dob" => "required|date",
            "gender" => "required|string",
            "image" => "nullable|image|file|min:100|max:5120",
            "father_name" => "required|string",
            "father_arabic_name" => "required|string",
            "mother_name" => "required|string",
            "mother_arabic_name" => "required|string",
            "address" => "required|string",
            "phone" => "required|string",
            "relationship" => "string",
            "isNew" => "string",
            "current_education" => "required|string",
            "previous_school" => "required|string",
            "previous_class" => "required|string",
            "classroom_ids" => "required|array|min:1",
            "classroom_ids.*" => "integer|exists:classrooms,id",

        ];
    }
}
