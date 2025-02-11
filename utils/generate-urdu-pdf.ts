import jsPDF from "jspdf"
import "jspdf-autotable"
import type { Question } from "@/types/questions"
import type { SavedPaper } from "@/types/saved-papers"
import useSavedPapersStore from "@/store/saved-papers"
import axios from "axios"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

// Function to clean and normalize Urdu text
function cleanUrduText(text: string): string {
  const replacements: { [key: string]: string } = {
    "þ©": "ص",
    "þ®": "خ",
    "þ": "ا",
    "û¨": "ر",
    þâ: "ش",
    þÀ: "س",
    þã: "د",
    þî: "ز",
    þç: "ه",
    ûV: "ن",
    "û}": "م",
    þæ: "ع",
    þä: "غ",
    "þ'": "ب", // Fixed: escaped single quote
    "þ•": "ط",
    û: "ظ",
    þÉ: "ف",
    "þ—": "ت",
    "û¯": "ق",
    þŒ: "ث",
    ûÿ: "پ",
    "û'": "ک",
    þß: "ج",
    'û"': "گ",
    þè: "چ",
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
    v: "",
    k: "",
    h: "",
    g: "",
    j: "",
  }

  return text
    .split("")
    .map((char) => replacements[char] || char)
    .join("")
}

// Helper function to reverse Urdu text for right-to-left rendering
function reverseUrduText(text: string): string {
  return text.split("").reverse().join("")
}

// Function to render Urdu text
function renderUrduText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  options: { align?: string; maxWidth?: number } = {},
) {
  const { align = "right", maxWidth = 180 } = options
  const cleanedText = cleanUrduText(text)
  const reversedText = reverseUrduText(cleanedText)

  // Split text into lines
  const lines = doc.splitTextToSize(reversedText, maxWidth)

  lines.forEach((line: string, index: number) => {
    let xPos = x
    if (align === "right") {
      xPos = x + maxWidth - doc.getTextWidth(line)
    } else if (align === "center") {
      xPos = x + (maxWidth - doc.getTextWidth(line)) / 2
    }
    doc.text(line, xPos, y + index * 7)
  })

  return y + lines.length * 7
}

export async function generateUrduPDF(
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
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)

    // Add metadata
    let yPos = 20
    renderUrduText(doc, `درجہ: ${metadata.grade}`, 10, yPos)
    renderUrduText(doc, `مضمون: ${metadata.subject}`, 10, (yPos += 10))
    renderUrduText(doc, `پرچہ نمبر: ${metadata.paperNo}`, 10, (yPos += 10))
    renderUrduText(doc, `تاریخ: ${metadata.date}`, 10, (yPos += 10))

    yPos += 20

    // Render sections and questions
    metadata.sections.forEach((section, sectionIndex) => {
      renderUrduText(doc, section.heading, 10, yPos, { align: "center" })
      yPos += 15

      const sectionQuestions = questions.filter((q) => q.type === section.type)
      sectionQuestions.forEach((question, index) => {
        renderUrduText(doc, `${index + 1}. ${question.urdu || question.english}`, 20, yPos)
        yPos += 10

        if (question.type === "mcq" && Array.isArray(question.options)) {
          question.options.forEach((option, optIndex) => {
            const optionText = typeof option === "object" ? option.urdu || option.english : option
            renderUrduText(doc, `${String.fromCharCode(97 + optIndex)}) ${optionText}`, 30, yPos)
            yPos += 10
          })
        }

        yPos += 5
      })
    })

    // Save the PDF
    const formattedDate = new Date().toISOString().split("T")[0]
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
      useSavedPapersStore.getState().addPaper(savedPaper)
      await axios.post("/api/save-paper", savedPaper)
      doc.save(fileName)
      return { success: true, pdfData }
    } catch (error) {
      console.error("Error saving paper:", error)
      return { success: false }
    }
  } catch (error) {
    console.error("Error generating Urdu PDF:", error)
    return { success: false }
  }
}

