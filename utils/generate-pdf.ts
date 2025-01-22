import jsPDF, { GState } from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
    lastQuestionHeight?: number
    setR2L: (isRTL: boolean) => jsPDF
  }
}
import type { Question } from "@/types/questions"
import type { SavedPaper } from "@/types/saved-papers"
import useSavedPapersStore from "@/store/saved-papers"
import axios from "axios"

function manageStorage() {
  const { papers } = useSavedPapersStore.getState()
  const maxPapers = 5 // Reduce the number of stored papers
  const totalPapers = Object.values(papers).reduce(
    (acc, paperArray) => acc + (paperArray as unknown as SavedPaper[]).length,
    0,
  )
  if (totalPapers > maxPapers) {
    // Sort papers by creation date, oldest first
    const sortedPapers = Object.values(papers).flat() as unknown as SavedPaper[]
    sortedPapers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    // Remove oldest papers until we're at or below the limit
    while (sortedPapers.length > maxPapers) {
      const oldestPaper = sortedPapers.shift()
      if (oldestPaper) {
        useSavedPapersStore.getState().removePaper(oldestPaper.id)
      }
    }
  }
}

async function savePaperToMongoDB(savedPaper: SavedPaper) {
  try {
    await axios.post("/api/save-paper", savedPaper)
  } catch (error) {
    console.error("Error saving paper to MongoDB:", error)
  }
}

async function saveDownloadedPaperToMongoDB(savedPaper: SavedPaper) {
  try {
    await axios.post("/api/save-downloaded-paper", savedPaper)
  } catch (error) {
    console.error("Error saving downloaded paper to MongoDB:", error)
  }
}

function checkSpaceForSection(yPos: number, sectionHeight: number): boolean {
  return 270 - yPos >= sectionHeight
}

