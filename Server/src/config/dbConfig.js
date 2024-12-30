import { MongoClient } from 'mongodb';
import 'dotenv/config';

let client;
let dbInstance;
export let usersCollection;

const CONNECT_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/`

export const connectDB = async () => {
  if (!client) {
    client = new MongoClient(CONNECT_URL, {
      connectTimeoutMS: 3000,
    });

    try {
      await client.connect();
      console.log('Connected to MongoDB');

      dbInstance = client.db("social-website");

      usersCollection = dbInstance.collection("users");

      console.log("✅users collections ready.");
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }
  return dbInstance;
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
    console.log("MongoDB connection closed");
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  try {
    await closeConnection();
    console.log("All connections closed successfully");
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
  }
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));   // Ctrl+C
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Kill command
process.on("SIGQUIT", () => gracefulShutdown("SIGQUIT")); // Quit signal