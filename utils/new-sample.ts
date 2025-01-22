
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Question } from '@/types/questions';
import { SavedPaper } from '@/types/saved-papers';
import useSavedPapersStore from '@/store/saved-papers';


function manageStorage() {
  const { papers } = useSavedPapersStore.getState();
  const maxPapers = 5; // Reduce the number of stored papers
  const paperList = Object.values(papers).flat();
  if (paperList.length > maxPapers) {
    // Sort papers by creation date, oldest first
    const sortedPapers = Object.values(paperList).sort((a, b) => 
      new Date(a.createdAt as unknown as string).getTime() - new Date(b.createdAt as unknown as string).getTime()
    );
    // Remove oldest papers until we're at or below the limit
    while (sortedPapers.length > maxPapers) {
      const oldestPaper = sortedPapers.shift();
      if (oldestPaper) {
        if (oldestPaper) {
          if (oldestPaper) {
            if (oldestPaper) {
              if (oldestPaper) {
                if (oldestPaper) {
                  useSavedPapersStore.getState().removePaper(oldestPaper.id);
                } else {
                  console.error('No oldest paper found to remove.');
                }
              } else {
                console.error('No oldest paper found to remove.');
              }
            } else {
              console.error('No oldest paper found to remove.');
            }
          } else {
            console.error('No oldest paper found to remove.');
          }
        } else {
          console.error('No oldest paper found to remove.');
        }
      }
    }
  }
}

function checkSpaceForSection(yPos: number, sectionHeight: number): boolean {
  return (270 - yPos) >= sectionHeight;
}


interface LocalQuestion {
  type: string;
  english(english: any, maxQuestionWidth: number): unknown;
  question: string;
  options: string[];
  answer: string;
  marks: number;
}