function wrapText(doc: jsPDF, text: string | undefined, maxWidth: number): string[] {
  if (!text) return [] // Add this line to handle undefined text
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    const width = doc.getTextWidth(currentLine + " " + word)
    if (width < maxWidth) {
      currentLine += (currentLine ? " " : "") + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function ensureSingleQuestionPerLine(
  doc: jsPDF,
  question: string | undefined,
  yPos: number,
  leftMargin: number,
  isRTL = false,
): number {
  if (!question) return yPos // Add this line to handle undefined question
  const maxQuestionWidth = 175
  const questionLines = wrapText(doc, question, maxQuestionWidth)

  // Set text alignment based on language
  doc.setR2L(isRTL)

  // For RTL text, adjust the margin to right side
  const textMargin = isRTL ? doc.internal.pageSize.width - leftMargin - maxQuestionWidth : leftMargin

  // Print question text
  questionLines.forEach((line, lineIndex) => {
    doc.text(line, textMargin, yPos + lineIndex * 5)
  })

  // Reset R2L setting
  doc.setR2L(false)

  return yPos + questionLines.length * 5 + 2
}

function calculateOptionLayout(
  doc: jsPDF,
  options: any[],
  pageWidth: number,
): {
  optionsPerRow: number
  optionWidth: number
} {
  const availableWidth = pageWidth - 30 // Subtract margins
  const quarterWidth = availableWidth / 4
  const halfWidth = availableWidth / 2

  // Calculate the maximum width needed for any option
  const maxOptionWidth = options.reduce((max, opt) => {
    const optText = typeof opt === "object" && opt !== null ? opt.english || opt.urdu : String(opt)
    const optionText = `x) ${optText}` // Add space for option letter
    const width = doc.getTextWidth(optionText)
    return Math.max(max, width)
  }, 0)

  // If any option exceeds quarter width, try half width
  if (maxOptionWidth > quarterWidth) {
    // If any option exceeds half width, use full width
    if (maxOptionWidth > halfWidth) {
      return {
        optionsPerRow: 1,
        optionWidth: availableWidth,
      }
    }
    return {
      optionsPerRow: 2,
      optionWidth: halfWidth - 10, // Subtract some padding
    }
  }

  // Default to quarter width (4 options per row)
  return {
    optionsPerRow: 4,
    optionWidth: quarterWidth - 5, // Subtract some padding
  }
}

function renderMCQOptions(doc: jsPDF, options: any[], startY: number, leftMargin: number, isRTL: boolean): number {
  const pageWidth = doc.internal.pageSize.width
  const { optionsPerRow, optionWidth } = calculateOptionLayout(doc, options, pageWidth)

  let currentY = startY
  let maxHeightInRow = 0

  options.forEach((opt, index) => {
    const optionLetter = String.fromCharCode(97 + index) // a, b, c, d
    const optionText = typeof opt === "object" && opt !== null ? (isRTL ? opt.urdu : opt.english) : String(opt)
    const fullText = `${optionLetter}) ${optionText}`

    // Calculate position
    const column = index % optionsPerRow
    if (column === 0 && index > 0) {
      currentY += maxHeightInRow + 2 // Reduced spacing between rows
      maxHeightInRow = 0
    }

    // Calculate x position based on column
    const xPos = leftMargin + column * (optionWidth + 5)

    // Wrap text and render
    const wrappedLines = wrapText(doc, fullText, optionWidth)
    doc.setR2L(isRTL)

    wrappedLines.forEach((line, lineIndex) => {
      const yPos = currentY + lineIndex * 5
      const textX = isRTL ? doc.internal.pageSize.width - xPos - doc.getTextWidth(line) : xPos
      doc.text(line, textX, yPos)
    })

    doc.setR2L(false)

    // Update max height for current row
    const optionHeight = wrappedLines.length * 5
    maxHeightInRow = Math.max(maxHeightInRow, optionHeight)
  })

  return currentY + maxHeightInRow // Return final Y position
}

export async function generatePDF(
  questions: Question[],
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
    sections: { type: string; heading: string; count: number; marks: number }[]
  },
): Promise<boolean> {
  try {
    const doc = new jsPDF()
    doc.setDrawColor(0)
    doc.setLineWidth(0.5)
    doc.rect(5, 5, 200, 287) // Outer border for the entire paper

    // Function to add watermark to a page
    function addWatermark(doc: jsPDF) {
      const watermarkImage = new Image()
      watermarkImage.src =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM%20(1)-9d9PlEPwDS8Ywj039V6swth9aeyGkU.jpeg"
      // Calculate center position
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height
      const watermarkWidth = 120 // Width in mm
      const watermarkHeight = 120 // Height in mm
      const x = (pageWidth - watermarkWidth) / 2
      const y = (pageHeight - watermarkHeight) / 2

      // Add watermark with increased opacity (35%)
      doc.saveGraphicsState()
      doc.setGState(new GState({ opacity: 0.35 }))
      doc.addImage(watermarkImage, "JPEG", x, y, watermarkWidth, watermarkHeight)
      doc.restoreGraphicsState()
    }

    // Add watermark to first page
    addWatermark(doc)

    // Add header image
    const headerImage = new Image()
    headerImage.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM-s9x0BZj6iejceCDagMRdeImEuAa5yY.jpeg"
    doc.addImage(headerImage, "JPEG", 10, 10, 190, 15)

    // Add metadata table with shaded headers
    doc.setFillColor(220, 220, 220)
    doc.rect(10, 30, 190, 6, "F")

    // Table headers
    const totalMarks = questions.reduce((total, q) => total + (q.marks || 0), 0)
    const tableData = [
      ["Class", metadata.grade, "Paper No.", metadata.paperNo, "Date", metadata.date, "Time Allowed", "40 min"],
      [
        "Subject",
        metadata.subject,
        "Total Marks",
        totalMarks.toString(),
        "Day",
        metadata.day,
        "Syllabus",
        metadata.chapter[0],
      ],
    ]

    doc.autoTable({
      startY: 30,
      head: [],
      body: tableData,
      theme: "plain",
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles: {
        0: { fontStyle: "bold" },
        2: { fontStyle: "bold" },
        4: { fontStyle: "bold" },
        6: { fontStyle: "bold" },
      },
    })

    // Name and Roll No section with borders
    doc.setDrawColor(0)
    doc.setFillColor(255, 255, 255)
    doc.setTextColor(0, 0, 0)
    doc.rect(10, 50, 140, 8)
    doc.rect(150, 50, 50, 8)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Name", 15, 55)
    doc.text("Roll No.", 155, 55)

    // PAPER OBJECTIVE
    let yPos = 65
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    // Get the text width to center it
    const paperObjectiveText = "PAPER OBJECTIVE"
    const textWidth = (doc.getStringUnitWidth(paperObjectiveText) * doc.getFontSize()) / doc.internal.scaleFactor
    const pageWidth = doc.internal.pageSize.width
    const textX = (pageWidth - textWidth) / 2
    doc.text(paperObjectiveText, textX, yPos)
    yPos += 5 // Reduced spacing after PAPER OBJECTIVE

    function addNewPageIfNeeded(yPos: number, doc: jsPDF, borderDrawn = false): [number, boolean] {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
        if (!borderDrawn) {
          doc.setDrawColor(0)
          doc.setLineWidth(0.5)
          doc.rect(5, 5, 200, 287) // Outer border for the new page
          addWatermark(doc) // Add watermark to new page
        }
        return [yPos, true]
      }
      return [yPos, borderDrawn]
    }

    let borderDrawn = false // Initialize borderDrawn

    // Add sections with headings
    metadata.sections.forEach((section, sectionIndex) => {
      ;[yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn)
      yPos += 8
      doc.setFont("helvetica", "bold")
      doc.text(section.heading, 10, yPos)
      yPos += 4

      const sectionQuestions = questions.filter((q) => q.type === section.type)
      sectionQuestions.forEach((question, index) => {
        ;[yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn)

        if (question.type === "mcq") {
          // MCQs
          const leftMargin = 13 // Decreased left margin for the MCQ

          yPos += 5 // Add consistent spacing before each question
          doc.setFont("helvetica", "normal")

          // Question number
          const questionNumber = (index + 1).toString()
          doc.text(`${questionNumber}.`, leftMargin, yPos)

          // Determine if content should be RTL
          const isRTL = metadata.subject.toLowerCase() === "urdu" || metadata.subject.toLowerCase() === "islamyat"

          // Handle question text
          yPos = ensureSingleQuestionPerLine(doc, question.english, yPos, leftMargin + 5, false)
          if (question.urdu) {
            yPos = ensureSingleQuestionPerLine(doc, question.urdu, yPos, leftMargin + 5, isRTL)
          }

          // Render MCQ options with new layout system
          if (Array.isArray(question.options)) {
            yPos = renderMCQOptions(doc, question.options, yPos + 1, leftMargin + 5, isRTL)
            yPos += 2 // Add some spacing after options
          }
        } else {
          // Handle non-MCQ questions as before
          yPos += 6
          doc.setFont("helvetica", "normal")
          doc.text(`${index + 1}. ${question.english || ""}`, 15, yPos)
        }
      })
    })

    // Save the PDF
    const formattedDate = new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD
    const fileName = `${metadata.grade.toLowerCase()}-${metadata.subject.toLowerCase()}-${metadata.paperNo}-${formattedDate}.pdf`
    const pdfContent = doc.output("datauristring")

    const savedPaper: SavedPaper = {
      id: Date.now().toString(),
      title: `${metadata.subject} Paper - ${metadata.grade}`,
      fileName,
      pdfContent,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        questionTypes: Array.from(new Set(questions.map((q) => q.type))),
        totalQuestions: questions.length,
        category: metadata.category,
      },
      _id: ""
    }

    try {
      manageStorage() // Call manageStorage before attempting to add the new paper
      useSavedPapersStore.getState().addPaper(savedPaper)
      await savePaperToMongoDB(savedPaper) // Save paper to MongoDB
      await saveDownloadedPaperToMongoDB(savedPaper) // Save downloaded paper to MongoDB
      doc.save(fileName)
    } catch (storageError) {
      if (storageError instanceof DOMException && storageError.name === "QuotaExceededError") {
        console.warn("Storage quota exceeded. Attempting to clear more space...")
        // Try to remove more papers
        const { papers } = useSavedPapersStore.getState()
        while (Object.keys(papers).length > 0) {
          const oldestPaper = (Object.values(papers).flat() as unknown as SavedPaper[]).reduce((oldest, current) =>
            new Date(current.createdAt).getTime() < new Date(oldest.createdAt).getTime() ? current : oldest,
          )
          useSavedPapersStore.getState().removePaper(oldestPaper.id)
          // Try to add the paper again
          try {
            useSavedPapersStore.getState().addPaper(savedPaper)
            await savePaperToMongoDB(savedPaper) // Save paper to MongoDB
            await saveDownloadedPaperToMongoDB(savedPaper) // Save downloaded paper to MongoDB
            doc.save(fileName)
            break
          } catch (retryError) {
            console.error("Failed to save paper even after clearing space:", retryError)
            // Optionally, you can show a user-friendly message here
          }
        }
        if (Object.keys(papers).length === 0) {
          console.error("No papers to remove. Unable to save new paper.")
          // Optionally, you can show a user-friendly message here
        }
      } else {
        throw storageError // Re-throw if it's not a QuotaExceededError
      }
    }

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}

