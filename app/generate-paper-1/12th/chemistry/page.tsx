'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [

  {
    "id": "chap-1",
    "title": "CHAP 1: Periodic Classification of Elements and Periodicity",
    "items": [
      { "id": "1.1", "title": "1.1 Introduction" },
      { "id": "1.2", "title": "1.2 The Modern Periodic Table" },
      { "id": "1.3", "title": "1.3 Periodic Trends in Physical Properties" },
      { "id": "1.4", "title": "1.4 Periodic Relationship in Compounds" },
      { "id": "1.5", "title": "1.5 The Position of Hydrogen" },
      { "id": "1.6", "title": "1.6 Exercise" },
      { "id": "1.7", "title": "1.7 Past Papers" }
    ]
  },
  {
    "id": "chap-2",
    "title": "CHAP 2: s-Block Elements",
    "items": [
      { "id": "2.1", "title": "2.1 Introduction" },
      { "id": "2.2", "title": "2.2 General Behaviour of Alkali Metals" },
      { "id": "2.3", "title": "2.3 Commercial Preparation of Sodium by Down's Cell" },
      { "id": "2.4", "title": "2.4 Commercial Preparation of Sodium Hydroxide by the Diaphragm Cell" },
      { "id": "2.5", "title": "2.5 Role of Gypsum in Agriculture and Industry" },
      { "id": "2.6", "title": "2.6 Role of Lime in Agriculture and Industry" },
      { "id": "2.7", "title": "2.7 Exercise" },
      { "id": "2.8", "title": "2.8 Past Papers" }
    ]
  },
  {
    "id": "chap-3",
    "title": "CHAP 3: Group IIIA and Group IVA Elements",
    "items": [
      { "id": "3.1", "title": "3.1 Group IIIA Elements" },
      { "id": "3.2", "title": "3.2 Compounds of Boron" },
      { "id": "3.3", "title": "3.3 Reactions of Aluminium" },
      { "id": "3.4", "title": "3.4 Group IVA Elements" },
      { "id": "3.5", "title": "3.5 Compounds of Carbon and Silicon" },
      { "id": "3.6", "title": "3.6 Semiconductors" },
      { "id": "3.7", "title": "3.7 Uses of Lead Compounds in Paints" },
      { "id": "3.8", "title": "3.8 Exercise" },
      { "id": "3.9", "title": "3.9 Past Papers" }
    ]
  },
  {
    "id": "chap-4",
    "title": "CHAP 4: Group VA and VIA Elements",
    "items": [
      { "id": "4.1", "title": "4.1 Introduction" },
      { "id": "4.2", "title": "4.2 Nitrogen and Its Compounds" },
      { "id": "4.3", "title": "4.3 Phosphorus and Its Compounds" },
      { "id": "4.4", "title": "4.4 Group VIA Elements" },
      { "id": "4.5", "title": "4.5 Sulphuric Acid (H2SO4)" },
      { "id": "4.6", "title": "4.6 Exercise" },
      { "id": "4.7", "title": "4.7 Past Papers" }
    ]
  },
  {
    "id": "chap-5",
    "title": "CHAP 5: The Halogens and the Noble Gases",
    "items": [
      { "id": "5.1", "title": "5.1 Introduction" },
      { "id": "5.2", "title": "5.2 Occurrence" },
      { "id": "5.3", "title": "5.3 Peculiar Behaviour of Fluorine" },
      { "id": "5.4", "title": "5.4 Oxidizing Properties" },
      { "id": "5.5", "title": "5.5 Compounds of Halogens" },
      { "id": "5.6", "title": "5.6 Commercial Uses of Halogens and Their Compounds" },
      { "id": "5.7", "title": "5.7 Noble Gases" },
      { "id": "5.8", "title": "5.8 Exercise" },
      { "id": "5.9", "title": "5.9 Past Papers" }
    ]
  },
  {
    "id": "chap-6",
    "title": "CHAP 6: Transition Elements",
    "items": [
      { "id": "6.1", "title": "6.1 Introduction" },
      { "id": "6.2", "title": "6.2 Properties of Transition Elements" },
      { "id": "6.3", "title": "6.3 Complex Compounds" },
      { "id": "6.4", "title": "6.4 Iron" },
      { "id": "6.5", "title": "6.5 Corrosion" },
      { "id": "6.6", "title": "6.6 Chromates and Dichromates" },
      { "id": "6.7", "title": "6.7 Potassium Permanganate (KMnO4)" },
      { "id": "6.8", "title": "6.8 Exercise" },
      { "id": "6.9", "title": "6.9 Past Papers" }
    ]
  },
  {
    "id": "chap-7",
    "title": "CHAP 7: Fundamental Principles of Organic Chemistry",
    "items": [
      { "id": "7.1", "title": "7.1 Introduction" },
      { "id": "7.2", "title": "7.2 Some Features of Organic Compounds" },
      { "id": "7.3", "title": "7.3 Importance of Organic Chemistry" },
      { "id": "7.4", "title": "7.4 Sources of Organic Compounds" },
      { "id": "7.5", "title": "7.5 Cracking of Petroleum" },
      { "id": "7.6", "title": "7.6 Reforming" },
      { "id": "7.7", "title": "7.7 Classifications of Organic Compounds" },
      { "id": "7.8", "title": "7.8 Functional Group" },
      { "id": "7.9", "title": "7.9 Hybridization of Orbitals and the Shapes of Molecules" },
      { "id": "7.10", "title": "7.10 Isomerism" },
      { "id": "7.11", "title": "7.11 Exercise" },
      { "id": "7.12", "title": "7.12 Past Papers" }
    ]
  },
  {
    "id": "chap-8",
    "title": "CHAP 8: Aliphatic Hydrocarbons",
    "items": [
      { "id": "8.1", "title": "8.1 Introduction" },
      { "id": "8.2", "title": "8.2 Nomenclature" },
      { "id": "8.3", "title": "8.3 Alkanes or Paraffins" },
      { "id": "8.4", "title": "8.4 Alkenes" },
      { "id": "8.5", "title": "8.5 Alkynes" },
      { "id": "8.6", "title": "8.6 Exercise" },
      { "id": "8.7", "title": "8.7 Past Papers" }
    ]
  },
  {
    "id": "chap-9",
    "title": "CHAP 9: Aromatic Hydrocarbons",
    "items": [
      { "id": "9.1", "title": "9.1 Introduction" },
      { "id": "9.2", "title": "9.2 Nomenclature" },
      { "id": "9.3", "title": "9.3 Benzene" },
      { "id": "9.4", "title": "9.4 Preparation of Benzene" },
      { "id": "9.5", "title": "9.5 Reactions of Benzene" },
      { "id": "9.6", "title": "9.6 Comparison of Reactivities of Alkanes, Alkenes and Benzene" },
      { "id": "9.7", "title": "9.7 Exercise" },
      { "id": "9.8", "title": "9.8 Past Papers" }
    ]
  },

  {
    "id": "chap-10",
    "title": "CHAP 10: Alkyl Halides",
    "items": [
      { "id": "10.1", "title": "10.1 Introduction" },
      { "id": "10.2", "title": "10.2 Nomenclature of Alkyl Halides" },
      { "id": "10.3", "title": "10.3 Methods of Preparation of Alkyl Halides" },
      { "id": "10.4", "title": "10.4 Reactivity of Alkyl Halides" },
      { "id": "10.5", "title": "10.5 Reactions of Alkyl Halides" },
      { "id": "10.6", "title": "10.6 Grignard Reagent" },
      { "id": "10.7", "title": "10.7 Exercise" },
      { "id": "10.8", "title": "10.8 Past Papers" }
    ]
  },
  {
    "id": "chap-11",
    "title": "CHAP 11: Alcohols, Phenols and Ethers",
    "items": [
      { "id": "11.1", "title": "11.1 Introduction" },
      { "id": "11.2", "title": "11.2 Alcohols" },
      { "id": "11.3", "title": "11.3 Distinction between Primary, Secondary and Tertiary Alcohols" },
      { "id": "11.4", "title": "11.4 Uses of Alcohols" },
      { "id": "11.5", "title": "11.5 Phenol" },
      { "id": "11.6", "title": "11.6 Ethers" },
      { "id": "11.7", "title": "11.7 Exercise" },
      { "id": "11.8", "title": "11.8 Past Papers" }
    ]
  },
  {
    "id": "chap-12",
    "title": "CHAP 12: Aldehydes and Ketones",
    "items": [
      { "id": "12.1", "title": "12.1 Introduction" },
      { "id": "12.2", "title": "12.2 Nomenclature" },
      { "id": "12.3", "title": "12.3 Preparation of Aldehydes and Ketones" },
      { "id": "12.4", "title": "12.4 Reactivity of Carbonyl Group" },
      { "id": "12.5", "title": "12.5 Reactions of Carbonyl Compounds" },
      { "id": "12.6", "title": "12.6 Identification of Carbonyl Compounds" },
      { "id": "12.7", "title": "12.7 Uses" },
      { "id": "12.8", "title": "12.8 Exercise" },
      { "id": "12.9", "title": "12.9 Past Papers" }
    ]
  },
  {
    "id": "chap-13",
    "title": "CHAP 13: Carboxylic Acids",
    "items": [
      { "id": "13.1", "title": "13.1 Introduction" },
      { "id": "13.2", "title": "13.2 Nomenclature of Carboxylic Acid" },
      { "id": "13.3", "title": "13.3 General Methods of Preparation" },
      { "id": "13.4", "title": "13.4 Physical Characteristics" },
      { "id": "13.5", "title": "13.5 Reactivity of Carboxyl Group" },
      { "id": "13.6", "title": "13.6 Reactions of Carboxylic Acids" },
      { "id": "13.7", "title": "13.7 Acetic Acid" },
      { "id": "13.8", "title": "13.8 Amino Acids" },
      { "id": "13.9", "title": "13.9 Exercise" },
      { "id": "13.10", "title": "13.10 Past Papers" }
    ]
  },
  {
    "id": "chap-14",
    "title": "CHAP 14: Macromolecules",
    "items": [
      { "id": "14.1", "title": "14.1 Introduction" },
      { "id": "14.2", "title": "14.2 Structure of Polymers" },
      { "id": "14.3", "title": "14.3 Types of Polymers" },
      { "id": "14.4", "title": "14.4 Polymerization Process" },
      { "id": "14.5", "title": "14.5 Brief Description of Synthetic Polymers" },
      { "id": "14.6", "title": "14.6 Biopolymers" },
      { "id": "14.7", "title": "14.7 Exercise" },
      { "id": "14.8", "title": "14.8 Past Papers" }
    ]
  },


  {
    id: "chap-15",
    title: "CHAP 15 Common Chemical Industries in Pakistan",
    items: [
      { id: "15.1", title: "15.1 Introduction" },
      { id: "15.2", title: "15.2 Fertilizers" },
      { id: "15.3", title: "15.3 Elements Essential for Plant Growth" },
      { id: "15.4", title: "15.4 Classification of Fertilizers" },
      { id: "15.5", title: "15.5 Cement" },
      { id: "15.6", title: "15.6 Paper Industry" },
      { id: "15.7", title: "15.7 Exercise" },
      { id: "15.8", title: "15.8 Past Papers" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16 Environmental Chemistry",
    items: [
      { id: "16.1", title: "16.1 Introduction" },
      { id: "16.2", title: "16.2 Types of Pollution" },
      { id: "16.3", title: "16.3 Factors Affecting the Quality of Water" },
      { id: "16.4", title: "16.4 Solid Waste Management" },
      { id: "16.5", title: "16.5 Exercise" },
      { id: "16.6", title: "16.6 Past Papers" }
    ]
  }
]

export default function ChemistryChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/chemistry/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Chemistry (12th)</h1>
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
