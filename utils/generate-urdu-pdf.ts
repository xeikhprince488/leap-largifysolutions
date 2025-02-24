import html2pdf from "html2pdf.js"
import axios from "axios"


// Types
interface Question {
  id: string
  type: "mcq" | "short" | "long"
  english?: string
  urdu?: string
  marks?: number
  image?: string
  options?: Array<string | { english: string; urdu: string }>
}

interface SavedPaper {
  id: string
  _id: string
  title: string
  fileName: string
  pdfContent: string
  createdAt: string
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
    questionTypes: string[]
    totalQuestions: number
    sections: Array<{
      type: string
      heading: string
      count: number
      marks: number
    }>
  }
}

// Storage Management Functions
function manageStorage() {
  try {
    clearOldData()
    let totalSize = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        totalSize += localStorage.getItem(key)?.length || 0
      }
    }

    const quota = 5 * 1024 * 1024 // 5MB typical quota
    if (totalSize > quota * 0.7) {
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

      paperKeys.sort((a, b) => a.timestamp - b.timestamp)

      while (totalSize > quota * 0.5 && paperKeys.length > 0) {
        const oldest = paperKeys.shift()
        if (oldest) {
          const removedItem = localStorage.getItem(oldest.key)
          localStorage.removeItem(oldest.key)
          totalSize -= removedItem?.length || 0
        }
      }

      if (totalSize > quota * 0.7) {
        localStorage.removeItem("saved-papers-storage")
      }
    }
  } catch (error) {
    console.error("Error managing storage:", error)
    clearAllStorage()
  }
}

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
          keysToRemove.push(key)
        }
      }
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key))
}

