import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

const client = new MongoClient(uri)

export default async function handler(req: { method: string; query: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): any; new(): any } } }) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const paperId = req.query.id

    if (!paperId) {
      return res.status(400).json({ message: "Paper ID is required" })
    }

    await client.connect()
    const database = client.db("questionBank")
    const collection = database.collection("saved-papers")

    const result = await collection.deleteOne({
      _id: new ObjectId(paperId),
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Paper not found" })
    }

    return res.status(200).json({ message: "Paper deleted successfully" })
  } catch (error) {
    console.error("Error deleting paper:", error)
    return res.status(500).json({ message: "Error deleting paper" })
  }
}

