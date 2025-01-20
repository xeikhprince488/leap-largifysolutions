'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-10",
    title: "CHAP 10 Gaseous Exchange",
    items: [
      { id: "10.1", title: "10.1 Gaseous Exchange in Plants" },
      { id: "10.2", title: "10.2 Gaseous Exchange in Humans" },
      { id: "10.3", title: "10.3 Respiratory Disorders" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11 Homeostasis",
    items: [
      { id: "11.1", title: "11.1 Homeostasis in Plants" },
      { id: "11.2", title: "11.2 Homeostasis in Humans" },
      { id: "11.3", title: "11.3 The Urinary System of Humans" },
      { id: "11.4", title: "11.4 Disorders of Kidney" }
    ]
  },
  {
    id: "chap-12",
    title: "CHAP 12 Coordination and Control",
    items: [
      { id: "12.1", title: "12.1 Types of Coordination" },
      { id: "12.2", title: "12.2 Human Nervous System" },
      { id: "12.3", title: "12.3 Receptors In Humans" },
      { id: "12.4", title: "12.4 Endocrine System" },
      { id: "12.5", title: "12.5 Disorders of Nervous System" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13 Support and Movement",
    items: [
      { id: "13.1", title: "13.1 Human Skeleton" },
      { id: "13.2", title: "13.2 Types Of Joints" },
      { id: "13.3", title: "13.3 Muscles and Movement" },
      { id: "13.4", title: "13.4 Disorders of Skeletal System" }
    ]
  },
  {
    id: "chap-14",
    title: "CHAP 14 Reproduction",
    items: [
      { id: "14.1", title: "14.1 Reproduction" },
      { id: "14.2", title: "14.2 Methods of Asexual Reproduction" },
      { id: "14.3", title: "14.3 Sexual Reproduction in Plants" },
      { id: "14.4", title: "14.4 Sexual Reproduction in Animals" }
    ]
  },
  {
    id: "chap-15",
    title: "CHAP 15 Inheritance",
    items: [
      { id: "15.1", title: "15.1 Introduction to Genetics" },
      { id: "15.2", title: "15.2 Chromosomes and Genes" },
      { id: "15.3", title: "15.3 Mendel’s Laws of Inheritance" },
      { id: "15.4", title: "15.4 Co-Dominance and Incomplete Dominance" },
      { id: "15.5", title: "15.5 Variations and Evolution" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16 Man and his Environment",
    items: [
      { id: "16.1", title: "16.1 Levels of Biological Selection" },
      { id: "16.2", title: "16.2 Flow of Materials And Energy In Ecosystem" },
      { id: "16.3", title: "16.3 Interactions in Ecosystems" },
      { id: "16.4", title: "16.4 Ecosystem Balance and Human Impact" },
      { id: "16.5", title: "16.5 Pollution; Consequenses and Control" },
      { id: "16.6", title: "16.6 Conservation of Nature" }
    ]
  },
  {
    id: "chap-17",
    title: "CHAP 17 Biotechnology",
    items: [
      { id: "17.1", title: "17.1 Introduction of Biotechnology" },
      { id: "17.2", title: "17.2 Fermentation" },
      { id: "17.3", title: "17.3 Genetic Engineering" },
      { id: "17.4", title: "17.4 Single-Cell Protein" }
    ]
  },
  {
    id: "chap-18",
    title: "CHAP 18 Pharmacology",
    items: [
      { id: "18.1", title: "18.1 Medicinal Drugs" },
      { id: "18.2", title: "18.2 Addictive Drugs" },
      { id: "18.3", title: "18.3 Antibiotics and Vaccines" }
    ]
  }
]

export default function BiologyChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/biology/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Biology (10th)</h1>
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
