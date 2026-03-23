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
        Schema::create('marks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_term_id')->constrained()->onDelete('cascade');
            $table->integer('marks_obtained');
            $table->integer('total_marks')->default(100);
            $table->text('teacher_remarks')->nullable();
            $table->timestamps();
            $table->unique(['enrollment_id', 'subject_id', 'exam_term_id'], 'unique_marks_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marks');
    }
};
