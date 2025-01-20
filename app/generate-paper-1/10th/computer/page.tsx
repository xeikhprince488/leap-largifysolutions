'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// List of chapters for Computer Programming
const computerChapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Introduction to Programming",
    items: [
      { id: "1.1", title: "1.1 Programming Environment" },
      { id: "1.2", title: "1.2 Programming Basics" },
      { id: "1.3", title: "1.3 Constant and Variables" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 User Interface",
    items: [
      { id: "2.1", title: "2.1 Input/Output (I/O) Functions" },
      { id: "2.2", title: "2.2 Operators" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Conditional Logic",
    items: [
      { id: "3.1", title: "3.1 Control Statements" },
      { id: "3.2", title: "3.2 Selection Statements" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Data and Repetition",
    items: [
      { id: "4.1", title: "4.1 Data Structures" },
      { id: "4.2", title: "4.2 Loop Structures" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Functions",
    items: [
      { id: "5.1", title: "5.1 Functions" }
    ]
  }
]

export default function ComputerChaptersPage() {
  const router = useRouter()

  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/computer/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Computer Programming (10th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={computerChapters} onSelectionChange={handleSelectionChange} />
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
