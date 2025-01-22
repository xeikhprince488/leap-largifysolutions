"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import type { SavedPaper } from "@/types/saved-papers"
import { useToast } from "@/components/ui/use-toast"

export default function SavedPapersPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedChapter, setSelectedChapter] = useState<string>("")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [mongoPapers, setMongoPapers] = useState<SavedPaper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMongoPapers()
  }, [])

  const fetchMongoPapers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/get-papers")
      if (response.data && response.data.length > 0) {
        console.log("Fetched papers:", response.data)
        setMongoPapers(response.data)
      } else {
        console.warn("No papers found in the response")
      }
    } catch (error) {
      console.error("Error fetching papers from MongoDB:", error)
      toast({
        title: "Error",
        description: "Failed to fetch papers. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deletePaper = async (paperId: string) => {
    try {
      console.log("Attempting to delete paper:", paperId)

      const response = await axios.delete(`/api/delete-paper/${paperId}`)

      if (response.status === 200) {
        console.log("Paper deleted successfully")
        setMongoPapers((prevPapers) => prevPapers.filter((paper) => paper._id !== paperId))
        toast({
          title: "Success",
          description: "Paper deleted successfully",
        })
      }
    } catch (error: any) {
      console.error("Error deleting paper:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Error deleting paper",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async (pdfContent: string, fileName: string, paperId: string) => {
    try {
      const link = document.createElement("a")
      link.href = pdfContent
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      const paper = mongoPapers.find((paper) => paper.id === paperId)
      if (paper) {
        await saveDownloadedPaperToMongoDB(paper)
        toast({
          title: "Success",
          description: "Paper downloaded successfully",
        })
      }
    } catch (error) {
      console.error("Error downloading paper:", error)
      toast({
        title: "Error",
        description: "Failed to download paper",
        variant: "destructive",
      })
    }
  }

  async function saveDownloadedPaperToMongoDB(savedPaper: SavedPaper) {
    try {
      await axios.post("/api/save-downloaded-paper", savedPaper)
    } catch (error) {
      console.error("Error saving downloaded paper to MongoDB:", error)
      toast({
        title: "Error",
        description: "Failed to save download history",
        variant: "destructive",
      })
    }
  }

  const grades = Array.from(new Set(mongoPapers.map((paper) => paper.metadata?.grade).filter(Boolean)))
  const subjects = selectedGrade
    ? Array.from(
        new Set(
          mongoPapers
            .filter((paper) => paper.metadata?.grade === selectedGrade)
            .map((paper) => paper.metadata?.subject)
            .filter(Boolean),
        ),
      )
    : []
  const chapters =
    selectedGrade && selectedSubject
      ? Array.from(
          new Set(
            mongoPapers
              .filter((paper) => paper.metadata?.grade === selectedGrade && paper.metadata?.subject === selectedSubject)
              .flatMap((paper) => paper.metadata?.chapter)
              .filter(Boolean),
          ),
        )
      : []
  const topics =
    selectedGrade && selectedSubject && selectedChapter
      ? Array.from(
          new Set(
            mongoPapers
              .filter(
                (paper) =>
                  paper.metadata?.grade === selectedGrade &&
                  paper.metadata?.subject === selectedSubject &&
                  paper.metadata?.chapter.includes(selectedChapter),
              )
              .map((paper) => paper.metadata?.topic)
              .filter(Boolean),
          ),
        )
      : []
  const categories = Array.from(new Set(mongoPapers.map((paper) => paper.metadata?.category).filter(Boolean)))

  const papers = mongoPapers.filter(
    (paper) =>
      (!selectedGrade || paper.metadata?.grade === selectedGrade) &&
      (!selectedSubject || paper.metadata?.subject === selectedSubject) &&
      (!selectedChapter || paper.metadata?.chapter.includes(selectedChapter)) &&
      (!selectedTopic || paper.metadata?.topic === selectedTopic) &&
      (!selectedCategory || paper.metadata?.category === selectedCategory),
  )

  const groupedPapers = papers.reduce(
    (acc, paper) => {
      const category = paper.metadata?.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(paper)
      return acc
    },
    {} as Record<string, SavedPaper[]>,
  )

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-8">Loading papers...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Saved Papers</h1>
            <p className="text-sm text-muted-foreground mt-1">View and download your saved papers</p>
          </header>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-48">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedGrade && (
              <div className="w-48">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedGrade && selectedSubject && (
              <div className="w-48">
                <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((chapter, index) => (
                      <SelectItem key={index} value={chapter}>
                        {chapter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedGrade && selectedSubject && selectedChapter && (
              <div className="w-48">
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {Object.keys(groupedPapers).length > 0 ? (
            Object.keys(groupedPapers).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{category}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {groupedPapers[category].map((paper) => (
                    <Card key={paper._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{paper.title}</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(paper.createdAt).toLocaleDateString()}
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="text-xs">Grade: {paper.metadata?.grade || "N/A"}</div>
                          <div className="text-xs">Subject: {paper.metadata?.subject || "N/A"}</div>
                          <div className="text-xs">Chapters: {paper.metadata?.chapter?.join(", ") || "N/A"}</div>
                          <div className="text-xs">
                            Question Types: {paper.metadata?.questionTypes?.join(", ") || "N/A"}
                          </div>
                          <div className="text-xs">Total Questions: {paper.metadata?.totalQuestions || "N/A"}</div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            className="flex-1"
                            size="sm"
                            onClick={() => handleDownload(paper.pdfContent, paper.fileName, paper.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            className="flex-1"
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this paper?")) {
                                deletePaper(paper._id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              {mongoPapers.length === 0
                ? "No papers found. Generate some papers to see them here."
                : "No papers match the selected filters."}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

