'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "نثر نمبر 1: اسوہ حسنہﷺ",
    items: [
      { id: "1.1", title: "اسوۂ حسنہﷺ" },
    ]
  },
  {
    id: "chap-2",
    title: "نثر نمبر 2: اپنی مدد آپ",
    items: [
      { id: "2.1", title: "اپنی مدد آپ" },
    ]
  },
  {
    id: "chap-3",
    title: "نثر نمبر 3: سر سید کے اخلاق و خصائل",
    items: [
      { id: "3.1", title: "سر سید کے اخلاق وخصائل" },
    ]
  },
  {
    id: "chap-4",
    title: "نثر نمبر 4: ابو القاسم زہروی",
    items: [
      { id: "4.1", title: "ابو القاسم زہروی" },
    ]
  },
  {
    id: "chap-5",
    title: "نثر نمبر 5: ادیب کی عزت",
    items: [
      { id: "5.1", title: "ادیب کی عزت" },
    ]
  },
  {
    id: "chap-6",
    title: "نثر نمبر 6: اوورکوٹ",
    items: [
      { id: "6.1", title: "اوورکوٹ" },
    ]
  },
  {
    id: "chap-7",
    title: "نثر نمبر 7: سفارش",
    items: [
      { id: "7.1", title: "سفارش" },
    ]
  },
  {
    id: "chap-8",
    title: "نثر نمبر 8: چراغ کی لو",
    items: [
      { id: "8.1", title: "چراغ کی لو" },
    ]
  },
  {
    id: "chap-9",
    title: "نثر نمبر 9: مکتوبات غالب",
    items: [
      { id: "9.1", title: "مکتوبات غالب" },
    ]
  },
  {
    id: "chap-10",
    title: "نثر نمبر 10: مکتوبات اقبالؒ",
    items: [
      { id: "10.1", title: "مکتوبات اقبالؒ" },
    ]
  },
  {
    id: "chap-11",
    title: "نثر نمبر 11: لاہور کا جغرافیہ",
    items: [
      { id: "11.1", title: "لاہور کا جغرافیہ" },
    ]
  },
  {
    id: "chap-12",
    title: "نثر نمبر 12: دوستی کا پھل",
    items: [
      { id: "12.1", title: "دوستی کا پھل" },
    ]
  },
  // Continue adding all the remaining chapters...
]

export default function UrduChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/urdu/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Urdu (11th)</h1>
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
