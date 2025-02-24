import jsPDF, { GState } from "jspdf"
import "jspdf-autotable"
import { setupUrduFont, renderUrduText } from "@/utils/pdf-helpers"
import type { Question } from "@/types/questions"
import type { SavedPaper } from "@/types/saved-papers"
import useSavedPapersStore from "@/store/saved-papers"
import axios from "axios"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
    lastQuestionHeight?: number
    setR2L: (isRTL: boolean) => jsPDF
  }
}

let ObjectId: any
if (typeof window === "undefined") {
  // Only import MongoDB-related code on the server side
  const mongodb = require("mongodb")
  ObjectId = mongodb.ObjectId
}

// Modify the manageStorage function to be more aggressive
function manageStorage() {
  try {
    // First, try to clear any expired or old data
    clearOldData()

    // Calculate total storage usage
    let totalSize = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        totalSize += localStorage.getItem(key)?.length || 0
      }
    }

    // If using more than 70% of quota (lowered from 80%), start cleaning up
    const quota = 5 * 1024 * 1024 // 5MB typical quota
    if (totalSize > quota * 0.7) {
      // Get all paper keys and their timestamps
      const paperKeys = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("saved-papers-")) {
          const item = localStorage.getItem(key)
          if (item) {
            const data = JSON.parse(item)
            paperKeys.push({ key, timestamp: new Date(data.createdAt).getTime() })
          }
        }
      }

      // Sort by oldest first
      paperKeys.sort((a, b) => a.timestamp - b.timestamp)

      // Remove oldest papers until we're under 50% quota (lowered from 60%)
      while (totalSize > quota * 0.5 && paperKeys.length > 0) {
        const oldest = paperKeys.shift()
        if (oldest) {
          const removedItem = localStorage.getItem(oldest.key)
          localStorage.removeItem(oldest.key)
          totalSize -= removedItem?.length || 0
        }
      }

      // If we still have storage issues, remove the main storage
      if (totalSize > quota * 0.7) {
        localStorage.removeItem("saved-papers-storage")
      }
    }
  } catch (error) {
    console.error("Error managing storage:", error)
    // Clear all saved papers if we can't manage storage
    clearAllStorage()
  }
}

// Add new function to clear all storage
function clearAllStorage() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith("saved-papers-")) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key))
  localStorage.removeItem("saved-papers-storage")
}

function clearOldData() {
  const now = new Date().getTime()
  const keysToRemove = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith("saved-papers-")) {
      const item = localStorage.getItem(key)
      if (item) {
        const data = JSON.parse(item)
        if (now - new Date(data.createdAt).getTime() > 30 * 24 * 60 * 60 * 1000) {
          // 30 days
          keysToRemove.push(key)
        }
      }
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key))
}

// Add this function to compress PDF data before storage
function compressPDFData(pdfData: string): string {
  // Remove unnecessary metadata and whitespace
  return pdfData.replace(/\s+/g, " ").trim()
}

