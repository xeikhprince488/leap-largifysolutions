'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// List of chapters for English
const englishChapters = [
  {
    id: "lesson-1",
    title: "LESSON 1: Hazrat Muhammad ﷺ an Embodiment of Justice",
    items: [
      { id: "1.1", title: "Hazrat Muhammad ﷺ an Embodiment of Justice" }
    ]
  },
  {
    id: "lesson-2",
    title: "LESSON 2: Chinese New Year",
    items: [
      { id: "2.1", title: "Chinese New Year" }
    ]
  },
  {
    id: "poem-3",
    title: "POEM 3: Try Again",
    items: [
      { id: "3.1", title: "Try Again" }
    ]
  },
  {
    id: "lesson-4",
    title: "LESSON 4: First Aid",
    items: [
      { id: "4.1", title: "First Aid" }
    ]
  },
  {
    id: "poem-5",
    title: "POEM 5: The Rain",
    items: [
      { id: "5.1", title: "The Rain" }
    ]
  },
  {
    id: "lesson-6",
    title: "LESSON 6: Television vs. Newspapers",
    items: [
      { id: "6.1", title: "Television vs. Newspapers" }
    ]
  },
  {
    id: "lesson-7",
    title: "LESSON 7: Little by Little One Walks Far!",
    items: [
      { id: "7.1", title: "Little by Little One Walks Far!" }
    ]
  },
  {
    id: "poem-8",
    title: "POEM 8: Peace",
    items: [
      { id: "8.1", title: "Peace" }
    ]
  },
  {
    id: "lesson-9",
    title: "LESSON 9: Selecting the Right Career",
    items: [
      { id: "9.1", title: "Selecting the Right Career" }
    ]
  },
  {
    id: "lesson-10",
    title: "LESSON 10: A World Without Books",
    items: [
      { id: "10.1", title: "A World Without Books" }
    ]
  },
  {
    id: "lesson-11",
    title: "LESSON 11: Great Expectations",
    items: [
      { id: "11.1", title: "Great Expectations" }
    ]
  },
  {
    id: "lesson-12",
    title: "LESSON 12: Population Growth and World Food Supplies",
    items: [
      { id: "12.1", title: "Population Growth and World Food Supplies" }
    ]
  },
  {
    id: "lesson-13",
    title: "LESSON 13: Faithfulness",
    items: [
      { id: "13.1", title: "Faithfulness" }
    ]
  },
  {
    id: "tenses",
    title: "TENSES",
    items: [
      { id: "1", title: "Present Indefinite Tense" },
      { id: "2", title: "Present Continuous Tense" },
      { id: "3", title: "Present Perfect Tense" },
      { id: "4", title: "Present Perfect Continuous Tense" },
      { id: "5", title: "Past Indefinite Tense" },
      { id: "6", title: "Past Continuous Tense" },
      { id: "7", title: "Past Perfect Tense" },
      { id: "8", title: "Past Perfect Continuous Tense" },
      { id: "9", title: "Future Indefinite Tense" },
      { id: "10", title: "Future Continuous Tense" },
      { id: "11", title: "Future Perfect Tense" },
      { id: "12", title: "Future Perfect Continuous Tense" }
    ]
  },
  {
    id: "direct-indirect",
    title: "Direct & Indirect",
    items: [
      { id: "1", title: "Assertive Sentences" },
      { id: "2", title: "Interrogative Sentences" },
      { id: "3", title: "Imperative Sentences" },
      { id: "4", title: "Exclamatory / Optative Sentences" },
      { id: "5", title: "Interrogative Sentences" }
    ]
  },
  {
    id: "english-b",
    title: "English B",
    items: [
      { id: "1", title: "Pair of Words" },
      { id: "2", title: "Essays" },
      { id: "3", title: "Writing Paragraphs" },
      { id: "4", title: "Translate into English Paragraphs" }
    ]
  }
]

export default function EnglishChaptersPage() {
  const router = useRouter()

  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/english/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - English (10th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={englishChapters} onSelectionChange={handleSelectionChange} />
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
