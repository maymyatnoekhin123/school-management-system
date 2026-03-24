<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->integer("student_id");
            $table->string("arabic_name")->nullable();
            $table->date("dob");
            $table->enum("gender",["male","female"]);
            $table->string("father_name");
            $table->string("father_arabic_name")->nullable();
            $table->string("mother_name");
            $table->string("mother_arabic_name")->nullable();
            $table->string("relationship")->nullable();
            $table->string("address");
            $table->string("phone");
            $table->string("isNew")->nullable();
            $table->string("current_education");
            $table->string("previous_school")->nullable();
            $table->string("previous_class")->nullable();
            
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
