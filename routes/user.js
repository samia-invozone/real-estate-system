const express = require("express");
const Validator = require("../middleware/Validator");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/user", userController.getAllUser);

router.post("/user", Validator("addUser"), userController.createUser);

router.get(
  "/user/:id",
  Validator("getUser", "params"),
  userController.getUserById
);

router.put("/user/:id", userController.updateUserById);

router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
