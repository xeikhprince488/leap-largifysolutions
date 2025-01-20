'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-15",
    title: "CHAP 15: Homeostasis",
    items: [
      { id: "15.1", title: "15.1 Concepts in Homeostasis" },
      { id: "15.2", title: "15.2 Osmoregulation in Plants" },
      { id: "15.3", title: "15.3 Osmoregulation in Animals" },
      { id: "15.4", title: "15.4 Excretion in Plants" },
      { id: "15.5", title: "15.5 Excretion in Animals" },
      { id: "15.6", title: "15.6 Excretion in Representative Animals" },
      { id: "15.7", title: "15.7 Excretion in Vertebrates" },
      { id: "15.8", title: "15.8 Urinary System" },
      { id: "15.9", title: "15.9 Kidney Problems & Cures" },
      { id: "15.10", title: "15.10 Thermoregulation in Plants" },
      { id: "15.11", title: "15.11 Mechanism in Animals" },
      { id: "15.12", title: "15.12 Thermoregulation in Mammals (Human)" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16: Support and Movements",
    items: [
      { id: "16.1", title: "16.1 Support in Plants" },
      { id: "16.2", title: "16.2 Movement in Plants" },
      { id: "16.3", title: "16.3 Support & Movements in Animals" },
      { id: "16.4", title: "16.4 Human Skeleton" },
      { id: "16.5", title: "16.5 Joints" },
      { id: "16.6", title: "16.6 Deformities of Skeleton" },
      { id: "16.7", title: "16.7 Repair of Broken Bones" },
      { id: "16.8", title: "16.8 Muscles" },
      { id: "16.9", title: "16.9 Locomotion in Protista & Invertebrates" },
      { id: "16.10", title: "16.10 Locomotion and Skeleton in Vertebrates" }
    ]
  },
  {
    id: "chap-17",
    title: "CHAP 17: Coordination and Control",
    items: [
      { id: "17.1", title: "17.1 Coordination in Plants" },
      { id: "17.2", title: "17.2 Plant Hormones" },
      { id: "17.3", title: "17.3 Coordination in Animals" },
      { id: "17.4", title: "17.4 Nerve Impulse" },
      { id: "17.5", title: "17.5 Evolution of Nervous System" },
      { id: "17.6", title: "17.6 Human Nervous System" },
      { id: "17.7", title: "17.7 Nervous Disorders" },
      { id: "17.8", title: "17.8 Chemical Coordination" },
      { id: "17.9", title: "17.9 The Pituitary Gland" },
      { id: "17.10", title: "17.10 Thyroid Gland" },
      { id: "17.11", title: "17.11 Pancreas" },
      { id: "17.12", title: "17.12 Adrenals" },
      { id: "17.13", title: "17.13 GUT" },
      { id: "17.14", title: "17.14 Gonads" },
      { id: "17.15", title: "17.15 Feedback Mechanism" },
      { id: "17.16", title: "17.16 Behaviour" },
      { id: "17.17", title: "17.17 Learning Behaviour" }
    ]
  },
  {
    id: "chap-18",
    title: "CHAP 18: Reproduction",
    items: [
      { id: "18.1", title: "18.1 Reproduction in Plants" },
      { id: "18.2", title: "18.2 Photoperiodism & Vernalisation" },
      { id: "18.3", title: "18.3 Reproduction in Animals" },
      { id: "18.4", title: "18.4 Reproduction in Man" },
      { id: "18.5", title: "18.5 Female Reproductive Cycle" },
      { id: "18.6", title: "18.6 Birth" },
      { id: "18.7", title: "18.7 Test Tube Babies & STD" }
    ]
  },
  {
    id: "chap-19",
    title: "CHAP 19: Growth and Development",
    items: [
      { id: "19.1", title: "19.1 Growth and Development in Plants" },
      { id: "19.2", title: "19.2 Conditions of Growth" },
      { id: "19.3", title: "19.3 Growth Correlations" },
      { id: "19.4", title: "19.4 Growth and Development in Animals" },
      { id: "19.5", title: "19.5 Mechanisms of Development" },
      { id: "19.6", title: "19.6 Concept of Differentiation" },
      { id: "19.7", title: "19.7 Aging" },
      { id: "19.8", title: "19.8 Regeneration" },
      { id: "19.9", title: "19.9 Abnormal Development" }
    ]
  },
  {
    id: "chap-20",
    title: "CHAP 20: Chromosomes and DNA",
    items: [
      { id: "20.1", title: "20.1 Types and Composition of Chromosomes" },
      { id: "20.2", title: "20.2 The Chromosomal Theory of Inheritance" },
      { id: "20.3", title: "20.3 DNA as Hereditary Material" },
      { id: "20.4", title: "20.4 Chemical Nature of DNA" },
      { id: "20.5", title: "20.5 DNA Replication" },
      { id: "20.6", title: "20.6 What is a Gene?" },
      { id: "20.7", title: "20.7 How DNA Encodes Protein Structure + Transcription" },
      { id: "20.8", title: "20.8 Genetic Code & Translation" },
      { id: "20.9", title: "20.9 Mutation" }
    ]
  },
  {
    id: "chap-21",
    title: "CHAP 21: Cell Cycle",
    items: [
      { id: "21.1", title: "21.1 Interphase" },
      { id: "21.2", title: "21.2 Mitosis" },
      { id: "21.3", title: "21.3 Cancer" },
      { id: "21.4", title: "21.4 Meiosis" },
      { id: "21.5", title: "21.5 Meiotic Errors" },
      { id: "21.6", title: "21.6 Necrosis & Apoptosis" }
    ]
  },
  {
    id: "chap-22",
    title: "CHAP 22: Variation and Genetics",
    items: [
      { id: "22.1", title: "22.1 Genes, Alleles and Gene Pool" },
      { id: "22.2", title: "22.2 Mendel's Law of Inheritance" },
      { id: "22.3", title: "22.3 Dominance Relations" },
      { id: "22.4", title: "22.4 Multiple Alleles" },
      { id: "22.5", title: "22.5 Epistasis & Pleiotropy" },
      { id: "22.6", title: "22.6 Continuously Varying Traits" },
      { id: "22.7", title: "22.7 Gene Linkage & Crossing Over" },
      { id: "22.8", title: "22.8 Sex Determination" },
      { id: "22.9", title: "22.9 Sex Linkage in Drosophila" },
      { id: "22.10", title: "22.10 Sex Linkage in Humans" },
      { id: "22.11", title: "22.11 Diabetes Mellitus & its Genetic Basis" }
    ]
  },
  {
    id: "chap-23",
    title: "CHAP 23: Biotechnology",
    items: [
      { id: "23.1", title: "23.1 Recombinant DNA Technology" },
      { id: "23.2", title: "23.2 Genomic Library and PCR" },
      { id: "23.3", title: "23.3 Analyzing DNA + Gene Sequencing" },
      { id: "23.4", title: "23.4 The Human Genome Project" },
      { id: "23.5", title: "23.5 Biotechnology Products" },
      { id: "23.6", title: "23.6 Gene Therapy" },
      { id: "23.7", title: "23.7 Tissue Culture" },
      { id: "23.8", title: "23.8 Genetic Engineering of Plants" }
    ]
  },
  {
    id: "chap-24",
    title: "CHAP 24: Evolution",
    items: [
      { id: "24.1", title: "24.1 Concept of Evolution Vs Special Creation" },
      { id: "24.2", title: "24.2 Evolution from Prokaryotes to Eukaryotes" },
      { id: "24.3", title: "24.3 Lamarckism & Darwinism" },
      { id: "24.4", title: "24.4 Evidences of Evolution" },
      { id: "24.5", title: "24.5 Natural Selection & Artificial Selection" },
      { id: "24.6", title: "24.6 Gene Pool, Allele & Genotype Frequencies + Factors" },
      { id: "24.7", title: "24.7 Endangered Species" }
    ]
  },
  {
    id: "chap-25",
    title: "CHAP 25: Ecosystem",
    items: [
      { id: "25.1", title: "25.1 Ecosystem + Biosphere" },
      { id: "25.2", title: "25.2 Components of Ecosystem" },
      { id: "25.3", title: "25.3 Succession" },
      { id: "25.4", title: "25.4 Predation + Parasitism + Symbiosis + Grazing" },
      { id: "25.5", title: "25.5 Biogeochemical Cycles" },
      { id: "25.6", title: "25.6 The Flow of Energy in Food Chain of an Ecosystem" }
    ]
  },
  {
    id: "chap-26",
    title: "CHAP 26: Some Major Ecosystems",
    items: [
      { id: "26.1", title: "26.1 Aquatic or Hydrospheric Ecosystem" },
      { id: "26.2", title: "26.2 Terrestrial or Lithospheric Ecosystem" },
      { id: "26.3", title: "26.3 Forests Ecosystem" },
      { id: "26.4", title: "26.4 The Grassland Ecosystem" },
      { id: "26.5", title: "26.5 Desert Ecosystem" },
      { id: "26.6", title: "26.6 Tundra Ecosystem" }
    ]
  },
  {
    id: "chap-27",
    title: "CHAP 27: Man and his Environment",
    items: [
      { id: "27.1", title: "27.1 Renewable & Non-Renewable Resources" },
      { id: "27.2", title: "27.2 Man's Impact on Environment" },
      { id: "27.3", title: "27.3 Deforestation & Afforestation" },
      { id: "27.4", title: "27.4 Pollution" }
    ]
  }
]

export default function BiologyChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/biology/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Biology (12th)</h1>
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