// Modify the saveData function to handle the main storage key specifically
function saveData(key: string, data: any) {
  try {
    // If this is the main storage key, ensure we have space
    if (key === "saved-papers-storage") {
      manageStorage()
    }

    // Compress PDF data if present
    if (data.pdfContent) {
      data.pdfContent = compressPDFData(data.pdfContent)
    }

    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn("Storage quota exceeded. Attempting to free space...")

      // Clear all storage if this is the main storage key
      if (key === "saved-papers-storage") {
        clearAllStorage()
      } else {
        manageStorage()
      }

      try {
        localStorage.setItem(key, JSON.stringify(data))
      } catch (retryError) {
        console.error("Failed to save data after clearing space:", retryError)
        // If still failing, try without PDF content
        if (data.pdfContent) {
          const dataWithoutPDF = { ...data, pdfContent: null }
          try {
            localStorage.setItem(key, JSON.stringify(dataWithoutPDF))
          } catch (finalError) {
            console.error("Failed to save even without PDF content:", finalError)
            // As a last resort, remove all storage and try one final time
            clearAllStorage()
            try {
              localStorage.setItem(key, JSON.stringify(dataWithoutPDF))
            } catch (lastError) {
              console.error("All attempts to save data failed:", lastError)
            }
          }
        }
      }
    } else {
      console.error("Failed to save data:", error)
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
  if (typeof window !== "undefined") return // Ensure this code runs only on the server side
  try {
    // Ensure _id is a valid ObjectId
    const paperToSave = { ...savedPaper, _id: new ObjectId(savedPaper._id) }
    await axios.post("/api/save-downloaded-paper", paperToSave)
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
  if (!question) return yPos
  const maxQuestionWidth = 175
  const questionLines = wrapText(doc, question, maxQuestionWidth)

  if (isRTL && question) {
    const rightMargin = doc.internal.pageSize.width - leftMargin - maxQuestionWidth
    questionLines.forEach((line, lineIndex) => {
      renderUrduText(doc, line, rightMargin, yPos + lineIndex * 5, { maxWidth: maxQuestionWidth })
    })
  } else {
    doc.setFont("helvetica", "normal")
    questionLines.forEach((line, lineIndex) => {
      doc.text(line, leftMargin, yPos + lineIndex * 5)
    })
  }

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
      currentY += maxHeightInRow + 2
      maxHeightInRow = 0
    }

    const xPos = leftMargin + column * (optionWidth + 5)

    // Wrap text and render
    const wrappedLines = wrapText(doc, fullText, optionWidth)

    if (isRTL) {
      wrappedLines.forEach((line, lineIndex) => {
        const yPos = currentY + lineIndex * 5
        renderUrduText(doc, line, xPos, yPos, { maxWidth: optionWidth })
      })
    } else {
      doc.setFont("helvetica", "normal")
      wrappedLines.forEach((line, lineIndex) => {
        const yPos = currentY + lineIndex * 5
        doc.text(line, xPos, yPos)
      })
    }

    // Update max height for current row
    const optionHeight = wrappedLines.length * 5
    maxHeightInRow = Math.max(maxHeightInRow, optionHeight)
  })

  return currentY + maxHeightInRow
}

