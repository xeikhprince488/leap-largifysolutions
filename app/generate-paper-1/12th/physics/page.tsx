'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-12",
    title: "CHAP 12 Electrostatics",
    items: [
      { id: "12.1", title: "12.1 Coulomb's Law" },
      { id: "12.2", title: "12.2 Fields of Force" },
      { id: "12.3", title: "12.3 Electric Field Lines" },
      { id: "12.4", title: "12.4 Applications of Electrostatics" },
      { id: "12.5", title: "12.5 Electric Flux" },
      { id: "12.6", title: "12.6 Electric Flux Through a Surface Enclosing a Charge" },
      { id: "12.7", title: "12.7 Gauss's Law" },
      { id: "12.8", title: "12.8 Applications of Gauss's Law" },
      { id: "12.9", title: "12.9 Electric Potential" },
      { id: "12.10", title: "12.10 Electron Volt" },
      { id: "12.11", title: "12.11 Electric and Gravitational Forces (A Comparison)" },
      { id: "12.12", title: "12.12 Charge on an Electron by Millikan's Method" },
      { id: "12.13", title: "12.13 Capacitor" },
      { id: "12.14", title: "12.14 Capacitance of a Parallel Plate Capacitor" },
      { id: "12.15", title: "12.15 Electric Polarization of Dielectrics" },
      { id: "12.16", title: "12.16 Energy Stored in a Capacitor" },
      { id: "12.17", title: "12.17 Charging and Discharging a Capacitor" }
    ]
  },
  {
    id: "chap-13",
    title: "CHAP 13 Current Electricity",
    items: [
      { id: "13.1", title: "13.1 Electric Current" },
      { id: "13.2", title: "13.2 Source of Current" },
      { id: "13.3", title: "13.3 Effects of Current" },
      { id: "13.4", title: "13.4 Ohm's Law" },
      { id: "13.5", title: "13.5 Resistivity and its Dependence upon Temperature" },
      { id: "13.6", title: "13.6 Colour Code for Carbon Resistances" },
      { id: "13.7", title: "13.7 Electrical Power and Power Dissipation in Resistors" },
      { id: "13.8", title: "13.8 Electromotive Force (EMF) and Potential Difference" },
      { id: "13.9", title: "13.9 Kirchhoff's Rules" },
      { id: "13.10", title: "13.10 Wheatstone Bridge" },
      { id: "13.11", title: "13.11 Potentiometer" }
    ]
  },
  {
    id: "chap-14",
    title: "CHAP 14 Electromagnetism",
    items: [
      { id: "14.1", title: "14.1 Magnetic Field Due to Current in a Long Straight Wire" },
      { id: "14.2", title: "14.2 Force on a Current Carrying Conductor in a Uniform Magnetic Field" },
      { id: "14.3", title: "14.3 Magnetic Flux and Flux Density" },
      { id: "14.4", title: "14.4 Ampere's Law and Determination of Flux Density B" },
      { id: "14.5", title: "14.5 Force on a Moving Charge in a Magnetic Field" },
      { id: "14.6", title: "14.6 Motion of Charged Particle in an Electric and Magnetic Field" },
      { id: "14.7", title: "14.7 Determination of e/m of an Electron" },
      { id: "14.8", title: "14.8 Cathode Ray Oscilloscope" },
      { id: "14.9", title: "14.9 Torque on a Current Carrying Coil" },
      { id: "14.10", title: "14.10 Galvanometer" },
      { id: "14.11", title: "14.11 Avo Meter - Multimeter" }
    ]
  },
  {
    id: "chap-15",
    title: "CHAP 15 Electromagnetic Induction",
    items: [
      { id: "15.1", title: "15.1 Induced EMF and Induced Current" },
      { id: "15.2", title: "15.2 Motional EMF" },
      { id: "15.3", title: "15.3 Faraday's Law and Induced EMF" },
      { id: "15.4", title: "15.4 Lenz's Law and Direction of Induced EMF" },
      { id: "15.5", title: "15.5 Mutual Induction" },
      { id: "15.6", title: "15.6 Self Induction" },
      { id: "15.7", title: "15.7 Energy Stored in an Inductor" },
      { id: "15.8", title: "15.8 Alternating Current Generator" },
      { id: "15.9", title: "15.9 D.C. Generator" },
      { id: "15.10", title: "15.10 Back Motor Effect in Generators" },
      { id: "15.11", title: "15.11 D.C. Motor" },
      { id: "15.12", title: "15.12 Back EMF Effect in Motors" },
      { id: "15.13", title: "15.13 Transformer" }
    ]
  },
  {
    id: "chap-16",
    title: "CHAP 16: Alternating Current",
    items: [
      { id: "16.1", title: "16.1 Alternating Current" },
      { id: "16.2", title: "16.2 A.C. Circuits" },
      { id: "16.3", title: "16.3 A.C. Through a Resistor" },
      { id: "16.4", title: "16.4 A.C. Through a Capacitor" },
      { id: "16.5", title: "16.5 A.C. Through an Inductor" },
      { id: "16.6", title: "16.6 Impedance" },
      { id: "16.7", title: "16.7 R - C and R - L Series Circuits" },
      { id: "16.8", title: "16.8 Power in A.C. Circuits" },
      { id: "16.9", title: "16.9 Series Resonance Circuit" },
      { id: "16.10", title: "16.10 Parallel Resonance Circuit" },
      { id: "16.11", title: "16.11 Three Phase A.C. Supply" },
      { id: "16.12", title: "16.12 Principle of Metal Detectors" },
      { id: "16.13", title: "16.13 Choke" },
      { id: "16.14", title: "16.14 Electromagnetic Waves" },
      { id: "16.15", title: "16.15 Principle of Generation, Transmission and Reception of Electromagnetic Waves" },
      { id: "16.16", title: "16.16 Modulation" }
    ]
  },
  {
    id: "chap-17",
    title: "CHAP 17: Physics of Solids",
    items: [
      { id: "17.1", title: "17.1 Classification of Solids" },
      { id: "17.2", title: "17.2 Mechanical Properties of Solids" },
      { id: "17.3", title: "17.3 Electrical Properties of Solids" },
      { id: "17.4", title: "17.4 Superconductors" },
      { id: "17.5", title: "17.5 Magnetic Properties of Solids" }
    ]
  },
  {
    id: "chap-18",
    title: "CHAP 18: Electronics",
    items: [
      { id: "18.1", title: "18.1 Brief Review of p-n Junction and its Characteristics" },
      { id: "18.2", title: "18.2 Rectification" },
      { id: "18.3", title: "18.3 Specially Designed p-n Junctions" },
      { id: "18.4", title: "18.4 Transistors" },
      { id: "18.5", title: "18.5 Transistor as an Amplifier" },
      { id: "18.6", title: "18.6 Transistor as a Switch" },
      { id: "18.7", title: "18.7 Operational Amplifier" },
      { id: "18.8", title: "18.8 OP - AMP as Inverting Amplifier" },
      { id: "18.9", title: "18.9 OP - AMP as Non-Inverting Amplifier" },
      { id: "18.10", title: "18.10 OP - AMP as a Comparator" },
      { id: "18.11", title: "18.11 Comparator as a Night Switch" },
      { id: "18.12", title: "18.12 Digital System" },
      { id: "18.13", title: "18.13 Fundamental Logic Gates" },
      { id: "18.14", title: "18.14 Other Logic Gates" },
      { id: "18.15", title: "18.15 Applications of Gates in Control Systems" }
    ]
  },
  {
    id: "chap-19",
    title: "CHAP 19: Dawn of Modern Physics",
    items: [
      { id: "19.1", title: "19.1 Relative Motion" },
      { id: "19.2", title: "19.2 Frames of Reference" },
      { id: "19.3", title: "19.3 Special Theory of Relativity" },
      { id: "19.4", title: "19.4 Black Body Radiation" },
      { id: "19.5", title: "19.5 Interaction of Electromagnetic Radiation with Matter" },
      { id: "19.6", title: "19.6 Annihilation of Matter" },
      { id: "19.7", title: "19.7 Wave Nature of Particles" },
      { id: "19.8", title: "19.8 Uncertainty Principle" }
    ]
  },
  {
    id: "chap-20",
    title: "CHAP 20: Atomic Spectra",
    items: [
      { id: "20.1", title: "20.1 Atomic Spectra" },
      { id: "20.2", title: "20.2 Bohr's Model of the Hydrogen Atom" },
      { id: "20.3", title: "20.3 Inner Shell Transitions and Characteristic X-Rays" },
      { id: "20.4", title: "20.4 Uncertainty within the Atom" },
      { id: "20.5", title: "20.5 Laser" }
    ]
  },
  {
    id: "chap-21",
    title: "CHAP 21: Nuclear Physics",
    items: [
      { id: "21.1", title: "21.1 Atomic Nucleus" },
      { id: "21.2", title: "21.2 Isotopes" },
      { id: "21.3", title: "21.3 Mass Defect and Binding Energy" },
      { id: "21.4", title: "21.4 Radioactivity" },
      { id: "21.5", title: "21.5 Half Life" },
      { id: "21.6", title: "21.6 Interaction of Radiation with Matter" },
      { id: "21.7", title: "21.7 Radiation Detectors" },
      { id: "21.8", title: "21.8 Nuclear Reactions" },
      { id: "21.9", title: "21.9 Nuclear Fission" },
      { id: "21.10", title: "21.10 Fusion Reaction" },
      { id: "21.11", title: "21.11 Radiation Exposure" },
      { id: "21.12", title: "21.12 Biological Effects of Radiation" },
      { id: "21.13", title: "21.13 Biological and Medical Uses of Radiation" },
      { id: "21.14", title: "21.14 Basic Forces of Nature" },
      { id: "21.15", title: "21.15 Building Blocks of Matter" }
    ]
  },
]

export default function PhysicsChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/12th/physics/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Physics (12th)</h1>
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
