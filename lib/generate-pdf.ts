import type { Question } from "@/types/questions"

declare const html2pdf: any

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
    // Create a container that's temporarily visible for proper rendering
    const container = document.createElement("div")

    // Set explicit dimensions and styles
    container.style.width = "210mm"
    container.style.minHeight = "297mm"
    container.style.position = "absolute"
    container.style.top = "0"
    container.style.left = "0"
    container.style.zIndex = "-9999"
    container.style.backgroundColor = "white"
    container.style.padding = "20mm"
    container.style.boxSizing = "border-box"
    container.style.overflow = "hidden"

    // Function to create and append content
    const createContent = async () => {
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
      watermark.crossOrigin = "anonymous"
      watermarkContainer.appendChild(watermark)
      container.appendChild(watermarkContainer)

      // Add header
      const header = document.createElement("img")
      header.src =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-20%20at%2010.03.11%20AM-s9x0BZj6iejceCDagMRdeImEuAa5yY.jpeg"
      header.style.width = "100%"
      header.style.marginBottom = "15px"
      header.crossOrigin = "anonymous"
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
          tdLabel.style.padding = "8px"
          tdLabel.style.border = "1px solid #ddd"
          tdLabel.style.backgroundColor = "#f5f5f5"
          tdLabel.style.fontWeight = "bold"
          tdLabel.textContent = label

          const tdValue = document.createElement("td")
          tdValue.style.padding = "8px"
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
          questionDiv.style.pageBreakInside = "avoid"

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
            questionText.style.fontFamily = "Noto Nastaliq Urdu, Arial"
            questionText.style.direction = "rtl"
            questionText.textContent = question.urdu || ""
          } else {
            questionText.textContent = question.english || ""
          }
          questionDiv.appendChild(questionText)

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
                optionDiv.style.fontFamily = "Noto Nastaliq Urdu, Arial"
                optionDiv.style.direction = "rtl"
              }

              optionDiv.textContent = `${String.fromCharCode(97 + optIndex)}) ${optionText}`
              optionsDiv.appendChild(optionDiv)
            })
            questionDiv.appendChild(optionsDiv)
          }

          container.appendChild(questionDiv)
        })
      })
    }

    // Add container to document and create content
    document.body.appendChild(container)
    createContent().then(() => {
      // Wait for images to load and content to render
      const images = container.getElementsByTagName("img")
      const imagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null)
          } else {
            img.onload = () => resolve(null)
            img.onerror = () => resolve(null)
          }
        })
      })

      Promise.all(imagePromises).then(() => {
        // Force layout recalculation
        container.offsetHeight

        // Configure html2pdf options
        const opt = {
          margin: [10, 10, 10, 10],
          filename: `${metadata.grade.toLowerCase()}-${metadata.subject.toLowerCase()}-${metadata.paperNo}-${new Date().toISOString().split("T")[0]}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: true,
            allowTaint: true,
            foreignObjectRendering: true,
            scrollY: 0,
            windowWidth: container.offsetWidth,
            windowHeight: container.offsetHeight,
            onclone: (clonedDoc: Document) => {
              const clonedContainer = clonedDoc.querySelector("div")
              if (clonedContainer) {
                clonedContainer.style.position = "static"
                clonedContainer.style.height = "auto"
                clonedContainer.style.overflow = "visible"
              }
            },
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: true,
            hotfixes: ["px_scaling"],
          },
        }

        // Generate PDF
        html2pdf()
          .from(container)
          .set(opt)
          .save()
          .then(() => {
            // Clean up
            document.body.removeChild(container)
            resolve({ success: true })
          })
          .catch((error: any) => {
            console.error("Error generating PDF:", error)
            document.body.removeChild(container)
            resolve({ success: false })
          })
      })
    })
  })
}

