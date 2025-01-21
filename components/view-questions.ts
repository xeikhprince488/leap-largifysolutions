'use server'

import { promises as fs } from 'fs'
import path from 'path'

export async function getQuestions(grade: string, subject: string, chapter: string) {
  try {
    const fileName = `mcq-bank-${grade.toLowerCase()}.json`
    const filePath = path.join(process.cwd(), 'data', fileName)

    const fileContent = await fs.readFile(filePath, 'utf16le') // Change to UTF-16
    const data = JSON.parse(fileContent)

    const subjectKey = `${subject}-${grade}`
    return data[subjectKey]?.[chapter] || { mcq: [], short: [], long: [] }
  } catch (error) {
    console.error('Error fetching questions:', error)
    return { mcq: [], short: [], long: [] }
  }
}

export async function deleteQuestion(grade: string, subject: string, chapter: string, questionId: number, type: 'mcq' | 'short' | 'long') {
  try {
    const fileName = `mcq-bank-${grade.toLowerCase()}.json`
    const filePath = path.join(process.cwd(), 'data', fileName)

    const fileContent = await fs.readFile(filePath, 'utf16le') // Change to UTF-16
    const data = JSON.parse(fileContent)

    const subjectKey = `${subject}-${grade}`
    
    // Filter out the question to delete
    data[subjectKey][chapter][type] = data[subjectKey][chapter][type].filter(
      (q: any) => q.id !== questionId
    )

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf16le') // Change to UTF-16
    return { success: true, message: 'Question deleted successfully' }
  } catch (error) {
    console.error('Error deleting question:', error)
    return { success: false, message: 'Failed to delete question' }
  }
}

