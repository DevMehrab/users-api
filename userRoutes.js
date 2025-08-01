import { users } from "./db.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./userController.js";

export default function userRoutes(req, res, param) {
  if (req.method === "GET") {
    if (param) {
      let user = users.find((u) => u.id == param);
      if (user) {
        getUsers(res, user);
      } else {
        getUsers(res, "user not found");
      }
    } else {
      getUsers(res, users);
    }
  } else if (req.method === "POST") {
    createUser(req, res);
  } else if (req.method === "PUT") {
    if (param) {
      let user = users.find((u) => u.id == param);
      if (user) {
        updateUser(req, res, user);
      } else {
        updateUser(req, res, "user not found");
      }
    } else {
      updateUser(req, res, "user not found");
    }
  } else if (req.method === "DELETE") {
    if (param) {
      let user = users.find((u) => u.id == param);
      if (user) {
        deleteUser(req, res, user);
      } else {
        deleteUser(req, res, "user not found");
      }
    } else {
      deleteUser(req, res, "user not found");
    }
  }
}
