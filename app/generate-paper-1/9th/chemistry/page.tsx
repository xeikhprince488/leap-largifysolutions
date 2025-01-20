'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Fundamentals of Chemistry",
    items: [
      { id: "1.1", title: "1.1 Branches of Chemistry" },
      { id: "1.2", title: "1.2 Basic Definitions" },
      { id: "1.3", title: "1.3 Chemical Species" },
      { id: "1.4", title: "1.4 Gram Atomic Mass, Gram Molecular Mass and Gram Formula Mass" },
      { id: "1.5", title: "1.5 Avogadro’s Number" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Structure of Atoms",
    items: [
      { id: "2.1", title: "2.1 Theories and Experiments Related to Structure of Atoms" },
      { id: "2.2", title: "2.2 Electronic Configuration" },
      { id: "2.3", title: "2.3 Isotopes" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Periodic Table and Periodicity of Properties",
    items: [
      { id: "3.1", title: "3.1 Periodic Table" },
      { id: "3.2", title: "3.2 Periodicity of Properties" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Structure of Molecules",
    items: [
      { id: "4.1", title: "4.1 Why do Atoms Form Chemical Bond?" },
      { id: "4.2", title: "4.2 Chemical Bond" },
      { id: "4.3", title: "4.3 Types of Chemical Bond" },
      { id: "4.4", title: "4.4 Inter Molecular Forces" },
      { id: "4.5", title: "4.5 Nature and Properties of Bonding" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Physical States of Matter",
    items: [
      { id: "5.1", title: "5.1 Typical Properties" },
      { id: "5.2", title: "5.2 Laws Related to Gases" },
      { id: "5.3", title: "5.3 Typical Properties of Liquid" },
      { id: "5.4", title: "5.4 Typical Properties of Solids" },
      { id: "5.5", title: "5.5 Types of Solids" },
      { id: "5.6", title: "5.6 Allotropy" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Solutions",
    items: [
      { id: "6.1", title: "6.1 Solution" },
      { id: "6.2", title: "6.2 Saturated Solutions" },
      { id: "6.3", title: "6.3 Types of Solutions" },
      { id: "6.4", title: "6.4 Concentration Units" },
      { id: "6.5", title: "6.5 Solubility" },
      { id: "6.6", title: "6.6 Comparison of Solution, Suspension and Colloid" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Electrochemistry",
    items: [
      { id: "7.1", title: "7.1 Oxidation and Reduction Reactions" },
      { id: "7.2", title: "7.2 Oxidation State and Rules For Assigning Oxidation State" },
      { id: "7.3", title: "7.3 Oxidizing and Reducing Agents" },
      { id: "7.4", title: "7.4 Oxidation-Reduction Reactions" },
      { id: "7.5", title: "7.5 Electrochemical Cells" },
      { id: "7.6", title: "7.6 Electrochemical Industries" },
      { id: "7.7", title: "7.7 Corrosion and its Prevention" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Chemical Reactivity",
    items: [
      { id: "8.1", title: "8.1 Metals" },
      { id: "8.2", title: "8.2 Non Metals" }
    ]
  }
]

export default function ChemistryChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/chemistry/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Chemistry (9th)</h1>
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
