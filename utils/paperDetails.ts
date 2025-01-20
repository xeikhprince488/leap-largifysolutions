import { useState } from 'react';

export interface PaperDetails {
  paper: string;
  class: string;
  timeAllowed: string;
  day: string;
  syllabus: string;
}

export function usePaperDetails() {
  const [paperDetails, setPaperDetails] = useState<PaperDetails>({
    paper: '',
    class: '',
    timeAllowed: '',
    day: '',
    syllabus: '',
  });

  const collectPaperDetails = (): Promise<PaperDetails> => {
    return new Promise((resolve) => {
      const details: PaperDetails = {
        paper: prompt('Enter Paper Name:') || '',
        class: prompt('Enter Class:') || '',
        timeAllowed: prompt('Enter Time Allowed:') || '',
        day: prompt('Enter Day:') || '',
        syllabus: prompt('Enter Syllabus:') || '',
      };
      setPaperDetails(details);
      resolve(details);
    });
  };

  return { paperDetails, collectPaperDetails };
}

