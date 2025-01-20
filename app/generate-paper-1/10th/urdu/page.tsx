'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "urdu-1",
    title: "نظم نمبر 1: حمد",
  },
  {
    id: "urdu-2",
    title: "نظم نمبر 2: نعت",
  },
  {
    id: "urdu-3",
    title: "نثر نمبر 3: مرزا محمد سعید",
  },
  {
    id: "urdu-4",
    title: "نثر نمبر 4: نظریۂ پاکستان",
  },
  {
    id: "urdu-5",
    title: "نثر نمبر 5: پرستان کی شہزادی",
  },
  {
    id: "urdu-6",
    title: "نثر نمبر 6: اردو ادب میں عیدالفطر",
  },
  {
    id: "urdu-7",
    title: "نثر نمبر 7: مجھے میرے دوستوں سے بچاؤ",
  },
  {
    id: "urdu-8",
    title: "نثر نمبر 8: ملَمَّع",
  },
  {
    id: "urdu-9",
    title: "نثر نمبر 9: چغل خور",
  },
  {
    id: "urdu-10",
    title: "نثر نمبر 10: نام دیو مالی",
  },
  {
    id: "urdu-11",
    title: "نثر نمبر 11: علی بخش",
  },
  {
    id: "urdu-12",
    title: "نثر نمبر 12: استنبول",
  },
  {
    id: "urdu-13",
    title: "نثر نمبر 13: خطوطِ غالب",
  },
  {
    id: "urdu-14",
    title: "نثر نمبر 14: خطوطِ رشید احمد صدیقی",
  },
  {
    id: "urdu-15",
    title: "نظم نمبر 15: میدانِ کربلا میں گرمی کی شدت",
  },
  {
    id: "urdu-16",
    title: "نظم نمبر 16: فاطمہ بنتِ عبداللہ",
  },
  {
    id: "urdu-17",
    title: "نظم نمبر 17: کسان",
  },
  {
    id: "urdu-18",
    title: "نظم نمبر 18: جیوے جیوے پاکستان",
  },
  {
    id: "urdu-19",
    title: "نظم نمبر 19: اونٹ کی شادی",
  },
  {
    id: "urdu-20",
    title: "نظم نمبر 20: مال گودام روڈ",
  },
  {
    id: "urdu-21",
    title: "غزل نمبر 21: مصیبت بھی راحت فزا ہوگئی ہے",
  },
  {
    id: "urdu-22",
    title: "غزل نمبر 22: آدمی آدمی سے ملتا ہے",
  },
  {
    id: "urdu-23",
    title: "غزل نمبر 23: سر میں سودا بھی نہیں،دل میں تمناّ بھی نہیں",
  },
  {
    id: "urdu-24",
    title: "غزل نمبر 24: یہ فخر تو حاصل ہے،بْرے ہیں کہ بھلے ہیں",
  },
  {
    id: "urdu-25",
    title: "نثر نمبر 25: اُٹھ باندھ کمر کیوں ڈرتا ہے",
  },
  {
    id: "urdu-26",
    title: "نظم نمبر 26:بہادر بچے",
  },
]

export default function UrduChaptersPage() {
  const router = useRouter()

  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleSelectAll = () => {
    // Select all chapters
    const allItems = chapters.map(chapter => chapter.id)
    handleSelectionChange(allItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/urdu/configure')
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
              <CheckboxTree
                items={chapters}
                onSelectionChange={handleSelectionChange}
              />
              <div className="mt-6 flex justify-between">
                <Button
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={handleSelectAll}
                >
                  Select All Chapters
                </Button>
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
