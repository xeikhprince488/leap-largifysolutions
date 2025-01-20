import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method); // Debugging line
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const client = await clientPromise
    const db = client.db("questionBank")

    const { grade, subject, chapter, question } = req.body

    if (!grade || !subject || !chapter || !question) {
      return res.status(400).json({ message: 'Invalid request body' })
    }

    const collection = db.collection(`${subject}-${grade}`)

    const result = await collection.updateOne(
      { chapter: chapter },
      { 
        $push: { 
          [`${question.type}`]: question 
        } 
      },
      { upsert: true }
    )

    if (!result.matchedCount && !result.upsertedCount) {
      return res.status(404).json({ message: 'Chapter not found' })
    }

    res.status(200).json({ success: true, message: 'Question added successfully' })
  } catch (error) {
    console.error('Error adding question:', error)
    res.status(500).json({ success: false, message: 'Error adding question' })
  }
}