function renderQuestionWithImage(
  doc: jsPDF,
  question: Question,
  yPos: number,
  leftMargin: number,
  isRTL: boolean,
): number {
  // Render question text
  yPos = ensureSingleQuestionPerLine(doc, question.english, yPos, leftMargin, false)
  if (question.urdu) {
    yPos = ensureSingleQuestionPerLine(doc, question.urdu, yPos, leftMargin, isRTL)
  }

  // Render image if available
  if (question.image) {
    const imgWidth = 100 // Set a reasonable width for the image
    const imgHeight = 50 // Set a reasonable height for the image
    const imgX = leftMargin
    const imgY = yPos + 5 // Add some spacing before the image

    doc.addImage(question.image, "JPEG", imgX, imgY, imgWidth, imgHeight)
    yPos += imgHeight + 10 // Add spacing after the image
  }

  return yPos
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
): Promise<{ success: boolean; pdfData?: string }> {
  try {
    const doc = new jsPDF()
    doc.setDrawColor(0)
    doc.setLineWidth(0.5)
    doc.rect(5, 5, 200, 287) // Outer border for the entire paper

    // Setup Urdu font
    try {
      const fontLoaded = await setupUrduFont(doc)
      if (!fontLoaded) {
        console.warn("Failed to load Urdu font, falling back to basic font")
        doc.setFont("helvetica", "normal")
      }
    } catch (error) {
      console.error("Error setting up font:", error)
      doc.setFont("helvetica", "normal")
    }

    // Function to add watermark to a page
    function addWatermark(doc: jsPDF) {
      const watermarkImage = new Image()
      watermarkImage.crossOrigin = "anonymous"
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
    headerImage.crossOrigin = "anonymous"
    headerImage.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM-s9x0BZj6iejceCDagMRdeImEuAa5yY.jpeg"
    doc.addImage(headerImage, "JPEG", 10, 10, 190, 15)

    // Add metadata table with shaded headers
    doc.setFillColor(220, 220, 220)
    doc.rect(10, 30, 190, 6, "F")

    // Table headers
    const totalMarks = questions.reduce((total, q) => total + (q.marks || 0), 0)
    const tableData = [
      [
        "Class",
        metadata.grade,
        "Paper No.",
        metadata.paperNo,
        "Date",
        metadata.date,
        "Time Allowed",
        metadata.timeAllowed,
      ],
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

    let borderDrawn = false // Initialize borderDrawn

    // Add sections with headings
    metadata.sections.forEach((section) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
        if (!borderDrawn) {
          doc.setDrawColor(0)
          doc.setLineWidth(0.5)
          doc.rect(5, 5, 200, 287) // Outer border for the new page
          addWatermark(doc) // Add watermark to new page
          borderDrawn = true
        }
      }

      yPos += 8
      doc.setFont("helvetica", "bold")
      doc.text(section.heading, 10, yPos)
      yPos += 4

      const sectionQuestions = questions.filter((q) => q.type === section.type)
      sectionQuestions.forEach((question, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
          if (!borderDrawn) {
            doc.setDrawColor(0)
            doc.setLineWidth(0.5)
            doc.rect(5, 5, 200, 287) // Outer border for the new page
            addWatermark(doc) // Add watermark to new page
            borderDrawn = true
          }
        }

        const leftMargin = 13 // Decreased left margin for all question types

        yPos += 5 // Add consistent spacing before each question
        doc.setFont("helvetica", "normal")

        // Question number
        const questionNumber = (index + 1).toString()
        doc.text(`${questionNumber}.`, leftMargin, yPos)

        // Determine if content should be RTL
        const isRTL = metadata.subject.toLowerCase() === "urdu" || metadata.subject.toLowerCase() === "islamyat"

        // Handle question text and image
        yPos = renderQuestionWithImage(doc, question, yPos, leftMargin + 5, isRTL)

        if (question.type === "mcq") {
          // Render MCQ options with new layout system
          if (Array.isArray(question.options)) {
            yPos = renderMCQOptions(doc, question.options, yPos + 1, leftMargin + 5, isRTL)
            yPos += 1 // Add some spacing after options
          }
        } else if (question.type === "short" || question.type === "long") {
          // Add answer space for short and long questions
          yPos += 10 // Add some space before the answer area
          doc.setDrawColor(200, 200, 200) // Light gray color for lines
          for (let i = 0; i < (question.type === "short" ? 3 : 6); i++) {
            doc.line(leftMargin, yPos, 200, yPos)
            yPos += 7 // Space between lines
          }
          yPos += 5 // Add some space after the answer area
        }
      })
    })

    // Save the PDF
    const formattedDate = new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD
    const fileName = `${metadata.grade.toLowerCase()}-${metadata.subject.toLowerCase()}-${metadata.paperNo}-${formattedDate}.pdf`
    const pdfData = doc.output("datauristring")

    const savedPaper: SavedPaper = {
      id: Date.now().toString(),
      title: `${metadata.subject} Paper - ${metadata.grade}`,
      fileName,
      pdfContent: pdfData,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        questionTypes: Array.from(new Set(questions.map((q) => q.type))),
        totalQuestions: questions.length,
        category: metadata.category,
      },
      _id: "",
    }

    try {
      manageStorage() // Call manageStorage before attempting to add the new paper
      useSavedPapersStore.getState().addPaper(savedPaper)
      await savePaperToMongoDB(savedPaper) // Save paper to MongoDB
      await saveDownloadedPaperToMongoDB(savedPaper) // Save downloaded paper to MongoDB
      saveData("saved-papers-" + savedPaper.id, savedPaper) // Save to local storage with error handling
      doc.save(fileName)
      return { success: true, pdfData }
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
            saveData("saved-papers-" + savedPaper.id, savedPaper) // Save to local storage with error handling
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
        return { success: false }
      } else {
        throw storageError // Re-throw if it's not a QuotaExceededError
      }
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return { success: false }
  }
}

