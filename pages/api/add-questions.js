import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { grade, subject, chapter, questions } = req.body;

    try {
      const client = await clientPromise;
      const database = client.db('questionBank');
      const collection = database.collection('questions');

      const newQuestions = questions.map(q => ({
        ...q,
        grade,
        subject,
        chapter
      }));

      await collection.insertMany(newQuestions);

      res.status(200).json({ success: true, message: 'Questions added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error adding questions' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
