const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const valid = require("../../validations/validation");

const {
  successResponse,
  errorResponse,
} = require("../../helpers/responseHelper");

const { User, UserRole, Role } = require("../../models");
// register user function
const register = async (req, res) => {
  try {
    const { error } = valid.validateUserSchema(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const { email } = req.body;
    let { password } = req.body;
    const accountStatus = "pending";
    const verifiedAt = new Date();
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      account_status: accountStatus,
      verified_at: verifiedAt,
    };
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      errorResponse(req, res, "User with this email already exists.", 409);
    }
    const user = await User.create(payload);
    const addRole = {
      role_id: req.body.role_id,
      user_id: user.id,
    };
    const userRole = await UserRole.create(addRole);
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    return successResponse(req, res, "User created successfully", user, token);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// update user by id
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return successResponse(req, res, "User has been updated", updatedUser);
    }
    return errorResponse(req, res, "No, user found to update", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// user login
const login = async (req, res) => {
  try {
    if (!req.body.email) {
      return errorResponse(req, res, "req body cannot be empty", 400);
    }
    const { error } = valid.validateSignIn(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    const { email, password } = req.body;
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      return successResponse(req, res, "User logged in", user, token);
    }
    return errorResponse(req, res, "Invalid Credentials", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
module.exports = {
  register,
  updateUserById,
  login,
};
