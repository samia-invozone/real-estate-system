const express = require("express");
const verifyToken = require("../../../middleware/auth");

const router = express.Router();

const userController = require("../../../controllers/user/auth");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.put("/user/:id", verifyToken, userController.updateUserById);

module.exports = router;