export async function generatePDF(
  questions: LocalQuestion[],
  metadata: {
    grade: string;
    subject: string;
    chapter: string[];
  }
): Promise<boolean> {
  try {
    const doc = new jsPDF();
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287); // Outer border for the entire paper

    // Add logo
    const logoWidth = 40;
    const logoHeight = 15;
    const logo = new Image();
    logo.src = "/logo.png";
    doc.addImage(logo, 'JPEG', 10, 10, logoWidth, logoHeight);

    // Add header text in two lines
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('LEAP', 55, 15);
    doc.setFontSize(16);
    doc.text('EVENING COACHING', 55, 22);

    // Add contact information
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('155 / A-Block, Arabia Islamia Road, Burewala.', 195, 12, { align: 'right' });
    doc.text('067-3359222, 0301-6509222', 195, 16, { align: 'right' });

    // Add metadata table with shaded headers
    doc.setFillColor(220, 220, 220);
    doc.rect(10, 25, 190, 6, 'F');

    // Table headers
    const totalMarks = questions.reduce((total, q) => total + (q.marks || 0), 0);
    const tableData = [
      ['Class', metadata.grade, 'Paper No.', '18', 'Date', '10-Jan-25', 'Time Allowed', '40 min'],
      ['Subject', metadata.subject, 'Total Marks', totalMarks.toString(), 'Day', 'Friday', 'Syllabus', metadata.chapter[0]],
    ];

    doc.autoTable({
      startY: 25,
      head: [],
      body: tableData,
      theme: 'plain',
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { fontStyle: 'bold' },
        4: { fontStyle: 'bold' },
        6: { fontStyle: 'bold' },
      },
    });

    // Name and Roll No section with borders
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);
    doc.rect(10, 45, 140, 8);
    doc.rect(150, 45, 50, 8);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Name', 15, 50);
    doc.text('Roll No.', 155, 50);

    // PAPER OBJECTIVE
    let yPos = 60;
    doc.setFontSize(11);
    doc.text('PAPER OBJECTIVE', 10, yPos);
    yPos += 10;

    // Note section
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Note:', 10, yPos);
    doc.text('You have four choices for each question as 1, 2, 3 and 4. The choice you think is correct.', 25, yPos);
    yPos += 5;
    doc.text('Use marker or pen to tick option. Cutting or ticking two or more options will result in zero mark in that question.', 25, yPos);


    function addNewPageIfNeeded(yPos: number, doc: jsPDF, borderDrawn: boolean = false): [number, boolean] {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
        if (!borderDrawn) {
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);
          doc.rect(5, 5, 200, 287); // Outer border for the new page
        }
        return [yPos, true];
      }
      return [yPos, borderDrawn];
    }

    // MCQs
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Q.1    Tick (✓) mark the correct option.', 10, yPos);
    const mcqs = questions.filter(q => q.type === 'mcq');
    const marksPerMcq = mcqs[0]?.marks || 1; // Get marks from first MCQ or default to 1
    const totalMcqMarks = marksPerMcq * mcqs.length; // Multiply by number of questions
    doc.text(`${marksPerMcq}×${mcqs.length}=${totalMcqMarks}`, 170, yPos);

    // Helper function to wrap text within width
    function wrapText(text: string, maxWidth: number): string[] {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach(word => {
        const width = doc.getTextWidth(currentLine + ' ' + word);
        if (width < maxWidth) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines;
    }

    let borderDrawn = false; //Added to track if border is drawn on new page
    // Add MCQs with improved spacing and text wrapping
    mcqs.forEach((question, index) => {
      [yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn);
      yPos += 6;
      doc.setFont('helvetica', 'normal');

      // Question number
      const questionNumber = (index + 1).toString();
      doc.text(`${questionNumber}.`, 15, yPos);

      // Handle question text with wrapping
      const maxQuestionWidth = 70; // Adjust based on your needs
      const questionLines = wrapText(question.english(question.english, maxQuestionWidth) as string, maxQuestionWidth);

      // Print first line of question
      doc.text(questionLines[0], 20, yPos);

      if (questionLines.length > 1) {
        // If question has multiple lines, print remaining lines
        for (let i = 1; i < questionLines.length; i++) {
          yPos += 5;
          doc.text(questionLines[i], 20, yPos);
        }
      }

      if ('options' in question) {
        // Position options with minimal spacing
        const optionsStartX = 20 + Math.min(doc.getTextWidth(questionLines[0]), maxQuestionWidth) + 3;

        // Draw options on the same line with minimal spacing
        question.options.forEach((opt, i) => {
          const optionText = `${i + 1}) ${opt}`;
          const xPos = optionsStartX + (i * 25); // Reduced spacing between options

          // Check if option goes beyond page width
          if (xPos + doc.getTextWidth(optionText) > 195) {
            // Move to next line if option would go beyond page width
            yPos += 5;
            doc.text(optionText, 20, yPos);
          } else {
            doc.text(optionText, xPos, yPos);
          }
        });
      }

      yPos += 2; // Reduced spacing between questions
    });

    // PAPER SUBJECTIVE
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('PAPER SUBJECTIVE', 10, yPos);
    yPos += 10;
    doc.text('SECTION I', 10, yPos);
    const shortQuestions = questions.filter(q => q.type === 'short');
    const marksPerShort = shortQuestions[0]?.marks || 2; // Get marks from first short question or default to 2
    const totalShortMarks = marksPerShort * shortQuestions.length;
    doc.text(`${marksPerShort}×${shortQuestions.length}=${totalShortMarks}`, 170, yPos);

    // Short Questions
    yPos += 10;
    doc.text('Q.2    Give short answers to the following parts.', 10, yPos);

    shortQuestions.forEach((question, index) => {
      [yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn);
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.text(`${index + 1}. ${question.english}`, 15, yPos);
    });

    // SECTION II
    [yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn);
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('SECTION II', 10, yPos);
    const longQuestions = questions.filter(q => q.type === 'long');
    const marksPerLong = longQuestions[0]?.marks || 4;
    const totalLongMarks = marksPerLong * longQuestions.length;
    doc.text(`${marksPerLong}×${longQuestions.length}=${totalLongMarks}`, 170, yPos);

    // Long Questions
    yPos += 10;
    doc.text('Q.3    Attempt the following questions.', 10, yPos);

    // Check if there's enough space for all long questions
    const estimatedSectionHeight = longQuestions.length * 15; // Estimate 15 units per question
    if (!checkSpaceForSection(yPos, estimatedSectionHeight)) {
      doc.addPage();
      yPos = 20;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(5, 5, 200, 287); // Outer border for the new page
      borderDrawn = true;

      // Rewrite the section header on the new page
      doc.setFont('helvetica', 'bold');
      doc.text('SECTION II', 10, yPos);
      yPos += 10;
      doc.text('Q.3    Attempt the following questions.', 10, yPos);
      doc.text(`${marksPerLong}×${longQuestions.length}=${totalLongMarks}`, 170, yPos);
      yPos += 10;
    }

    longQuestions.forEach((question, index) => {
      [yPos, borderDrawn] = addNewPageIfNeeded(yPos, doc, borderDrawn);
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      const prefix = String.fromCharCode(65 + index);
      doc.text(`${prefix}) ${question.english}`, 15, yPos);
    });

    // Save the PDF
    const fileName = `${metadata.subject.toLowerCase()}-${metadata.grade.toLowerCase()}-${Date.now()}.pdf`;
    const pdfContent = doc.output('datauristring');

    const savedPaper: SavedPaper = {
      id: Date.now().toString(),
      title: `${metadata.subject} Paper - ${metadata.grade}`,
      fileName,
      pdfContent,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        questionTypes: Array.from(new Set(questions.map((q) => q.type))) as ("mcq" | "short" | "long")[],
        totalQuestions: questions.length,
        topic: '',
        category: ''
      },
      _id: ''
    };

    try {
      manageStorage(); // Call manageStorage before attempting to add the new paper
      useSavedPapersStore.getState().addPaper(savedPaper);
    } catch (storageError) {
      if (storageError instanceof DOMException && storageError.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded. Attempting to clear more space...');
        // Try to remove more papers
        const { papers } = useSavedPapersStore.getState();
        if (Object.keys(papers).length > 0) {
          const paperList: SavedPaper[] = Object.values(papers).flat() as unknown as SavedPaper[];
          const oldestPaper = paperList.reduce<SavedPaper | null>((oldest, current) =>
            !oldest || new Date(current.createdAt).getTime() < new Date(oldest.createdAt).getTime() ? current : oldest
          , null);
          // useSavedPapersStore.getState().removePaper(oldestPaper.id);
          // Try to add the paper again
          try {
            useSavedPapersStore.getState().addPaper(savedPaper);
          } catch (retryError) {
            console.error('Failed to save paper even after clearing space:', retryError);
            // Optionally, you can show a user-friendly message here
          }
        } else {
          console.error('No papers to remove. Unable to save new paper.');
          // Optionally, you can show a user-friendly message here
        }
      } else {
        throw storageError; // Re-throw if it's not a QuotaExceededError
      }
    }

    doc.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

