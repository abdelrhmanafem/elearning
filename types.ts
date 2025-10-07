import { Models } from 'appwrite';

// Fix: Use Models.User instead of the non-existent Models.Account.
// This aligns with the type returned by `account.get()` in the Appwrite SDK.
export interface User extends Models.User<Models.Preferences> {}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  content: string;
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Course data as stored in Appwrite
export interface CourseDocument extends Models.Document {
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  modules: string; // Stored as JSON string
}

// Course data after parsing modules JSON
export interface Course extends Omit<CourseDocument, 'modules'> {
    modules: Module[];
}

export interface CourseProgress extends Models.Document {
  userId: string;
  courseId: string;
  completedLessons: string[];
}
