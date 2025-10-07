import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import ProgressBar from '../components/ProgressBar';

const CheckCircleIcon = ({ completed }: { completed: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className={`w-5 h-5 mr-3 ${completed ? 'text-secondary' : 'text-gray-400'}`}>
        {completed ? <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></> : <circle cx="12" cy="12" r="10"></circle>}
    </svg>
);

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, progress, isLessonCompleted } = useAppContext();
  const course = courses.find(c => c.$id === courseId);

  if (!course) {
    return <div>Course not found.</div>;
  }

  const courseProgressDoc = progress.find(p => p.courseId === course.$id);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessonsCount = courseProgressDoc?.completedLessons.length || 0;
  const courseProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const getNextLessonUrl = () => {
    const allLessons = course.modules.flatMap(m => m.lessons.map(l => ({ courseId: course?.$id, lessonId: l.id })));
    for (const lessonInfo of allLessons) {
      if (lessonInfo.courseId && !isLessonCompleted(lessonInfo.courseId, lessonInfo.lessonId)) {
        return `/course/${lessonInfo.courseId}/lesson/${lessonInfo.lessonId}`;
      }
    }
    // If all are complete, go to the first lesson
    if (allLessons.length > 0) {
        return `/course/${allLessons[0].courseId}/lesson/${allLessons[0].lessonId}`;
    }
    return '#'; // No lessons
  };

  return (
    <div>
      <Link to="/courses" className="text-primary hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h1 className="text-4xl font-extrabold text-text mb-2">{course.title}</h1>
            <p className="text-lg text-muted mb-4">by {course.instructor}</p>
            <p className="mb-8">{course.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
                {course.modules.map((module, index) => (
                    <div key={module.id} className="bg-card rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b">
                            <h3 className="font-bold text-lg">Module {index + 1}: {module.title}</h3>
                        </div>
                        <ul>
                        {module.lessons.map(lesson => (
                            <li key={lesson.id}>
                                <Link to={`/course/${course.$id}/lesson/${lesson.id}`} className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200">
                                    <CheckCircleIcon completed={isLessonCompleted(course.$id, lesson.id)} />
                                    <span className="flex-grow">{lesson.title}</span>
                                    <span className="text-sm text-muted">{lesson.durationMinutes} min</span>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg shadow-md sticky top-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Your Progress</h3>
            <ProgressBar value={courseProgress} />
            <p className="text-sm text-muted mt-2 text-center">{completedLessonsCount} of {totalLessons} lessons completed</p>
            <Link to={getNextLessonUrl()} className="w-full text-center block mt-6 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors">
              {courseProgress === 100 ? 'Review Course' : 'Continue Learning'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
