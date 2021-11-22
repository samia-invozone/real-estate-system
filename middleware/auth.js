const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/responseHelper");
const dotenv = require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  console.log(req.headers["x-access-token"]);

  if (!token) {
    return errorResponse(req, res, "Token is required for authentication", 403);
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return errorResponse(req, res, "Invalid token", 401);
  }
  return next();
};

module.exports = verifyToken;
