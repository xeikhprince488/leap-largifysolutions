'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const physicsChapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Physical Quantities and Measurement",
    items: [
      { id: "1.1", title: "1.1 Introduction to Physics" },
      { id: "1.2", title: "1.2 Physical Quantities" },
      { id: "1.3", title: "1.3 International System of Units" },
      { id: "1.4", title: "1.4 Prefixes" },
      { id: "1.5", title: "1.5 Scientific Notation" },
      { id: "1.6", title: "1.6 Measuring Instruments" },
      { id: "1.7", title: "1.7 Significant Figures" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Kinematics",
    items: [
      { id: "2.1", title: "2.1 Rest and Motion" },
      { id: "2.2", title: "2.2 Types of Motion" },
      { id: "2.3", title: "2.3 Scalars and Vectors" },
      { id: "2.4", title: "2.4 Terms Associated with Motion" },
      { id: "2.5", title: "2.5 Graphical Analysis of Motion" },
      { id: "2.6", title: "2.6 Equations of Motion" },
      { id: "2.7", title: "2.7 Motion of Freely Falling Bodies" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Dynamics",
    items: [
      { id: "3.1", title: "3.1 Force, Inertia and Momentum" },
      { id: "3.2", title: "3.2 Newton's Laws of Motion" },
      { id: "3.3", title: "3.3 Friction" },
      { id: "3.4", title: "3.4 Uniform Circular Motion" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Turning Effect of Forces",
    items: [
      { id: "4.1", title: "4.1 Like and Unlike Parallel Forces" },
      { id: "4.2", title: "4.2 Resultant of Forces" },
      { id: "4.3", title: "4.3 Resolution of Forces" },
      { id: "4.4", title: "4.4 Torque or Moment of Force" },
      { id: "4.5", title: "4.5 Principle of Moments" },
      { id: "4.6", title: "4.6 Centre of Mass" },
      { id: "4.7", title: "4.7 Centre of Gravity" },
      { id: "4.8", title: "4.8 Couple" },
      { id: "4.9", title: "4.9 Equilibrium" },
      { id: "4.10", title: "4.10 Stability and Position of Centre of Mass" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Gravitation",
    items: [
      { id: "5.1", title: "5.1 Force of Gravitation" },
      { id: "5.2", title: "5.2 Mass of Earth" },
      { id: "5.3", title: "5.3 Variation of g with Altitude" },
      { id: "5.4", title: "5.4 Artificial Satellites" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Work and Energy",
    items: [
      { id: "6.1", title: "6.1 Work" },
      { id: "6.2", title: "6.2 Energy" },
      { id: "6.3", title: "6.3 Kinetic Energy" },
      { id: "6.4", title: "6.4 Potential Energy" },
      { id: "6.5", title: "6.5 Types of Energy" },
      { id: "6.6", title: "6.6 Interconversion of Energy" },
      { id: "6.7", title: "6.7 Major Sources of Energy" },
      { id: "6.8", title: "6.8 Efficiency" },
      { id: "6.9", title: "6.9 Power" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Properties of Matter",
    items: [
      { id: "7.1", title: "7.1 Kinetic Molecular Model of Matter" },
      { id: "7.2", title: "7.2 Density" },
      { id: "7.3", title: "7.3 Pressure" },
      { id: "7.4", title: "7.4 Atmospheric Pressure" },
      { id: "7.5", title: "7.5 Pressure in Liquids" },
      { id: "7.6", title: "7.6 Archimedes Principle" },
      { id: "7.7", title: "7.7 Principle of Floatation" },
      { id: "7.8", title: "7.8 Elasticity" },
      { id: "7.9", title: "7.9 Hook's Law" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Thermal Properties of Matter",
    items: [
      { id: "8.1", title: "8.1 Temperature and Heat" },
      { id: "8.2", title: "8.2 Thermometer" },
      { id: "8.3", title: "8.3 Specific Heat Capacity" },
      { id: "8.4", title: "8.4 Change of State" },
      { id: "8.5", title: "8.5 Latent Heat of Fusion" },
      { id: "8.6", title: "8.6 Latent Heat of Vaporization" },
      { id: "8.7", title: "8.7 The Evaporation" },
      { id: "8.8", title: "8.8 Thermal Expansion" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9 Transfer of Heat",
    items: [
      { id: "9.1", title: "9.1 Transfer of Heat" },
      { id: "9.2", title: "9.2 Conduction" },
      { id: "9.3", title: "9.3 Convection" },
      { id: "9.4", title: "9.4 Radiation" },
      { id: "9.5", title: "9.5 Applications and Consequences of Radiation" }
    ]
  }
]

export default function PhysicsChaptersPage() {
  const router = useRouter()
  
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/physics/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Physics (9th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={physicsChapters} onSelectionChange={handleSelectionChange} />
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
