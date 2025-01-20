import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { paperId, pdfContent, fileName } = req.body;

    try {
      await client.connect();
      const database = client.db('questionBank');
      const collection = database.collection('saved-papers');

      const result = await collection.insertOne({
        paperId,
        pdfContent,
        fileName,
        createdAt: new Date(),
      });

      res.status(200).json({ message: 'Paper saved successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error saving paper', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
