'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1: Measurements",
    items: [
      { id: "1.1", title: "1.1 Physical Quantities" },
      { id: "1.2", title: "1.2 SI Units" },
      { id: "1.3", title: "1.3 Errors and Uncertainty" },
      { id: "1.4", title: "1.4 Significant Figures" },
      { id: "1.5", title: "1.5 Precision and Accuracy" },
      { id: "1.6", title: "1.6 Assessment of Total Uncertainty in the Final Result" },
      { id: "1.7", title: "1.7 Dimensions of Physical Quantities" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2: Vectors and Equilibrium",
    items: [
      { id: "2.1", title: "2.1 Basic Concepts of Vectors" },
      { id: "2.2", title: "2.2 Vector Addition by Rectangular Components" },
      { id: "2.3", title: "2.3 Product of Two Vectors" },
      { id: "2.4", title: "2.4 Torque" },
      { id: "2.5", title: "2.5 Equilibrium of Forces" },
      { id: "2.6", title: "2.6 Equilibrium of Torques" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3: Force and Motion",
    items: [
      { id: "3.1", title: "3.1 Displacement" },
      { id: "3.2", title: "3.2 Velocity" },
      { id: "3.3", title: "3.3 Acceleration" },
      { id: "3.4", title: "3.4 Velocity-Time Graph" },
      { id: "3.5", title: "3.5 Review of Equations of Uniformly Accelerated Motion" },
      { id: "3.6", title: "3.6 Newton's Laws of Motion" },
      { id: "3.7", title: "3.7 Momentum" },
      { id: "3.8", title: "3.8 Elastic and Inelastic Collisions" },
      { id: "3.9", title: "3.9 Force Due to Water Flow" },
      { id: "3.10", title: "3.10 Momentum and Explosive Force" },
      { id: "3.11", title: "3.11 Rocket Propulsion" },
      { id: "3.12", title: "3.12 Projectile Motion" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4: Work and Energy",
    items: [
      { id: "4.1", title: "4.1 Work Done by a Constant Force" },
      { id: "4.2", title: "4.2 Work Done by a Variable Force" },
      { id: "4.3", title: "4.3 Work Done by Gravitational Field" },
      { id: "4.4", title: "4.4 Power" },
      { id: "4.5", title: "4.5 Energy" },
      { id: "4.6", title: "4.6 Interconversion of Potential Energy and Kinetic Energy" },
      { id: "4.7", title: "4.7 Conservation of Energy" },
      { id: "4.8", title: "4.8 Non Conventional Energy Sources" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5: Circular Motion",
    items: [
      { id: "5.1", title: "5.1 Angular Displacement" },
      { id: "5.2", title: "5.2 Angular Velocity" },
      { id: "5.3", title: "5.3 Angular Acceleration" },
      { id: "5.4", title: "5.4 Relation Between Angular and Linear Velocities" },
      { id: "5.5", title: "5.5 Centripetal Force" },
      { id: "5.6", title: "5.6 Moment of Inertia" },
      { id: "5.7", title: "5.7 Angular Momentum" },
      { id: "5.8", title: "5.8 Law of Conservation of Angular Momentum" },
      { id: "5.9", title: "5.9 Rotational Kinetic Energy" },
      { id: "5.10", title: "5.10 Artificial Satellites" },
      { id: "5.11", title: "5.11 Real and Apparent Weight" },
      { id: "5.12", title: "5.12 Weightlessness in Satellites and Gravity Free System" },
      { id: "5.13", title: "5.13 Orbital Velocity" },
      { id: "5.14", title: "5.14 Artificial Gravity" },
      { id: "5.15", title: "5.15 Geostationary Orbits" },
      { id: "5.16", title: "5.16 Communication Satellites" },
      { id: "5.17", title: "5.17 Newton's and Einstein's Views of Gravitation" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6: Fluid Dynamics",
    items: [
      { id: "6.1", title: "6.1 Viscous Drag and Stokes' Law" },
      { id: "6.2", title: "6.2 Terminal Velocity" },
      { id: "6.3", title: "6.3 Fluid Flow" },
      { id: "6.4", title: "6.4 Equation of Continuity" },
      { id: "6.5", title: "6.5 Bernoulli's Equation" },
      { id: "6.6", title: "6.6 Applications of Bernoulli's Equation" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7: Oscillations",
    items: [
      { id: "7.1", title: "7.1 Simple Harmonic Motion" },
      { id: "7.2", title: "7.2 SHM and Uniform Circular Motion" },
      { id: "7.3", title: "7.3 Phase" },
      { id: "7.4", title: "7.4 A Horizontal Mass Spring System" },
      { id: "7.5", title: "7.5 Simple Pendulum" },
      { id: "7.6", title: "7.6 Energy Conservation in SHM" },
      { id: "7.7", title: "7.7 Free and Forces Oscillations" },
      { id: "7.8", title: "7.8 Resonance" },
      { id: "7.9", title: "7.9 Damped Oscillations" },
      { id: "7.10", title: "7.10 Sharpness of Resonance" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8: Waves",
    items: [
      { id: "8.1", title: "8.1 Progressive Waves" },
      { id: "8.2", title: "8.2 Periodic Waves" },
      { id: "8.3", title: "8.3 Speed of Sound in Air" },
      { id: "8.4", title: "8.4 Principle of Superposition" },
      { id: "8.5", title: "8.5 Interference" },
      { id: "8.6", title: "8.6 Beats" },
      { id: "8.7", title: "8.7 Reflection of Waves" },
      { id: "8.8", title: "8.8 Stationary Waves" },
      { id: "8.9", title: "8.9 Stationary Waves in a Stretched String" },
      { id: "8.10", title: "8.10 Stationary Waves in Air Columns" },
      { id: "8.11", title: "8.11 Doppler Effect" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9: Physical Optics",
    items: [
      { id: "9.1", title: "9.1 Wavefronts" },
      { id: "9.2", title: "9.2 Huygen's Principle" },
      { id: "9.3", title: "9.3 Interference of Light Waves" },
      { id: "9.4", title: "9.4 Young's Double Slit Experiment" },
      { id: "9.5", title: "9.5 Interference in Thin Films" },
      { id: "9.6", title: "9.6 Newton's Rings" },
      { id: "9.7", title: "9.7 Michelson's Interferometer" },
      { id: "9.8", title: "9.8 Diffraction of Light" },
      { id: "9.9", title: "9.9 Diffraction Due to a Narrow Slit" },
      { id: "9.10", title: "9.10 Diffraction Grating" },
      { id: "9.11", title: "9.11 Diffraction of X-Rays by Crystals" },
      { id: "9.12", title: "9.12 Polarization" }
    ]
  },
  {
    id: "chap-10",
    title: "CHAP 10: Optical Instruments",
    items: [
      { id: "10.1", title: "10.1 Least Distance of Distinct Vision" },
      { id: "10.2", title: "10.2 Magnifying Power and Resolving Power of Optical Instruments" },
      { id: "10.3", title: "10.3 Simple Microscope" },
      { id: "10.4", title: "10.4 Compound Microscope" },
      { id: "10.5", title: "10.5 Astronomical Telescope" },
      { id: "10.6", title: "10.6 Spectrometer" },
      { id: "10.7", title: "10.7 Speed of Light" },
      { id: "10.8", title: "10.8 Introduction to Fibre Optics" },
      { id: "10.9", title: "10.9 Fibre Optic Principles" },
      { id: "10.10", title: "10.10 Types of Optical Fibres" },
      { id: "10.11", title: "10.11 Signal Transmission and Conversion to Sound" },
      { id: "10.12", title: "10.12 Losses of Power" }
    ]
  },
  {
    id: "chap-11",
    title: "CHAP 11: Heat and Thermodynamics",
    items: [
      { id: "11.1", title: "11.1 Kinetic Theory of Gases" },
      { id: "11.2", title: "11.2 Internal Energy" },
      { id: "11.3", title: "11.3 Work and Heat" },
      { id: "11.4", title: "11.4 First law of Thermodynamics" },
      { id: "11.5", title: "11.5 Molar Specific Heats of a Gas" },
      { id: "11.6", title: "11.6 Reversible and Irreversible Processes" },
      { id: "11.7", title: "11.7 Heat Engine" },
      { id: "11.8", title: "11.8 Second law of Thermodynamics" },
      { id: "11.9", title: "11.9 Carnot Engine and Carnot's Theorem" },
      { id: "11.10", title: "11.10 Thermodynamic Scale Temperature" },
      { id: "11.11", title: "11.11 Petrol Engine" },
      { id: "11.12", title: "11.12 Entropy" },
      { id: "11.13", title: "11.13 Environmental Crisis as Entropy Crisis" }
    ]
  }
]

export default function PhysicsChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/11th/physics/configure')
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
              <h1 className="text-2xl font-bold">Select Chapters - Physics (11th)</h1>
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
