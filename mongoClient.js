import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = "usersDB";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: "1", // Optional: helps with stability on newer versions
});

export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.log("problem occured:", error);
  }
}
