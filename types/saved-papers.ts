export interface SavedPaper {
  id: string;
  title: string;
  fileName: string;
  pdfContent: string;
  createdAt: string;
  metadata: {
    topic: string;
    category: string;
    grade: string;
    subject: string;
    chapter: string[];
    questionTypes: ('mcq' | 'short' | 'long')[];
    totalQuestions: number;
  };
}

export interface SavedPapersState {
  papers: {
    [grade: string]: {
      [subject: string]: SavedPaper[];
    };
  };
}

