
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onQuizComplete: (score: number, total: number) => void;
}

const Quiz = ({ questions, onQuizComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let score = 0;
      questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          score++;
        }
      });
      onQuizComplete(score, questions.length);
      setShowResults(true);
    }
  };

  if (showResults) {
    let score = 0;
    questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
            score++;
        }
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
            <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
            <p className="text-lg mb-4">You scored {score} out of {questions.length}!</p>
            <div className="space-y-4">
                {questions.map((q, index) => (
                    <div key={q.id} className="p-4 rounded-lg bg-gray-50 border">
                        <p className="font-semibold">{index + 1}. {q.question}</p>
                        <p className={`mt-2 ${selectedAnswers[q.id] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                            Your answer: {selectedAnswers[q.id] || "No answer"}
                        </p>
                        {selectedAnswers[q.id] !== q.correctAnswer && (
                            <p className="text-blue-600">Correct answer: {q.correctAnswer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
      <h3 className="text-2xl font-bold mb-2">Quiz Time!</h3>
      <p className="text-muted mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>
      
      <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
      
      <div className="space-y-3">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors duration-200 ${selectedAnswers[currentQuestion.id] === option ? 'bg-primary/20 border-primary' : 'bg-gray-100 hover:bg-gray-200 border-gray-200'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedAnswers[currentQuestion.id]}
        className="mt-6 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;
