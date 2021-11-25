const express = require("express");
const verifyToken = require("../../../middleware/auth");

const router = express.Router();
const authController = require("../../../controllers/admin/auth");
const userController = require("../../../controllers/admin/user");

// Admin Login
router.post("/login", authController.login);

// User Routes
router.get("/users", verifyToken, userController.getAllUser);

router.get("/user/:id", verifyToken, userController.getUserById);

router.put("/user/:id", verifyToken, userController.updateUserById);

router.delete("/user/:id", verifyToken, userController.deleteUserById);

// get all countries
router.get("/countries", authController.getCountries);

// get all states
router.get("/states", authController.getStates);

// get all cities
router.get("/cities", authController.getCities);
module.exports = router;
