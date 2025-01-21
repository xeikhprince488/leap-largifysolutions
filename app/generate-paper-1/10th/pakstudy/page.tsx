'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
 
  {
    id: "chap-5",
    title: "CHAP 5 History of Pakistan-II (1971 Till Todate)",
    items: [
      { id: "5.1", title: "5.1 Zulfiqar Ali Bhutto Era 1971-1977" },
      { id: "5.2", title: "5.2 General Muhammad Zia-ul-Haq Era 1977-88" },
      { id: "5.3", title: "5.3 Benazir Bhutto's First & Second Term 1988-96" },
      { id: "5.4", title: "5.4 Muhammad Nawaz Sharif's First, Second & Third Term 1988-2017" },
      { id: "5.5", title: "5.5 General Pervez Musharraf's Era 1999-2008" },
      { id: "5.6", title: "5.6 Syed Yousaf Raza Gillani's Era 2008-12" },
      { id: "5.7", title: "5.7 General Elections of Pakistan 2018" },
      { id: "5.8", title: "5.8 Constitution of Pakistan 1973" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Pakistan and World Affairs",
    items: [
      { id: "6.1", title: "6.1 Geo-Political Significance of Pakistan" },
      { id: "6.2", title: "6.2 Objectives of Pakistan's Foreign Policy" },
      { id: "6.3", title: "6.3 Pakistan's Relations with Neighbouring States" },
      { id: "6.4", title: "6.4 Kashmir Issue" },
      { id: "6.5", title: "6.5 Pakistan's Relations with Central Asian Countries" },
      { id: "6.6", title: "6.6 Pakistan's Relations with SAARC Countries" },
      { id: "6.7", title: "6.7 Pakistan's Relations with major world powers" },
      { id: "6.8", title: "6.8 China Pakistan Economic Corridor-CPEC" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Economic Development of Pakistan",
    items: [
      { id: "7.1", title: "7.1 Economic Development of Pakistan" },
      { id: "7.2", title: "7.2 Major Metallic and Non-metallic Mineral Resources, their Economic Importance and Distribution in Pakistan" },
      { id: "7.3", title: "7.3 Importance of Agriculture, Problems and Efforts to Modernize Agriculture" },
      { id: "7.4", title: "7.4 Water Resources of Pakistan and Existing Irrigation System" },
      { id: "7.5", title: "7.5 Production, Distribution of Major Crops, Livestock and Fisheries in Pakistan" },
      { id: "7.6", title: "7.6 Importance of Industries, their Location and Production of Cottage, Small and Large-scale Industries" },
      { id: "7.7", title: "7.7 Importance, Production and Consumption of different Sources of Energy in Pakistan" },
      { id: "7.8", title: "7.8 International Trade of Pakistan (Imports and Exports) and its Impact on the Economy" },
      { id: "7.9", title: "7.9 Importance of Sea Ports and Dry Ports of Pakistan" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Population, Society and Culture of Pakistan",
    items: [
      { id: "8.1", title: "8.1 Growth and Distribution of Population in Pakistan" },
      { id: "8.2", title: "8.2 Salient Features of Pakistani Society and Culture" },
      { id: "8.3", title: "8.3 Educational Condition in Pakistan" },
      { id: "8.4", title: "8.4 Health Conditions in Pakistan" },
      { id: "8.5", title: "8.5 Importance of Tourism and Natural and Cultural attraction for Tourism in Pakistan" },
      { id: "8.6", title: "8.6 Need and Importance of Inter-faith Harmony, Tolerance and Resilience against Terrorism" },
      { id: "8.7", title: "8.7 Origin and Evolution of National and Regional Languages" },
      { id: "8.8", title: "8.8 Causes, Consequences and Remedies for Poverty Alleviation in Pakistan" }
    ]
  }
]

export default function PakistanStudiesChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/pakstudy/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Pakistan Studies (10th)</h1>
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
