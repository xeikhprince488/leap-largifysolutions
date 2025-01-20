'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Urdu Syllabus Data
const urduSyllabus = [
  {
    id: "prose",
    title: "نثر",
    items: [
      { id: "1", title: "نثر نمبر :1 ہجرتِ نبویْ" },
      { id: "2", title: "نثر نمبر 2: مرزا غا لب کے عادات و خصائل" },
      { id: "3", title: "نثر نمبر3: کاہلی" },
      { id: "4", title: "نثر نمبر4: شاعروں کے لطیفے" },
      { id: "5", title: "نثر نمبر5: نصوح اور سلیم کی گفتگو" },
      { id: "6", title: "نثر نمبر 6: پنچایت" },
      { id: "7", title: "نثر نمبر 7: آرام و سکون" },
      { id: "8", title: "نثر نمبر 8: لہو اور قالین" },
      { id: "9", title: "نثر نمبر 9: امتحان" },
      { id: "10", title: "نثر نمبر 10: ملکی پرندے اور دوسرے جانور" },
      { id: "11", title: "نثر نمبر 11: قدرِ ایاز" },
      { id: "12", title: "نثر نمبر :12 حوصلہ نہ ہارو آگے بڑھو منزل اب کے دور نہیں" }
    ]
  },
  {
    id: "poetry",
    title: "نظم اور غزل",
    items: [
      { id: "1", title: "نظم نمبر 1: حمد" },
      { id: "2", title: "نظم نمبر 2: نعت" },
      { id: "3", title: "نظم نمبر 3: برسات کی بہاریں" },
      { id: "4", title: "نظم نمبر 4: پیوستہ رہ شجر سے امیدِ بہار رکھ" },
      { id: "5", title: "غزل نمبر 1: ہستی اپنی حباب کی سی ہے" },
      { id: "6", title: "غزل نمبر 2: رخ و زلف پر جان کھو یا کیا" },
      { id: "7", title: "غزل نمبر 3: دلِ ناداں تجھے ہوا کیا ہے؟" },
      { id: "8", title: "غزل نمبر 4: لگتا نہیں ہے دل مرا اجڑے دیار میں" }
    ]
  },
  {
    id: "urduB",
    title: "اردو (ب)",
    items: [
      { id: "1", title: "واحد / جمع" },
      { id: "2", title: "مذکر / مونث" },
      { id: "3", title: "الفاظ / متضاد" },
      { id: "4", title: "الفاظ / مترادف" },
      { id: "5", title: "غلط محاورات / جملوں کی درستگی" },
      { id: "6", title: "محاورات کی تکمیل" },
      { id: "7", title: "خطوط" },
      { id: "8", title: "درخواستیں" },
      { id: "9", title: "کہانیاں" },
      { id: "10", title: "مکالمے" }
    ]
  },
  {
    id: "poetry2",
    title: "نظم",
    items: [
      { id: "1", title: "نظم نمبر 5: شہدائے پشاور کے لیے ایک نظم" }
    ]
  }
]

export default function UrduSyllabusPage() {
  const router = useRouter()
  
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/urdu/configure')
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
              <h1 className="text-2xl font-bold">Select Syllabus - Urdu (9th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree 
                items={urduSyllabus} 
                onSelectionChange={handleSelectionChange} 
              />
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
