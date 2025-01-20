'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mathChapters = [
  {
    id: "unit-1",
    title: "UNIT 1: Functions and Limits",
    items: [
      { id: "1.1", title: "1.1 EX : 1.1" },
      { id: "1.2", title: "1.2 EX : 1.2" },
      { id: "1.3", title: "1.3 EX : 1.3" },
      { id: "1.4", title: "1.4 EX : 1.4" },
      { id: "1.5", title: "1.5 EX : 1.5" }
    ]
  },
  {
    id: "unit-2",
    title: "UNIT 2: Differentiation",
    items: [
      { id: "2.1", title: "2.1 EX : 2.1" },
      { id: "2.2", title: "2.2 EX : 2.2" },
      { id: "2.3", title: "2.3 EX : 2.3" },
      { id: "2.4", title: "2.4 EX : 2.4" },
      { id: "2.5", title: "2.5 EX : 2.5" },
      { id: "2.6", title: "2.6 EX : 2.6" },
      { id: "2.7", title: "2.7 EX : 2.7" },
      { id: "2.8", title: "2.8 EX : 2.8" },
      { id: "2.9", title: "2.9 EX : 2.9" },
      { id: "2.10", title: "2.10 EX : 2.10" }
    ]
  },
  {
    id: "unit-3",
    title: "UNIT 3: Integration",
    items: [
      { id: "3.1", title: "3.1 EX : 3.1" },
      { id: "3.2", title: "3.2 EX : 3.2" },
      { id: "3.3", title: "3.3 EX : 3.3" },
      { id: "3.4", title: "3.4 EX : 3.4" },
      { id: "3.5", title: "3.5 EX : 3.5" },
      { id: "3.6", title: "3.6 EX : 3.6" },
      { id: "3.7", title: "3.7 EX : 3.7" },
      { id: "3.8", title: "3.8 EX : 3.8" }
    ]
  },
  {
    id: "unit-4",
    title: "UNIT 4: Introduction to Analytic Geometry",
    items: [
      { id: "4.1", title: "4.1 EX : 4.1" },
      { id: "4.2", title: "4.2 EX : 4.2" },
      { id: "4.3", title: "4.3 EX : 4.3" },
      { id: "4.4", title: "4.4 EX : 4.4" },
      { id: "4.5", title: "4.5 EX : 4.5" }
    ]
  },
  {
    id: "unit-5",
    title: "UNIT 5: Linear Inequalities and Linear Programming",
    items: [
      { id: "5.1", title: "5.1 EX : 5.1" },
      { id: "5.2", title: "5.2 EX : 5.2" },
      { id: "5.3", title: "5.3 EX : 5.3" }
    ]
  },
  {
    id: "unit-6",
    title: "UNIT 6: Conic Section",
    items: [
      { id: "6.1", title: "6.1 EX : 6.1" },
      { id: "6.2", title: "6.2 EX : 6.2" },
      { id: "6.3", title: "6.3 EX : 6.3" },
      { id: "6.4", title: "6.4 EX : 6.4" },
      { id: "6.5", title: "6.5 EX : 6.5" },
      { id: "6.6", title: "6.6 EX : 6.6" },
      { id: "6.7", title: "6.7 EX : 6.7" },
      { id: "6.8", title: "6.8 EX : 6.8" },
      { id: "6.9", title: "6.9 EX : 6.9" }
    ]
  },
  {
    id: "unit-7",
    title: "UNIT 7: Vectors",
    items: [
      { id: "7.1", title: "7.1 EX : 7.1" },
      { id: "7.2", title: "7.2 EX : 7.2" },
      { id: "7.3", title: "7.3 EX : 7.3" },
      { id: "7.4", title: "7.4 EX : 7.4" },
      { id: "7.5", title: "7.5 EX : 7.5" }
    ]
  }
]

export default function MathChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/math/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Math (12th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={mathChapters} onSelectionChange={handleSelectionChange} />
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
