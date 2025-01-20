'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const islamyatChapters = [
  {
    id: "chap-1",
    title: "باب اوّل : قرآن مجید و حدیثِ نبوی ﷺ",
    items: [
      { id: "1.1", title: "1.2 تعارفِ قرآن مجید" },
      { id: "1.2", title: "1.3 حدیثِ نبوی ﷺ" },
      { id: "1.3", title: "1.4 منتخب احادیثِ مبارکہ" }
    ]
  },
  {
    id: "chap-2",
    title: "باب دوم : ایمانیات و عبادات",
    items: [
      { id: "2.1", title: "2.1 عقیدہ توحید" },
      { id: "2.2", title: "2.2 عقیدہ رسالت" },
      { id: "2.3", title: "2.3 ملائکہ، آسمانی کتب اور آخرت پر ایمان" },
      { id: "2.4", title: "2.4 نماز" },
      { id: "2.5", title: "2.5 روزہ" }
    ]
  },
  {
    id: "chap-3",
    title: "باب سوم : سیرتِ نبوی ﷺ",
    items: [
      { id: "3.1", title: "3.1 فتح مکہ" },
      { id: "3.2", title: "3.2 غزوہ حُنین" },
      { id: "3.3", title: "3.3 عامُ الوفُود" },
      { id: "3.4", title: "3.4 حضرت محمد مصطفیٰ ﷺ کا بچپن اور جوانی" },
      { id: "3.5", title: "3.5 حضرت محمد مصطفیٰ ﷺ کا ذوقِ عبادت" },
      { id: "3.6", title: "3.6 حضرت محمد مصطفیٰ ﷺ کی سخاوت و ایثار" }
    ]
  },
  {
    id: "chap-4",
    title: "باب چہارم : اخلاق و آداب",
    items: [
      { id: "4.1", title: "4.1 شکروقناعت" },
      { id: "4.2", title: "4.2 امانت و دیانت" },
      { id: "4.3", title: "4.3 تکبر" },
      { id: "4.4", title: "4.4 حسد" }
    ]
  },
  {
    id: "chap-5",
    title: "باب پنجم : حسن معاملات و معاشرت",
    items: [
      { id: "5.1", title: "5.1 قسم کے احکام و مسائل" },
      { id: "5.2", title: "5.2 گواہی کے احکام و مسائل" },
      { id: "5.3", title: "5.3 حقوق العباد" }
    ]
  },
  {
    id: "chap-6",
    title: "باب ششم : ہدایت کے سر چشمے اور مشاہیرِ اسلام",
    items: [
      { id: "6.1", title: "6.1 حضرت امام زین العابدین" },
      { id: "6.2", title: "6.2 حضرت ابو موسیٰ اشعری" },
      { id: "6.3", title: "6.3 حضرت عبداللہ بن عمرو بن العاص" },
      { id: "6.4", title: "6.4 حضرت عمرو بن اُمیہ" },
      { id: "6.5", title: "6.5 صحابیات" },
      { id: "6.6", title: "6.6 صوفیہ کرام" },
      { id: "6.7", title: "6.7 علما و مفکرین" }
    ]
  },
  {
    id: "chap-7",
    title: "باب ہفتم : اسلامی تعلیمات اور عصرِ حاضر کے تقاضے",
    items: [
      { id: "7.1", title: "7.1 خود اعتمادی و خود انحصاری" },
      { id: "7.2", title: "7.2 جسمانی و ذہنی صحت اور جسمانی ریاضت" }
    ]
  }
]

export default function islamyatChaptersPage() {
  const router = useRouter()

  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/islamyat/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - islamyat</h1>
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
