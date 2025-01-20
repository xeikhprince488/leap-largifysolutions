'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const islamyatChapters = [
  {
    id: "chap-1",
    title: "باب اوّل: قرآن مجید و حدیثِ نبویﷺ",
    items: [
      { id: "1.1", title: "1.1 حفاظت و تدوینِ حدیث: دورِاوّل" },
      { id: "1.2", title: "1.2 احادیثِ نبویہﷺ" }
    ]
  },
  {
    id: "chap-2",
    title: "باب دوم : ایمانیات و عبادات",
    items: [
      { id: "2.1", title: "2.1 ملائکہ" },
      { id: "2.2", title: "2.2 کتب سماویہ (آسمانی کتابیں)" },
      { id: "2.3", title: "2.3 عقیدۂ آخرت" },
      { id: "2.4", title: "2.4 زکوۃ" },
      { id: "2.5", title: "2.5 حج اور قربانی" }
    ]
  },
  {
    id: "chap-3",
    title: "باب سوم : سیرت نبوی خاتم النبین ﷺ",
    items: [
      { id: "3.1", title: "3.1 غزوۂ تبوک" },
      { id: "3.2", title: "3.2 حجۃ الوداع" },
      { id: "3.3", title: "3.3 وصال نبوی (خاتم النبین)" },
      { id: "3.4", title: "3.4 صلہ رحمی" },
      { id: "3.5", title: "3.5 خواتین کے ساتھ حسن سلوک" },
      { id: "3.6", title: "3.6 اندازِ تربیت" }
    ]
  },
  {
    id: "chap-4",
    title: "باب چہارم: اخلاق و آداب",
    items: [
      { id: "4.1", title: "4.1 اخلاص و تقویٰ" },
      { id: "4.2", title: "4.2 پردہ پوشی" },
      { id: "4.3", title: "4.3 جھوٹ" },
      { id: "4.4", title: "4.4 غیبت اور بہتان" },
      { id: "4.5", title: "4.5 جادو،فال اور توہم پرستی" }
    ]
  },
  {
    id: "chap-5",
    title: "پاب پنجم: حسن معاشرت و معاملات",
    items: [
      { id: "5.1", title: "5.1 سود کی حرمت" },
      { id: "5.2", title: "5.2 اسلامی ریاست" },
      { id: "5.3", title: "5.3 جہاز فی سبیل اللہ" }
    ]
  },
  {
    id: "chap-6",
    title: "باب ششم : ہدایت کے سر چشمے اور مشاہیر اسلام",
    items: [
      { id: "6.1", title: "6.1 حضرت امام زید بن علیؒ" },
      { id: "6.2", title: "6.2 حضرت عمروبن العاصؓ" },
      { id: "6.3", title: "6.3 حضرت جابربن عبداللہؓ" },
      { id: "6.4", title: "6.4 حضرت انس بن مالکؓ" },
      { id: "6.5", title: "6.5 صحابیاتؓ" },
      { id: "6.6", title: "6.6 صوفیہ کرام" },
      { id: "6.7", title: "6.7 علماومفکرین" }
    ]
  },
  {
    id: "chap-7",
    title: "باب ہفتم: اسلامی تعلیمات اور عصر حاضر کے تقاضے",
    items: [
      { id: "7.1", title: "7.1 اسلام میں مستقبل کی منصوبہ بندی" },
      { id: "7.2", title: "7.2 اسلامی تہذیب کی امتیازات" }
    ]
  }
]

export default function islamyatChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/islamyat/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - islamyat (10th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={islamyatChapters} onSelectionChange={handleSelectionChange} />
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
