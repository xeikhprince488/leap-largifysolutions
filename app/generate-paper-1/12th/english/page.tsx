'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const englishChapters = [
  {
    id: "lesson-1",
    title: "LESSON 1: The Dying Sun",
    items: [
      { id: "1", title: "1 The Dying Sun" }
    ]
  },
  {
    id: "lesson-2",
    title: "LESSON 2: Using The Scientific Method",
    items: [
      { id: "2", title: "2 Using The Scientific Method" }
    ]
  },
  {
    id: "lesson-3",
    title: "LESSON 3: Why Boys Fail In College",
    items: [
      { id: "3", title: "3 Why Boys Fail In College" }
    ]
  },
  {
    id: "lesson-4",
    title: "LESSON 4: End Of Term",
    items: [
      { id: "4", title: "4 End Of Term" }
    ]
  },
  {
    id: "lesson-5",
    title: "LESSON 5: On Destroying Books",
    items: [
      { id: "5", title: "5 On Destroying Books" }
    ]
  },
  {
    id: "lesson-6",
    title: "LESSON 6: The Man Who Was A Hospital",
    items: [
      { id: "6", title: "6 The Man Who Was A Hospital" }
    ]
  },
  {
    id: "lesson-7",
    title: "LESSON 7: My Financial Career",
    items: [
      { id: "7", title: "7 My Financial Career" }
    ]
  },
  {
    id: "lesson-8",
    title: "LESSON 8: China's Way To Progress",
    items: [
      { id: "8", title: "8 China's Way To Progress" }
    ]
  },
  {
    id: "lesson-9",
    title: "LESSON 9: Hunger And Population Explosion",
    items: [
      { id: "9", title: "9 Hunger And Population Explosion" }
    ]
  },
  {
    id: "lesson-10",
    title: "LESSON 10: The Jewel Of The World",
    items: [
      { id: "10", title: "10 The Jewel Of The World" }
    ]
  },
  {
    id: "hero-1",
    title: "HERO 1: First Year At Harrow",
    items: [
      { id: "1", title: "1 First Year At Harrow" }
    ]
  },
  {
    id: "hero-2",
    title: "HERO 2: Hitch-Hiking Across The Sahara",
    items: [
      { id: "2", title: "2 Hitch-Hiking Across The Sahara" }
    ]
  },
  {
    id: "hero-3",
    title: "HERO 3: Sir Alexander Fleming",
    items: [
      { id: "3", title: "3 Sir Alexander Fleming" }
    ]
  },
  {
    id: "hero-4",
    title: "HERO 4: Louis Pasteur",
    items: [
      { id: "4", title: "4 Louis Pasteur" }
    ]
  },
  {
    id: "hero-5",
    title: "HERO 5: Mustafa Kamal",
    items: [
      { id: "5", title: "5 Mustafa Kamal" }
    ]
  },
  {
    id: "mr-chips-1",
    title: "Mr.Chips-1",
    items: [
      { id: "1", title: "1 Mr.Chips-1" }
    ]
  },
  {
    id: "mr-chips-2",
    title: "Mr.Chips-2",
    items: [
      { id: "2", title: "2 Mr.Chips-2" }
    ]
  },
  {
    id: "mr-chips-3",
    title: "Mr.Chips-3",
    items: [
      { id: "3", title: "3 Mr.Chips-3" }
    ]
  },
  {
    id: "mr-chips-4",
    title: "Mr.Chips-4",
    items: [
      { id: "4", title: "4 Mr.Chips-4" }
    ]
  },
  {
    id: "mr-chips-5",
    title: "Mr.Chips-5",
    items: [
      { id: "5", title: "5 Mr.Chips-5" }
    ]
  },
  {
    id: "english-b",
    title: "English (B)",
    items: [
      { id: "1", title: "1 Essays" },
      { id: "2", title: "2 Idioms" },
      { id: "3", title: "3 Translate into English Paragraph's" },
      { id: "4", title: "4 Correct Sentences" },
      { id: "5", title: "5 Correct Prepositions" }
    ]
  }
]

export default function EnglishChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/english/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - English (12th)</h1>
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
