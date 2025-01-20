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
    console.log('Request body:', req.body); // Debugging line

    if (!grade || !subject || !chapter || !question) {
      console.error('Invalid request body:', req.body); // Debugging line
      return res.status(400).json({ message: 'Invalid request body' })
    }

    const collection = db.collection(`${subject}-${grade}`)
    console.log('Collection name:', `${subject}-${grade}`); // Debugging line

    const result = await collection.updateOne(
      { chapter: chapter },
      { 
        $push: { 
          [`${question.type}`]: question 
        } 
      },
      { upsert: true }
    )
    console.log('Update result:', result); // Debugging line

    if (!result.matchedCount && !result.upsertedCount) {
      console.error('Chapter not found:', chapter); // Debugging line
      return res.status(404).json({ message: 'Chapter not found' })
    }

    res.status(200).json({ success: true, message: 'Question added successfully' })
  } catch (error) {
    console.error('Error adding question:', error); // Debugging line
    res.status(500).json({ success: false, message: 'Error adding question', error: error.message })
  }
}

