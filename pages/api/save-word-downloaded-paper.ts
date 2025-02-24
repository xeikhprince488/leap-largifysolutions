import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, ObjectId, MongoServerError } from "mongodb"
import type { SavedPaper } from "@/types/saved-papers"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

if (!uri || !dbName) {
  throw new Error("Please add your Mongo URI and DB name to .env.local")
}

let cachedClient: MongoClient | null = null
let isConnected = false

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient && isConnected) {
    return cachedClient
  }

  if (!uri) {
    throw new Error("MongoDB URI is not defined")
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, options)
      await cachedClient.connect()
      isConnected = true

      // Handle graceful shutdown
      ;["SIGTERM", "SIGINT"].forEach((signal) => {
        process.on(signal, async () => {
          if (cachedClient) {
            await cachedClient.close()
            cachedClient = null
            isConnected = false
            console.log("MongoDB connection closed through app termination")
            process.exit(0)
          }
        })
      })
    } else {
      // Test the connection if client exists but not connected
      await cachedClient.db("admin").command({ ping: 1 })
      isConnected = true
    }

    return cachedClient
  } catch (error) {
    console.error("MongoDB connection error:", error)
    if (cachedClient) {
      await cachedClient.close()
      cachedClient = null
    }
    isConnected = false
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const savedPaper = req.body as SavedPaper

    // Validate required fields
    if (!savedPaper || !savedPaper.id || !savedPaper.title || !savedPaper.fileName || !savedPaper.metadata) {
      return res.status(400).json({
        error: "Invalid paper data - missing required fields",
        receivedData: savedPaper,
      })
    }

    const client = await connectToDatabase()
    const db = client.db(dbName)
    const collection = db.collection("word-downloaded-papers")

    // Generate new ObjectId if _id is empty
    const paperId = savedPaper._id ? new ObjectId(savedPaper._id) : new ObjectId()

    // Prepare paper document
    const paperToSave = {
      ...savedPaper,
      _id: paperId,
      downloadedAt: new Date(),
      format: "word",
      // Ensure metadata fields are present
      metadata: {
        topic: savedPaper.metadata.topic || "",
        category: savedPaper.metadata.category || "",
        grade: savedPaper.metadata.grade || "",
        subject: savedPaper.metadata.subject || "",
        chapter: Array.isArray(savedPaper.metadata.chapter) ? savedPaper.metadata.chapter : [],
        questionTypes: Array.isArray(savedPaper.metadata.questionTypes) ? savedPaper.metadata.questionTypes : [],
        totalQuestions: savedPaper.metadata.totalQuestions || 0,
      },
    }

    // Check for existing document
    const existingPaper = await collection.findOne({ _id: paperId })
    if (existingPaper) {
      // Update existing document
      const result = await collection.updateOne({ _id: paperId }, { $set: paperToSave })

      if (!result.acknowledged) {
        throw new Error("Failed to update paper")
      }

      return res.status(200).json({
        success: true,
        message: "Word paper updated successfully",
        id: paperId,
      })
    }

    // Insert new document
    const result = await collection.insertOne(paperToSave)

    if (!result.acknowledged) {
      throw new Error("Failed to insert paper")
    }

    return res.status(200).json({
      success: true,
      message: "Word paper saved successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error saving word paper to MongoDB:", error)

    // Check for specific error types
    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        return res.status(409).json({ error: "Paper already exists in database" })
      }
    }

    // Include more error details in development
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return res.status(500).json({
      error: "Failed to save paper",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    })
  }
}

