"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuestionDisplay } from "@/components/question-display"
import { PaperLayout } from "@/components/paper-layout"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnswerKey } from "@/components/answer-key"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Search, Shuffle, Plus, Download, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { Question, QuestionConfig } from "@/types/questions"
import { Card, CardContent } from "@/components/ui/card"
import { HeaderDetailsDialog } from "@/components/header-details-dialog"
import { DownloadOptionsDialog } from "@/components/download-options-dialog"

export default function ConfigureQuestionsPage() {
  const [sections, setSections] = useState<QuestionConfig[]>([])
  const [currentSection, setCurrentSection] = useState<QuestionConfig>({
    type: "mcq",
    count: 1,
    marks: 1,
    heading: "",
  })
  const [ignoreQuestions, setIgnoreQuestions] = useState("0")
  const [blankLines, setBlankLines] = useState("0")
  const [dualMedium, setDualMedium] = useState(true)
  const [showPaper, setShowPaper] = useState(false)
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([])
  const [showHeaderDialog, setShowHeaderDialog] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const predefinedHeadings = [
    "درست جواب کا انتخاب کریں۔",
    "درج ذیل سوالات کے مختصر جوابات دیں۔",
    "درج ذیل سوالوں کے تفصیلی جوابات دیں۔",
    "درج ذیل حدیث مبارکہ کا ترجمہ تحریر کیجیے۔",
  ]
  const [selectedHeading, setSelectedHeading] = useState(predefinedHeadings[0])
  const [showPrintDialog, setShowPrintDialog] = useState(false)
  const [currentPdfData, setCurrentPdfData] = useState<string | null>(null)
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "word" | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const chaptersParam = params.get("chapters")
      if (chaptersParam) {
        setSelectedChapters(chaptersParam.split(","))
      }
    }
  }, [])

  useEffect(() => {
    if (showPaper) {
      setSelectedQuestions((prevQuestions) => [...prevQuestions])
    }
  }, [showPaper])

  useEffect(() => {
    console.log("showHeaderDialog changed:", showHeaderDialog)
  }, [showHeaderDialog])

  const totalMarks = sections.reduce((sum, section) => sum + section.count * section.marks, 0)

  const handleAddSection = () => {
    const heading = selectedHeading || prompt("Enter the heading for this section:")
    if (heading) {
      setSections([...sections, { ...currentSection, heading }])
      setCurrentSection({
        type: "mcq",
        count: 1,
        marks: 1,
        heading: "",
      })
    }
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleSearch = async () => {
    try {
      let allQuestions: Question[] = []

      for (const section of sections) {
        const response = await fetch("/api/fetch-questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "islamyat",
            grade: "9th",
            type: section.type,
            count: section.count,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch questions")
        }

        const fetchedQuestions = await response.json()
        console.log(`Fetched ${fetchedQuestions.length} ${section.type} questions`)

        const questionsWithMarks = fetchedQuestions.map((q: any) => ({
          ...q,
          marks: section.marks,
        }))

        allQuestions = [...allQuestions, ...questionsWithMarks]
      }

      setAvailableQuestions(allQuestions)
      setSelectedQuestions(allQuestions)
      setRandomQuestions([])

      const mcqCount = allQuestions.filter((q) => q.type === "mcq").length
      const shortCount = allQuestions.filter((q) => q.type === "short").length
      const longCount = allQuestions.filter((q) => q.type === "long").length

      toast.success(`Selected: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long`)
    } catch (error) {
      console.error("Error fetching questions:", error)
      toast.error("Failed to fetch questions")
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleRandomSelect = () => {
    if (!availableQuestions.length) return

    const questionsByType = availableQuestions.reduce(
      (acc, q) => {
        if (!acc[q.type]) acc[q.type] = []
        acc[q.type].push(q)
        return acc
      },
      {} as Record<string, Question[]>,
    )

    const requiredCounts = sections.reduce(
      (acc, section) => {
        if (!acc[section.type]) acc[section.type] = 0
        acc[section.type] += section.count
        return acc
      },
      {} as Record<string, number>,
    )

    let randomized: Question[] = []
    Object.entries(requiredCounts).forEach(([type, count]) => {
      const typeQuestions = questionsByType[type] || []
      const shuffled = shuffleArray(typeQuestions)
      randomized = [...randomized, ...shuffled.slice(0, count)]
    })

    setRandomQuestions(randomized)
  }

  const handleAddQuestions = () => {
    if (!randomQuestions.length) return

    const requiredCounts = sections.reduce(
      (acc, section) => {
        if (!acc[section.type]) acc[section.type] = 0
        acc[section.type] += section.count
        return acc
      },
      {} as Record<string, number>,
    )

    const finalSelectedQuestions = Object.entries(requiredCounts).flatMap(([type, count]) => {
      const typeQuestions = randomQuestions.filter((q) => q.type === type).slice(0, count)
      return typeQuestions
    })

    setSelectedQuestions(finalSelectedQuestions)
    setRandomQuestions([])

    const mcqCount = finalSelectedQuestions.filter((q) => q.type === "mcq").length
    const shortCount = finalSelectedQuestions.filter((q) => q.type === "short").length
    const longCount = finalSelectedQuestions.filter((q) => q.type === "long").length

    toast.success(`Added: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long questions`)
  }

  const handleClose = () => {
    setShowPaper(true)
  }

  const handleDownloadClick = () => {
    if (selectedQuestions.length === 0) {
      toast.error("No questions selected")
      return
    }

    const hasCorrectCounts = sections.every((section) => {
      const typeCount = selectedQuestions.filter((q) => q.type === section.type).length
      return typeCount === section.count
    })

    if (!hasCorrectCounts) {
      toast.error("Question counts do not match the requirements. Please reselect questions.")
      return
    }

    setShowDownloadOptions(true)
  }

  const handleFormatSelect = (format: "pdf" | "word") => {
    setSelectedFormat(format)
    setShowDownloadOptions(false)
    setShowHeaderDialog(true)
  }

  const handleHeaderDetailsSubmit = async (details: {
    class: string
    paperNo: string
    date: string
    timeAllowed: string
    subject: string
    totalMarks: string
    day: string
    syllabus: string
  }) => {
    try {
      setIsGeneratingPDF(true)
      const currentSelectedQuestions = [...selectedQuestions]

      if (selectedFormat === "pdf") {
        const { generatePDF } = await import("@/utils/generate-urdu-pdf")
        const result = await generatePDF(currentSelectedQuestions, {
          grade: details.class,
          subject: details.subject,
          chapter: [details.syllabus],
          paperNo: details.paperNo,
          date: details.date,
          day: details.day,
          timeAllowed: details.timeAllowed,
          totalMarks: details.totalMarks,
          category: "",
          sections,
          topic: "",
        })

        if (result.success && result.pdfData) {
          toast.success("PDF generated successfully")
          setShowHeaderDialog(false)

          if (typeof window !== "undefined") {
            const pdfWindow = window.open()
            if (pdfWindow) {
              pdfWindow.document.write(`<iframe width='100%' height='100%' src='${result.pdfData}'></iframe>`)
            }
          }

          setCurrentPdfData(result.pdfData)
          setShowPrintDialog(true)
        } else {
          throw new Error("PDF generation failed")
        }
      } else if (selectedFormat === "word") {
        const { generateUrduWord } = await import("@/utils/generate-urdu-word")
        const result = await generateUrduWord(currentSelectedQuestions, {
          grade: details.class,
          subject: details.subject,
          chapter: [details.syllabus],
          paperNo: details.paperNo,
          date: details.date,
          day: details.day,
          timeAllowed: details.timeAllowed,
          totalMarks: details.totalMarks,
          topic: "",
          category: "",
          sections,
        })

        if (result.success && result.docxBuffer) {
          toast.success("Word document generated successfully")
          setShowHeaderDialog(false)

          if (typeof window !== "undefined") {
            const blob = new Blob([result.docxBuffer], {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })

            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${details.subject}-${details.class}-paper-${details.paperNo}.docx`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
          }
        } else {
          throw new Error("Word document generation failed")
        }
      }
    } catch (error) {
      console.error("Error generating document:", error)
      toast.error(`Failed to generate ${selectedFormat?.toUpperCase()}. Please try again.`)
    } finally {
      setIsGeneratingPDF(false)
      setSelectedFormat(null)
    }
  }

  if (showPaper) {
    return (
      <>
        <DashboardLayout>
          <div className="p-8">
            <PaperLayout>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">islamyat Paper - 9th Grade</h2>
                    <p className="text-sm text-muted-foreground">Total Marks: {totalMarks}</p>
                  </div>
                  <Button onClick={handleDownloadClick}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="mb-8">
                  {selectedQuestions.length > 0 && (
                    <>
                      {selectedQuestions.filter((q) => q.type === "mcq").length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-lg font-semibold mb-4">Q1. Choose the correct answer:</h2>
                          <div className="space-y-6">
                            {selectedQuestions
                              .filter((q) => q.type === "mcq")
                              .map((question, index) => (
                                <QuestionDisplay key={question.id} question={question} index={index} />
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedQuestions.filter((q) => q.type === "short").length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-lg font-semibold mb-4">Q2. Answer the following short questions:</h2>
                          <div className="space-y-6">
                            {selectedQuestions
                              .filter((q) => q.type === "short")
                              .map((question, index) => (
                                <QuestionDisplay key={question.id} question={question} index={index} />
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedQuestions.filter((q) => q.type === "long").length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-lg font-semibold mb-4">Q3. Answer the following in detail:</h2>
                          <div className="space-y-6">
                            {selectedQuestions
                              .filter((q) => q.type === "long")
                              .map((question, index) => (
                                <QuestionDisplay key={question.id} question={question} index={index} />
                              ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <AnswerKey
                  answers={selectedQuestions.map((q, i) => ({
                    number: i + 1,
                    answer: q.type === "mcq" ? (q as any).correct : "See detailed answer key",
                  }))}
                />
              </div>
            </PaperLayout>
          </div>
        </DashboardLayout>
        <DownloadOptionsDialog
          open={showDownloadOptions}
          onOpenChange={setShowDownloadOptions}
          onSelectFormat={handleFormatSelect}
        />
        <HeaderDetailsDialog
          open={showHeaderDialog}
          onOpenChange={setShowHeaderDialog}
          onSubmit={handleHeaderDetailsSubmit}
          loading={isGeneratingPDF}
        />
      </>
    )
  }

  return (
    <>
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
              <h1 className="text-lg font-medium">Select Your Questions Here... 9TH - islamyat</h1>
              <X className="h-5 w-5 cursor-pointer" onClick={handleClose} />
            </div>

            <div className="bg-white border-x border-b rounded-b-lg p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={currentSection.type}
                      onValueChange={(value: "mcq" | "short" | "long") =>
                        setCurrentSection({ ...currentSection, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="short">Short Questions</SelectItem>
                        <SelectItem value="long">Long Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Questions</Label>
                    <Input
                      type="number"
                      min="1"
                      value={currentSection.count}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          count: Number.parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Marks per Question</Label>
                    <Input
                      type="number"
                      min="1"
                      value={currentSection.marks}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          marks: Number.parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button onClick={handleAddSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                  <div className="space-y-2">
                    <Select value={selectedHeading} onValueChange={(value) => setSelectedHeading(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select heading" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedHeadings.map((heading) => (
                          <SelectItem key={heading} value={heading}>
                            {heading}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {sections.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{section.type.toUpperCase()}</h3>
                              <p className="text-sm text-muted-foreground">
                                {section.count} questions × {section.marks} marks
                              </p>
                              <p className="text-sm font-medium">Total: {section.count * section.marks} marks</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveSection(index)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm font-medium">Total Marks: {totalMarks}</p>
                    <p className="text-sm text-muted-foreground">
                      Total Questions: {sections.reduce((sum, section) => sum + section.count, 0)}
                    </p>
                  </div>

                  <div className="space-x-2">
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={handleSearch}
                      disabled={sections.length === 0}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      SEARCH
                    </Button>
                  </div>
                </div>
              </div>

              <div className="min-h-[400px] bg-green-50 rounded-lg mt-6 overflow-auto">
                {availableQuestions.length > 0 && (
                  <div className="divide-y">
                    {(randomQuestions.length ? randomQuestions : availableQuestions).map((question, index) => (
                      <QuestionDisplay key={question.id} question={question} index={index} />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleRandomSelect}
                  disabled={!availableQuestions.length}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  RANDOM SELECT
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleAddQuestions}
                  disabled={!randomQuestions.length}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  ADD QUESTIONS
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DownloadOptionsDialog
          open={showDownloadOptions}
          onOpenChange={setShowDownloadOptions}
          onSelectFormat={handleFormatSelect}
        />
        <HeaderDetailsDialog
          open={showHeaderDialog}
          onOpenChange={setShowHeaderDialog}
          onSubmit={handleHeaderDetailsSubmit}
          loading={isGeneratingPDF}
        />
      </DashboardLayout>
    </>
  )
}

