'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "سورۃ نمبر 4: سُورۃُ اَلبَقرَۃِ",
    items: [
      { id: "1.1", title: "سُورَۃُ البَقَرَۃِ" }
    ]
  },
  {
    id: "chap-2",
    title: "سورۃ نمبر 5: سُورۃُ آلِ عِمرٰان",
    items: [
      { id: "2.1", title: "سُورَۃُ آلِ عِمرٰان" }
    ]
  },
  {
    id: "chap-3",
    title: "سورۃ نمبر 6: سُورۃُ آلِ الانفال",
    items: [
      { id: "3.1", title: "سُورَۃُ الاَنَفَالِ" }
    ]
  },
  {
    id: "chap-4",
    title: "سورۃ نمبر 7: سُورۃُ التوبہ",
    items: [
      { id: "4.1", title: "سُورَۃُ التَّوبَۃِ" }
    ]
  }
]

export default function PakistanStudiesChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/tarjumaquran/configure')
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
