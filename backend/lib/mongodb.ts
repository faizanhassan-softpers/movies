import mongoose, { Connection, Mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cachedClient: Mongoose | null = null;
let cachedDb: Connection | null = null;

export async function connectToDatabase(): Promise<{ client: Mongoose; db: Connection }> {
  if (cachedDb) {
    return { client: cachedClient as Mongoose, db: cachedDb as Connection };
  }

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = await mongoose.connect(MONGO_URI);

  const db = client.connection;

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}