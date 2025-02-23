export interface Option {
  english: string
  urdu: string
  value: 'A' | 'B' | 'C' | 'D'
}

export interface BaseQuestion {
  id: string // Change id type to string
  english: string
  urdu: string
  chapter: string
  type: 'mcq' | 'short' | 'long'
  marks: number;
  image?: string 
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq'
  options: Option[]
  correct: 'A' | 'B' | 'C' | 'D'
}

export interface ShortQuestion extends BaseQuestion {
  type: 'short'
  answer: {
    english: string
    urdu: string
  }
}

export interface LongQuestion extends BaseQuestion {
  type: 'long'
  answer: {
    english: string
    urdu: string
  }
  outline?: {
    english: string[]
    urdu: string[]
  }
}

export type Question = MCQQuestion | ShortQuestion | LongQuestion

export type { MCQQuestion as MCQQuestionType, ShortQuestion as ShortQuestionType, LongQuestion as LongQuestionType };

export type QuestionConfig = {

  type: "mcq" | "short" | "long" | "poetryExplanation" | "excerptExplanation" | "fillInTheBlanks" | "mcqs" | "applicationWriting" | "letterWriting" | "essayWriting";

  count: number;

  marks: number;

  heading: string;

};

export interface PaperConfig {
  totalMarks: number
  sections: QuestionConfig[]
}

