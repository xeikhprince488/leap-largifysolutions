"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { generatePDF } from "@/lib/generate-pdf"
import type { Question } from "@/types/questions"
import { toast } from "sonner"

interface PdfButtonProps {
  questions: Question[]
  metadata: {
    grade: string
    subject: string
    chapter: string[]
    topic: string
    paperNo: string
    date: string
    day: string
    timeAllowed: string
    totalMarks: string
    category: string
    sections: Array<{
      type: string
      heading: string
      count: number
      marks: number
    }>
  }
}

export function PdfButton({ questions, metadata }: PdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true)
      toast.loading("Generating PDF...")

      const result = await generatePDF(questions, metadata)

      if (result.success) {
        toast.success("PDF generated successfully")
      } else {
        toast.error("Failed to generate PDF")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Error generating PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleGeneratePDF} disabled={isGenerating} className="w-full md:w-auto">
      {isGenerating ? "Generating..." : "Generate PDF"}
    </Button>
  )
}

