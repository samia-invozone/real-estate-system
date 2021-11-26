const express = require("express");

const router = express.Router();

const countryController = require("../../controllers/countries-states-cities");

// get all countries
router.get("/countries", countryController.getCountries);

// get all states
router.get("/states", countryController.getStates);

// get all cities
router.get("/cities", countryController.getCities);

module.exports = router;
