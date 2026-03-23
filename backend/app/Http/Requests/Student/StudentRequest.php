<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
            "studentId" => "required|numeric",
            "dob" => "required|date",
            "gender" => "required|string",
            "father_name" => "required|string",
            "mother_name" => "required|string",
            "address" => "required|string",
            "phone" => "required|string",
            "previous_school" => "required|string"
        ];
    }
}
