const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/login", userController.login);

router.get("/user", verifyToken, userController.getAllUser);

router.post("/user", userController.createUser);

router.get("/user/:id", verifyToken, userController.getUserById);

router.put("/user/:id", userController.updateUserById);

router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
