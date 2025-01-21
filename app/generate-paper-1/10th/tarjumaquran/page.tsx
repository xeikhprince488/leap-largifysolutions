'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "سورۃ نمبر 1: سُورَۃُ الاَنعَامِ",
    items: [
      { id: "1.1", title: "سُورَۃُ الاَنعَامِ" }
    ]
  },
  {
    id: "chap-2",
    title: "سورۃ نمبر 2: سُورَۃُ الاَعرَافِ",
    items: [
      { id: "2.1", title: "سُورَۃُ الاَعرَافِ" }
    ]
  },
  {
    id: "chap-3",
    title: "سورۃ نمبر 3: سُورَۃُ یُونُسَ",
    items: [
      { id: "3.1", title: "سُورَۃُ یُونُسَ" }
    ]
  },
  {
    id: "chap-4",
    title: "سورۃ نمبر 4: سُورَۃُ ھُودِِ",
    items: [
      { id: "4.1", title: "سُورَۃُ ھُودِِ" }
    ]
  },
  {
    id: "chap-5",
    title: "سورۃ نمبر 5: سُورَۃُ الرَّعدِ",
    items: [
      { id: "5.1", title: "سُورَۃُ الرَّعدِ" }
    ]
  },
  {
    id: "chap-6",
    title: "سورۃ نمبر 6: سُورَۃُ اِبرٰھِیمَ",
    items: [
      { id: "6.1", title: "سُورَۃُ اِبرٰھِیمَ" }
    ]
  },
  {
    id: "chap-7",
    title: "سورۃ نمبر 7: سُورَۃُ الحِجرِ",
    items: [
      { id: "7.1", title: "سُورَۃُ الحِجرِ" }
    ]
  },
  {
    id: "chap-8",
    title: "سورۃ نمبر 8: سُورَۃُ النَّحلِ",
    items: [
      { id: "8.1", title: "سُورَۃُ النَّحلِ" }
    ]
  },
  {
    id: "chap-9",
    title: "سورۃ نمبر 9: سُورَۃُ بَنِیٓ اِسرَءِیلَ",
    items: [
      { id: "9.1", title: "سُورَۃُ بَنِیٓ اِسرَءِیلَ" }
    ]
  },
  {
    id: "chap-10",
    title: "سورۃ نمبر 10: سُورَۃُ الکَھفِ",
    items: [
      { id: "10.1", title: "سُورَۃُ الکَھفِ" }
    ]
  },
  {
    id: "chap-11",
    title: "سورۃ نمبر 11: سُورَۃُ المُومِنُونَ",
    items: [
      { id: "11.1", title: "سُورَۃُ المُومِنُونَ" }
    ]
  },
  {
    id: "chap-12",
    title: "سورۃ نمبر 12: سُورَۃُ الزُّمَرِ",
    items: [
      { id: "12.1", title: "سُورَۃُ الزُّمَرِ" }
    ]
  },
  {
    id: "chap-13",
    title: "سورۃ نمبر 13: سُورَۃُ المُومِنِ (اَلغَافِر)",
    items: [
      { id: "13.1", title: "سُورَۃُ المُومِنِ (اَلغَافِر)" }
    ]
  },
  {
    id: "chap-14",
    title: "سورۃ نمبر 14: سُورَۃُ حٰمٓ اَلسَّجدَۃِ",
    items: [
      { id: "14.1", title: "سُورَۃُ حٰمٓ اَلسَّجدَۃِ" }
    ]
  },
  {
    id: "chap-15",
    title: "سورۃ نمبر 15: سُورَۃُ الشُّورٰی",
    items: [
      { id: "15.1", title: "سُورَۃُ الشُّورٰی" }
    ]
  }
]

export default function PakistanStudiesChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/tarjumaquran/configure')
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
