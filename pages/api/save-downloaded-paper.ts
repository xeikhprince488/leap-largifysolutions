import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { SavedPaper } from '@/types/saved-papers';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error('Please add your Mongo URI and DB name to .env.local');
}

let cachedClient: MongoClient | null = null;

const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 };

let isConnected = false;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }
  const client = new MongoClient(uri, options);
  await client.connect();
  isConnected = true;
  cachedClient = client;
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const savedPaper: SavedPaper = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('saved-papers');

    await collection.insertOne(savedPaper);

    res.status(200).json({ message: 'Paper saved successfully' });
  } catch (error) {
    console.error('Error saving paper to MongoDB:', error);
    res.status(500).json({ error: 'Error saving paper to MongoDB' });
  }
}
