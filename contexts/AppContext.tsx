import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Course, CourseProgress, CourseDocument, Module } from '../types';
import { account, databases, APPWRITE_DATABASE_ID, COURSES_COLLECTION_ID, PROGRESS_COLLECTION_ID } from '../lib/appwrite';
import { ID, Query } from 'appwrite';

interface AppContextType {
  user: User | null;
  courses: Course[];
  progress: CourseProgress[];
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper function to parse course documents
const parseCourse = (doc: CourseDocument): Course => ({
    ...doc,
    modules: JSON.parse(doc.modules || '[]') as Module[],
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<CourseProgress[]>([]);

  // Check for active session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        // Not logged in
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // Fetch courses and progress when user logs in
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          // Fetch courses
          // Fix: Added generic <CourseDocument> to listDocuments for strong typing
          const courseResponse = await databases.listDocuments<CourseDocument>(
            APPWRITE_DATABASE_ID,
            COURSES_COLLECTION_ID
          );
          // Fix: Removed unnecessary cast as courseResponse.documents is now correctly typed.
          const parsedCourses = courseResponse.documents.map(doc => parseCourse(doc));
          setCourses(parsedCourses);

          // Fetch progress for this user
          // Fix: Added generic <CourseProgress> to listDocuments for strong typing
          const progressResponse = await databases.listDocuments<CourseProgress>(
            APPWRITE_DATABASE_ID,
            PROGRESS_COLLECTION_ID,
            [Query.equal('userId', user.$id)]
          );
          // Fix: Removed unnecessary cast as progressResponse.documents is now correctly typed.
          setProgress(progressResponse.documents);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      // Clear data on logout
      setCourses([]);
      setProgress([]);
    }
  }, [user]);

  const login = async (email: string, pass: string) => {
    await account.createEmailPasswordSession(email, pass);
    const currentUser = await account.get();
    setUser(currentUser);
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    const courseProgress = progress.find(p => p.courseId === courseId);
    return courseProgress?.completedLessons.includes(lessonId) || false;
  };

  const toggleLessonComplete = async (courseId: string, lessonId:string) => {
    if (!user) return;
    
    const courseProgress = progress.find(p => p.courseId === courseId && p.userId === user.$id);
    
    if (courseProgress) {
        // Update existing progress
        const completedLessons = courseProgress.completedLessons;
        const isCompleted = completedLessons.includes(lessonId);
        const newCompletedLessons = isCompleted
            ? completedLessons.filter(id => id !== lessonId)
            : [...completedLessons, lessonId];
        
        // Fix: Added generic <CourseProgress> to updateDocument for strong typing
        const updatedDoc = await databases.updateDocument<CourseProgress>(
            APPWRITE_DATABASE_ID,
            PROGRESS_COLLECTION_ID,
            courseProgress.$id,
            { completedLessons: newCompletedLessons }
        );
        // Fix: Removed unnecessary cast as updatedDoc is now correctly typed.
        setProgress(prev => prev.map(p => p.$id === updatedDoc.$id ? updatedDoc : p));

    } else {
        // Create new progress document
        // Fix: Added generic <CourseProgress> to createDocument for strong typing
        const newDoc = await databases.createDocument<CourseProgress>(
            APPWRITE_DATABASE_ID,
            PROGRESS_COLLECTION_ID,
            ID.unique(),
            {
                userId: user.$id,
                courseId: courseId,
                completedLessons: [lessonId]
            }
        );
        // Fix: Removed unnecessary cast as newDoc is now correctly typed.
        setProgress(prev => [...prev, newDoc]);
    }
  };

  const value = {
    user,
    courses,
    progress,
    login,
    logout,
    toggleLessonComplete,
    isLessonCompleted,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
