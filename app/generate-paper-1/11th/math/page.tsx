'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mathChapters = [
  {
    id: "unit-1",
    title: "UNIT 1: Number System",
    items: [
      { id: "1.1", title: "1.1 EX : 1.1" },
      { id: "1.2", title: "1.2 EX : 1.2" },
      { id: "1.3", title: "1.3 EX : 1.3" }
    ]
  },
  {
    id: "unit-2",
    title: "UNIT 2: Sets, Functions and Groups",
    items: [
      { id: "2.1", title: "2.1 EX : 2.1" },
      { id: "2.2", title: "2.2 EX : 2.2" },
      { id: "2.3", title: "2.3 EX : 2.3" },
      { id: "2.4", title: "2.4 EX : 2.4" },
      { id: "2.5", title: "2.5 EX : 2.5" },
      { id: "2.6", title: "2.6 EX : 2.6" },
      { id: "2.7", title: "2.7 EX : 2.7" },
      { id: "2.8", title: "2.8 EX : 2.8" }
    ]
  },
  {
    id: "unit-3",
    title: "UNIT 3: Matrices and Determinants",
    items: [
      { id: "3.1", title: "3.1 EX : 3.1" },
      { id: "3.2", title: "3.2 EX : 3.2" },
      { id: "3.3", title: "3.3 EX : 3.3" },
      { id: "3.4", title: "3.4 EX : 3.4" },
      { id: "3.5", title: "3.5 EX : 3.5" }
    ]
  },
  {
    id: "unit-4",
    title: "UNIT 4: Quadratic Equation",
    items: [
      { id: "4.1", title: "4.1 EX : 4.1" },
      { id: "4.2", title: "4.2 EX : 4.2" },
      { id: "4.3", title: "4.3 EX : 4.3" },
      { id: "4.4", title: "4.4 EX : 4.4" },
      { id: "4.5", title: "4.5 EX : 4.5" },
      { id: "4.6", title: "4.6 EX : 4.6" },
      { id: "4.7", title: "4.7 EX : 4.7" },
      { id: "4.8", title: "4.8 EX : 4.8" },
      { id: "4.9", title: "4.9 EX : 4.9" },
      { id: "4.10", title: "4.10 EX : 4.10" }
    ]
  },
  {
    id: "unit-5",
    title: "UNIT 5: Partial Fraction",
    items: [
      { id: "5.1", title: "5.1 EX : 5.1" },
      { id: "5.2", title: "5.2 EX : 5.2" },
      { id: "5.3", title: "5.3 EX : 5.3" },
      { id: "5.4", title: "5.4 EX : 5.4" }
    ]
  },
  {
    id: "unit-6",
    title: "UNIT 6: Sequences and Series",
    items: [
      { id: "6.1", title: "6.1 EX : 6.1" },
      { id: "6.2", title: "6.2 EX : 6.2" },
      { id: "6.3", title: "6.3 EX : 6.3" },
      { id: "6.4", title: "6.4 EX : 6.4" },
      { id: "6.5", title: "6.5 EX : 6.5" },
      { id: "6.6", title: "6.6 EX : 6.6" },
      { id: "6.7", title: "6.7 EX : 6.7" },
      { id: "6.8", title: "6.8 EX : 6.8" },
      { id: "6.9", title: "6.9 EX : 6.9" },
      { id: "6.10", title: "6.10 EX : 6.10" },
      { id: "6.11", title: "6.11 EX : 6.11" }
    ]
  },
  {
    id: "unit-7",
    title: "UNIT 7: Permutation, Combination and Probability",
    items: [
      { id: "7.1", title: "7.1 EX : 7.1" },
      { id: "7.2", title: "7.2 EX : 7.2" },
      { id: "7.3", title: "7.3 EX : 7.3" },
      { id: "7.4", title: "7.4 EX : 7.4" },
      { id: "7.5", title: "7.5 EX : 7.5" },
      { id: "7.6", title: "7.6 EX : 7.6" },
      { id: "7.7", title: "7.7 EX : 7.7" },
      { id: "7.8", title: "7.8 EX : 7.8" }
    ]
  },
  {
    id: "unit-8",
    title: "UNIT 8: Mathematical Induction and Binomial Theorem",
    items: [
      { id: "8.1", title: "8.1 EX : 8.1" },
      { id: "8.2", title: "8.2 EX : 8.2" },
      { id: "8.3", title: "8.3 EX : 8.3" }
    ]
  },
  {
    id: "unit-9",
    title: "UNIT 9: Fundamentals of Trigonometry",
    items: [
      { id: "9.1", title: "9.1 EX : 9.1" },
      { id: "9.2", title: "9.2 EX : 9.2" },
      { id: "9.3", title: "9.3 EX : 9.3" },
      { id: "9.4", title: "9.4 EX : 9.4" }
    ]
  },
  {
    id: "unit-10",
    title: "UNIT 10: Trigonometric Identities",
    items: [
      { id: "10.1", title: "10.1 EX : 10.1" },
      { id: "10.2", title: "10.2 EX : 10.2" },
      { id: "10.3", title: "10.3 EX : 10.3" },
      { id: "10.4", title: "10.4 EX : 10.4" }
    ]
  },
  {
    id: "unit-11",
    title: "UNIT 11: Trigonometric Functions and their Graphs",
    items: [
      { id: "11.1", title: "11.1 EX : 11.1" },
      { id: "11.2", title: "11.2 EX : 11.2" }
    ]
  },
  {
    id: "unit-12",
    title: "UNIT 12: Application of Trigonometry",
    items: [
      { id: "12.1", title: "12.1 EX : 12.1" },
      { id: "12.2", title: "12.2 EX : 12.2" },
      { id: "12.3", title: "12.3 EX : 12.3" },
      { id: "12.4", title: "12.4 EX : 12.4" },
      { id: "12.5", title: "12.5 EX : 12.5" },
      { id: "12.6", title: "12.6 EX : 12.6" },
      { id: "12.7", title: "12.7 EX : 12.7" },
      { id: "12.8", title: "12.8 EX : 12.8" }
    ]
  },
  {
    id: "unit-13",
    title: "UNIT 13: Inverse Trigonometric Functions",
    items: [
      { id: "13.1", title: "13.1 EX : 13.1" },
      { id: "13.2", title: "13.2 EX : 13.2" }
    ]
  },
  {
    id: "unit-14",
    title: "UNIT 14: Solutions of Trigonometric Equations",
    items: [
      { id: "14.1", title: "14.1 EX : 14.1" }
    ]
  }
]

export default function MathChaptersPage() {
  const router = useRouter()

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">math Chapters</h1>
          <CheckboxTree items={mathChapters} />
          <Button
            variant="link"
            className="mt-4 text-sm"
            onClick={() => router.push('/next-page')}
          >
            Next Page
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
