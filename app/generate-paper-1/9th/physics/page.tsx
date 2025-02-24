'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const physicsChapters = [
  {
    id: "chapter-1",
    title: "Chapter #1 Physical Quantities and Measurements",
    items: [
      { id: "1.1", title: "1.1 Physical and Non-Physical Quantities" },
      { id: "1.2", title: "1.2 Base and Derived Physical Quantities" },
      { id: "1.3", title: "1.3 International System of Units" },
      { id: "1.4", title: "1.4 Scientific Notation" },
      { id: "1.5", title: "1.5 Length Measuring Instrument" },
      { id: "1.6", title: "1.6 Mass Measuring Instrument" },
      { id: "1.7", title: "1.7 Time Measuring Instrument" },
      { id: "1.8", title: "1.8 Volume Measuring Instrument" },
      { id: "1.9", title: "1.9 Errors in Measurements" },
      { id: "1.10", title: "1.10 Uncertainty in Measurements" },
      { id: "1.11", title: "1.11 Significant Figures" },
      { id: "1.12", title: "1.12 Precision and Accuracy" },
      { id: "1.13", title: "1.13 Rounding Off the Digits" }
    ]
  },
  {
    id: "chapter-2",
    title: "Chapter #2 Kinematics",
    items: [
      { id: "2.1", title: "2.1 Scalar and Vectors" },
      { id: "2.2", title: "2.2 Rest and Motion" },
      { id: "2.3", title: "2.3 Types of Motion" },
      { id: "2.4", title: "2.4 Distance and Displacement" },
      { id: "2.5", title: "2.5 Speed and Velocity" },
      { id: "2.6", title: "2.6 Acceleration" },
      { id: "2.7", title: "2.7 Graphical Analysis of Motion" },
      { id: "2.8", title: "2.8 Gradient of a Distance-Time Graph" },
      { id: "2.9", title: "2.9 Speed-Time Graph" },
      { id: "2.10", title: "2.10 Gradient of a Speed-Time Graph" },
      { id: "2.11", title: "2.11 Area Under Speed-Time Graph" },
      { id: "2.12", title: "2.12 Solving Problems for Motion Under Gravity" },
      { id: "2.13", title: "2.13 Free Fall Acceleration" }
    ]
  },
  {
    id: "chapter-3",
    title: "Chapter #3 Dynamics",
    items: [
      { id: "3.1", title: "3.1 Concept of Force" },
      { id: "3.2", title: "3.2 Fundamental Forces" },
      { id: "3.3", title: "3.3 Forces in a Free-Body Diagram" },
      { id: "3.4", title: "3.4 Newton's Laws of Motion" },
      { id: "3.5", title: "3.5 Limitations of Newton's Laws of Motion" },
      { id: "3.6", title: "3.6 Mass and Weight" },
      { id: "3.7", title: "3.7 Mechanical and Electronic Balances" },
      { id: "3.8", title: "3.8 Friction" },
      { id: "3.9", title: "3.9 Momentum and Impulse" },
      { id: "3.10", title: "3.10 Principle of Conservation of Momentum" }
    ]
  },
  {
    id: "chapter-4",
    title: "Chapter #4 Turning Effects of Force",
    items: [
      { id: "4.1", title: "4.1 Like and Unlike Parallel Forces" },
      { id: "4.2", title: "4.2 Addition of Force" },
      { id: "4.3", title: "4.3 Turning Effect of a Force" },
      { id: "4.4", title: "4.4 Resolution of Vectors" },
      { id: "4.5", title: "4.5 Determination of a Force from its Perpendicular Components" },
      { id: "4.6", title: "4.6 Principle of Moments" },
      { id: "4.7", title: "4.7 Centre of Gravity and Centre of Mass" },
      { id: "4.8", title: "4.8 Equilibrium" },
      { id: "4.9", title: "4.9 Conditions of Equilibrium" },
      { id: "4.10", title: "4.10 States of Equilibrium" },
      { id: "4.11", title: "4.11 Improvement of Stability" },
      { id: "4.12", title: "4.12 Application of Stability in Real Life" },
      { id: "4.13", title: "4.13 Centripetal Force" }
    ]
  },
  {
    id: "chapter-5",
    title: "Chapter #5 Work, Energy and Power",
    items: [
      { id: "5.1", title: "5.1 Work" },
      { id: "5.2", title: "5.2 Energy" },
      { id: "5.3", title: "5.3 Conservation of Energy" },
      { id: "5.4", title: "5.4 Sources of Energy" },
      { id: "5.5", title: "5.5 Renewable and Non-Renewable Sources" },
      { id: "5.6", title: "5.6 The Advantages and Disadvantages of Methods of Energy Production" },
      { id: "5.7", title: "5.7 Power" },
      { id: "5.8", title: "5.8 Efficiency" }
    ]
  },
  {
    id: "chapter-6",
    title: "Chapter #6 Mechanical Properties of Matter",
    items: [
      { id: "6.1", title: "6.1 Deformation of Solids" },
      { id: "6.2", title: "6.2 Hooke's Law" },
      { id: "6.3", title: "6.3 Density" },
      { id: "6.4", title: "6.4 Pressure" },
      { id: "6.5", title: "6.5 Pressure in Liquids" },
      { id: "6.6", title: "6.6 Atmospheric Pressure" },
      { id: "6.7", title: "6.7 Measurement of Atmospheric Pressure" },
      { id: "6.8", title: "6.8 Measurement of Pressure by Manometer" },
      { id: "6.9", title: "6.9 Pascal's Law" }
    ]
  },
  {
    id: "chapter-7",
    title: "Chapter #7 Thermal Properties of Matter",
    items: [
      { id: "7.1", title: "7.1 Kinetic Molecular Theory of Matter" },
      { id: "7.2", title: "7.2 Temperature and Heat" },
      { id: "7.3", title: "7.3 Thermometers" },
      { id: "7.4", title: "7.4 Sensitivity, Range and Linearity of Thermometers" },
      { id: "7.5", title: "7.5 Structure of a Liquid-in-Glass Thermometer" }
    ]
  },
  {
    id: "chapter-8",
    title: "Chapter #8 Magnetic",
    items: [
      { id: "8.1", title: "8.1 Magnetic Materials" },
      { id: "8.2", title: "8.2 Properties of Magnetic" },
      { id: "8.3", title: "8.3 Induced Magnetism" },
      { id: "8.4", title: "8.4 Temporary and Permanent Magnets" },
      { id: "8.5", title: "8.5 Magnetic Fields" },
      { id: "8.6", title: "8.6 Uses of Permanent Magnets" },
      { id: "8.7", title: "8.7 Electromagnets" },
      { id: "8.8", title: "8.8 Domain Theory of Magnetism" },
      { id: "8.9", title: "8.9 Magnetization and Demagnetization" },
      { id: "8.10", title: "8.10 Application of Magnetics in Recording Technology" },
      { id: "8.11", title: "8.11 Soft Iron as Magnetic Shield" }
    ]
  },
  {
    id: "chapter-9",
    title: "Chapter #9 Nature of Science",
    items: [
      { id: "9.1", title: "9.1 Scope of Physics" },
      { id: "9.2", title: "9.2 Branches of Physics" },
      { id: "9.3", title: "9.3 Interdisciplinary Nature of Physics" },
      { id: "9.4", title: "9.4 Interdisciplinary Research" },
      { id: "9.5", title: "9.5 Scientific Method" },
      { id: "9.6", title: "9.6 Scientific Base of Technologies and Engineering" }
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
