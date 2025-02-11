'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 States of Matter and Phase Change",
    items: [
      { id: "1.1", title: "1.1 What is Chemistry" },
      { id: "1.2", title: "1.2 States of Matter" },
      { id: "1.3", title: "1.3 Element, Compound and Mixture" },
      { id: "1.4", title: "1.4 Allotropic From of Substances" },
      { id: "1.5", title: "1.5 Difference between Elements, Compound and Mixture" },
      { id: "1.6", title: "1.6 Solution, Colloidal Solution and Suspension" },
      { id: "1.7", title: "1.7 Formation of Unsaturated and Saturated solution" },
      { id: "1.8", title: "1.8 Effect of Temperature on the solubility of solutes" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Atomic Structure",
    items: [
      { id: "2.1", title: "2.1 Structure of Atom" },
      { id: "2.2", title: "2.2 Atomic Number and Mass number" },
      { id: "2.3", title: "2.3 Isotopes and their Masses" },
      { id: "2.4", title: "2.4 Relative Atomic Mass" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Chemical Bonding",
    items: [
      { id: "3.1", title: "3.1 Why do atoms form chemical bonds?" },
      { id: "3.2.2", title: "3.2.2 Covalent Bond" },
      { id: "3.2.3", title: "3.2.3 Coordinate Covalent Bond" },
      { id: "3.3", title: "3.3 Metallic Bond" },
      { id: "3.4", title: "3.4 Electropositive Character of Metals" },
      { id: "3.5", title: "3.5 Electronegative Character of Non-metals" },
      { id: "3.6", title: "3.6 Compare the properties of ionic and covalent compounds" },
      { id: "3.7", title: "3.7 intermolecular forces of attraction" },
      { id: "3.8", title: "3.8 Nature of Bonding and properties" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Stoichiometry",
    items: [
      { id: "4.1", title: "4.1 chemical formula" },
      { id: "4.2", title: "4.2 Empirical Formula" },
      { id: "4.3", title: "4.3 Chemical Formulas of Binary Ionic Compounds" },
      { id: "4.4", title: "4.4 Chemical Formulas of Compounds" },
      { id: "4.5", title: "4.5 Deduce the molecular form the structural formula" },
      { id: "4.6", title: "4.6 Avogadro's Number" },
      { id: "4.7", title: "4.7 The mole and molar mass" },
      { id: "4.8", title: "4.8 Chemical Equation and Chemical Reaction" },
      { id: "4.9", title: "4.9 Calculation Based on chemical Equation" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Energetic",
    items: [
      { id: "5.1", title: "5.1 System and Sourounding" },
      { id: "5.2", title: "5.2 Enthalpy" },
      { id: "5.3", title: "5.3 Exothermic and Endothermic reaction" },
      { id: "5.4", title: "5.4 How does a Reaction take place" },
      { id: "5.5", title: "5.5 Aerobic and Anaerobic Respiration" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Equilibria",
    items: [
      { id: "6.1", title: "6.1 Reversible and irreversible Changes" },
      { id: "6.2", title: "6.2 Dynamic Equilibrium" },
      { id: "6.3", title: "6.3 Changing the physical Condition of a Chemical Reaction" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Acid Base Chemistry",
    items: [
      { id: "7.1", title: "7.1 Acid and base" },
      { id: "7.2", title: "7.2 Different concepts of Acid and base's" },
      { id: "7.3", title: "7.3 Bronsted Lowry concepts of acids and bases" },
      { id: "7.4", title: "7.4 Properties of acids and bases" },
      { id: "7.5", title: "7.5 Acid Rain and it's effects" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 periodic Table and Periodicity",
    items: [
      { id: "8.1", title: "8.1 Modern Periodic Table" },
      { id: "8.2", title: "8.2 Salient Features of Modern Periodic Table" },
      { id: "8.3", title: "8.3 Similarities in the Chemical Properties of Elements in the Same Group" },
      { id: "8.4", title: "8.4 Variation of periodic Properties in Periods and Groups" },
      { id: "8.5", title: "8.5 Metallic Character and Reactivity" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9 Group Properties and Elements",
    items: [
      { id: "9.1", title: "9.1 Properties of Group 1 Elements" },
      { id: "9.2", title: "9.2 Properties of Group 17 Element" },
      { id: "9.3", title: "9.3 Group Properties of Transition elements" },
      { id: "9.4", title: "9.4 Properties of Noble Gases" },
      { id: "9.5", title: "9.5 Physical Properties of Metals and Non-metals" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10 Environmental Chemistry",
    items: [
      { id: "10.1", title: "10.1 Composition of Atmosphere" },
      { id: "10.2", title: "10.2 Table Pollutants Their Harmful Effects" },
      { id: "10.3", title: "10.3 Acid Rain" },
      { id: "10.4", title: "10.4 Global Warming (Greenhouse Effect)" },
      { id: "10.5", title: "10.5 Strategies to Reduce Environmental issues" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11 Hydrocarbon",
    items: [
      { id: "11.1", title: "11.1 Hydrocarbons" },
      { id: "11.2", title: "11.2 Alkanes" },
      { id: "11.3", title: "11.3 Preparation of Alkanes" },
      { id: "11.4", title: "11.4 Reeducation of Alkyl Halide" }
    ]
  },
  {
    id: "chap-12",
    title: "CHAP 12 Empirical Data and Collection and Analysis",
    items: [
      { id: "12.1", title: "12.1 SI units in chemistry" },
      { id: "12.2", title: "12.2 Tools and Technique to Manage Accuracy and Precision" },
      { id: "12.3", title: "12.3 Accuracy and Precision" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13 Laboratory and Practical Skills",
    items: [
      { id: "13.1", title: "13.1 Chemical Hazards in the Laboratory" },
      { id: "13.2", title: "13.2 Hazard Signs" },
      { id: "13.3", title: "13.3 Personal Protective Equipment (PPE) in the Laboratory" },
      { id: "13.4", title: "13.4 Location of fire Extinguisher" },
      { id: "13.5", title: "13.5 Emergency Situation in the Lab" }
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
