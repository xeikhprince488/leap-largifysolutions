export interface MCQOption {
    english?: string
    urdu: string
  }
  
  export interface Question {
    id: string
    type: "mcq" | "short" | "long"
    english?: string
    urdu?: string
    marks: number
    options?: MCQOption[]
    correct?: string
    image?: string
  }
  
  export interface QuestionConfig {
    type: "mcq" | "short" | "long"
    count: number
    marks: number
    heading: string
  }
  
  export interface MCQQuestion extends Question {
    type: "mcq"
    options: MCQOption[]
    correct: string
  }
  
  export interface ShortQuestion extends Question {
    type: "short"
  }
  
  export interface LongQuestion extends Question {
    type: "long"
  }
  
  