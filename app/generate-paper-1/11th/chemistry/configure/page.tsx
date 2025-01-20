'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { QuestionDisplay } from "@/components/question-display"
import { PaperLayout } from "@/components/paper-layout"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnswerKey } from "@/components/answer-key"
import { generatePDF } from "@/utils/generate-pdf"
import { fetchQuestions } from "@/services/questions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Search, Shuffle, Plus, Download, Trash2 } from 'lucide-react'
import Image from "next/image"
import { toast } from "sonner"
import { LongQuestion, MCQQuestion, Question, QuestionConfig, ShortQuestion } from "@/types/questions"
import { Card, CardContent } from "@/components/ui/card"
import { HeaderDetailsDialog } from "@/components/header-details-dialog"

export default function ConfigureQuestionsPage() {
  const [sections, setSections] = useState<QuestionConfig[]>([])
  const [currentSection, setCurrentSection] = useState<QuestionConfig>({
    type: 'mcq',
    count: 1,
    marks: 1,
    heading: '' // Add heading to currentSection state
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const chaptersParam = params.get('chapters')
    if (chaptersParam) {
      setSelectedChapters(chaptersParam.split(','))
    }
  }, [])

  const totalMarks = sections.reduce((sum, section) => sum + (section.count * section.marks), 0)

  const handleAddSection = () => {
    const heading = prompt('Enter the heading for this section:')
    if (heading) {
      setSections([...sections, { ...currentSection, heading }])
      setCurrentSection({
        type: 'mcq',
        count: 1,
        marks: 1,
        heading: '' // Reset heading
      })
    }
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleSearch = async () => {
    try {
      let allQuestions: Question[] = []

      // Process each section individually
      for (const section of sections) {
        const fetchedQuestions = await fetchQuestions(
          'chemistry',
          '11th',
          [
            "CHAP 1: Basic Concepts",
            "1.1 Atom",
            "1.2 Relative Atomic Mass",
            "1.3 Isotopes",
            "1.4 Analysis of a Compound-Empirical and Molecular Formulas",
            "1.5 Concept of Mole",
            "1.6 Stoichiometry",
            "1.7 Limiting Reactant",
            "1.8 Yield",
            "1.9 Exercise",
            "1.10 Past Papers",
            "CHAP 2: Experimental Techniques in Chemistry",
            "2.1 Filtration",
            "2.2 Crystallization",
            "2.3 Sublimation",
            "2.4 Solvent Extraction",
            "2.5 Chromatography",
            "2.6 Exercise",
            "2.7 Past Papers",
            "CHAP 3: Gases",
            "3.1 States of Matter",
            "3.2 Gas Laws",
            "3.3 General Gas Equation",
            "3.4 Avogadro's Law",
            "3.5 Dalton's Law of Partial Pressure",
            "3.6 Diffusion and Effusion",
            "3.7 Kinetic Molecular Theory of Gases",
            "3.8 Kinetic Interpretation of Temperature",
            "3.9 Liquefaction of Gases",
            "3.10 Non-Ideal Behaviour of Gases",
            "3.11 Plasma State",
            "3.12 Exercise",
            "3.13 Past Papers",
            "CHAP 4: Liquids and Solids",
            "4.1 Introduction & Intermolecular Forces",
            "4.2 Evaporation",
            "4.3 Liquid Crystals",
            "4.4 Solids",
            "4.5 Crystal Lattice",
            "4.6 Crystals and Their Classification",
            "4.7 Classification of Solids",
            "4.8 Determination of Avogadro's Number (NA)",
            "4.9 Exercise",
            "4.10 Past Papers",
            "CHAP 5: Atomic Structure",
            "5.1 Sub-Atomic Particles of Atom",
            "5.2 Rutherford's Model of Atom (Discovery of Nucleus)",
            "5.3 Planck's Quantum Theory",
            "5.4 Bohr's Model of Atom",
            "5.5 Spectrum",
            "5.6 X-Rays and Atomic Number",
            "5.7 Wave-Particle Nature of Matter (Dual Nature Matter)",
            "5.8 Heisenberg's Uncertainly Principle",
            "5.9 Electronic Distribution",
            "5.10 Exercise",
            "5.11 Past Papers",
            "CHAP 6: Chemical Bonding",
            "6.1 Introduction",
            "6.2 Atomic Sizes",
            "6.3 Ionization Energy Electron Affinity and Electronegativity",
            "6.4 Types of Bonds",
            "6.5 Bond Energy, Bond Length and Dipole Moment",
            "6.6 The Effect of Bonds on the Properties of Compounds",
            "6.7 Exercise",
            "6.8 Past Papers",
            "CHAP 7: Thermochemistry",
            "7.1 Introduction & Spontaneous and Non-Spontaneous Reactions",
            "7.2 System, Surrounding and State Function",
            "7.3 Internal Energy and First Law of Thermodynamics",
            "7.4 Enthalpy",
            "7.5 Hess's Law of Constant Heat Summation",
            "7.6 Exercise",
            "7.7 Past Papers",
            "CHAP 8: Chemical Equilibrium",
            "8.1 Reversible and Irreversible Reaction",
            "8.2 Applications of Chemical Equilibrium in Industry",
            "8.3 Ionic Product of Water",
            "8.4 Ionization Constants of Acids (Ka)",
            "8.5 Ionization Constant of Bases (Kb)",
            "8.6 Lowry Bronsted Acid and Base Concept",
            "8.7 Common Ion Effect",
            "8.8 Buffer Solutions",
            "8.9 Equilibria of Slightly Soluble Ionic Compounds (Solubility Product)",
            "8.10 Exercise",
            "8.11 Past Papers",
            "CHAP 9: Solutions",
            "9.1 Concept of A Solution",
            "9.2 Types of Solutions",
            "9.3 Ideal and Non-Ideal Solutions",
            "9.4 Vapour Pressures Liquid-Liquid Solutions",
            "9.5 Solubility and Solubility Curves",
            "9.6 Colligative Properties of Solutions",
            "9.7 Energetic of Solution",
            "9.8 Hydration and Hydrolysis",
            "9.9 Exercise",
            "9.10 Past Papers",
            "CHAP 10: Electrochemistry",
            "10.1 Introduction & Oxidation State and Balancing of Redox Equations",
            "10.2 Electrolytic Conduction",
            "10.3 Electrode Potential",
            "10.4 The Electrochemical Series",
            "10.5 Modern Batteries and Fuel Cells",
            "10.6 Exercise",
            "10.7 Past Papers",
            "CHAP 11: Reaction Kinetics",
            "11.1 Introduction & Rate of Reaction",
            "11.2 Determination of The Rate of A Chemical Reaction",
            "11.3 Energy of Activation",
            "11.4 Finding the Order of Reaction",
            "11.5 Factors Affecting Rates of Reactions",
            "11.6 Catalysis",
            "11.7 Exercise",
            "11.8 Past Papers"
          ]
          
          
          ,
          section.count,
          section.type
        )

        // Add marks to the questions
        const questionsWithMarks = fetchedQuestions.map(q => ({
          ...q,
          marks: section.marks
        }))

        allQuestions = [...allQuestions, ...questionsWithMarks]
      }

      // Verify counts
      const mcqCount = allQuestions.filter(q => q.type === 'mcq').length
      const shortCount = allQuestions.filter(q => q.type === 'short').length
      const longCount = allQuestions.filter(q => q.type === 'long').length

      // Verify if counts match what was requested
      const requestedCounts = sections.reduce((acc, section) => {
        acc[section.type] = (acc[section.type] || 0) + section.count
        return acc
      }, {} as Record<string, number>)

      if (
        mcqCount !== (requestedCounts['mcq'] || 0) ||
        shortCount !== (requestedCounts['short'] || 0) ||
        longCount !== (requestedCounts['long'] || 0)
      ) {
        toast.error('Could not fetch the exact number of questions requested')
        return
      }

      setAvailableQuestions(allQuestions)
      setSelectedQuestions(allQuestions)
      setRandomQuestions([])
      toast.success(`Selected: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long`)
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast.error('Failed to fetch questions')
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleRandomSelect = () => {
    if (!availableQuestions.length) return;

    // Group questions by type
    const questionsByType = availableQuestions.reduce((acc, q) => {
      if (!acc[q.type]) acc[q.type] = [];
      acc[q.type].push(q);
      return acc;
    }, {} as Record<string, Question[]>);

    // Get the counts from sections
    const requiredCounts = sections.reduce((acc, section) => {
      if (!acc[section.type]) acc[section.type] = 0;
      acc[section.type] += section.count;
      return acc;
    }, {} as Record<string, number>);

    // Randomly select the required number of questions for each type
    let randomized: Question[] = [];
    Object.entries(requiredCounts).forEach(([type, count]) => {
      const typeQuestions = questionsByType[type] || [];
      const shuffled = shuffleArray(typeQuestions);
      randomized = [...randomized, ...shuffled.slice(0, count)];
    });

    setRandomQuestions(randomized);
  };

  const handleAddQuestions = () => {
    if (!randomQuestions.length) return;

    // Create a map of required counts from sections
    const requiredCounts = sections.reduce((acc, section) => {
      if (!acc[section.type]) acc[section.type] = 0;
      acc[section.type] += section.count;
      return acc;
    }, {} as Record<string, number>);

    // Filter questions by type and take only the required count
    const finalSelectedQuestions = Object.entries(requiredCounts).flatMap(([type, count]) => {
      const typeQuestions = randomQuestions
        .filter(q => q.type === type)
        .slice(0, count);
      return typeQuestions;
    });

    setSelectedQuestions(finalSelectedQuestions);
    setRandomQuestions([]);
    
    // Show confirmation toast with counts
    const mcqCount = finalSelectedQuestions.filter(q => q.type === 'mcq').length;
    const shortCount = finalSelectedQuestions.filter(q => q.type === 'short').length;
    const longCount = finalSelectedQuestions.filter(q => q.type === 'long').length;
    
    toast.success(`Added: ${mcqCount} MCQs, ${shortCount} Short, ${longCount} Long questions`);
  };

  const handleClose = () => {
    setShowPaper(true)
  }

  const handleDownloadClick = () => {
    console.log('Download button clicked')
    if (selectedQuestions.length === 0) {
      toast.error('No questions selected')
      return
    }

    // Verify question counts match the requirements
    const hasCorrectCounts = sections.every(section => {
      const typeCount = selectedQuestions.filter(q => q.type === section.type).length
      return typeCount === section.count
    })

    if (!hasCorrectCounts) {
      toast.error('Question counts do not match the requirements. Please reselect questions.')
      return
    }

    console.log('Opening header dialog')
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
    console.log('Submitting header details:', details)
    try {
      setIsGeneratingPDF(true)
      
      const success = await generatePDF(selectedQuestions, {
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
        sections // Pass sections to generatePDF
      })

      if (success) {
        toast.success('Paper downloaded and saved successfully')
        setShowHeaderDialog(false)
      } else {
        toast.error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (showPaper) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <PaperLayout>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold">chemistry Paper - 11th Grade</h2>
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
                    {selectedQuestions.filter(q => q.type === 'mcq').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q1. Choose the correct answer:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'mcq')
                            .map((question, index) => (
                              <QuestionDisplay key={question.id} question={question} index={index} />
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedQuestions.filter(q => q.type === 'short').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q2. Answer the following short questions:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'short')
                            .map((question, index) => (
                              <QuestionDisplay key={question.id} question={question} index={index} />
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedQuestions.filter(q => q.type === 'long').length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Q3. Answer the following in detail:</h2>
                        <div className="space-y-6">
                          {selectedQuestions
                            .filter(q => q.type === 'long')
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
                  answer: q.type === 'mcq' ? (q as any).correct : 'See detailed answer key'
                }))}
              />
            </div>
          </PaperLayout>
        </div>
        <HeaderDetailsDialog
          open={showHeaderDialog}
          onOpenChange={setShowHeaderDialog}
          onSubmit={handleHeaderDetailsSubmit}
          loading={isGeneratingPDF}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h1 className="text-lg font-medium">Select Your Questions Here... 11th - chemistry</h1>
            <X className="h-5 w-5 cursor-pointer" onClick={handleClose} />
          </div>
          
          <div className="bg-white border-x border-b rounded-b-lg p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select 
                    value={currentSection.type} 
                    onValueChange={(value: 'mcq' | 'short' | 'long') => 
                      setCurrentSection({...currentSection, type: value})
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
                    onChange={(e) => setCurrentSection({
                      ...currentSection, 
                      count: parseInt(e.target.value) || 1
                    })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Marks per Question</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={currentSection.marks}
                    onChange={(e) => setCurrentSection({
                      ...currentSection, 
                      marks: parseInt(e.target.value) || 1
                    })} 
                  />
                </div>
              </div>

              <Button onClick={handleAddSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>

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
                            <p className="text-sm font-medium">
                              Total: {section.count * section.marks} marks
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSection(index)}
                          >
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
      <HeaderDetailsDialog
        open={showHeaderDialog}
        onOpenChange={setShowHeaderDialog}
        onSubmit={handleHeaderDetailsSubmit}
        loading={isGeneratingPDF}
      />
    </DashboardLayout>
  )
}

