import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { subject, grade, chapters, type, count } = req.body
    console.log('Request body:', req.body)

    await client.connect()
    const database = client.db('questionBank')
    
    // Use the correct collection based on subject and grade
    const collectionName = `${subject}-${grade}`
    const collection = database.collection(collectionName)

    // Find all documents that contain questions of the specified type
    const query = {
      [`${type}`]: { $exists: true, $ne: [] }
    }

    console.log('MongoDB Query:', query)

    const documents = await collection.find(query).toArray()
    console.log('Found documents:', documents)

    // Extract all questions of the specified type from the documents
    let questions: any[] = []
    for (const doc of documents) {
      if (doc[type] && Array.isArray(doc[type])) {
        const questionsWithMeta = doc[type].map((q: any) => ({
          ...q,
          chapter: doc.chapter,
          topic: q.topic || ''
        }))
        questions.push(...questionsWithMeta)
      }
    }

    // Filter by chapters if specified
    if (chapters && chapters.length > 0) {
      questions = questions.filter(q => chapters.includes(q.chapter))
    }

    // Randomly select questions if count is specified
    if (count && questions.length > count) {
      questions = questions.sort(() => 0.5 - Math.random()).slice(0, count)
    }

    console.log(`Returning ${questions.length} questions`)
    return res.status(200).json(questions)

  } catch (error) {
    console.error('Error in API route:', error)
    return res.status(500).json({ error: 'Failed to fetch questions' })
  } finally {
    await client.close()
  }
}

