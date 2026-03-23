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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->integer("teacher_id");
            $table->string("honor_title")->nullable();
            $table->string("nrc");
            $table->string("dob");
            $table->string("qualification");
            $table->string("school_qualification")->nullable();
            $table->string("other_skills")->nullable();
            $table->string("phone");
            $table->string("address");
            $table->string("experience_years")->nullable();
            $table->date("joining_date");
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
