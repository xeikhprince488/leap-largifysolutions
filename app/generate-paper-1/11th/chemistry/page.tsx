'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Basic Concepts",
    items: [
      { id: "1.1", title: "1.1 Atom" },
      { id: "1.2", title: "1.2 Relative Atomic Mass" },
      { id: "1.3", title: "1.3 Isotopes" },
      { id: "1.4", title: "1.4 Analysis of a Compound-Empirical and Molecular Formulas" },
      { id: "1.5", title: "1.5 Concept of Mole" },
      { id: "1.6", title: "1.6 Stoichiometry" },
      { id: "1.7", title: "1.7 Limiting Reactant" },
      { id: "1.8", title: "1.8 Yield" },
      { id: "1.9", title: "1.9 Exercise" },
      { id: "1.10", title: "1.10 Past Papers" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Experimental Techniques in Chemistry",
    items: [
      { id: "2.1", title: "2.1 Filtration" },
      { id: "2.2", title: "2.2 Crystallization" },
      { id: "2.3", title: "2.3 Sublimation" },
      { id: "2.4", title: "2.4 Solvent Extraction" },
      { id: "2.5", title: "2.5 Chromatography" },
      { id: "2.6", title: "2.6 Exercise" },
      { id: "2.7", title: "2.7 Past Papers" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Gases",
    items: [
      { id: "3.1", title: "3.1 States of Matter" },
      { id: "3.2", title: "3.2 Gas Laws" },
      { id: "3.3", title: "3.3 General Gas Equation" },
      { id: "3.4", title: "3.4 Avogadro's Law" },
      { id: "3.5", title: "3.5 Dalton's Law of Partial Pressure" },
      { id: "3.6", title: "3.6 Diffusion and Effusion" },
      { id: "3.7", title: "3.7 Kinetic Molecular Theory of Gases" },
      { id: "3.8", title: "3.8 Kinetic Interpretation of Temperature" },
      { id: "3.9", title: "3.9 Liquefaction of Gases" },
      { id: "3.10", title: "3.10 Non-Ideal Behaviour of Gases" },
      { id: "3.11", title: "3.11 Plasma State" },
      { id: "3.12", title: "3.12 Exercise" },
      { id: "3.13", title: "3.13 Past Papers" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Liquids and Solids",
    items: [
      { id: "4.1", title: "4.1 Introduction & Intermolecular Forces" },
      { id: "4.2", title: "4.2 Evaporation" },
      { id: "4.3", title: "4.3 Liquid Crystals" },
      { id: "4.4", title: "4.4 Solids" },
      { id: "4.5", title: "4.5 Crystal Lattice" },
      { id: "4.6", title: "4.6 Crystals and Their Classification" },
      { id: "4.7", title: "4.7 Classification of Solids" },
      { id: "4.8", title: "4.8 Determination of Avogadro's Number (NA)" },
      { id: "4.9", title: "4.9 Exercise" },
      { id: "4.10", title: "4.10 Past Papers" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Atomic Structure",
    items: [
      { id: "5.1", title: "5.1 Sub-Atomic Particles of Atom" },
      { id: "5.2", title: "5.2 Rutherford's Model of Atom (Discovery of Nucleus)" },
      { id: "5.3", title: "5.3 Planck's Quantum Theory" },
      { id: "5.4", title: "5.4 Bohr's Model of Atom" },
      { id: "5.5", title: "5.5 Spectrum" },
      { id: "5.6", title: "5.6 X-Rays and Atomic Number" },
      { id: "5.7", title: "5.7 Wave-Particle Nature of Matter (Dual Nature Matter)" },
      { id: "5.8", title: "5.8 Heisenberg's Uncertainty Principle" },
      { id: "5.9", title: "5.9 Electronic Distribution" },
      { id: "5.10", title: "5.10 Exercise" },
      { id: "5.11", title: "5.11 Past Papers" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Chemical Bonding",
    items: [
      { id: "6.1", title: "6.1 Introduction" },
      { id: "6.2", title: "6.2 Atomic Sizes" },
      { id: "6.3", title: "6.3 Ionization Energy Electron Affinity and Electronegativity" },
      { id: "6.4", title: "6.4 Types of Bonds" },
      { id: "6.5", title: "6.5 Bond Energy, Bond Length and Dipole Moment" },
      { id: "6.6", title: "6.6 The Effect of Bonds on the Properties of Compounds" },
      { id: "6.7", title: "6.7 Exercise" },
      { id: "6.8", title: "6.8 Past Papers" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Thermochemistry",
    items: [
      { id: "7.1", title: "7.1 Introduction & Spontaneous and Non-Spontaneous Reactions" },
      { id: "7.2", title: "7.2 System, Surrounding and State Function" },
      { id: "7.3", title: "7.3 Internal Energy and First Law of Thermodynamics" },
      { id: "7.4", title: "7.4 Enthalpy" },
      { id: "7.5", title: "7.5 Hess's Law of Constant Heat Summation" },
      { id: "7.6", title: "7.6 Exercise" },
      { id: "7.7", title: "7.7 Past Papers" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Chemical Equilibrium",
    items: [
      { id: "8.1", title: "8.1 Reversible and Irreversible Reactions" },
      { id: "8.2", title: "8.2 Applications of Chemical Equilibrium in Industry" },
      { id: "8.3", title: "8.3 Ionic Product of Water" },
      { id: "8.4", title: "8.4 Ionization Constants of Acids (Ka)" },
      { id: "8.5", title: "8.5 Ionization Constant of Bases (Kb)" },
      { id: "8.6", title: "8.6 Lowry Bronsted Acid and Base Concept" },
      { id: "8.7", title: "8.7 Common Ion Effect" },
      { id: "8.8", title: "8.8 Buffer Solutions" },
      { id: "8.9", title: "8.9 Equilibria of Slightly Soluble Ionic Compounds (Solubility Product)" },
      { id: "8.10", title: "8.10 Exercise" },
      { id: "8.11", title: "8.11 Past Papers" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9 Solutions",
    items: [
      { id: "9.1", title: "9.1 Concept of A Solution" },
      { id: "9.2", title: "9.2 Types of Solutions" },
      { id: "9.3", title: "9.3 Ideal and Non-Ideal Solutions" },
      { id: "9.4", title: "9.4 Vapour Pressures Liquid-Liquid Solutions" },
      { id: "9.5", title: "9.5 Solubility and Solubility Curves" },
      { id: "9.6", title: "9.6 Colligative Properties of Solutions" },
      { id: "9.7", title: "9.7 Energetics of Solution" },
      { id: "9.8", title: "9.8 Hydration and Hydrolysis" },
      { id: "9.9", title: "9.9 Exercise" },
      { id: "9.10", title: "9.10 Past Papers" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10 Electrochemistry",
    items: [
      { id: "10.1", title: "10.1 Introduction & Oxidation State and Balancing of Redox Equations" },
      { id: "10.2", title: "10.2 Electrolytic Conduction" },
      { id: "10.3", title: "10.3 Electrode Potential" },
      { id: "10.4", title: "10.4 The Electrochemical Series" },
      { id: "10.5", title: "10.5 Modern Batteries and Fuel Cells" },
      { id: "10.6", title: "10.6 Exercise" },
      { id: "10.7", title: "10.7 Past Papers" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11 Reaction Kinetics",
    items: [
      { id: "11.1", title: "11.1 Introduction & Rate of Reaction" },
      { id: "11.2", title: "11.2 Determination of The Rate of A Chemical Reaction" },
      { id: "11.3", title: "11.3 Energy of Activation" },
      { id: "11.4", title: "11.4 Finding the Order of Reaction" },
      { id: "11.5", title: "11.5 Factors Affecting Rates of Reactions" },
      { id: "11.6", title: "11.6 Catalysis" },
      { id: "11.7", title: "11.7 Exercise" },
      { id: "11.8", title: "11.8 Past Papers" }
    ]
  }
]

export default function ChemistryChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/chemistry/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Chemistry (11th)</h1>
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
