const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const valid = require("../../validations/validation");
const dotenv = require("dotenv").config();
const { User, Role } = require("../../models");
const {
  Countries,
  States,
  Cities,
} = require("countries-states-cities-service");

const {
  successResponse,
  errorResponse,
} = require("../../helpers/responseHelper");

const login = async (req, res) => {
  try {
    if (!req.body.email) {
      return errorResponse(req, res, "req body cannot be empty", 400);
    }
    const { error } = valid.validateSignIn(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    const { email, password } = req.body;
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email }, include: Role });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "8h",
        }
      );
      return successResponse(req, res, user, token);
    }
    return errorResponse(req, res, "Invalid Credentials", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};

// get countries
const getCountries = async (req, res) => {
  try {
    const countries = Countries.getCountries({
      sort: {
        mode: "asc",
      },
    });
    return successResponse(req, res, countries);
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
    return successResponse(req, res, states);
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
    return successResponse(req, res, cities);
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};
module.exports = {
  login,
  getCountries,
  getStates,
  getCities,
};
