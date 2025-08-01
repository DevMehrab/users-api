import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

const dbName = "usersDB";

const client = new MongoClient(url);
export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.log("problem occured:", error);
  }
}
