/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const valid = require("../../validations/validation");
const dotenv = require("dotenv").config();

const {
  successResponse,
  errorResponse,
} = require("../../helpers/responseHelper");

const { User, UserRole, Role } = require("../../models");
// get all users
const getAllUser = async (req, res) => {
  try {
    let users = [];
    users = await User.findAll({ include: Role });
    return successResponse(req, res, users);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// create user function
const createUser = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return errorResponse(req, res, "req body cannot be empty", 400);
    }
    const { error } = valid.validateUserSchema(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    let { first_name, last_name, email, password } = req.body;
    let payload;
    let addRole;
    let salt;
    let verified_at;
    let account_status;
    account_status = "pending";
    verified_at = new Date();
    salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    payload = {
      first_name,
      last_name,
      email,
      password,
      account_status,
      verified_at,
    };
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      errorResponse(req, res, "User with this email already exists.", 409);
    }
    const user = await User.create(payload);
    addRole = {
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
    return successResponse(req, res, user, token);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// get user by id
const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      return successResponse(req, res, user);
    }
    return errorResponse(req, res, "No, user found", 400);
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
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return successResponse(req, res, updatedUser);
    }
    return errorResponse(req, res, "No, user found to update", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// delete user by id
const deleteUserById = async (req, res) => {
  try {
    let { id } = req.params;
    const checkUser = await User.findOne({
      where: { id },
    });
    if (checkUser) {
      const delete_from_role = await UserRole.destroy({
        where: { user_id: id },
      });
      const delete_user = await User.destroy({
        where: { id },
      });
      if (delete_user) {
        return successResponse(req, res, delete_user);
      }
    }
    return errorResponse(req, res, "No, user found to delete", 400);
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
      return successResponse(req, res, user, token);
    }
    return errorResponse(req, res, "Invalid Credentials", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
module.exports = {
  getAllUser,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  login,
};
