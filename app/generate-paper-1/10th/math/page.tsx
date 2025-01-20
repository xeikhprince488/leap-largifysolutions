'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mathChapters = [
  {
    id: "unit-1",
    title: "UNIT 1: Quadratic Equations",
    items: [
      { id: "1.1", title: "1.1 EX: 1.1" },
      { id: "1.2", title: "1.2 EX: 1.2" },
      { id: "1.3", title: "1.3 EX: 1.3" },
      { id: "1.4", title: "1.4 EX: 1.4" }
    ]
  },
  {
    id: "unit-2",
    title: "UNIT 2: Theory of Quadratic Equations",
    items: [
      { id: "2.1", title: "2.1 EX: 2.1" },
      { id: "2.2", title: "2.2 EX: 2.2" },
      { id: "2.3", title: "2.3 EX: 2.3" },
      { id: "2.4", title: "2.4 EX: 2.4" },
      { id: "2.5", title: "2.5 EX: 2.5" },
      { id: "2.6", title: "2.6 EX: 2.6" },
      { id: "2.7", title: "2.7 EX: 2.7" },
      { id: "2.8", title: "2.8 EX: 2.8" }
    ]
  },
  {
    id: "unit-3",
    title: "UNIT 3: Variations",
    items: [
      { id: "3.1", title: "3.1 EX: 3.1" },
      { id: "3.2", title: "3.2 EX: 3.2" },
      { id: "3.3", title: "3.3 EX: 3.3" },
      { id: "3.4", title: "3.4 EX: 3.4" },
      { id: "3.5", title: "3.5 EX: 3.5" },
      { id: "3.6", title: "3.6 EX: 3.6" },
      { id: "3.7", title: "3.7 EX: 3.7" }
    ]
  },
  {
    id: "unit-4",
    title: "UNIT 4: Partial Fractions",
    items: [
      { id: "4.1", title: "4.1 EX: 4.1" },
      { id: "4.2", title: "4.2 EX: 4.2" },
      { id: "4.3", title: "4.3 EX: 4.3" },
      { id: "4.4", title: "4.4 EX: 4.4" }
    ]
  },
  {
    id: "unit-5",
    title: "UNIT 5: Sets and Functions",
    items: [
      { id: "5.1", title: "5.1 EX: 5.1" },
      { id: "5.2", title: "5.2 EX: 5.2" },
      { id: "5.3", title: "5.3 EX: 5.3" },
      { id: "5.4", title: "5.4 EX: 5.4" },
      { id: "5.5", title: "5.5 EX: 5.5" }
    ]
  },
  {
    id: "unit-6",
    title: "UNIT 6: Basic Statistics",
    items: [
      { id: "6.1", title: "6.1 EX: 6.1" },
      { id: "6.2", title: "6.2 EX: 6.2" },
      { id: "6.3", title: "6.3 EX: 6.3" }
    ]
  },
  {
    id: "unit-7",
    title: "UNIT 7: Introduction to Trigonometry",
    items: [
      { id: "7.1", title: "7.1 EX: 7.1" },
      { id: "7.2", title: "7.2 EX: 7.2" },
      { id: "7.3", title: "7.3 EX: 7.3" },
      { id: "7.4", title: "7.4 EX: 7.4" },
      { id: "7.5", title: "7.5 EX: 7.5" }
    ]
  },
  {
    id: "unit-8",
    title: "UNIT 8: Projection of a Side of a Triangle",
    items: [
      { id: "8.1", title: "8.1 EX: 8.1" },
      { id: "8.2", title: "8.2 EX: 8.2" }
    ]
  },
  {
    id: "unit-9",
    title: "UNIT 9: Chords of a Circle",
    items: [
      { id: "9.1", title: "9.1 EX: 9.1" },
      { id: "9.2", title: "9.2 EX: 9.2" }
    ]
  },
  {
    id: "unit-10",
    title: "UNIT 10: Tangent to a Circle",
    items: [
      { id: "10.1", title: "10.1 EX: 10.1" },
      { id: "10.2", title: "10.2 EX: 10.2" },
      { id: "10.3", title: "10.3 EX: 10.3" }
    ]
  },
  {
    id: "unit-11",
    title: "UNIT 11: Chords and Arcs",
    items: [
      { id: "11.1", title: "11.1 EX: 11.1" }
    ]
  },
  {
    id: "unit-12",
    title: "UNIT 12: Angle in a Segment of a Circle",
    items: [
      { id: "12.1", title: "12.1 EX: 12.1" }
    ]
  },
  {
    id: "unit-13",
    title: "UNIT 13: Practical Geometry-Circles",
    items: [
      { id: "13.1", title: "13.1 EX: 13.1" },
      { id: "13.2", title: "13.2 EX: 13.2" },
      { id: "13.3", title: "13.3 EX: 13.3" }
    ]
  }
]

export default function MathChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/math/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Math (10th)</h1>
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