function saveData(key: string, data: any) {
  try {
    if (key === "saved-papers-storage") {
      manageStorage()
    }

    if (data.pdfContent) {
      data.pdfContent = data.pdfContent.replace(/\s+/g, " ").trim()
    }

    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn("Storage quota exceeded. Attempting to free space...")
      if (key === "saved-papers-storage") {
        clearAllStorage()
      } else {
        manageStorage()
      }

      try {
        localStorage.setItem(key, JSON.stringify(data))
      } catch (retryError) {
        console.error("Failed to save data after clearing space:", retryError)
        if (data.pdfContent) {
          const dataWithoutPDF = { ...data, pdfContent: null }
          try {
            localStorage.setItem(key, JSON.stringify(dataWithoutPDF))
          } catch (finalError) {
            console.error("Failed to save even without PDF content:", finalError)
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

// MongoDB Integration Functions
async function savePaperToMongoDB(savedPaper: SavedPaper) {
  try {
    await axios.post("/api/save-paper", savedPaper)
  } catch (error) {
    console.error("Error saving paper to MongoDB:", error)
  }
}

async function saveDownloadedPaperToMongoDB(savedPaper: SavedPaper) {
  if (typeof window !== "undefined") return
  try {
    await axios.post("/api/save-downloaded-paper", savedPaper)
  } catch (error) {
    console.error("Error saving downloaded paper to MongoDB:", error)
  }
}

// Main PDF Generation Function
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
    sections: Array<{
      type: string
      heading: string
      count: number
      marks: number
    }>
  },
): Promise<{ success: boolean; pdfData?: string }> {
  return new Promise((resolve) => {
    // Create container for PDF content
    const container = document.createElement("div")
    container.style.width = "210mm"
    container.style.padding = "10mm"
    container.style.position = "absolute"
    container.style.left = "-9999px"
    container.style.backgroundColor = "white"
    container.style.border = "1px solid black"

    // Add watermark
    const watermarkContainer = document.createElement("div")
    watermarkContainer.style.position = "absolute"
    watermarkContainer.style.top = "50%"
    watermarkContainer.style.left = "50%"
    watermarkContainer.style.transform = "translate(-50%, -50%)"
    watermarkContainer.style.opacity = "0.35"
    watermarkContainer.style.pointerEvents = "none"
    watermarkContainer.style.zIndex = "1000"

    const watermark = document.createElement("img")
    watermark.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM%20(1)-9d9PlEPwDS8Ywj039V6swth9aeyGkU.jpeg"
    watermark.style.width = "120mm"
    watermark.style.height = "120mm"
    watermarkContainer.appendChild(watermark)
    container.appendChild(watermarkContainer)

    // Add header
    const header = document.createElement("img")
    header.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM-s9x0BZj6iejceCDagMRdeImEuAa5yY.jpeg"
    header.style.width = "100%"
    header.style.marginBottom = "15px"
    container.appendChild(header)

    // Add metadata table
    const metadataTable = document.createElement("table")
    metadataTable.style.width = "100%"
    metadataTable.style.borderCollapse = "collapse"
    metadataTable.style.marginBottom = "15px"

    const totalMarks = questions.reduce((total, q) => total + (q.marks || 0), 0)
    const tableData = [
      [
        ["Class", metadata.grade],
        ["Paper No.", metadata.paperNo],
        ["Date", metadata.date],
        ["Time Allowed", metadata.timeAllowed],
      ],
      [
        ["Subject", metadata.subject],
        ["Total Marks", totalMarks.toString()],
        ["Day", metadata.day],
        ["Syllabus", metadata.chapter[0]],
      ],
    ]

    tableData.forEach((row) => {
      const tr = document.createElement("tr")
      row.forEach(([label, value]) => {
        const tdLabel = document.createElement("td")
        tdLabel.style.padding = "5px"
        tdLabel.style.border = "1px solid #ddd"
        tdLabel.style.backgroundColor = "#f5f5f5"
        tdLabel.style.fontWeight = "bold"
        tdLabel.textContent = label

        const tdValue = document.createElement("td")
        tdValue.style.padding = "5px"
        tdValue.style.border = "1px solid #ddd"
        tdValue.textContent = value

        tr.appendChild(tdLabel)
        tr.appendChild(tdValue)
      })
      metadataTable.appendChild(tr)
    })
    container.appendChild(metadataTable)

    // Add name and roll number fields
    const nameSection = document.createElement("div")
    nameSection.style.display = "flex"
    nameSection.style.gap = "20px"
    nameSection.style.marginBottom = "20px"

    const nameField = document.createElement("div")
    nameField.style.flex = "3"
    nameField.style.border = "1px solid black"
    nameField.style.padding = "8px"
    nameField.innerHTML = "<strong>Name:</strong> _________________________"

    const rollNoField = document.createElement("div")
    rollNoField.style.flex = "1"
    rollNoField.style.border = "1px solid black"
    rollNoField.style.padding = "8px"
    rollNoField.innerHTML = "<strong>Roll No:</strong> ________"

    nameSection.appendChild(nameField)
    nameSection.appendChild(rollNoField)
    container.appendChild(nameSection)

    // Add paper title
    const title = document.createElement("h2")
    title.style.textAlign = "center"
    title.style.margin = "20px 0"
    title.style.fontSize = "16px"
    title.style.fontWeight = "bold"
    title.textContent = "PAPER OBJECTIVE"
    container.appendChild(title)

    // Add sections with questions
    metadata.sections.forEach((section) => {
      const sectionTitle = document.createElement("h3")
      sectionTitle.style.marginTop = "20px"
      sectionTitle.style.fontSize = "14px"
      sectionTitle.style.fontWeight = "bold"
      sectionTitle.textContent = section.heading
      container.appendChild(sectionTitle)

      const sectionQuestions = questions.filter((q) => q.type === section.type)
      sectionQuestions.forEach((question, index) => {
        const questionDiv = document.createElement("div")
        questionDiv.style.marginBottom = "15px"
        questionDiv.style.position = "relative"

        // Question number
        const questionNo = document.createElement("span")
        questionNo.style.marginRight = "10px"
        questionNo.style.fontWeight = "bold"
        questionNo.textContent = `${index + 1}.`
        questionDiv.appendChild(questionNo)

        // Question text
        const questionText = document.createElement("div")
        questionText.style.display = "inline-block"
        questionText.style.marginBottom = "10px"

        if (metadata.subject.toLowerCase() === "urdu") {
          questionText.style.fontFamily = "Jameel Noori Nastaleeq, Arial"
          questionText.style.direction = "rtl"
          questionText.textContent = question.urdu || ""
        } else {
          questionText.textContent = question.english || ""
        }
        questionDiv.appendChild(questionText)

        // Handle image if present
        if (question.image) {
          const imgContainer = document.createElement("div")
          imgContainer.style.margin = "10px 0"

          const img = document.createElement("img")
          img.src = question.image
          img.style.maxWidth = "100%"
          img.style.height = "auto"
          img.style.maxHeight = "200px"

          imgContainer.appendChild(img)
          questionDiv.appendChild(imgContainer)
        }

        // Handle MCQ options
        if (question.type === "mcq" && Array.isArray(question.options)) {
          const optionsDiv = document.createElement("div")
          optionsDiv.style.marginLeft = "20px"
          optionsDiv.style.marginTop = "10px"
          optionsDiv.style.display = "grid"
          optionsDiv.style.gridTemplateColumns = "repeat(2, 1fr)"
          optionsDiv.style.gap = "10px"

          question.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement("div")
            const optionText =
              typeof option === "object"
                ? metadata.subject.toLowerCase() === "urdu"
                  ? option.urdu
                  : option.english
                : option

            if (metadata.subject.toLowerCase() === "urdu") {
              optionDiv.style.fontFamily = "Jameel Noori Nastaleeq, Arial"
              optionDiv.style.direction = "rtl"
            }

            optionDiv.textContent = `${String.fromCharCode(97 + optIndex)}) ${optionText}`
            optionsDiv.appendChild(optionDiv)
          })
          questionDiv.appendChild(optionsDiv)
        }

        // Add answer lines for short/long questions
        if (question.type === "short" || question.type === "long") {
          const answerLines = document.createElement("div")
          answerLines.style.marginLeft = "20px"
          answerLines.style.marginTop = "10px"

          const lineCount = question.type === "short" ? 3 : 6
          for (let i = 0; i < lineCount; i++) {
            const line = document.createElement("div")
            line.style.borderBottom = "1px solid #ccc"
            line.style.height = "25px"
            answerLines.appendChild(line)
          }
          questionDiv.appendChild(answerLines)
        }

        container.appendChild(questionDiv)
      })
    })

    // Add to document
    document.body.appendChild(container)

    // Configure html2pdf options
    const opt = {
      margin: 10,
      filename: `${metadata.grade.toLowerCase()}-${metadata.subject.toLowerCase()}-${metadata.paperNo}-${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait" as "portrait",
        compress: true,
      },
    }

    // Generate PDF
    html2pdf()
      .set(opt)
      .from(container)
      .save()
      .then(() => {
        // Clean up
        document.body.removeChild(container)

        // Convert to base64 for storage
        html2pdf()
          .set(opt)
          .from(container)
          .output("datauristring")
          .then((pdfData: string) => {
            const savedPaper: SavedPaper = {
              id: Date.now().toString(),
              title: `${metadata.subject} Paper - ${metadata.grade}`,
              fileName: opt.filename,
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

            // Save paper
            try {
              manageStorage()
              saveData(`saved-papers-${savedPaper.id}`, savedPaper)
              savePaperToMongoDB(savedPaper)
              saveDownloadedPaperToMongoDB(savedPaper)
              resolve({ success: true, pdfData })
            } catch (error) {
              console.error("Error saving paper:", error)
              resolve({ success: false })
            }
          })
      })
      .catch((error: any) => {
        console.error("Error generating PDF:", error)
        document.body.removeChild(container)
        resolve({ success: false })
      })
  })
}

