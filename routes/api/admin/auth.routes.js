const express = require("express");
const verifyToken = require("../../../middleware/auth");

const router = express.Router();
const authController = require("../../../controllers/admin/auth");
const userController = require("../../../controllers/admin/user");

// Admin Login
router.post("/login", authController.login);

router.post("/register", authController.register);

// User Routes
router.get("/users", verifyToken, userController.getAllUser);

router.get("/user/:id", verifyToken, userController.getUserById);

router.put("/user/:id", verifyToken, userController.updateUserById);

router.delete("/user/:id", verifyToken, userController.deleteUserById);

module.exports = router;
