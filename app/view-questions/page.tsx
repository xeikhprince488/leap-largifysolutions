'use client'

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { syllabusStructure } from "@/data/syllabus-structure"
import { MCQQuestion, ShortQuestion, LongQuestion } from "@/components/question-types"
import { toast } from "sonner"

interface QuestionData {
  id: number
  type: string
  english: string
  urdu: string
  options?: {
    english: string
    urdu: string
    value: string
  }[]
  correct?: string
  marks: number
}

interface Questions {
  mcq: QuestionData[]
  short: QuestionData[]
  long: QuestionData[]
}

export default function ViewQuestionsPage() {
  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')
  const [chapter, setChapter] = useState('')
  const [questions, setQuestions] = useState<Questions>({ mcq: [], short: [], long: [] })
  const [loading, setLoading] = useState(false)
  
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])
  const [availableChapters, setAvailableChapters] = useState<string[]>([])

  useEffect(() => {
    if (grade) {
      const subjects = Object.keys(syllabusStructure[grade as keyof typeof syllabusStructure] || {})
      setAvailableSubjects(subjects)
      setSubject('')
      setChapter('')
    } else {
      setAvailableSubjects([])
    }
  }, [grade])

  useEffect(() => {
    if (grade && subject) {
      const chapters = Object.keys(syllabusStructure[grade as keyof typeof syllabusStructure]?.[subject] || {})
      setAvailableChapters(chapters)
      setChapter('')
    } else {
      setAvailableChapters([])
    }
  }, [grade, subject])

  async function fetchQuestions(grade: string, subject: string, chapter: string) {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/questions/view?grade=${grade}&subject=${subject}&chapter=${chapter}`
      )
      const data = await response.json()
      
      console.log('Fetched data:', data) // Debugging line

      if (data && typeof data === 'object') {
        const { mcq, short, long } = data
        
        console.log('MCQ:', mcq) // Debugging line
        console.log('Short:', short) // Debugging line
        console.log('Long:', long) // Debugging line

        setQuestions({ mcq, short, long })
      } else {
        toast.error('Unexpected data format')
      }
    } catch (error) {
      console.error('Error fetching questions:', error) // Debugging line
      toast.error('Failed to fetch questions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (grade && subject && chapter) {
      fetchQuestions(grade, subject, chapter)
    }
  }, [grade, subject, chapter])

  const handleDelete = async (questionId: number, type: 'mcq' | 'short' | 'long') => {
    if (!grade || !subject || !chapter) return

    try {
      const response = await fetch(`/api/questions/delete?id=${questionId}&grade=${grade}&subject=${subject}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete question')
      }

      // Remove question from state
      setQuestions(prev => ({
        ...prev,
        [type]: prev[type].filter(q => q.id !== questionId)
      }))

      toast.success('Question deleted successfully')
    } catch (error) {
      console.error('Error deleting question:', error)
      toast.error('Failed to delete question')
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">View Questions</h1>
            <p className="text-sm text-muted-foreground mt-1">Browse and manage questions in the question bank</p>
          </header>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9th">9th</SelectItem>
                      <SelectItem value="10th">10th</SelectItem>
                      <SelectItem value="11th">11th</SelectItem>
                      <SelectItem value="12th">12th</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Chapter</Label>
                  <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableChapters.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center text-muted-foreground py-8">
              Loading questions...
            </div>
          ) : grade && subject && chapter ? (
            <Tabs defaultValue="mcq" className="space-y-4">
              <TabsList>
                <TabsTrigger value="mcq">
                  MCQs ({questions.mcq?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="short">
                  Short Questions ({questions.short?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="long">
                  Long Questions ({questions.long?.length ?? 0})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mcq" className="space-y-4">
                {questions.mcq && questions.mcq.length > 0 ? (
                  questions.mcq.map((question) => (
                    <MCQQuestion
                      key={question.id}
                      question={question}
                      onDelete={(id) => handleDelete(id, 'mcq')}
                      type="mcq"
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No MCQs found for this chapter</p>
                )}
              </TabsContent>
              <TabsContent value="short" className="space-y-4">
                {questions.short && questions.short.length > 0 ? (
                  questions.short.map((question) => (
                    <ShortQuestion
                      key={question.id}
                      question={question}
                      onDelete={(id) => handleDelete(id, 'short')}
                      type="short"
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No short questions found for this chapter</p>
                )}
              </TabsContent>
              <TabsContent value="long" className="space-y-4">
                {questions.long && questions.long.length > 0 ? (
                  questions.long.map((question) => (
                    <LongQuestion
                      key={question.id}
                      question={question}
                      onDelete={(id) => handleDelete(id, 'long')}
                      type="long"
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No long questions found for this chapter</p>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Select grade, subject, and chapter to view questions
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
