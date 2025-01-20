'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const urduChapters = [
  {
    id: "nashr-1",
    title: "نثر نمبر 1: مناقب عمر بن عبدالعزیزؓ",
    items: [
      { id: "1", title: "مناقب عمر بن عبدالعزیزؓ" }
    ]
  },
  {
    id: "nashr-2",
    title: "نثر نمبر 2: تشکیل پاکستان",
    items: [
      { id: "2", title: "تشکیل پاکستان" }
    ]
  },
  {
    id: "nashr-3",
    title: "نثر نمبر 3: نواب محسن الملک",
    items: [
      { id: "3", title: "نواب محسن الملک" }
    ]
  },
  {
    id: "nashr-4",
    title: "نثر نمبر 4: محنت پسند خردمند",
    items: [
      { id: "4", title: "محنت پسند خردمند" }
    ]
  },
  {
    id: "nashr-5",
    title: "نثر نمبر 5: اکبری کی حماقتیں",
    items: [
      { id: "5", title: "اکبری کی حماقتیں" }
    ]
  },
  {
    id: "nashr-6",
    title: "نثر نمبر 6: پہلی فتح",
    items: [
      { id: "6", title: "پہلی فتح" }
    ]
  },
  {
    id: "nashr-7",
    title: "نثر نمبر 7: دستک",
    items: [
      { id: "7", title: "دستک" }
    ]
  },
  {
    id: "nashr-8",
    title: "نثر نمبر 8: ہوائی",
    items: [
      { id: "8", title: "ہوائی" }
    ]
  },
  {
    id: "nashr-9",
    title: "نثر نمبر 9: مولانا ظفرعلی خاں",
    items: [
      { id: "9", title: "مولانا ظفر علی خاں" }
    ]
  },
  {
    id: "nashr-10",
    title: "نثر نمبر 10: قرطبہ کا قاضی",
    items: [
      { id: "10", title: "قرطبہ کا قاضی" }
    ]
  },
  {
    id: "nashr-11",
    title: "نثر نمبر 11: مواصلات کے جدید ذرائع",
    items: [
      { id: "11", title: "مواصلات کے جدید ذرائع" }
    ]
  },
  {
    id: "nashr-12",
    title: "نثر نمبر 12: مولوی نذیر احمد دہلوی",
    items: [
      { id: "12", title: "مولوی نذیر احمد دہلوی" }
    ]
  },
  {
    id: "nashr-13",
    title: "نثر نمبر 13: ایک سفر نامہ جو کہیں کا بھی نہیں ہے",
    items: [
      { id: "13", title: "ایک سفر نامہ جو کہیں کا بھی نہیں ہے" }
    ]
  },
  {
    id: "nashr-14",
    title: "نثر نمبر 14: ایوب عباسی",
    items: [
      { id: "14", title: "ایوب عباسی" }
    ]
  },
  {
    id: "nazm-1",
    title: "نظم نمبر 1: حمد",
    items: [
      { id: "1", title: "حمد" }
    ]
  },
  {
    id: "nazm-2",
    title: "نظم نمبر 2: نعت",
    items: [
      { id: "2", title: "نعت" }
    ]
  },
  {
    id: "nazm-3",
    title: "نظم نمبر 3: خدا سر سبز رکھے اس چمن کو",
    items: [
      { id: "3", title: "خدا سر سبز رکھے اس چمن کو" }
    ]
  },
  // Additional sections can be added similarly
]

export default function UrduChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/next-page')  // Update with your specific next page
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
              <h1 className="text-2xl font-bold">Select Chapters - Urdu</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={urduChapters} onSelectionChange={handleSelectionChange} />
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
