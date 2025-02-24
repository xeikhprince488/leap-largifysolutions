import {
    Document,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    ImageRun,
    Header,
    Footer,
    AlignmentType,
    WidthType,
    BorderStyle,
    ShadingType,
    convertMillimetersToTwip,
    HeightRule,
    PageOrientation,
    IStylesOptions,
    Packer,
  } from "docx"
  import axios from "axios"
  import type { Question } from "@/types/questions"

  interface GenerateWordResult {
    success: boolean;
    docxBuffer?: Buffer;
    error?: string;
  }
  
  interface GenerateWordMetadata {
    grade: string;
    paperNo: string;
    date: string;
    timeAllowed: string;
    subject: string;
    totalMarks: string;
    day: string;
    category: string;
    topic: string;
    chapter: string[];
    sections: {
      type: string;
      heading: string;
      marks: number;
    }[];
  }
  
  function createWatermark(): Paragraph {
    return new Paragraph({
      children: [
        new ImageRun({
          data: Buffer.from(""), // Will be replaced with actual watermark image data
          transformation: {
            width: 120,
            height: 120,
          },
          floating: {
            horizontalPosition: {
              relative: "page",
              align: "center",
            },
            verticalPosition: {
              relative: "page",
              align: "center",
            },
          },
          type: "jpg", // Specify the type of the image
        }),
      ],
    });
  }

  function createHeaderWithLogo(): Header {
    return new Header({
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              data: Buffer.from(""), // Will be replaced with actual header image data
              transformation: {
                width: 190,
                height: 15,
              },
              floating: {
                horizontalPosition: {
                  relative: "page",
                  offset: convertMillimetersToTwip(10), // 10mm from left
                },
                verticalPosition: {
                  relative: "page",
                  offset: convertMillimetersToTwip(10), // 10mm from top
                },
              },
              type: "jpg", // Specify the type of the image
            }),
          ],
        }),
      ],
    });
  }
  
  function createMetadataTable(metadata: GenerateWordMetadata): Table {
    return new Table({
      width: {
        size: 190,
        type: WidthType.DXA,
      },
      margins: {
        top: convertMillimetersToTwip(2),
        bottom: convertMillimetersToTwip(2),
        left: convertMillimetersToTwip(10), // 10mm from left
        right: convertMillimetersToTwip(10), // 10mm from right
      },
      rows: [
        new TableRow({
          height: {
            value: convertMillimetersToTwip(6),
            rule: HeightRule.EXACT,
          },
          children: [
            createMetadataCell("Class", metadata.grade, true),
            createMetadataCell("Paper No.", metadata.paperNo, true),
            createMetadataCell("Date", metadata.date, true),
            createMetadataCell("Time Allowed", metadata.timeAllowed, true),
          ],
        }),
        new TableRow({
          height: {
            value: convertMillimetersToTwip(6),
            rule: HeightRule.EXACT,
          },
          children: [
            createMetadataCell("Subject", metadata.subject, true),
            createMetadataCell("Total Marks", metadata.totalMarks, true),
            createMetadataCell("Day", metadata.day, true),
            createMetadataCell("Syllabus", metadata.chapter[0], true),
          ],
        }),
      ],
    })
  }
  
  function createMetadataCell(label: string, value: string, shaded: boolean = false): TableCell {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: label + ": ",
              size: 18,
              bold: true,
            }),
            new TextRun({
              text: value,
              size: 18,
            }),
          ],
        }),
      ],
      shading: shaded ? {
        fill: "DCDCDC", // Exactly 220,220,220 in hex
        type: ShadingType.CLEAR,
      } : undefined,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      },
    })
  }
  
  function createNameRollNoSection(): Table {
    return new Table({
      width: {
        size: 190,
        type: WidthType.DXA,
      },
      margins: {
        top: convertMillimetersToTwip(2),
        bottom: convertMillimetersToTwip(2),
        left: convertMillimetersToTwip(10),
        right: convertMillimetersToTwip(10),
      },
      rows: [
        new TableRow({
          height: {
            value: convertMillimetersToTwip(8),
            rule: HeightRule.EXACT,
          },
          children: [
            new TableCell({
              width: {
                size: 140,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name",
                      size: 24,
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 50,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Roll No.",
                      size: 24,
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  }
  
  function createQuestionParagraphs(question: Question, index: number, totalMarks: number): Paragraph[] {
    const paragraphs: Paragraph[] = []
  
    // Question with number and marks
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. `,
            size: 24,
            bold: true,
          }),
          new TextRun({
            text: `(${totalMarks}) `,
            size: 24,
          }),
          new TextRun({
            text: question.urdu || "",
            size: 24,
            font: "Jameel Noori Nastaleeq",
          }),
        ],
        indent: {
          left: convertMillimetersToTwip(13), // 13mm left margin
        },
        spacing: {
          before: convertMillimetersToTwip(5),
          after: convertMillimetersToTwip(5),
        },
      }),
    )
  
    // MCQ options
    if (question.type === "mcq" && Array.isArray(question.options)) {
      question.options.forEach((option: any, optIndex: number) => {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${String.fromCharCode(65 + optIndex)}) ${typeof option === "object" ? option.urdu : option}`,
                size: 24,
                font: "Jameel Noori Nastaleeq",
              }),
            ],
            indent: {
              left: convertMillimetersToTwip(18), // 18mm for options
            },
            spacing: {
              before: convertMillimetersToTwip(2),
              after: convertMillimetersToTwip(2),
            },
          }),
        )
      })
    }
  
    // Answer lines for short/long questions
    if (question.type === "short" || question.type === "long") {
      const lineCount = question.type === "short" ? 3 : 6
      for (let i = 0; i < lineCount; i++) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "_".repeat(80),
                color: "C8C8C8", // 200,200,200 in hex
              }),
            ],
            spacing: {
              line: convertMillimetersToTwip(7), // 7mm between lines
            },
          }),
        )
      }
    }
  
    return paragraphs
  }
  
  export async function generateUrduWord(
    questions: Question[],
    metadata: GenerateWordMetadata,
  ): Promise<GenerateWordResult> {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: convertMillimetersToTwip(5),
                  right: convertMillimetersToTwip(5),
                  bottom: convertMillimetersToTwip(5),
                  left: convertMillimetersToTwip(5),
                },
                borders: {
                  pageBorderTop: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                    space: convertMillimetersToTwip(5),
                  },
                  pageBorderRight: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                    space: convertMillimetersToTwip(5),
                  },
                  pageBorderBottom: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                    space: convertMillimetersToTwip(5),
                  },
                  pageBorderLeft: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                    space: convertMillimetersToTwip(5),
                  },
                },
              },
            },
            headers: {
              default: createHeaderWithLogo(),
            },
            children: [
              createWatermark(),
              createMetadataTable(metadata),
              createNameRollNoSection(),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PAPER OBJECTIVE",
                    size: 22,
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                  before: convertMillimetersToTwip(10),
                  after: convertMillimetersToTwip(5),
                },
              }),
              ...metadata.sections.flatMap((section) => {
                const sectionQuestions = questions.filter((q) => q.type === section.type)
                return [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: section.heading,
                        size: 24,
                        bold: true,
                      }),
                    ],
                    spacing: {
                      before: convertMillimetersToTwip(8),
                      after: convertMillimetersToTwip(4),
                    },
                  }),
                  ...sectionQuestions.flatMap((question, index) =>
                    createQuestionParagraphs(question, index, section.marks)
                  ),
                ]
              }),
            ],
          },
        ],
      })
  
      const buffer = await Packer.toBuffer(doc)
      return { success: true, docxBuffer: buffer }
    } catch (error) {
      console.error("Error generating Word document:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" }
    }
  }