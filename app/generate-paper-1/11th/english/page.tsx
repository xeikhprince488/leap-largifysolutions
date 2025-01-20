'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const englishChapters = [
  {
    id: "lesson-1",
    title: "LESSON 1: Button, Button",
    items: [
      { id: "1.1", title: "1 Button, Button" }
    ]
  },
  {
    id: "lesson-2",
    title: "LESSON 2: Clearing In the Sky",
    items: [
      { id: "2.1", title: "2 Clearing In the Sky" }
    ]
  },
  {
    id: "lesson-3",
    title: "LESSON 3: Dark they were, and Golden-Eye",
    items: [
      { id: "3.1", title: "3 Dark they were, and Golden-Eye" }
    ]
  },
  {
    id: "lesson-4",
    title: "LESSON 4: Thank You, M'am",
    items: [
      { id: "4.1", title: "4 Thank You, Ma'm" }
    ]
  },
  {
    id: "lesson-5",
    title: "LESSON 5: The Piece Of String",
    items: [
      { id: "5.1", title: "5 The Piece Of String" }
    ]
  },
  {
    id: "lesson-6",
    title: "LESSON 6: The Reward",
    items: [
      { id: "6.1", title: "6 The Reward" }
    ]
  },
  {
    id: "lesson-7",
    title: "LESSON 7: The Use of Force",
    items: [
      { id: "7.1", title: "7 The Use of Force" }
    ]
  },
  {
    id: "lesson-8",
    title: "LESSON 8: The Gullistan Of Sa'di",
    items: [
      { id: "8.1", title: "8 The Gullistan Of Sa'di" }
    ]
  },
  {
    id: "lesson-9",
    title: "LESSON 9: The Foolish Quack",
    items: [
      { id: "9.1", title: "9 The Foolish Quack" }
    ]
  },
  {
    id: "lesson-10",
    title: "LESSON 10: A Mild Attack Of Locusts",
    items: [
      { id: "10.1", title: "10 A Mild Attack Of Locusts" }
    ]
  },
  {
    id: "lesson-11",
    title: "LESSON 11: I Have A Dream",
    items: [
      { id: "11.1", title: "11 I Have A Dream" }
    ]
  },
  {
    id: "lesson-12",
    title: "LESSON 12: The Gift Of The Magi",
    items: [
      { id: "12.1", title: "12 The Gift Of The Magi" }
    ]
  },
  {
    id: "lesson-13",
    title: "LESSON 13: God Be Praised",
    items: [
      { id: "13.1", title: "13 God Be Praised" }
    ]
  },
  {
    id: "lesson-14",
    title: "LESSON 14: Overcoat",
    items: [
      { id: "14.1", title: "14 Overcoat" }
    ]
  },
  {
    id: "lesson-15",
    title: "LESSON 15: The Angel And The Author-and Others",
    items: [
      { id: "15.1", title: "15 The Angel And The Author-and Others" }
    ]
  },
  {
    id: "play-1",
    title: "PLAY 1: Heat Lightening",
    items: [
      { id: "1.1", title: "1 Heat Lightening" }
    ]
  },
  {
    id: "play-2",
    title: "PLAY 2: Visit To A Small Planet",
    items: [
      { id: "2.1", title: "2 Visit To A Small Planet" }
    ]
  },
  {
    id: "play-3",
    title: "PLAY 3: The Oyster And The Pearl",
    items: [
      { id: "3.1", title: "3 The Oyster And The Pearl" }
    ]
  },
  {
    id: "poem-1",
    title: "POEM 1: The Rain",
    items: [
      { id: "1.1", title: "1 The Rain" }
    ]
  },
  {
    id: "poem-2",
    title: "POEM 2: Night Mail",
    items: [
      { id: "2.1", title: "2 Night Mail" }
    ]
  },
  {
    id: "poem-3",
    title: "POEM 3: Loveliest Of Trees, The Cherry Now",
    items: [
      { id: "3.1", title: "3 Loveliest Of Trees, The Cherry Now" }
    ]
  },
  {
    id: "poem-4",
    title: "POEM 4: O Where You Are Going?",
    items: [
      { id: "4.1", title: "4 O Where You Are Going?" }
    ]
  },
  {
    id: "poem-5",
    title: "POEM 5: In The Street Of The Fruits Stalls",
    items: [
      { id: "5.1", title: "5 In The Street Of The Fruits Stalls" }
    ]
  },
  {
    id: "poem-6",
    title: "POEM 6: A Sindhi Woman",
    items: [
      { id: "6.1", title: "6 A Sindhi Woman" }
    ]
  },
  {
    id: "poem-7",
    title: "POEM 7: Times",
    items: [
      { id: "7.1", title: "7 Times" }
    ]
  },
  {
    id: "poem-8",
    title: "POEM 8: Ozymandias",
    items: [
      { id: "8.1", title: "8 Ozymandias" }
    ]
  },
  {
    id: "poem-9",
    title: "POEM 9: The Feed",
    items: [
      { id: "9.1", title: "9 The Feed" }
    ]
  },
  {
    id: "poem-10",
    title: "POEM 10: The Hollow Men",
    items: [
      { id: "10.1", title: "10 The Hollow Men" }
    ]
  },
  {
    id: "poem-11",
    title: "POEM 11: Leisure",
    items: [
      { id: "11.1", title: "11 Leisure" }
    ]
  },
  {
    id: "poem-12",
    title: "POEM 12: Ruba'iyat",
    items: [
      { id: "12.1", title: "12 Ruba'iyat" }
    ]
  },
  {
    id: "poem-13",
    title: "POEM 13: A Tale Of Two Cities",
    items: [
      { id: "13.1", title: "13 A Tale Of Two Cities" }
    ]
  },
  {
    id: "poem-14",
    title: "POEM 14: My Neighbour Friend Breathing His Last!",
    items: [
      { id: "14.1", title: "14 My Neighbour Friend Breathing His Last!" }
    ]
  },
  {
    id: "poem-15",
    title: "POEM 15: He Came To Know Himself",
    items: [
      { id: "15.1", title: "15 He Came To Know Himself" }
    ]
  },
  {
    id: "poem-16",
    title: "POEM 16: God's Attributes",
    items: [
      { id: "16.1", title: "16 God's Attributes" }
    ]
  },
  {
    id: "poem-17",
    title: "POEM 17: The Delight Song",
    items: [
      { id: "17.1", title: "17 The Delight Song" }
    ]
  },
  {
    id: "poem-18",
    title: "POEM 18: Love- and Essence Of All Religions",
    items: [
      { id: "18.1", title: "18 Love- and Essence Of All Religions" }
    ]
  },
  {
    id: "poem-19",
    title: "POEM 19: A Man Of Words And Not Of Deeds",
    items: [
      { id: "19.1", title: "19 A Man Of Words And Not Of Deeds" }
    ]
  },
  {
    id: "poem-20",
    title: "POEM 20: In Broken Images",
    items: [
      { id: "20.1", title: "20 In Broken Images" }
    ]
  },
  {
    id: "grammar",
    title: "Correct Form Of Verb",
    items: [
      { id: "1", title: "1 Present Indefinite Tense" },
      { id: "2", title: "2 Present Continuous Tense" },
      { id: "3", title: "3 Present Perfect Tense" },
      { id: "4", title: "4 Present Perfect Continuous Tense" },
      { id: "5", title: "5 Past Indefinite Tense" },
      { id: "6", title: "6 Past Continuous Tense" },
      { id: "7", title: "7 Past Perfect Tense" },
      { id: "8", title: "8 Past Perfect Continuous Tense" },
      { id: "9", title: "9 Future Indefinite Tense" },
      { id: "10", title: "10 Future Continuous Tense" },
      { id: "11", title: "11 Future Perfect Tense" },
      { id: "12", title: "12 Future Perfect Continuous Tense" }
    ]
  },
  {
    id: "english-b",
    title: "English (B)",
    items: [
      { id: "1", title: "1 Letters" },
      { id: "2", title: "2 Applications" },
      { id: "3", title: "3 Stories" },
      { id: "4", title: "4 Pair Of Words" }
    ]
  }
]

export default function EnglishChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/english/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - English (11th)</h1>
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
