'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const computerChapters = [
  {
    id: "chap-1",
    title: "CHAP 1: Data Basics",
    items: [
      { id: "1.1", title: "1.1 Overview" },
      { id: "1.2", title: "1.2 Traditional File System" },
      { id: "1.3", title: "1.3 Databases" },
      { id: "1.4", title: "1.4 Database Management System" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2: Basic Concepts and Terminology of Databases",
    items: [
      { id: "2.1", title: "2.1 Overview" },
      { id: "2.2", title: "2.2 Attributes, Rows and Tables" },
      { id: "2.3", title: "2.3 Relation or Table" },
      { id: "2.4", title: "2.4 Views" },
      { id: "2.5", title: "2.5 Indexes" },
      { id: "2.6", title: "2.6 Keys" },
      { id: "2.7", title: "2.7 The User" },
      { id: "2.8", title: "2.8 The Data Administrator" },
      { id: "2.9", title: "2.9 The Database Administrator" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3: Database Design Process",
    items: [
      { id: "3.1", title: "3.1 Overview" },
      { id: "3.2", title: "3.2 Data Modeling" },
      { id: "3.3", title: "3.3 Database Design" },
      { id: "3.4", title: "3.4 Implementation" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4: Data Integrity and Normalization",
    items: [
      { id: "4.1", title: "4.1 Overview" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5: Introduction to Microsoft Access",
    items: [
      { id: "5.1", title: "5.1 Overview" },
      { id: "5.2", title: "5.2 MS-Access Application Window" },
      { id: "5.3", title: "5.3 Database Window" },
      { id: "5.4", title: "5.4 Database Objects" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6: Table and Query",
    items: [
      { id: "6.1", title: "6.1 Overview" },
      { id: "6.2", title: "6.2 Table Design View" },
      { id: "6.3", title: "6.3 Table Creation" },
      { id: "6.4", title: "6.4 Modifying a Table" },
      { id: "6.5", title: "6.5 Print a Datasheet" },
      { id: "6.6", title: "6.6 Table Relationships" },
      { id: "6.7", title: "6.7 Sorting and Filtering" },
      { id: "6.8", title: "6.8 Introduction to Queries" },
      { id: "6.9", title: "6.9 Performing Calculation in a Query" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7: Microsoft Access-Forms and Reports",
    items: [
      { id: "7.1", title: "7.1 Overview" },
      { id: "7.2", title: "7.2 Adding Records Using a Form" },
      { id: "7.3", title: "7.3 List and Combo Boxes" },
      { id: "7.4", title: "7.4 Check Boxes and Radio Buttons" },
      { id: "7.5", title: "7.5 Subform" },
      { id: "7.6", title: "7.6 Drag-and-Drop Method" },
      { id: "7.7", title: "7.7 Reports" },
      { id: "7.8", title: "7.8 Linking" },
      { id: "7.9", title: "7.9 Creating a Switchboard in Access" },
      { id: "7.10", title: "7.10 Keyboard Shortcuts" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8: Getting Started with C",
    items: [
      { id: "8.1", title: "8.1 Overview" },
      { id: "8.2", title: "8.2 Developing a C Program (A Stepwise Approach)" },
      { id: "8.3", title: "8.3 Basic Structure of a C Program" },
      { id: "8.4", title: "8.4 Common Programming Errors" },
      { id: "8.5", title: "8.5 Programming Languages" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9: Elements of C",
    items: [
      { id: "9.1", title: "9.1 Overview" },
      { id: "9.2", title: "9.2 Keywords" },
      { id: "9.4", title: "9.4 Constants" },
      { id: "9.5", title: "9.5 Data Type" },
      { id: "9.6", title: "9.6 Operators in C" },
      { id: "9.7", title: "9.7 Expression" },
      { id: "9.8", title: "9.8 Comments" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10: Input / Output",
    items: [
      { id: "10.1", title: "10.1 Overview" },
      { id: "10.2", title: "10.2 SCANF Function" },
      { id: "10.3", title: "10.3 Character Input" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11: Decision Constructs",
    items: [
      { id: "11.1", title: "11.1 Overview" },
      { id: "11.2", title: "11.2 IF Statement" },
      { id: "11.3", title: "11.3 Use of Logical Operators" },
      { id: "11.4", title: "11.4 SWITCH Statement" },
      { id: "11.5", title: "11.5 Conditional Operator" },
      { id: "11.6", title: "11.6 Case Study: Locating a point in the coordinate plane" }
    ]
  },
  {
    id: "chap-12",
    title: "CHAP 12: Loop Constructs",
    items: [
      { id: "12.1", title: "12.1 Overview" },
      { id: "12.2", title: "12.2 WHILE Statement" },
      { id: "12.3", title: "12.3 DO-WHILE Loop" },
      { id: "12.4", title: "12.4 Nested Loop" },
      { id: "12.5", title: "12.5 GOTO Statement" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13: Functions in C",
    items: [
      { id: "13.1", title: "13.1 Overview" },
      { id: "13.2", title: "13.2 Importance of Functions" },
      { id: "13.3", title: "13.3 Types of Functions" },
      { id: "13.4", title: "13.4 Writing Functions in C" },
      { id: "13.5", title: "13.5 Function Prototype" },
      { id: "13.6", title: "13.6 Calling a Function" },
      { id: "13.7", title: "13.7 Local Variables and Their Scope" },
      { id: "13.8", title: "13.8 Global Variables and Their Scopes" },
      { id: "13.9", title: "13.9 Functions without Arguments" },
      { id: "13.10", title: "13.10 Functions that Return a Value and Accept Arguments" }
    ]
  },
  {
    "id": "chap-14",
    "title": "CHAP 14: Functions in C",
    "items": [
      { "id": "14.1", "title": "14.1 Overview" },
      { "id": "14.2", "title": "14.2 Importance of Functions" },
      { "id": "14.3", "title": "14.3 Types of Functions" },
      { "id": "14.4", "title": "14.4 Writing Functions in C" },
      { "id": "14.5", "title": "14.5 Function Prototype" },
      { "id": "14.6", "title": "14.6 Calling a Function" },
      { "id": "14.7", "title": "14.7 Local Variables and Their Scope" },
      { "id": "14.8", "title": "14.8 Global Variables and Their Scopes" },
      { "id": "14.9", "title": "14.9 Functions without Arguments" },
      { "id": "14.10", "title": "14.10 Functions that Return a Value and Accept Arguments" }
    ]
  }
  
  // Add more chapters as needed...
]

export default function ComputerChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/computer/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Computer Science (12th)</h1>
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
