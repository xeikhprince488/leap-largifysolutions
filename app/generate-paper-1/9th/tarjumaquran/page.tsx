'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "سورۃ نمبر 1: سُورَۃُ مَریَمِ",
    items: [
      { id: "1.1", title: "سُورَۃُ مَریَمِ" }
    ]
  },
  {
    id: "chap-2",
    title: "سورۃ نمبر 2: سُورَۃُ طٰہٰ",
    items: [
      { id: "2.1", title: "سُورَۃُ طٰہٰ" }
    ]
  },
  {
    id: "chap-3",
    title: "سورۃ نمبر 3: سُورَۃُ الاَنبِیَاءِ",
    items: [
      { id: "3.1", title: "سُورَۃُ الاَنبِیَاءِ" }
    ]
  },
  {
    id: "chap-4",
    title: "سورۃ نمبر 4: سُورَۃُ الَحَجّ",
    items: [
      { id: "4.1", title: "سُورَۃُ الَحَجّ" }
    ]
  },
  {
    id: "chap-5",
    title: "سورۃ نمبر 5: سُورَۃُ الفُرقَانَ",
    items: [
      { id: "5.1", title: "سُورَۃُ الفُرقَانَ" }
    ]
  },
  {
    id: "chap-6",
    title: "سورۃ نمبر 6: سُورَۃُ الشّعَرَآءِ",
    items: [
      { id: "6.1", title: "سُورَۃُ الشّعَرَآءِ" }
    ]
  },
  {
    id: "chap-7",
    title: "سورۃ نمبر 7: سُورَۃُ النُّملِ",
    items: [
      { id: "7.1", title: "سُورَۃُ النُّملِ" }
    ]
  },
  {
    id: "chap-8",
    title: "سورۃ نمبر 8: سُورَۃُ القَصَصِ",
    items: [
      { id: "8.1", title: "سُورَۃُ القَصَصِ" }
    ]
  },
  {
    id: "chap-9",
    title: "سورۃ نمبر 9: سُورَۃُ العَنکَبُوتَ",
    items: [
      { id: "9.1", title: "سُورَۃُ العَنکَبُوتَ" }
    ]
  },
  {
    id: "chap-10",
    title: "سورۃ نمبر 10: سُورَۃُ الرُّومہِ",
    items: [
      { id: "10.1", title: "سُورَۃُ الرُّومہِ" }
    ]
  },
  {
    id: "chap-11",
    title: "سورۃ نمبر 11: سُورَۃُ لُقمنَ",
    items: [
      { id: "11.1", title: "سُورَۃُ لُقمنَ" }
    ]
  },
  {
    id: "chap-12",
    title: "سورۃ نمبر 12: سُورَۃُ السَّجدَۃِ",
    items: [
      { id: "12.1", title: "سُورَۃُ السَّجدَۃِ" }
    ]
  },
  {
    id: "chap-13",
    title: "سورۃ نمبر 13: سُورَۃُ سَبَاِِ",
    items: [
      { id: "13.1", title: "سُورَۃُ سَبَاِِ" }
    ]
  },
  {
    id: "chap-14",
    title: "سورۃ نمبر 14: سُورَۃُ فَاطِرِِ",
    items: [
      { id: "14.1", title: "سُورَۃُ فَاطِرِِ" }
    ]
  },
  {
    id: "chap-15",
    title: "سورۃ نمبر 15: سُورَۃُ یَس",
    items: [
      { id: "15.1", title: "سُورَۃُ یَس" }
    ]
  },
  {
    id: "chap-16",
    title: "سورۃ نمبر 16: سُورَۃُ الصّٰفّٰتِ",
    items: [
      { id: "16.1", title: "سُورَۃُ الصّٰفّٰتِ" }
    ]
  },
  {
    id: "chap-17",
    title: "سورۃ نمبر 17: سُورَۃُ صٓ",
    items: [
      { id: "17.1", title: "سُورَۃُ صٓ" }
    ]
  },
  {
    id: "chap-18",
    title: "سورۃ نمبر 18: سُورَۃُ الاَحقَافِ",
    items: [
      { id: "18.1", title: "سُورَۃُ الاَحقَافِ" }
    ]
  }
]

export default function PakistanStudiesChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/tarjumaquran/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Tarjuma Tul Quran (9th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={chapters} onSelectionChange={handleSelectionChange} />
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
