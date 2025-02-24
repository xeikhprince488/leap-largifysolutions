import { Document, InsertOneResult, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env');
}

const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});

export default async function handler(req: { body: { grade: any; subject: any; chapter: any; question: any; language: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success?: boolean; message?: string; result?: InsertOneResult<Document>; error?: string; }): void; new(): any; }; }; }) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('questions');
    
    const { grade, subject, chapter, question, language } = req.body;

    // Ensure image is a URL or base64 string
    if (question.image && typeof question.image !== 'string') {
      throw new Error('Invalid image format');
    }

    const result = await collection.insertOne(question);
    
    res.status(200).json({ success: true, message: 'Question added successfully', result });
  } catch (error) {
    console.error('Error adding question to DB:', error);
    res.status(500).json({ error: 'Failed to add question' });
  } finally {
    await client.close();
  }
}
