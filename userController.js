import { users } from "./db.js";
import { response } from "./utils.js";

export function getUsers(res, users) {
  response(res, users);
}
export async function createUser(req, res) {
  let parsed = await parsedData(req);
  let newUser = {
    ...parsed,
    id: Date.now(),
  };
  users.push(newUser);
  response(res, parsed);
}
export async function updateUser(req, res, user) {
  let parsed = await parsedData(req);

  let updatedUser = {
    ...user,
    ...parsed,
  };

  let index = users.findIndex((u) => u.id == user.id);
  users[index] = updatedUser;
  response(res, updatedUser);
}
export function deleteUser(res, user) {
  let index = users.findIndex((u) => u.id == user.id);
  if (index !== -1) {
    users.splice(index, 1);
    response(res, user);
  } else {
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
