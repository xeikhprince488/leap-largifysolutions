'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-10",
    title: "CHAP 10: Simple Harmonic Motion and Waves",
    items: [
      { id: "10.1", title: "10.1 Simple Harmonic Motion (SHM)" },
      { id: "10.2", title: "10.2 Damped Oscillations" },
      { id: "10.3", title: "10.3 Wave Motion" },
      { id: "10.4", title: "10.4 Types of Mechanical Waves" },
      { id: "10.5", title: "10.5 Ripple Tank" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11: Sound",
    items: [
      { id: "11.1", title: "11.1 Sound Waves" },
      { id: "11.2", title: "11.2 Characteristics of Sound" },
      { id: "11.3", title: "11.3 Reflection (Echo) of Sound" },
      { id: "11.4", title: "11.4 Speed of Sound" },
      { id: "11.5", title: "11.5 Noise Pollution" },
      { id: "11.6", title: "11.6 Importance of Acoustics" },
      { id: "11.7", title: "11.7 Audible Frequency Range" },
      { id: "11.8", title: "11.8 Ultrasound" }
    ]
  },
  {
    id: "chap-12",
    title: "CHAP 12: Geometrical Optics",
    items: [
      { id: "12.1", title: "12.1 Reflection of Light" },
      { id: "12.2", title: "12.2 Spherical Mirrors" },
      { id: "12.3", title: "12.3 Image Location by Spherical Mirror Formula" },
      { id: "12.4", title: "12.4 Refraction of Light" },
      { id: "12.5", title: "12.5 Total Internal Reflection" },
      { id: "12.6", title: "12.6 Applications of Total Internal Reflection" },
      { id: "12.7", title: "12.7 Refraction Through Prism" },
      { id: "12.8", title: "12.8 Lenses" },
      { id: "12.9", title: "12.9 Image Formation by Lenses" },
      { id: "12.10", title: "12.10 Image Location by Lens Equation" },
      { id: "12.11", title: "12.11 Uses of Lenses" },
      { id: "12.12", title: "12.12 Simple Microscope" },
      { id: "12.13", title: "12.13 Compound Microscope" },
      { id: "12.14", title: "12.14 Telescope" },
      { id: "12.15", title: "12.15 The Human Eye" },
      { id: "12.16", title: "12.16 Defects of Vision" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13: Electrostatics",
    items: [
      { id: "13.1", title: "13.1 Production of Electric Charges" },
      { id: "13.2", title: "13.2 Electrostatic Induction" },
      { id: "13.3", title: "13.3 Electroscope" },
      { id: "13.4", title: "13.4 Coulomb's Law" },
      { id: "13.5", title: "13.5 Electric Field and Electric Field Intensity" },
      { id: "13.6", title: "13.6 Electrostatic Potential" },
      { id: "13.7", title: "13.7 Capacitors and Capacitance" },
      { id: "13.8", title: "13.8 Different Types of Capacitors" },
      { id: "13.9", title: "13.9 Applications of Electrostatics" },
      { id: "13.10", title: "13.10 Some Hazards of Static Electricity" }
    ]
  },
  {
    id: "chap-14",
    title: "CHAP 14: Current Electricity",
    items: [
      { id: "14.1", title: "14.1 Electric Current" },
      { id: "14.2", title: "14.2 Potential Difference" },
      { id: "14.3", title: "14.3 Electromotive Force (e.m.f)" },
      { id: "14.4", title: "14.4 OHM's Law" },
      { id: "14.5", title: "14.5 Characteristics of Ohmic and Non Ohmic Conductors" },
      { id: "14.6", title: "14.6 Factors Affecting Resistance" },
      { id: "14.7", title: "14.7 Conductors" },
      { id: "14.8", title: "14.8 Insulators" },
      { id: "14.9", title: "14.9 Combination of Resistors" },
      { id: "14.10", title: "14.10 Electrical Energy and Joule's Law" },
      { id: "14.11", title: "14.11 Electric Power" },
      { id: "14.12", title: "14.12 Direct Current and Alternating Current" },
      { id: "14.13", title: "14.13 Hazards of Electricity" },
      { id: "14.14", title: "14.14 Safe Use of Electricity in Homes" }
    ]
  },
  {
    id: "chap-15",
    title: "CHAP 15: Electromagnetism",
    items: [
      { id: "15.1", title: "15.1 Magnetic Effects of a Steady Current" },
      { id: "15.2", title: "15.2 Force on a Current-Carrying Conductor Placed in Magnetic Field" },
      { id: "15.3", title: "15.3 Turning Effect on a Current-Carrying Coil in a Magnetic Field" },
      { id: "15.4", title: "15.4 D.C.Motor" },
      { id: "15.5", title: "15.5 Electromagnetic Induction" },
      { id: "15.6", title: "15.6 Direction of Induced e.m.f.-Lenz's Law" },
      { id: "15.7", title: "15.7 A.C.Generator" },
      { id: "15.8", title: "15.8 Mutual Induction" },
      { id: "15.9", title: "15.9 Transformer" },
      { id: "15.10", title: "15.10 High Voltage Transmission" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16: Basic Electronics",
    items: [
      { id: "16.1", title: "16.1 Thermionic Emission" },
      { id: "16.2", title: "16.2 Investigating the Properties of Electrons" },
      { id: "16.3", title: "16.3 Cathode-Ray Oscilloscope (C.R.O)" },
      { id: "16.4", title: "16.4 Analogue and Digital Electronics" },
      { id: "16.5", title: "16.5 Basic Operations of Digital Electronics Logic Gates" },
      { id: "16.6", title: "16.6 AND Operation" },
      { id: "16.7", title: "16.7 OR Operation" },
      { id: "16.8", title: "16.8 NOT Operation" },
      { id: "16.9", title: "16.9 NAND Gate" },
      { id: "16.10", title: "16.10 NOR Gate" },
      { id: "16.11", title: "16.11 Uses of Logic Gates" }
    ]
  },
  {
    id: "chap-17",
    title: "CHAP 17: Information and Communication Technology",
    items: [
      { id: "17.1", title: "17.1 Information and Communication Technology" },
      { id: "17.2", title: "17.2 Components of Computer Based Information System (CBIS)" },
      { id: "17.3", title: "17.3 Flow of Information" },
      { id: "17.4", title: "17.4 Transmission of Electrical Signal Through Wires" },
      { id: "17.5", title: "17.5 Transmissions of Radio Waves Through Space" },
      { id: "17.6", title: "17.6 Transmission of Light Signals Through Optical Fibres" },
      { id: "17.7", title: "17.7 Information Storage Devices" },
      { id: "17.8", title: "17.8 Applications of Word Processing" },
      { id: "17.9", title: "17.9 Internet" },
      { id: "17.10", title: "17.10 Risks of ICT to Society and the Environment" }
    ]
  },
];
export default function PhysicsChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/10th/physics/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Physics (10th)</h1>
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
