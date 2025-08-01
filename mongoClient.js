import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = "usersDB";

// Pass extra options only if using Atlas (mongodb+srv)
const client = new MongoClient(
  url,
  url.startsWith("mongodb+srv")
    ? { useNewUrlParser: true, useUnifiedTopology: true }
    : {}
);
export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.log("problem occured:", error);
  }
}
