import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: { method: string; query: { id: any, grade: string, subject: string } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: any }): void; new(): any } } }) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const client = await clientPromise
    const db = client.db("questionBank")
    
    const { id, grade, subject } = req.query
    
    console.log('Delete request received with:', { id, grade, subject }) // Debugging line

    const collection = db.collection(`${subject}-${grade}`)
    
    console.log('Collection name:', `${subject}-${grade}`) // Debugging line

    const parsedId = parseInt(id)
    console.log('Parsed ID:', parsedId) // Debugging line

    const result = await collection.updateOne(
      { $or: [{ "short.id": parsedId }, { "mcq.id": parsedId }, { "long.id": parsedId }] },
      { $pull: { short: { id: parsedId }, mcq: { id: parsedId }, long: { id: parsedId } } }
    )

    console.log('Delete result:', result) // Debugging line

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Question deleted successfully' })
    } else {
      res.status(404).json({ message: 'Question not found' })
    }
  } catch (error) {
    console.error('Error deleting question:', error) // Debugging line
    res.status(500).json({ error: (error as any).message })
  }
}