import { create } from 'zustand'
import { Question } from '@/types/questions'

interface QuestionBankState {
  availableQuestions: Question[];
  selectedQuestions: Question[];
  randomQuestions: Question[];
  showPaper: boolean;
}




const useQuestionStore = create<QuestionBankState & {
  setAvailableQuestions: (questions: Question[]) => void
  setSelectedQuestions: (questions: Question[]) => void
  setRandomQuestions: (questions: Question[]) => void
  setShowPaper: (show: boolean) => void
  clearSelections: () => void
}>((set) => ({
  availableQuestions: [],
  selectedQuestions: [],
  randomQuestions: [],
  showPaper: false,
  setAvailableQuestions: (questions: any) => set({ availableQuestions: questions }),
  setSelectedQuestions: (questions: any) => set({ selectedQuestions: questions }),
  setRandomQuestions: (questions: any) => set({ randomQuestions: questions }),
  setShowPaper: (show: any) => set({ showPaper: show }),
  clearSelections: () => set({ selectedQuestions: [], randomQuestions: [] }),
}))

export default useQuestionStore

