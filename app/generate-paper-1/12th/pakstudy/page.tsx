'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Islam and Pakistan",
    items: [
      { id: "1.1", title: "1.1 Islam as the Ideological Base of Pakistan" },
      { id: "1.2", title: "1.2 The Sunnah of Prophet Muhammad Rasool Allah ﷺ" },
      { id: "1.3", title: "1.3 Basic Principles of Islam" },
      { id: "1.4", title: "1.4 Definition and Functions of an Islamic Welfare State" },
      { id: "1.5", title: "1.5 Basic Principles of An Islamic Welfare State" },
      { id: "1.6", title: "1.6 Objective Resolution" },
      { id: "1.7", title: "1.7 Islam and Modernism" },
      { id: "1.8", title: "1.8 Promotion of Peace, Tolerance and Co-Existence in Islam" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Political and Constitutional Development",
    items: [
      { id: "2.1", title: "2.1 Progress and Problems of Democracy in Pakistan" },
      { id: "2.2", title: "2.2 Role of Political Parties in Promoting Democracy in Pakistan" },
      { id: "2.3", title: "2.3 Salient Features of the Constitution 1956" },
      { id: "2.4", title: "2.4 Salient Features of the Constitution 1962" },
      { id: "2.5", title: "2.5 Reason and Impacts of Separation of East Pakistan" },
      { id: "2.6", title: "2.6 Salient Features of the Constitution 1973" },
      { id: "2.7", title: "2.7 Federal Structure under the Constitution of 1973" },
      { id: "2.8", title: "2.8 Structure of Provincial Governments" },
      { id: "2.9", title: "2.9 Role of Judiciary under the Constitution of 1973" },
      { id: "2.10", title: "2.10 Important Constitutional Amendments" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Administrative System",
    items: [
      { id: "3.1", title: "3.1 Functions of Federation and Provinces in the Light of the Constitution of 1973" },
      { id: "3.2", title: "3.2 Difference between Functions of Central and Provincial Government" },
      { id: "3.3", title: "3.3 Administrative Structure and Functions of Azad Jammu and Kashmir and Gilgit Baltistan" },
      { id: "3.4", title: "3.4 Nature of Relationship Between Federal and Provincial Government" },
      { id: "3.5", title: "3.5 Relations Between the Federation and the Provinces" },
      { id: "3.6", title: "3.6 Mutual Relationship Between Provincial and Local Governments" },
      { id: "3.7", title: "3.7 Structure of Different Levels of Local Governments" },
      { id: "3.8", title: "3.8 Functions of Local Governments at Various Levels" },
      { id: "3.9", title: "3.9 Functions of the Metropolitan/ Municipal Corporation" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Human Rights",
    items: [
      { id: "4.1", title: "4.1 Concept of Human Rights" },
      { id: "4.2", title: "4.2 Islamic Concept of Human Rights" },
      { id: "4.3", title: "4.3 United Nations Universal Declaration of Human Rights (1948)" },
      { id: "4.4", title: "4.4 Nature of Basic Human Rights in Pakistan" },
      { id: "4.5", title: "4.5 Human Rights at National and International Level" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Education System of Pakistan",
    items: [
      { id: "5.1", title: "5.1 Concept of Education" },
      { id: "5.2", title: "5.2 Goals of Education System Of Pakistan" },
      { id: "5.3", title: "5.3 Main Features of the Education System in Pakistan" },
      { id: "5.4", title: "5.4 Professional, Technical and Vocational Education in Pakistan" },
      { id: "5.5", title: "5.5 Suggestions for Resolving Educational Problems" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Sports and Tourism",
    items: [
      { id: "6.1", title: "6.1 Importance of Sports in a Society" },
      { id: "6.2", title: "6.2 Profile of Pakistan in world's Sports" },
      { id: "6.3", title: "6.3 Indoor Games" },
      { id: "6.4", title: "6.4 Indigenous Games of Pakistan and Other Games" },
      { id: "6.5", title: "6.5 Tourism as an Industry" }
    ]
  }
]

export default function PakistanStudiesChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/pakistan-studies/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Pakistan Studies (12th)</h1>
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
