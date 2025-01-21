import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let isConnected = false;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise = clientPromise.then(client => {
  if (!isConnected) {
    return client.db().admin().ping().then(() => {
      isConnected = true;
      return client;
    }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    });
  }
  return client;
});

export default clientPromise;

