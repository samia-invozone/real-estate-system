const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/user", userController.getAllUser);
router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
