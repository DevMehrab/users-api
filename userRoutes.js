import { users } from "./db.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} from "./userController.js";

export default function userRoutes(req, res, path, param) {
  if (req.method === "GET") {
    if (param) {
      getSingleUser(res, param);
    } else {
      getUsers(res, users);
    }
  } else if (req.method === "POST") {
    createUser(req, res);
  } else if (req.method === "PUT") {
    if (param) {
      updateUser(req, res, param);
    } else {
      updateUser(req, res, "user not found");
    }
  } else if (req.method === "DELETE") {
    if (param) {
      let user = users.find((u) => u.id == param);
      if (user) {
        deleteUser(res, user);
      } else {
        deleteUser(res, "user not found");
      }
    } else {
      deleteUser(res, "user not found");
    }
  }
}
