import { MongoClient } from 'mongodb';
import 'dotenv/config';

const CONNECT_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/`

export const connectDB = async () => {
  try {
    const client = new MongoClient(CONNECT_URL);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};