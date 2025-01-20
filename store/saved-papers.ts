import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware'
import { SavedPaper, SavedPapersState } from '@/types/saved-papers'

interface Paper {
  id: string;
  title: string;
  fileName: string;
  pdfContent: string;
  createdAt: string;
  metadata: any;
}

interface SavedPapersStore extends SavedPapersState {
  removePaper(id: any): unknown;
  addPaper: (paper: SavedPaper) => void
  getPapersByGrade: (grade: string) => SavedPaper[]
  getPapersBySubject: (grade: string, subject: string) => SavedPaper[]
  fetchPapers: () => Promise<void>;
}

const useSavedPapersStore = create<SavedPapersStore>()(
  persist(
    (set, get) => ({
      papers: {},
      fetchPapers: async () => {
        try {
          const response = await axios.get('/api/get-papers');
          const papers = response.data;
          set({ papers });
        } catch (error) {
          console.error('Error fetching papers:', error);
        }
      },
      addPaper: (paper) => set((state) => {
        const newPapers = { ...state.papers }
        const { grade, subject } = paper.metadata
        
        if (!newPapers[grade]) {
          newPapers[grade] = {}
        }
        if (!newPapers[grade][subject]) {
          newPapers[grade][subject] = []
        }
        
        newPapers[grade][subject] = [
          ...newPapers[grade][subject],
          paper
        ]
        
        return { papers: newPapers }
      }),
      removePaper: (id) => set((state) => {
        const newPapers = { ...state.papers }
        for (const grade in newPapers) {
          for (const subject in newPapers[grade]) {
            newPapers[grade][subject] = newPapers[grade][subject].filter((paper: SavedPaper) => paper.id !== id)
          }
        }
        return { papers: newPapers }
      }),
      getPapersByGrade: (grade) => {
        const state = get()
        if (!state.papers[grade]) return []
        return Object.values(state.papers[grade]).flat()
      },
      getPapersBySubject: (grade, subject) => {
        const state = get()
        if (!state.papers[grade]?.[subject]) return []
        return state.papers[grade][subject]
      }
    }),
    {
      name: 'saved-papers-storage'
    }
  )
)

export default useSavedPapersStore

