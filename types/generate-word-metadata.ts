export interface GenerateWordMetadata {
  grade: string;
  paperNo: string;
  date: string;
  timeAllowed: string;
  subject: string;
  totalMarks: string;
  day: string;
  category: string;
  topic: string;
  chapter: string[];
  sections: {
    type: string;
    heading: string;
    marks: number;
  }[];
}
