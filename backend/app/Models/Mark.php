<?
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    protected $fillable = [
        'enrollment_id', 'subject_id', 'exam_term_id', 
        'marks_obtained', 'total_marks', 'teacher_remarks'
    ];

        public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }

        public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function examTerm()
    {
        return $this->belongsTo(Exam_Term::class);
    }

    public function getIsPassedAttribute()
    {
        return $this->marks_obtained >= 40;
    }
}