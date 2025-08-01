import { ObjectId } from "mongodb";
import { users } from "./db.js";
import { db } from "./mongoClient.js";
import { response } from "./utils.js";

export async function getUsers(res) {
  const users = await db.collection("users").find().toArray();
  response(res, users);
}
export async function getSingleUser(res, userId) {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) });
  if (user) {
    response(res, user);
  } else {
    response(res, "user not found");
  }
}
export async function createUser(req, res) {
  let parsed = await parsedData(req);
  let newUser = {
    ...parsed,
    id: Date.now(),
  };
  const result = await db.collection("users").insertOne(newUser);
  response(res, parsed);
}
export async function updateUser(req, res, userId) {
  let parsed = await parsedData(req);

  try {
    db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: parsed }
    );
    response(res, parsed);
  } catch (error) {
    response(res, "user not found");
  }
}
export async function deleteUser(res, userId) {
  try {
    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    response(res, "done");
  } catch (error) {
    response(res, "user not found");
  }
}

export let parsedData = (req) => {
  let body = "";
  return new Promise((resolve) => {
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => resolve(JSON.parse(body)));
  });
};
