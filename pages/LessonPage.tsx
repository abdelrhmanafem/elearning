import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Quiz from '../components/Quiz';
import { Lesson } from '../types';

const LessonPage = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses, toggleLessonComplete, isLessonCompleted } = useAppContext();
  
  const [quizScore, setQuizScore] = useState<{ score: number, total: number } | null>(null);

  const course = courses.find(c => c.$id === courseId);
  const allLessons: { lesson: Lesson, module: { id: string, title: string } }[] = course?.modules.flatMap(m => m.lessons.map(l => ({ lesson: l, module: m }))) || [];
  const currentLessonIndex = allLessons.findIndex(l => l.lesson.id === lessonId);
  
  const lesson = allLessons[currentLessonIndex]?.lesson;

  useEffect(() => {
    // Reset quiz score when navigating to a new lesson
    setQuizScore(null);
  }, [lessonId]);

  if (!course || !lesson) {
    return <div>Lesson not found.</div>;
  }
  
  const isCompleted = isLessonCompleted(course.$id, lesson.id);

  const handleToggleComplete = async () => {
    if (course) {
      await toggleLessonComplete(course.$id, lesson.id);
    }
  };
  
  const handleQuizComplete = async (score: number, total: number) => {
    setQuizScore({ score, total });
    if (score / total >= 0.7) { // Auto-complete if score is 70% or more
        if(!isCompleted && course) {
            await toggleLessonComplete(course.$id, lesson.id);
        }
    }
  };

  const goToLesson = (index: number) => {
    if (index >= 0 && index < allLessons.length) {
      const nextLesson = allLessons[index].lesson;
      if (course) {
          navigate(`/course/${course.$id}/lesson/${nextLesson.id}`);
      }
    }
  };

  return (
    <div>
      <Link to={`/course/${courseId}`} className="text-primary hover:underline mb-4 inline-block">&larr; Back to Course</Link>
      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="aspect-w-16 aspect-h-9 mb-6 relative bg-gray-900 rounded-lg overflow-hidden">
            {lesson.videoUrl ? (
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={lesson.videoUrl} 
                    title={lesson.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted">Video content not available.</p>
                </div>
            )}
        </div>

        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted mb-6">{lesson.content}</p>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 border-t pt-6">
            <button
                onClick={handleToggleComplete}
                className={`w-full sm:w-auto font-semibold py-2 px-6 rounded-lg border-2 transition-colors ${isCompleted ? 'bg-secondary text-white border-secondary' : 'bg-transparent text-primary border-primary hover:bg-primary/10'}`}
            >
                {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>

            <div className="flex w-full sm:w-auto justify-between sm:justify-start space-x-4 mt-4 sm:mt-0">
                <button 
                    onClick={() => goToLesson(currentLessonIndex - 1)}
                    disabled={currentLessonIndex === 0}
                    className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button 
                    onClick={() => goToLesson(currentLessonIndex + 1)}
                    disabled={currentLessonIndex === allLessons.length - 1}
                    className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>

        {lesson.quiz && (
          <Quiz questions={lesson.quiz} onQuizComplete={handleQuizComplete} />
        )}
      </div>
    </div>
  );
};

export default LessonPage;
