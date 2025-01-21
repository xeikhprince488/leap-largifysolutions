import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db("questionBank")
      
      const { grade, subject, chapter } = req.query
      console.log('Request query:', req.query); // Debugging line

      const collection = db.collection(`${subject}-${grade}`)
      console.log('Collection name:', `${subject}-${grade}`); // Debugging line
      
      const result = await collection.findOne({ chapter: chapter })
      console.log('Find result:', result); // Debugging line

      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'No questions found for this chapter' })
      }
    } catch (error) {
      console.error('Error fetching questions:', error) // Debugging line
      res.status(500).json({ message: 'Error fetching questions' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

