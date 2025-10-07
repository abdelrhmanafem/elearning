import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import { Course } from '../types';

const HomePage = () => {
  const { courses, progress } = useAppContext();

  const calculateProgress = (course: Course) => {
    const courseProgress = progress.find(p => p.courseId === course.$id);
    if (!courseProgress) return 0;
    
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    if (totalLessons === 0) return 0;

    const completedLessons = courseProgress.completedLessons.length || 0;
    return (completedLessons / totalLessons) * 100;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-text">My Courses</h1>
      <p className="text-lg text-muted mb-8">Continue your learning journey.</p>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard 
              key={course.$id} 
              course={course}
              progress={calculateProgress(course)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-text mb-2">No Courses Found</h2>
          <p className="text-muted">It looks like no courses have been added to the backend yet.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
