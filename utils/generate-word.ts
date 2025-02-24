import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  AlignmentType,
  ImageRun,
  Header,
  convertInchesToTwip,
  HeightRule,
} from "docx"

import type { MCQQuestion } from "@/types/questions"

// Function to create the header with logo and contact info
function createHeader(headerImageBuffer: ArrayBuffer): Header {
  return new Header({
    children: [
      new Table({
        width: { size: 100, type: "pct" },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      createImageRun(headerImageBuffer, 740, 90, {
                        floating: {
                          horizontalPosition: {
                            relative: "page",
                            align: "center",
                          },
                          verticalPosition: {
                            relative: "page",
                            align: "center",
                            offset: convertInchesToTwip(0.4),
                          },
                          behindDocument: false,
                        },
                      }),
                    ],
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

// Function to create metadata table
function createMetadataTable(metadata: {
  grade: string
  subject: string
  paperNo: string
  date: string
  day: string
  timeAllowed: string
  totalMarks: string
  syllabus: string
}): Table {
  return new Table({
    width: { size: 100, type: "pct" },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    rows: [
      new TableRow({
        children: [
          createMetadataCell("Class", true),
          createMetadataCell(metadata.grade),
          createMetadataCell("Paper No.", true),
          createMetadataCell(metadata.paperNo),
          createMetadataCell("Date", true),
          createMetadataCell(metadata.date),
          createMetadataCell("Time Allowed", true),
          createMetadataCell(metadata.timeAllowed),
        ],
      }),
      new TableRow({
        children: [
          createMetadataCell("Subject", true),
          createMetadataCell(metadata.subject),
          createMetadataCell("Total Marks", true),
          createMetadataCell(metadata.totalMarks),
          createMetadataCell("Day", true),
          createMetadataCell(metadata.day, false, 3),
        ],
      }),
      new TableRow({
        children: [createMetadataCell("Syllabus", true), createMetadataCell(metadata.syllabus, false, 7)],
      }),
    ],
  })
}

// Function to create metadata cell
function createMetadataCell(text: string, isHeader = false, colSpan?: number): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isHeader,
            size: 20,
          }),
        ],
        alignment: AlignmentType.LEFT,
      }),
    ],
    columnSpan: colSpan,
    shading: isHeader ? { fill: "F0F0F0" } : undefined,
    margins: {
      top: convertInchesToTwip(0.05),
      bottom: convertInchesToTwip(0.05),
      left: convertInchesToTwip(0.1),
      right: convertInchesToTwip(0.1),
    },
  })
}

// Function to create Name and Roll No section
function createNameRollTable(): Table {
  return new Table({
    width: { size: 100, type: "pct" },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    rows: [
      new TableRow({
        height: { value: convertInchesToTwip(0.4), rule: HeightRule.EXACT },
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Name",
                    bold: true,
                    size: 24,
                    color: "FFFFFF",
                  }),
                ],
              }),
            ],
            width: { size: 75, type: "pct" },
            shading: { fill: "000000" },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Roll No.",
                    bold: true,
                    size: 24,
                    color: "FFFFFF",
                  }),
                ],
              }),
            ],
            width: { size: 25, type: "pct" },
            shading: { fill: "000000" },
          }),
        ],
      }),
      // Add empty row for writing
      new TableRow({
        height: { value: convertInchesToTwip(0.4), rule: HeightRule.EXACT },
        children: [
          new TableCell({
            children: [new Paragraph({})],
            width: { size: 75, type: "pct" },
          }),
          new TableCell({
            children: [new Paragraph({})],
            width: { size: 25, type: "pct" },
          }),
        ],
      }),
    ],
  })
}

