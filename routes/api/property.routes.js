const express = require("express");
const verifyToken = require("../../middleware/auth");

const router = express.Router();
const propertyController = require("../../controllers/property");

router.get("/properties", verifyToken, propertyController.getAllProperties);

router.post("/properties", verifyToken, propertyController.addNewProperty);

router.delete("/properties/:id", propertyController.deletePropertyById);

module.exports = router;
