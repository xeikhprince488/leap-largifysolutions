import axios from 'axios';
import { Question } from '@/types/questions';

interface QuestionData {
  id: number;
  type: string;
  english: string;
  urdu: string;
  options?: {
    english: string;
    urdu: string;
    value: string;
  }[];
  correct?: string;
  marks: number;
}

interface Questions {
  mcq: QuestionData[];
  short: QuestionData[];
  long: QuestionData[];
}

interface DataStructure {
  [key: string]: {
    [key: string]: Questions;
  };
}

export async function fetchQuestions(
  subject: string,
  grade: string,
  chapters: string[],
  limit: number,
  type: string
): Promise<Question[]> {
  try {
    const response = await axios.post('/api/fetch-questions', {
      subject,
      grade,
      chapters,
      limit,
      type
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

