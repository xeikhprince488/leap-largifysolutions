"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { syllabusStructure } from "@/data/syllabus-structure"
import { Upload } from "@/components/ui/upload"

interface Option {
  english: string
  urdu: string
  value: string
}

export default function AddQuestionsPage() {
  const [questionType, setQuestionType] = useState<
    | "mcq"
    | "short"
    | "long"
    | "translation"
    | "simplified"
    | "summary"
    | "idioms"
    | "creative"
    | "reading"
    | "urduToEnglish"
    | "voiceChange"
    | "spelling"
    | "vocabulary"
    | "grammar"
    | "synonyms"
    | "sentenceCompletion"
    | "verbForms"
    | "shortQuestions"
    | "letterWriting"
    | "storyWriting"
    | "contextualExplanation"
    | "punctuation"
    | "sentencePair"
    | "fillInTheBlanks"
    | "bookII"
    | "novel"
    | "idiomsPhrasalVerbs"
    | "mcqs"
    | "poemSummary"
    | "paragraphWriting"
    | "directIndirect"
    | "sentenceUsage"
  >("mcq")
  const [grade, setGrade] = useState("")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [topic, setTopic] = useState("")
  const [contentType, setContentType] = useState("")
  const [language, setLanguage] = useState<"english" | "urdu">("english")

  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])
  const [availableChapters, setAvailableChapters] = useState<string[]>([])
  const [availableTopics, setAvailableTopics] = useState<string[]>([])

  const [selectedQuestions, setSelectedQuestions] = useState([])

  const [question, setQuestion] = useState({
    english: "",
    urdu: "",
    marks: 1,
  })

  const [options, setOptions] = useState<Option[]>([
    { english: "", urdu: "", value: "A" },
    { english: "", urdu: "", value: "B" },
    { english: "", urdu: "", value: "C" },
    { english: "", urdu: "", value: "D" },
  ])

  const [correctOption, setCorrectOption] = useState("A")
  const [answer, setAnswer] = useState({
    english: "",
    urdu: "",
  })

  const [outline, setOutline] = useState({
    english: [""],
    urdu: [""],
  })

  const [image, setImage] = useState<string | null>(null)

  const handleAddOutlinePoint = () => {
    setOutline({
      english: [...outline.english, ""],
      urdu: [...outline.urdu, ""],
    })
  }

  const handleRemoveOutlinePoint = (index: number) => {
    setOutline({
      english: outline.english.filter((_, i) => i !== index),
      urdu: outline.urdu.filter((_, i) => i !== index),
    })
  }

  const handleUpdateOutline = (index: number, language: "english" | "urdu", value: string) => {
    setOutline({
      ...outline,
      [language]: outline[language].map((point, i) => (i === index ? value : point)),
    })
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // Save image as base64 string
    };
    reader.readAsDataURL(file);
  }

  const isFormValid = () => {
    if (!grade || !subject || !chapter || !questionType || !question[language]) {
      return false
    }

    if (questionType === "mcq") {
      if (options.some((option) => !option[language]) || !correctOption) {
        return false
      }
    } else if (questionType === "short" || questionType === "long") {
      if (!answer[language]) {
        return false
      }
    }

    return true
  }

  const handleSave = async () => {
    try {
      const newQuestion = {
        id: Date.now(),
        type: questionType,
        [language]: question[language],
        grade,
        subject,
        chapter,
        topic,
        marks: question.marks,
        language,
        image, // Add image to the question object
        ...(questionType === "mcq"
          ? {
              options,
              correct: correctOption,
            }
          : {
              answer,
              ...(questionType === "long"
                ? {
                    outline: {
                      english: outline.english.filter(Boolean),
                      urdu: outline.urdu.filter(Boolean),
                    },
                  }
                : {}),
            }),
      }

      const response = await fetch("/api/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade,
          subject,
          chapter,
          question: newQuestion,
          language,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        // Reset form
        setQuestion({ english: "", urdu: "", marks: 1 })
        setOptions([
          { english: "", urdu: "", value: "A" },
          { english: "", urdu: "", value: "B" },
          { english: "", urdu: "", value: "C" },
          { english: "", urdu: "", value: "D" },
        ])
        setAnswer({ english: "", urdu: "" })
        setOutline({ english: [""], urdu: [""] })
        setImage(null)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error saving question:", error)
      toast.error("Failed to save question")
    }
  }

  // Update available subjects when grade changes
  useEffect(() => {
    if (grade) {
      const subjects: string[] = [
        "biology",
        "chemistry",
        "computer",
        "english",
        "islamyat",
        "math",
        "physics",
        "urdu",
        "pakstudy",
        "tarjumaquran",
      ]

      // Add statistics for 11th and 12th
      if (grade === "11th" || grade === "12th") {
        subjects.push("statistics")
      }

      setAvailableSubjects(subjects)
      setSubject("")
      setChapter("")
      setTopic("")
    } else {
      setAvailableSubjects([])
    }
  }, [grade])

  // Update available chapters when subject changes
  useEffect(() => {
    if (grade && subject) {
      let chapters: string[] = []

      if (subject === "urdu") {
        const subjectData = syllabusStructure[grade as keyof typeof syllabusStructure]?.[subject] || {}
        chapters = Object.keys(subjectData)
      } else {
        chapters = Object.keys(syllabusStructure[grade as keyof typeof syllabusStructure]?.[subject] || {})
      }

      setAvailableChapters(chapters)
      setChapter("")
      setTopic("")
    } else {
      setAvailableChapters([])
    }
  }, [grade, subject])

  // Update available topics when chapter changes
  useEffect(() => {
    if (grade && subject && chapter) {
      const chapterData = syllabusStructure[grade as keyof typeof syllabusStructure]?.[subject]?.[chapter]
      const topics = Array.isArray(chapterData) ? chapterData : (Object.keys(chapterData || {}) as string[])
      setAvailableTopics(topics)
      setTopic("")
    } else {
      setAvailableTopics([])
    }
  }, [grade, subject, chapter])

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Add Questions</h1>
            <p className="text-sm text-muted-foreground mt-1">Add new questions to the question bank</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {grade === "9th" && (
                        <>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="computer">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="islamyat">Islamiyat</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          <SelectItem value="tarjumaquran">Tarjuma Tul Quran</SelectItem>
                          {/* <SelectItem value="pakstudy">Pakistan Studies</SelectItem> */}
                        </>
                      )}
                      {grade === "10th" && (
                        <>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="computer">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          {/* <SelectItem value="islamyat">Islamiyat</SelectItem> */}
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          <SelectItem value="pakstudy">Pakistan Studies</SelectItem>
                          <SelectItem value="tarjumaquran">Tarjuma Tul Quran</SelectItem>
                        </>
                      )}
                      {grade === "11th" && (
                        <>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="computer">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="islamyat">Islamiyat</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          {/* <SelectItem value="statistics">Statistics</SelectItem> */}
                          <SelectItem value="tarjumaquran">Tarjuma Tul Quran</SelectItem>
                          {/* <SelectItem value="pakstudy">Pakistan Studies</SelectItem> */}
                        </>
                      )}
                      {grade === "12th" && (
                        <>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="computer">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          {/* <SelectItem value="islamyat">Islamiyat</SelectItem> */}
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          {/* <SelectItem value="statistics">Statistics</SelectItem> */}
                          <SelectItem value="pakstudy">Pakistan Studies</SelectItem>
                          <SelectItem value="tarjumaquran">Tarjuma Tul Quran</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Chapter</Label>
                  <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableChapters.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTopics.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Question Type</Label>
                <Select value={questionType} onValueChange={(value: any) => setQuestionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="short">Short Answer</SelectItem>
                    <SelectItem value="long">Long Answer</SelectItem>
                    {subject === "english" && grade === "9th" && (
                      <>
                        <SelectItem value="fillInTheBlanks">Fill in the Blanks</SelectItem>
                        <SelectItem value="correctSpelling">Correct Spelling</SelectItem>
                        <SelectItem value="vocabulary">Vocabulary (Meanings, Synonyms, Antonyms)</SelectItem>
                        <SelectItem value="grammar">Grammar (Clauses, Sentence Types)</SelectItem>
                        <SelectItem value="translation">Translation (English to Urdu)</SelectItem>
                        <SelectItem value="poemSummary">Poem Summary</SelectItem>
                        <SelectItem value="essayWriting">Essay Writing</SelectItem>
                        <SelectItem value="paragraphWriting">Paragraph Writing</SelectItem>
                        <SelectItem value="directIndirect">Direct to Indirect Speech</SelectItem>
                        <SelectItem value="sentenceUsage">Sentence Usage (Word Pairs)</SelectItem>
                        <SelectItem value="urduToEnglish">Translation (Urdu to English)</SelectItem>
                      </>
                    )}
                    {subject === "urdu" && grade === "9th" && (
                      <>
                        <SelectItem value="poetryExplanation">شاعری کی تشریح</SelectItem>
                        <SelectItem value="excerptExplanation">حصہ دوم - اقتباس کی تشریح</SelectItem>
                        <SelectItem value="fillInTheBlanks">خالی جگہ پُر کریں</SelectItem>
                        <SelectItem value="mcqs">کثیر انتخابی سوالات</SelectItem>
                        <SelectItem value="applicationWriting">درخواست نویسی</SelectItem>
                        <SelectItem value="letterWriting">خط نویسی</SelectItem>
                        <SelectItem value="essayWriting">مضمون نویسی</SelectItem>
                      </>
                    )}
                    {subject === "english" && grade === "10th" && (
                      <>
                        <SelectItem value="fillInTheBlanks">Fill in the Blanks</SelectItem>
                        <SelectItem value="correctSpelling">Correct Spelling</SelectItem>
                        <SelectItem value="vocabulary">Vocabulary (Meanings, Synonyms, Antonyms)</SelectItem>
                        <SelectItem value="grammar">Grammar (Clauses, Sentence Types)</SelectItem>
                        <SelectItem value="shortQuestions">Short Questions</SelectItem>
                        <SelectItem value="translation">Translation (English to Urdu)</SelectItem>
                        <SelectItem value="poemSummary">Poem Summary</SelectItem>
                        <SelectItem value="essayWriting">Essay Writing</SelectItem>
                        <SelectItem value="paragraphWriting">Paragraph Writing</SelectItem>
                        <SelectItem value="directIndirect">Direct to Indirect Speech</SelectItem>
                        <SelectItem value="sentenceUsage">Sentence Usage (Word Pairs)</SelectItem>
                        <SelectItem value="urduToEnglish">Translation (Urdu to English)</SelectItem>
                      </>
                    )}

                    {subject === "urdu" && grade === "10th" && (
                      <>
                        <SelectItem value="poetryExplanation">شاعری کی تشریح</SelectItem>
                        <SelectItem value="excerptExplanation">حصہ دوم - اقتباس کی تشریح</SelectItem>
                        <SelectItem value="fillInTheBlanks">خالی جگہ پُر کریں</SelectItem>
                        <SelectItem value="mcqs">کثیر انتخابی سوالات</SelectItem>
                        <SelectItem value="applicationWriting">درخواست نویسی</SelectItem>
                        <SelectItem value="letterWriting">خط نویسی</SelectItem>
                        <SelectItem value="essayWriting">مضمون نویسی</SelectItem>
                      </>
                    )}

                    {subject === "english" && grade === "11th" && (
                      <>
                        <SelectItem value="synonyms">Synonyms</SelectItem>
                        <SelectItem value="sentenceCompletion">Sentence Completion</SelectItem>
                        <SelectItem value="verbForms">Verb Forms</SelectItem>
                        <SelectItem value="shortQuestions">Short Questions</SelectItem>
                        <SelectItem value="letterWriting">Letter/Application Writing</SelectItem>
                        <SelectItem value="storyWriting">Story Writing</SelectItem>
                        <SelectItem value="contextualExplanation">Contextual Explanation</SelectItem>
                        <SelectItem value="punctuation">Punctuation</SelectItem>
                        <SelectItem value="sentencePair">Sentence Pair Writing</SelectItem>
                        <SelectItem value="translation">Translation</SelectItem>
                        <SelectItem value="essayWriting">Essay Writing</SelectItem>
                      </>
                    )}

                    {subject === "urdu" && grade === "11th" && (
                      <>
                        <SelectItem value="poetryExplanation">شاعری کی تشریح</SelectItem>
                        <SelectItem value="excerptExplanation">حصہ دوم - اقتباس کی تشریح</SelectItem>
                        <SelectItem value="fillInTheBlanks">خالی جگہ پُر کریں</SelectItem>
                        <SelectItem value="mcqs">کثیر انتخابی سوالات</SelectItem>
                        <SelectItem value="applicationWriting">درخواست نویسی</SelectItem>
                        <SelectItem value="letterWriting">خط نویسی</SelectItem>
                        <SelectItem value="essayWriting">مضمون نویسی</SelectItem>
                      </>
                    )}

                    {subject === "english" && grade === "12th" && (
                      <>
                        <SelectItem value="mcqs">Multiple Choice Questions (MCQs)</SelectItem>
                        <SelectItem value="bookII">From Book-II (Modern Prose)</SelectItem>
                        <SelectItem value="novel">From Novel (Goodbye, Mr. Chips)</SelectItem>
                        <SelectItem value="idiomsPhrasalVerbs">Idioms and Phrasal Verbs</SelectItem>
                        <SelectItem value="translation">Translation</SelectItem>
                        <SelectItem value="essayWriting">Essay Writing</SelectItem>
                      </>
                    )}

                    {subject === "urdu" && grade === "12th" && (
                      <>
                        <SelectItem value="poetryExplanation">شاعری کی تشریح</SelectItem>
                        <SelectItem value="excerptExplanation">حصہ دوم - اقتباس کی تشریح</SelectItem>
                        <SelectItem value="fillInTheBlanks">خالی جگہ پُر کریں</SelectItem>
                        <SelectItem value="mcqs">کثیر انتخابی سوالات</SelectItem>
                        <SelectItem value="applicationWriting">درخواست نویسی</SelectItem>
                        <SelectItem value="letterWriting">خط نویسی</SelectItem>
                        <SelectItem value="essayWriting">مضمون نویسی</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={(value: "english" | "urdu") => setLanguage(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="urdu">Urdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Question ({language === "english" ? "English" : "Urdu"})</Label>
                <Textarea
                  value={question[language]}
                  onChange={(e) => setQuestion({ ...question, [language]: e.target.value })}
                  placeholder={`Enter question in ${language === "english" ? "English" : "Urdu"}`}
                  style={{ direction: language === "urdu" ? "rtl" : "ltr" }}
                />
              </div>

              <div className="space-y-2">
                <Label>Marks</Label>
                <Input
                  type="number"
                  min={1}
                  value={question.marks}
                  onChange={(e) => setQuestion({ ...question, marks: Number.parseInt(e.target.value) || 1 })}
                />
              </div>

              {questionType === "mcq" && (
                <div className="space-y-4">
                  <Label>Options</Label>
                  {options.map((option, index) => (
                    <div key={option.value} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={option.english}
                        onChange={(e) =>
                          setOptions(options.map((o, i) => (i === index ? { ...o, english: e.target.value } : o)))
                        }
                        placeholder={`Option ${option.value} (English)`}
                      />
                      <Input
                        value={option.urdu}
                        onChange={(e) =>
                          setOptions(options.map((o, i) => (i === index ? { ...o, urdu: e.target.value } : o)))
                        }
                        placeholder={`Option ${option.value} (Urdu)`}
                        style={{ direction: "rtl" }}
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label>Correct Option</Label>
                    <Select value={correctOption} onValueChange={setCorrectOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            Option {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(questionType === "short" || questionType === "long") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Answer (English)</Label>
                    <Textarea
                      value={answer.english}
                      onChange={(e) => setAnswer({ ...answer, english: e.target.value })}
                      placeholder="Enter answer in English"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer (Urdu)</Label>
                    <Textarea
                      value={answer.urdu}
                      onChange={(e) => setAnswer({ ...answer, urdu: e.target.value })}
                      placeholder="Enter answer in Urdu"
                      style={{ direction: "rtl" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <Upload onFileSelect={handleImageUpload} />
                  </div>
                </div>
              )}

              {questionType === "long" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Outline Points</Label>
                    <Button variant="outline" size="sm" onClick={handleAddOutlinePoint}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  </div>
                  {outline.english.map((_, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          value={outline.english[index]}
                          onChange={(e) => handleUpdateOutline(index, "english", e.target.value)}
                          placeholder={`Point ${index + 1} (English)`}
                        />
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => handleRemoveOutlinePoint(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={outline.urdu[index]}
                        onChange={(e) => handleUpdateOutline(index, "urdu", e.target.value)}
                        placeholder={`Point ${index + 1} (Urdu)`}
                        style={{ direction: "rtl" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={!isFormValid()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

