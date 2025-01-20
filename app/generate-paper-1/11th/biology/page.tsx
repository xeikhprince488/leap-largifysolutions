'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const biologyChapters = [
  {
    id: "chap-1",
    title: "CHAP 1: Introduction",
    items: [
      { id: "1.1", title: "1.1 Biology and some major fields of specialization" },
      { id: "1.2", title: "1.2 Levels of biological organization" },
      { id: "1.3", title: "1.3 Living world in time" },
      { id: "1.4", title: "1.4 Biology and the services and mankind" },
      { id: "1.5", title: "1.5 Protection and conservation of environment" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2: Biological Molecules",
    items: [
      { id: "2.1", title: "2.1 Introduction to biochemistry" },
      { id: "2.2", title: "2.2 Importance of carbon" },
      { id: "2.3", title: "2.3 Importance of water" },
      { id: "2.4", title: "2.4 Carbohydrates" },
      { id: "2.5", title: "2.5 Lipids" },
      { id: "2.6", title: "2.6 Proteins" },
      { id: "2.7", title: "2.7 Structure of proteins" },
      { id: "2.8", title: "2.8 Nucleic acids (DNA and RNA)" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3: Enzymes",
    items: [
      { id: "3.1", title: "3.1 Characteristics of enzymes" },
      { id: "3.2", title: "3.2 Mechanism of enzyme action (CATALYSIS)" },
      { id: "3.3", title: "3.3 Factors affecting the rate of enzyme action" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4: The Cell",
    items: [
      { id: "4.1", title: "4.1 Emergence and implication of cell theory" },
      { id: "4.2", title: "4.2 Structure of a generalized cell" },
      { id: "4.3", title: "4.3 Nucleus" },
      { id: "4.4", title: "4.4 Prokaryotic and eukaryotic cell" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5: Variety of Life",
    items: [
      { id: "5.1", title: "5.1 Nomenclature" },
      { id: "5.2", title: "5.2 Two to five kingdom classification system" },
      { id: "5.3", title: "5.3 Viruses" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6: Kingdom Prokaryotae (Monera)",
    items: [
      { id: "6.1", title: "6.1 Discovery of bacteria" },
      { id: "6.2", title: "6.2 Occurrence of bacteria" },
      { id: "6.3", title: "6.3 Structure of bacteria" },
      { id: "6.4", title: "6.4 Importance of bacteria" },
      { id: "6.5", title: "6.5 Use and misuse of antibiotics" },
      { id: "6.6", title: "6.6 Characteristics of cyanobacteria" },
      { id: "6.7", title: "6.7 Economical importance" },
      { id: "6.8", title: "6.8 Nostoc" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7: The Kingdom Protista",
    items: [
      { id: "7.1", title: "7.1 Historical perspective" },
      { id: "7.2", title: "7.2 Diversity among Protista" },
      { id: "7.3", title: "7.3 Major groups of Protista" },
      { id: "7.4", title: "7.4 Fungi-like Protists" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8: Fungi",
    items: [
      { id: "8.1", title: "8.1 The body of fungus" },
      { id: "8.2", title: "8.2 Nutrition in fungi" },
      { id: "8.3", title: "8.3 Reproduction" },
      { id: "8.4", title: "8.4 Classification of fungi" },
      { id: "8.5", title: "8.5 Land adaptations of fungi" },
      { id: "8.6", title: "8.6 Importance of fungi" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9: Kingdom Plantae",
    items: [
      { id: "9.1", title: "9.1 Classification of Plantae" },
      { id: "9.2", title: "9.2 Division Bryophyta" },
      { id: "9.3", title: "9.3 Adaptation to land habitat" },
      { id: "9.4", title: "9.4 Classification" },
      { id: "9.5", title: "9.5 Division Tracheophyta" },
      { id: "9.6", title: "9.6 Psilopsida" },
      { id: "9.7", title: "9.7 Evolution of leaf" },
      { id: "9.8", title: "9.8 Lycopsida" },
      { id: "9.9", title: "9.9 Sphenopsida" },
      { id: "9.10", title: "9.10 Pteropsida" },
      { id: "9.11", title: "9.11 Evolution of seed habitat" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10: Kingdom Animalia",
    items: [
      { id: "10.1", title: "10.1 Introduction & Development of complexity in animals" },
      { id: "10.2", title: "10.2 Grade Radiate" },
      { id: "10.3", title: "10.3 Grade Bilateria" },
      { id: "10.4", title: "10.4 Parazoa" },
      { id: "10.5", title: "10.5 Grade Radiata" },
      { id: "10.6", title: "10.6 Grade Bilateria" }
    ]
  }
]

export default function BiologyChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/biology/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Biology (11th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={biologyChapters} onSelectionChange={handleSelectionChange} />
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
