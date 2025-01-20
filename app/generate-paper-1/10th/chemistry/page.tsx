'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-9",
    title: "CHAP 9 Chemical Equilibrium",
    items: [
      { id: "9.1", title: "9.1 Reversible Reaction and Dynamic Equilibrium" },
      { id: "9.2", title: "9.2 Law of Mass Action" },
      { id: "9.3", title: "9.3 Equilibrium Constant and Its Units" },
      { id: "9.4", title: "9.4 Importance of Equilibrium Constant" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10 Acids, Bases and Salts",
    items: [
      { id: "10.1", title: "10.1 Concepts of Acids and Bases" },
      { id: "10.2", title: "10.2 pH Scale" },
      { id: "10.3", title: "10.3 Salts" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11 Organic Chemistry",
    items: [
      { id: "11.1", title: "11.1 Organic Compounds" },
      { id: "11.2", title: "11.2 Sources of Organic Compounds" },
      { id: "11.3", title: "11.3 Uses of Organic Compounds" },
      { id: "11.4", title: "11.4 Alkanes and Alkyl Radicals" },
      { id: "11.5", title: "11.5 Functional Group" },
      { id: "11.6", title: "11.6 Tests of Functional Groups" }
    ]
  },
  {
    id: "chap-12",
    title: "CHAP 12 Hydrocarbons",
    items: [
      { id: "12.1", title: "12.1 Alkanes" },
      { id: "12.2", title: "12.2 Alkenes" },
      { id: "12.3", title: "12.3 Alkynes" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13 Biochemistry",
    items: [
      { id: "13.1", title: "13.1 Carbohydrates" },
      { id: "13.2", title: "13.2 Protein" },
      { id: "13.3", title: "13.3 Lipids" },
      { id: "13.4", title: "13.4 Nucleic Acids" },
      { id: "13.5", title: "13.5 Vitamins" }
    ]
  },
  {
    id: "chap-14",
    title: "CHAP 14 The Atmosphere",
    items: [
      { id: "14.1", title: "14.1 Composition of Atmosphere" },
      { id: "14.2", title: "14.2 Layers of Atmosphere" },
      { id: "14.3", title: "14.3 Pollutants" },
      { id: "14.4", title: "14.4 Acid Rain and Its Effects" },
      { id: "14.5", title: "14.5 Ozone Depletion and Its Effects" }
    ]
  },
  {
    id: "chap-15",
    title: "CHAP 15 Water",
    items: [
      { id: "15.1", title: "15.1 Properties of Water" },
      { id: "15.2", title: "15.2 Water as Solvent" },
      { id: "15.3", title: "15.3 Soft and Hard Water" },
      { id: "15.4", title: "15.4 Water Pollution" },
      { id: "15.5", title: "15.5 Waterborne Infectious Diseases" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16 Chemical Industries",
    items: [
      { id: "16.1", title: "16.1 Basic Metallurgical Operations" },
      { id: "16.2", title: "16.2 Manufacture of Sodium Carbonate by Solvay's Process" },
      { id: "16.3", title: "16.3 Manufacture of Urea" },
      { id: "16.4", title: "16.4 Petroleum Industry" }
    ]
  }
]

export default function ChemistryChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/chemistry/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Chemistry (10th)</h1>
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