// Function to create MCQ section
function createMCQSection(questions: MCQQuestion[]): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [
    // PAPER OBJECTIVE heading
    new Paragraph({
      children: [
        new TextRun({
          text: "PAPER OBJECTIVE",
          bold: true,
          size: 24,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: convertInchesToTwip(0.2), after: convertInchesToTwip(0.2) },
    }),
    // Note paragraph
    new Paragraph({
      children: [
        new TextRun({
          text: "Note: ",
          bold: true,
          size: 20,
        }),
        new TextRun({
          text: "You have four choices for each question as A, B, C and D. The choice you think is correct. Use marker or pen to tick the option. Cutting or Tick two or more options will result in zero mark in that question",
          size: 20,
        }),
      ],
      spacing: { before: convertInchesToTwip(0.1), after: convertInchesToTwip(0.2) },
    }),
    // Q.1 heading with marks
    new Paragraph({
      children: [
        new TextRun({
          text: "Q.1 ",
          bold: true,
          size: 22,
        }),
        new TextRun({
          text: "Choose the correct option.",
          size: 22,
        }),
        new TextRun({
          text: "                                                                    ",
          size: 22,
        }),
        new TextRun({
          text: "(12×1=12)",
          bold: true,
          size: 22,
        }),
      ],
      spacing: { before: convertInchesToTwip(0.2), after: convertInchesToTwip(0.2) },
    }),
  ]

  // Add questions
  questions.forEach((question, index) => {
    // Question text
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. `,
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: question.english,
            size: 22,
          }),
          ...(question.urdu
            ? [
                new TextRun({
                  text: "\n" + question.urdu,
                  size: 22,
                  rightToLeft: true,
                }),
              ]
            : []),
        ],
        spacing: { before: convertInchesToTwip(0.2), after: convertInchesToTwip(0.1) },
        indent: { left: convertInchesToTwip(0.3) },
      }),
    )

    // Options table
    elements.push(
      new Table({
        width: { size: 100, type: "pct" },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: question.options.map((option) => {
              return new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `(${option.value}) ${option.english}`,
                        size: 22,
                      }),
                      ...(option.urdu
                        ? [
                            new TextRun({
                              text: "\n" + option.urdu,
                              size: 22,
                              rightToLeft: true,
                            }),
                          ]
                        : []),
                    ],
                  }),
                ],
                width: { size: 25, type: "pct" },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                margins: {
                  left: convertInchesToTwip(0.5),
                },
              })
            }),
          }),
        ],
      }),
    )

    // Spacing after options
    elements.push(
      new Paragraph({
        spacing: { before: convertInchesToTwip(0.1), after: convertInchesToTwip(0.1) },
      }),
    )
  })

  return elements
}

// Function to create an image run
function createImageRun(
  data: ArrayBuffer,
  width: number,
  height: number,
  options: {
    floating: {
      horizontalPosition: {
        relative:
          | "character"
          | "column"
          | "insideMargin"
          | "leftMargin"
          | "margin"
          | "outsideMargin"
          | "page"
          | "rightMargin"
        align: "center" | "left" | "right" | "inside" | "outside"
      }
      verticalPosition: {
        relative:
          | "insideMargin"
          | "margin"
          | "outsideMargin"
          | "page"
          | "bottomMargin"
          | "line"
          | "paragraph"
          | "topMargin"
        align: "center" | "inside" | "outside" | "bottom" | "top"
        offset?: number
      }
      margins?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
      }
      behindDocument?: boolean
    }
  },
): ImageRun {
  return new ImageRun({
    data,
    transformation: {
      width,
      height,
    },
    floating: options.floating,
    type: "jpg",
  })
}

// Main function to generate the Word document
export async function generateWord(
  questions: MCQQuestion[],
  metadata: {
    grade: string
    subject: string
    paperNo: string
    date: string
    day: string
    timeAllowed: string
    totalMarks: string
    syllabus: string
  },
): Promise<{ success: boolean; docData?: string; error?: string }> {
  try {
    // Load header image
    const headerImageBuffer = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/page0001.jpg-wKOXAb3ycEGPXrBIcEyu2twEuwve2d.jpeg",
    ).then((res) => res.arrayBuffer())

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.5),
                right: convertInchesToTwip(0.5),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.5),
              },
              borders: {
                pageBorderTop: { style: BorderStyle.SINGLE, size: 2, space: 24, color: "000000" },
                pageBorderRight: { style: BorderStyle.SINGLE, size: 2, space: 24, color: "000000" },
                pageBorderBottom: { style: BorderStyle.SINGLE, size: 2, space: 24, color: "000000" },
                pageBorderLeft: { style: BorderStyle.SINGLE, size: 2, space: 24, color: "000000" },
              },
            },
          },
          headers: {
            default: createHeader(headerImageBuffer),
          },
          children: [
            createMetadataTable(metadata),
            new Paragraph({ spacing: { before: convertInchesToTwip(0.2), after: convertInchesToTwip(0.2) } }),
            createNameRollTable(),
            ...createMCQSection(questions),
          ],
        },
      ],
    })

    // Generate buffer
    const buffer = await Packer.toBuffer(doc)

    // Create filename
    const fileName = `${metadata.subject.toLowerCase()}-${metadata.paperNo}-${metadata.date}.docx`

    // Create blob URL
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const docData = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.href = docData
    link.download = fileName
    link.click()

    return { success: true, docData }
  } catch (error) {
    console.error("Error generating Word document:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

