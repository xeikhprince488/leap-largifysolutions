'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const englishChapters = [
  {
    id: "eng-1",
    title: "LESSON 1: The Saviour of Mankind",
    items: [
      { id: "eng-1-1", title: "The Saviour of Mankind" },
    ]
  },
  {
    id: "eng-2",
    title: "LESSON 2: Patriotism",
    items: [
      { id: "eng-2-1", title: "Patriotism" },
    ]
  },
  {
    id: "eng-3",
    title: "LESSON 3: Media and Its Impact",
    items: [
      { id: "eng-3-1", title: "Media and Its Impact" },
    ]
  },
  {
    id: "eng-4",
    title: "LESSON 4: Hazrat Asma (R.A)",
    items: [
      { id: "eng-4-1", title: "Hazrat Asma (R.A)" },
    ]
  },
  {
    id: "eng-5",
    title: "POEM 5: Daffodils",
    items: [
      { id: "eng-5-1", title: "Daffodils" },
    ]
  },
  {
    id: "eng-6",
    title: "LESSON 6: The Quaid's Vision and Pakistan",
    items: [
      { id: "eng-6-1", title: "The Quaid's Vision and Pakistan" },
    ]
  },
  {
    id: "eng-7",
    title: "LESSON 7: Sultan Ahmad Masjid",
    items: [
      { id: "eng-7-1", title: "Sultan Ahmad Masjid" },
    ]
  },
  {
    id: "eng-8",
    title: "POEM 8: Stopping by Woods on a Snowy Evening",
    items: [
      { id: "eng-8-1", title: "Stopping by Woods on a Snowy Evening" },
    ]
  },
  {
    id: "eng-9",
    title: "LESSON 9: All is not Lost",
    items: [
      { id: "eng-9-1", title: "All is not Lost" },
    ]
  },
  {
    id: "eng-10",
    title: "LESSON 10: Drug Addiction",
    items: [
      { id: "eng-10-1", title: "Drug Addiction" },
    ]
  },
  {
    id: "eng-11",
    title: "LESSON 11: Noise in the Environment",
    items: [
      { id: "eng-11-1", title: "Noise in the Environment" },
    ]
  },
  {
    id: "eng-12",
    title: "LESSON 12: Three Days to See",
    items: [
      { id: "eng-12-1", title: "Three Days to See" },
    ]
  },
  {
    id: "eng-b",
    title: "English B (Additional Topics)",
    items: [
      { id: "eng-b-1", title: "Letters" },
      { id: "eng-b-2", title: "Stories" },
      { id: "eng-b-3", title: "Dialogues" },
      { id: "eng-b-4", title: "Comprehension Paragraphs" },
      { id: "eng-b-5", title: "Idioms" },
    ]
  },
  {
    id: "eng-tenses",
    title: "TENSES",
    items: [
      { id: "eng-tenses-1", title: "Use of 'is', 'am', 'are' and 'was', were" },
      { id: "eng-tenses-2", title: "Use of 'has' and 'have'" },
      { id: "eng-tenses-3", title: "Use of 'had'" },
      { id: "eng-tenses-4", title: "Present Indefinite Tense" },
      { id: "eng-tenses-5", title: "Present Continuous Tense" },
      { id: "eng-tenses-6", title: "Present Perfect Tense" },
      { id: "eng-tenses-7", title: "Present Perfect Continuous Tense" },
      { id: "eng-tenses-8", title: "Past Indefinite Tense" },
      { id: "eng-tenses-9", title: "Past Continuous Tense" },
      { id: "eng-tenses-10", title: "Past Perfect Tense" },
      { id: "eng-tenses-11", title: "Past Perfect Continuous Tense" },
      { id: "eng-tenses-12", title: "Future Indefinite Tense" },
      { id: "eng-tenses-13", title: "Future Continuous Tense" },
      { id: "eng-tenses-14", title: "Future Perfect Tense" },
      { id: "eng-tenses-15", title: "Future Perfect Continuous Tense" },
    ]
  }
]

export default function EnglishChaptersPage() {
  const router = useRouter()
  
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/english/configure')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select English Chapters (9th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree 
                items={englishChapters} 
                onSelectionChange={handleSelectionChange} 
              />
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
