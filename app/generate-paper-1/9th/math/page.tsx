'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mathChapters = [
  {
    id: "chapter-1",
    title: "Chapter 1: Real Numbers",
    items: [
      { id: "1.1", title: "Exercise 1.1" },
      { id: "1.2", title: "Exercise 1.2" },
      { id: "1.3", title: "Exercise 1.3" },
      { id: "1.4", title: "Review Exercise 1" }
    ]
  },
  {
    id: "chapter-2",
    title: "Chapter 2: Logarithms",
    items: [
      { id: "2.1", title: "Exercise 2.1" },
      { id: "2.2", title: "Exercise 2.2" },
      { id: "2.3", title: "Exercise 2.3" },
      { id: "2.4", title: "Exercise 2.4" },
      { id: "2.5", title: "Review Exercise 2" }
    ]
  },
  {
    id: "chapter-3",
    title: "Chapter 3: Sets and Functions",
    items: [
      { id: "3.1", title: "Exercise 3.1" },
      { id: "3.2", title: "Exercise 3.2" },
      { id: "3.3", title: "Exercise 3.3" },
      { id: "3.4", title: "Review Exercise 3" }
    ]
  },
  {
    id: "chapter-4",
    title: "Chapter 4: Factorization and Algebraic Manipulation",
    items: [
      { id: "4.1", title: "Exercise 4.1" },
      { id: "4.2", title: "Exercise 4.2" },
      { id: "4.3", title: "Exercise 4.3" },
      { id: "4.4", title: "Exercise 4.4" },
      { id: "4.5", title: "Review Exercise 4" }
    ]
  },
  {
    id: "chapter-5",
    title: "Chapter 5: Linear Equations and Inequalities",
    items: [
      { id: "5.1", title: "Exercise 5.1" },
      { id: "5.2", title: "Exercise 5.2" },
      { id: "5.3", title: "Review Exercise 5" }
    ]
  },
  {
    id: "chapter-6",
    title: "Chapter 6: Trigonometry",
    items: [
      { id: "6.1", title: "Exercise 6.1" },
      { id: "6.2", title: "Exercise 6.2" },
      { id: "6.3", title: "Exercise 6.3" },
      { id: "6.4", title: "Exercise 6.4" },
      { id: "6.5", title: "Exercise 6.5" },
      { id: "6.6", title: "Exercise 6.6" },
      { id: "6.7", title: "Review Exercise 6" }
    ]
  },
  {
    id: "chapter-7",
    title: "Chapter 7: Coordinate Geometry",
    items: [
      { id: "7.1", title: "Exercise 7.1" },
      { id: "7.2", title: "Exercise 7.2" },
      { id: "7.3", title: "Exercise 7.3" },
      { id: "7.4", title: "Review Exercise 7" }
    ]
  },
  {
    id: "chapter-8",
    title: "Chapter 8: Logic",
    items: [
      { id: "8.1", title: "Exercise 8" }
    ]
  },
  {
    id: "chapter-9",
    title: "Chapter 9: Similar Figures",
    items: [
      { id: "9.1", title: "Exercise 9.1" },
      { id: "9.2", title: "Exercise 9.2" },
      { id: "9.3", title: "Exercise 9.3" },
      { id: "9.4", title: "Exercise 9.4" },
      { id: "9.5", title: "Review Exercise 9" }
    ]
  },
  {
    id: "chapter-10",
    title: "Chapter 10: Graphs of Functions",
    items: [
      { id: "10.1", title: "Exercise 10.1" },
      { id: "10.2", title: "Exercise 10.2" },
      { id: "10.3", title: "Review Exercise 10" }
    ]
  },
  {
    id: "chapter-11",
    title: "Chapter 11: Loci and Construction",
    items: [
      { id: "11.1", title: "Review Exercise 11" }
    ]
  },
  {
    id: "chapter-12",
    title: "Chapter 12: Information Handling",
    items: [
      { id: "12.1", title: "Exercise 12.1" },
      { id: "12.2", title: "Exercise 12.2" },
      { id: "12.3", title: "Review Exercise 12" }
    ]
  },
  {
    id: "chapter-13",
    title: "Chapter 13: Probability",
    items: [
      { id: "13.1", title: "Exercise 13.1" },
      { id: "13.2", title: "Exercise 13.2" },
      { id: "13.3", title: "Review Exercise 13" }
    ]
  }
]

export default function MathChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/math/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - math (9th)</h1>
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
