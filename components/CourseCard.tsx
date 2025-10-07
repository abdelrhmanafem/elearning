import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  progress: number;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5 text-muted"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);


const CourseCard = ({ course, progress }: CourseCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/course/${course.$id}`} className="block">
        <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-text">
          <Link to={`/course/${course.$id}`} className="hover:text-primary transition-colors">
            {course.title}
          </Link>
        </h3>
        <p className="text-muted text-sm mb-4 flex-grow">{course.description}</p>
        <div className="flex items-center text-sm text-muted mb-4">
          <UserIcon />
          <span>{course.instructor}</span>
        </div>
        <div className="mt-auto">
            <ProgressBar value={progress} />
            <p className="text-xs text-muted text-right mt-1">{Math.round(progress)}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
