'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Problem Solving",
    items: [
      { id: "1.1", title: "1.1 Problem Solving Steps" },
      { id: "1.2", title: "1.2 Flowcharts" },
      { id: "1.3", title: "1.3 Algorithm" },
      { id: "1.4", title: "1.4 Test Data" },
      { id: "1.5", title: "1.5 Verification and Validation" },
      { id: "1.6", title: "1.6 Identification and Correction of Errors" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Binary System",
    items: [
      { id: "2.1", title: "2.1 Introduction to Number Systems" },
      { id: "2.2", title: "2.2 Number System Conversion" },
      { id: "2.3", title: "2.3 Memory and Data Storage" },
      { id: "2.4", title: "2.4 Measurement of Size of Computer Memory" },
      { id: "2.5", title: "2.5 Boolean Algebra" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Networks",
    items: [
      { id: "3.1", title: "3.1 Computer Networks" },
      { id: "3.2", title: "3.2 Physical Structure of Networks" },
      { id: "3.3", title: "3.3 Basics of Data Communication" },
      { id: "3.4", title: "3.4 Computer Network Models" },
      { id: "3.5", title: "3.5 The Need for Addressing" },
      { id: "3.6", title: "3.6 Sending & Receiving HTTP Responses over the Internet" },
      { id: "3.7", title: "3.7 Routing" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Data and Privacy",
    items: [
      { id: "4.1", title: "4.1 Ethical Issues Related to Security" },
      { id: "4.2", title: "4.2 Importance of Data Privacy" },
      { id: "4.3", title: "4.3 Simple Encryption" },
      { id: "4.4", title: "4.4 Encryption with Keys and Passwords" },
      { id: "4.5", title: "4.5 Cybercrime" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Designing Website",
    items: [
      { id: "5.1", title: "5.1 Introduction to HTML" },
      { id: "5.2", title: "5.2 Text Formatting" },
      { id: "5.3", title: "5.3 Creating Lists" },
      { id: "5.4", title: "5.4 Images and Backgrounds" },
      { id: "5.5", title: "5.5 Define a Hyperlink" },
      { id: "5.6", title: "5.6 Creating Tables" }
    ]
  }
]

export default function ComputerScienceChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/computer/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Computer Science (9th)</h1>
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
