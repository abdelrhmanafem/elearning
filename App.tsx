import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AppProvider>
      <RouterComponent />
    </AppProvider>
  );
}

const RouterComponent = () => {
  const { user, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              user ? <Navigate to="/courses" /> : <Navigate to="/login" />
            } />
            <Route path="/courses" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/course/:courseId" element={
              <PrivateRoute>
                <CourseDetailPage />
              </PrivateRoute>
            } />
            <Route path="/course/:courseId/lesson/:lessonId" element={
              <PrivateRoute>
                <LessonPage />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
