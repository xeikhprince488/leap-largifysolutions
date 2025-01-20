import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const client = await clientPromise
    const db = client.db("questionBank")
    
    const { grade, subject, chapter } = req.query
    
    const result = await db.collection(`${subject}-${grade}`).findOne({
      chapter
    })

    console.log('Fetched questions from DB:', result) // Debugging line

    if (result) {
      res.status(200).json({ mcq: result.mcq || [], short: result.short || [], long: result.long || [] })
    } else {
      res.status(404).json({ message: 'No questions found for this chapter' })
    }
  } catch (error) {
    console.error('Error fetching questions from DB:', error) // Debugging line
    res.status(500).json({ error: error.message })
  }
}