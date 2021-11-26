const {
  Countries,
  States,
  Cities,
} = require("countries-states-cities-service");

const { successResponse, errorResponse } = require("../helpers/responseHelper");
// get countries
const getCountries = async (req, res) => {
  try {
    const countries = Countries.getCountries({
      sort: {
        mode: "asc",
      },
    });
    return successResponse(req, res, "List of countries", countries);
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};

// get states
const getStates = async (req, res) => {
  try {
    const states = States.getStates({
      sort: {
        mode: "asc",
      },
    });
    return successResponse(req, res, "List of states", states);
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};

// get cities
const getCities = async (req, res) => {
  try {
    const cities = Cities.getCities({
      sort: {
        mode: "asc",
      },
    });
    return successResponse(req, res, "List of cities", cities);
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};
module.exports = {
  getCountries,
  getStates,
  getCities,
};
