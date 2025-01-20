import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 };
const client = new MongoClient(uri, options);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if (!client.topology?.isConnected()) await client.connect();
      const database = client.db('questionBank');
      const collection = database.collection('saved-papers');

      const papers = await collection.find({}).toArray();

      res.status(200).json(papers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching papers', error });
    } finally {
      // Do not close the client connection
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
