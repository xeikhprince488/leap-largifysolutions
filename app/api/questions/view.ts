import { Document, MongoClient, WithId } from 'mongodb';

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

export default async function handler(req: { query: { grade: any; subject: any; chapter: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: WithId<Document>[] | { error: string }): void; new(): any; }; }; }) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('questions');
    
    const { grade, subject, chapter } = req.query;
    const questions = await collection.find({ grade, subject, chapter }).toArray();
    
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions from DB:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  } finally {
    await client.close();
  }
}
