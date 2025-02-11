'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const defaultChapters = [
  {
    id: 'chap-1',
    title: 'CHAP 1 Introduction to Biology',
    items: [
      { id: "1.1", title: "1.1 Biology and its Branches" },
      { id: "1.2", title: "1.2 Relation of Biology with Other Sciences" },
      { id: "1.3", title: "1.3 Careers in Biology" },
      { id: "1.4", title: "1.4 Quranic Instructions to Reveal the Study of Life" },
      { id: "1.5", title: "1.5 Science as a Collaborative Field" },
      { id: "1.6", title: "1.6 Scientific Method" },
      { id: "1.7", title: "1.7 Theory and Law/Principle" },
      { id: "1.8", title: "1.8 Malaria - An Example of Biological Method" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Biodiversity",
    items: [
      { id: "2.1", title: "2.1 Biodiversity" },
      { id: "2.2", title: "2.2 Classification" },
      { id: "2.3", title: "2.3 Taxonomic Ranks" },
      { id: "2.4", title: "2.4 History of Classification" },
      { id: "2.5", title: "2.5 Domains of Living Organisms" },
      { id: "2.6", title: "2.6 Classification of Domain Eukarya" },
      { id: "2.7", title: "2.7 Status of Virus in Classification" },
      { id: "2.8", title: "2.8 Binomial Nomenclature" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 The Cell",
    items: [
      { id: "3.1", title: "3.1 Cell" },
      { id: "3.2", title: "3.2 Structure of Cell" },
      { id: "3.3", title: "3.3 Cell Wall" },
      { id: "3.4", title: "3.4 Cell Membrane" },
      { id: "3.5", title: "3.5 Cytoplasm" },
      { id: "3.6", title: "3.6 Nucleus" },
      { id: "3.7", title: "3.7 Cytoskeleton" },
      { id: "3.8", title: "3.8 Ribosome" },
      { id: "3.9", title: "3.9 Endoplasmic Reticulum" },
      { id: "3.10", title: "3.10 Golgi Apparatus" },
      { id: "3.11", title: "3.11 Lysosomes" },
      { id: "3.12", title: "3.12 Mitochondria" },
      { id: "3.13", title: "3.13 Plastids" },
      { id: "3.14", title: "3.14 Vacuoles" },
      { id: "3.15", title: "3.15 Centrioles" },
      { id: "3.16", title: "3.16 Structural Advantages of Plant and Animal Cells" },
      { id: "3.17", title: "3.17 Cell Specialization" },
      { id: "3.18", title: "3.18 Stem Cells" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Cell Cycle",
    items: [
      { id: "4.1", title: "4.1 Cell Cycle" },
      { id: "4.2", title: "4.2 Mitosis" },
      { id: "4.3", title: "4.3 Meiosis" },
      { id: "4.4", title: "4.4 Comparison between Meiosis and Mitosis" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Tissues, Organs, and Organ Systems",
    items: [
      { id: "5.1", title: "5.1 Levels of Organization" },
      { id: "5.2", title: "5.2 Organs and Organ Systems in Plants" },
      { id: "5.3", title: "5.3 Organs and Organ Systems in Humans" },
      { id: "5.4", title: "5.4 Homeostasis" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Biomolecules",
    items: [
      { id: "6.1", title: "6.1 Biomolecules" },
      { id: "6.2", title: "6.2 Carbohydrates" },
      { id: "6.3", title: "6.3 Proteins" },
      { id: "6.4", title: "6.4 Lipids" },
      { id: "6.5", title: "6.5 Nucleic Acids" },
      { id: "6.6", title: "6.6 The Working of DNA and RNA" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Enzymes",
    items: [
      { id: "7.1", title: "7.1 Metabolism" },
      { id: "7.2", title: "7.2 Enzymes" },
      { id: "7.3", title: "7.3 Mechanism of Enzyme Action" },
      { id: "7.4", title: "7.4 Factors that Affect the Activity of Enzymes" },
      { id: "7.5", title: "7.5 Enzyme Inhibition" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Bioenergetics",
    items: [
      { id: "8.1", title: "8.1 ATP: The Cell’s Energy Currency" },
      { id: "8.2", title: "8.2 Photosynthesis" },
      { id: "8.3", title: "8.3 Cellular Respiration" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9 Plant Physiology",
    items: [
      { id: "9.1", title: "9.1 Nutrition in Plants" },
      { id: "9.2", title: "9.2 Transport in Plants" },
      { id: "9.3", title: "9.3 Transportation" },
      { id: "9.4", title: "9.4 Transport of Water and Salts in Plants" },
      { id: "9.5", title: "9.5 Translocation of Food in Plants" },
      { id: "9.6", title: "9.6 Gaseous Exchange in Plants" },
      { id: "9.7", title: "9.7 Mechanisms for Excretion in Plants" },
      { id: "9.8", title: "9.8 Osmotic Adjustments in Plants" }
    ]
  }
]

export default function BiologyChaptersPage() {
  const router = useRouter()
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [chapters, setChapters] = useState(defaultChapters);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch('/api/chapters?grade=9th&subject=biology');
      const data = await response.json();
      console.log('Fetched chapters:', data); // Add logging
      setChapters([...defaultChapters, ...data]);
    };
    fetchChapters();
  }, []);

  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems);
    const chapters = selectedItems.filter(item => item.startsWith('chap-'));
    const topics = selectedItems.filter(item => !item.startsWith('chap-') && item.includes('.'));
    console.log('Chapters:', chapters);
    console.log('Topics:', topics);
    setSelectedChapters(chapters);
    setSelectedTopics(topics);
  }

  const handleNext = () => {
    router.push(`/generate-paper-1/9th/biology/configure?chapters=${selectedChapters.join(',')}&topics=${selectedTopics.join(',')}`);
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
              <h1 className="text-2xl font-bold">Select Chapters - Biology (9th)</h1>
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

