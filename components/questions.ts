'use server'

import { promises as fs } from 'fs'
import path from 'path'

interface Question {
  id: number
  type: 'mcq' | 'short' | 'long'
  english: string
  urdu: string
  grade: string
  subject: string
  chapter: string
  topic?: string
  marks: number
  options?: Array<{
    english: string
    urdu: string
    value: string
  }>
  correct?: string
  answer?: {
    english: string
    urdu: string
  }
  outline?: {
    english: string[]
    urdu: string[]
  }
}

interface QuestionData {
  id: number;
  type: string;
  english: string;
  urdu: string;
  options?: {
    english: string;
    urdu: string;
    value: string;
  }[];
  correct?: string;
  marks: number;
  grade: string;
  subject: string;
  chapter: string;
}

interface Questions {
  mcq: QuestionData[];
  short: QuestionData[];
  long: QuestionData[];
}

interface DataStructure {
  [key: string]: {
    [key: string]: Questions;
  };
}

export async function saveQuestion(question: Question) {
  try {
    // Determine the file path based on grade
    const fileName = `mcq-bank-${question.grade.toLowerCase()}.json`
    const filePath = path.join(process.cwd(), 'data', fileName)

    // Read existing data
    let data: DataStructure = {}
    try {
      const fileContent = await fs.readFile(filePath, 'utf16le') // Change to UTF-16
      data = JSON.parse(fileContent)
    } catch (error) {
      // If file doesn't exist, start with empty data
      console.log(`Creating new file for grade ${question.grade}`)
    }

    // Create nested structure if it doesn't exist
    const subjectKey = `${question.subject}-${question.grade}`
    if (!data[subjectKey]) {
      data[subjectKey] = {}
    }
    if (!data[subjectKey][question.chapter]) {
      data[subjectKey][question.chapter] = {
        mcq: [],
        short: [],
        long: []
      }
    }

    // Add question to appropriate array
    if (question.type === 'mcq') {
      data[subjectKey][question.chapter].mcq.push(question);
    } else if (question.type === 'short') {
      data[subjectKey][question.chapter].short.push(question);
    } else if (question.type === 'long') {
      data[subjectKey][question.chapter].long.push(question);
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf16le') // Change to UTF-16

    return { success: true, message: 'Question saved successfully' }
  } catch (error) {
    console.error('Error saving question:', error)
    return { success: false, message: 'Failed to save question' }
  }
}

