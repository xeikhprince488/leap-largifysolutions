'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "باب نمبر 1: بنیادی عقائد",
    items: [
      { id: "1.1", title: "1.1 توحید" },
      { id: "1.2", title: "1.2 رسالت" },
      { id: "1.3", title: "1.3 ملائکہ" },
      { id: "1.4", title: "1.4 آسمانی کتابیں" },
      { id: "1.5", title: "1.5 آخرت" }
    ]
  },
  {
    id: "chap-2",
    title: "باب نمبر 2: اسلامی تشخص",
    items: [
      { id: "2.1", title: "2.1 ارکانِ اسلام" },
      { id: "2.2", title: "2.2 اللہ اور رسولﷺ کی محبت و اطاعت" },
      { id: "2.3", title: "2.3 حقوق العباد" },
      { id: "2.4", title: "2.4 معاشرتی ذمہ داریاں" }
    ]
  },
  {
    id: "chap-3",
    title: "باب نمبر 3: اسوۂ رسولِ اکرمﷺ",
    items: [
      { id: "3.1", title: "3.1 رحمتہ للعالمین" },
      { id: "3.2", title: "3.2 اخوت" },
      { id: "3.3", title: "3.3 مساوات" },
      { id: "3.4", title: "3.4 صبرو استقلال" },
      { id: "3.5", title: "3.5 عفودرگزر" },
      { id: "3.6", title: "3.6 ذکر" }
    ]
  },
  {
    id: "chap-4",
    title: "باب نمبر 4: تعارفِ قرآن و حدیث",
    items: [
      { id: "4.1", title: "4.1 تعارفِ قرآن" },
      { id: "4.2", title: "4.2 تعارفِ حدیث" },
      { id: "4.3", title: "4.3 منتخب آیات" },
      { id: "4.4", title: "4.4 منتخب احادیث" }
    ]
  }
]

export default function islamyatChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/islamyat/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - islamyat (11th)</h1>
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
