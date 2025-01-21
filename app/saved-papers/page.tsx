'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { SavedPaper } from '@/types/saved-papers'

export default function SavedPapersPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>(''); // Add state for chapter
  const [selectedTopic, setSelectedTopic] = useState<string>(''); // Add state for topic
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Add state for category
  const [mongoPapers, setMongoPapers] = useState<SavedPaper[]>([]);

  useEffect(() => {
    fetchMongoPapers(); // Fetch papers from MongoDB
  }, []);

  const fetchMongoPapers = async () => {
    try {
      const response = await axios.get('/api/get-papers');
      if (response.data && response.data.length > 0) {
        console.log('Fetched papers:', response.data); // Debugging statement
        setMongoPapers(response.data);
      } else {
        console.warn('No papers found in the response');
      }
    } catch (error) {
      console.error('Error fetching papers from MongoDB:', error);
    }
  };

  const handleDownload = async (pdfContent: string, fileName: string, paperId: string) => {
    const link = document.createElement('a');
    link.href = pdfContent;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save the downloaded paper to MongoDB
    const paper = mongoPapers.find(paper => paper.id === paperId);
    if (paper) {
      await saveDownloadedPaperToMongoDB(paper);
    }
  };

  async function saveDownloadedPaperToMongoDB(savedPaper: SavedPaper) {
    try {
      await axios.post('/api/save-downloaded-paper', savedPaper);
    } catch (error) {
      console.error('Error saving downloaded paper to MongoDB:', error);
    }
  }

  const grades = Array.from(new Set(mongoPapers.map(paper => paper.metadata?.grade).filter(Boolean)));
  const subjects = selectedGrade ? Array.from(new Set(mongoPapers.filter(paper => paper.metadata?.grade === selectedGrade).map(paper => paper.metadata?.subject).filter(Boolean))) : [];
  const chapters = selectedGrade && selectedSubject ? Array.from(new Set(mongoPapers.filter(paper => paper.metadata?.grade === selectedGrade && paper.metadata?.subject === selectedSubject).flatMap(paper => paper.metadata?.chapter).filter(Boolean))) : [];
  const topics = selectedGrade && selectedSubject && selectedChapter ? Array.from(new Set(mongoPapers.filter(paper => paper.metadata?.grade === selectedGrade && paper.metadata?.subject === selectedSubject && paper.metadata?.chapter.includes(selectedChapter)).map(paper => paper.metadata?.topic).filter(Boolean))) : [];
  const categories = Array.from(new Set(mongoPapers.map(paper => paper.metadata?.category).filter(Boolean)));
  const papers = mongoPapers.filter(paper => 
    (!selectedGrade || paper.metadata?.grade === selectedGrade) &&
    (!selectedSubject || paper.metadata?.subject === selectedSubject) &&
    (!selectedChapter || paper.metadata?.chapter.includes(selectedChapter)) &&
    (!selectedTopic || paper.metadata?.topic === selectedTopic) &&
    (!selectedCategory || paper.metadata?.category === selectedCategory)
  );

  console.log('Selected Grade:', selectedGrade); // Debugging statement
  console.log('Selected Subject:', selectedSubject); // Debugging statement
  console.log('Selected Chapter:', selectedChapter); // Debugging statement
  console.log('Selected Topic:', selectedTopic); // Debugging statement
  console.log('Selected Category:', selectedCategory); // Debugging statement
  console.log('Filtered Papers:', papers); // Debugging statement

  const groupedPapers = papers.reduce((acc, paper) => {
    const category = paper.metadata?.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(paper);
    return acc;
  }, {} as Record<string, SavedPaper[]>);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Saved Papers</h1>
            <p className="text-sm text-muted-foreground mt-1">View and download your saved papers</p>
          </header>

          <div className="flex gap-4 mb-6">
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

          {Object.keys(groupedPapers).map((category) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedPapers[category].map((paper) => (
                  <Card key={paper.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {paper.title}
                      </CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(paper.createdAt).toLocaleDateString()}
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-xs">
                          Chapters: {paper.metadata?.chapter?.join(', ') || 'N/A'}
                        </div>
                        <div className="text-xs">
                          Question Types: {paper.metadata?.questionTypes?.join(', ') || 'N/A'}
                        </div>
                        <div className="text-xs">
                          Total Questions: {paper.metadata?.totalQuestions || 'N/A'}
                        </div>
                        <div className="text-xs">
                          Category: {paper.metadata?.category || 'N/A'}
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4"
                        size="sm"
                        onClick={() => handleDownload(paper.pdfContent, paper.fileName, paper.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {papers.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No papers found. Generate some papers to see them here.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

