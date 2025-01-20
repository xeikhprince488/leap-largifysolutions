import { useState, useEffect, useCallback } from 'react';

interface Question {
  id: number;
  type: 'mcq' | 'short' | 'long';
  english: string;
  urdu: string;
  grade: string;
  subject: string;
  chapter: string;
  // Add other necessary fields
}

const useQuestionStore = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Load questions from localStorage on component mount
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const saveQuestion = useCallback((question: Question) => {
    setQuestions(prev => {
      const updatedQuestions = [...prev, question];
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      return updatedQuestions;
    });
    return { success: true, message: 'Question saved successfully' };
  }, []);

  const getQuestions = useCallback((grade: string, subject: string, chapter: string) => {
    return questions.filter(q => 
      q.grade === grade && q.subject === subject && q.chapter === chapter
    );
  }, [questions]);

  const deleteQuestion = useCallback((id: number) => {
    setQuestions(prev => {
      const updatedQuestions = prev.filter(q => q.id !== id);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      return updatedQuestions;
    });
  }, []);

  return { questions, saveQuestion, getQuestions, deleteQuestion };
};

export default useQuestionStore;

